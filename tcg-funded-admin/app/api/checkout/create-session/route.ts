// app/api/checkout/create-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { planId, addOns = [], couponCode } = body

    // Get plan
    const { data: plan } = await supabaseAdmin
      .from('account_plans')
      .select('*')
      .eq('id', planId)
      .eq('is_active', true)
      .single()

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    // Calculate add-ons price
    const ADD_ON_PRICES: Record<string, number> = {
      'reduced_min_days': 29,
      'consistency_gateway': 49,
      'multiplier_boost': 39,
      'account_revival': 59,
      'leverage_powerup': 49,
      'drawdown_boost': 39,
    }
    const addOnsTotal = addOns.reduce((sum: number, id: string) => 
      sum + (ADD_ON_PRICES[id] ?? 0), 0)

    // Apply coupon
    let discountPct = 0
    if (couponCode) {
      const { data: coupon } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .single()
      
      if (coupon) {
        if (!coupon.expires_at || new Date(coupon.expires_at) > new Date()) {
          if (!coupon.max_uses || coupon.uses_count < coupon.max_uses) {
            discountPct = coupon.discount_pct
          }
        }
      }
    }

    const basePrice = plan.base_price_usd
    const discountAmount = (basePrice * discountPct) / 100
    const finalAmount = basePrice - discountAmount + addOnsTotal

    // Create pending order
    const { data: order } = await supabaseAdmin
      .from('orders')
      .insert({
        trader_id: user.id,
        plan_id: planId,
        amount_usd: finalAmount,
        original_price: basePrice,
        coupon_code: couponCode,
        discount_pct: discountPct,
        discount_amount: discountAmount,
        add_ons: addOns.map((id: string) => ({ id, price: ADD_ON_PRICES[id] ?? 0 })),
        add_ons_total: addOnsTotal,
        status: 'pending',
      })
      .select()
      .single()

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `TCG FUNDED — ${plan.size_label} ${plan.drawdown_type_label}`,
              description: `Instant Funded Trading Account | ${plan.market.toUpperCase()}`,
            },
            unit_amount: Math.round(finalAmount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order!.id,
        trader_id: user.id,
        plan_id: planId,
        add_ons: JSON.stringify(addOns),
        coupon_code: couponCode ?? '',
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success&order=${order!.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/order?cancelled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
