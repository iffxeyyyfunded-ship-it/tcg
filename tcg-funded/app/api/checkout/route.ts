import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
})

export async function POST(req: Request) {
  try {
    const { market, size, type, addons, coupon } = await req.json()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In a real app, you would validate pricing from lib/pricing again here
    // For now, we'll implement a simple line item creation
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `TCG FUNDED - ${market.toUpperCase()} ${size/1000}K ${type.toUpperCase()}`,
              description: `Instant Funded Account Evaluation. Add-ons: ${addons?.join(', ') || 'None'}`,
            },
            unit_amount: 0, // In production, calculate total * 100
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        user_id: user.id,
        market,
        size: size.toString(),
        type,
        addons: JSON.stringify(addons),
        coupon,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
