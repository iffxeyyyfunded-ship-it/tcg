import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata

    if (metadata) {
      const { user_id, market, size, type, addons, coupon } = metadata
      const parsedAddons = JSON.parse(addons || '[]')

      // 1. Create Order Record
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          user_id,
          market,
          account_size: parseFloat(size),
          drawdown_type: type,
          base_price: (session.amount_total || 0) / 100, // approximation for this simplified webhook
          final_price: (session.amount_total || 0) / 100,
          payment_status: 'paid',
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          paid_at: new Date().toISOString(),
          addons: parsedAddons,
          coupon_code: coupon,
        })
        .select()
        .single()

      if (orderError) console.error('Error creating order:', orderError)

      // 2. Create Trader Account
      const { data: account, error: accountError } = await supabaseAdmin
        .from('accounts')
        .insert({
          user_id,
          market,
          account_size: parseFloat(size),
          drawdown_type: type,
          starting_balance: parseFloat(size),
          current_balance: parseFloat(size),
          peak_balance: parseFloat(size),
          max_drawdown_pct: type === 'static' ? 10 : 8,
          status: 'pending_kyc',
          addon_reduced_days: parsedAddons.includes('reduced_days'),
          addon_no_consistency: parsedAddons.includes('no_consistency'),
          addon_multiplier_boost: parsedAddons.includes('multiplier_boost') ? 1.25 : 1.0,
          addon_account_revival: parsedAddons.includes('account_revival'),
          addon_leverage_powerup: parsedAddons.includes('leverage_powerup'),
          addon_drawdown_boost: parsedAddons.includes('drawdown_boost'),
        })
        .select()
        .single()

      if (accountError) console.error('Error creating account:', accountError)

      // 3. Link Order to Account
      if (order && account) {
        await supabaseAdmin
          .from('orders')
          .update({ account_id: account.id })
          .eq('id', order.id)
      }

      // 4. Record Revenue
      await supabaseAdmin.from('revenue_records').insert({
        date: new Date().toISOString().split('T')[0],
        market,
        gross_revenue: (session.amount_total || 0) / 100,
        pool_contribution: ((session.amount_total || 0) / 100) * 0.4,
        operating_costs: ((session.amount_total || 0) / 100) * 0.45,
        company_profit: ((session.amount_total || 0) / 100) * 0.15,
        new_accounts: 1
      })
      
      // 5. Create Notification
      await supabaseAdmin.from('notifications').insert({
        user_id,
        title: 'Account Provisioned',
        message: `Your TCG Funded ${market.toUpperCase()} account is ready. Please complete KYC to start trading.`,
        type: 'success',
        link: '/dashboard'
      })
    }
  }

  return NextResponse.json({ received: true })
}
