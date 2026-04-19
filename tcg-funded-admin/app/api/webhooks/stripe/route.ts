// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/resend'
import AccountCreatedEmail from '@/emails/AccountCreatedEmail'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body, signature, process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const { order_id, trader_id, plan_id, add_ons, coupon_code } = session.metadata

    // 1. Update order to paid
    const { data: order } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid', stripe_session_id: session.id, paid_at: new Date().toISOString() })
      .eq('id', order_id)
      .select()
      .single()

    // 2. Generate account number
    const { data: accountNum } = await supabaseAdmin.rpc('generate_account_number')

    // 3. Get plan
    const { data: plan } = await supabaseAdmin
      .from('account_plans').select('*').eq('id', plan_id).single()

    // 4. Create trader account
    const { data: account } = await supabaseAdmin
      .from('trader_accounts')
      .insert({
        trader_id,
        plan_id,
        order_id,
        account_number: accountNum,
        status: 'pending_kyc',
        starting_balance: plan!.size_value,
        current_balance: plan!.size_value,
        peak_balance: plan!.size_value,
        add_ons: JSON.parse(add_ons || '[]').map((id: string) => ({ id })),
        cycle_start_date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single()

    // 5. Link account to order
    await supabaseAdmin.from('orders').update({ account_id: account!.id }).eq('id', order_id)

    // 6. Record revenue entry
    await supabaseAdmin.from('revenue_entries').insert({
      type: 'account_purchase',
      amount_usd: session.amount_total / 100,
      order_id,
      description: `${plan!.size_label} ${plan!.drawdown_type_label} - ${plan!.market}`,
    })

    // 7. Update weekly pool revenue
    const { data: pool } = await supabaseAdmin
      .from('weekly_pools')
      .select('*')
      .eq('status', 'open')
      .order('week_start', { ascending: false })
      .limit(1)
      .single()
    
    if (pool) {
      const newRevenue = pool.total_revenue_usd + (session.amount_total / 100)
      await supabaseAdmin.from('weekly_pools').update({
        total_revenue_usd: newRevenue,
        pool_amount_usd: newRevenue * (pool.pool_allocation_pct / 100),
        ops_amount_usd: newRevenue * (pool.ops_allocation_pct / 100),
        profit_amount_usd: newRevenue * (pool.profit_allocation_pct / 100),
      }).eq('id', pool.id)
    }

    // 8. Handle coupon usage
    if (coupon_code) {
      await supabaseAdmin.from('coupons').update({ 
        uses_count: (await supabaseAdmin.from('coupons').select('uses_count').eq('code', coupon_code).single()).data?.uses_count + 1 
      }).eq('code', coupon_code)
    }

    // 9. Handle affiliate commission
    const { data: profile } = await supabaseAdmin
      .from('profiles').select('referred_by').eq('id', trader_id).single()
    
    if (profile?.referred_by) {
      const { data: affiliate } = await supabaseAdmin
        .from('profiles').select('id').eq('affiliate_code', profile.referred_by).single()
      
      if (affiliate) {
        const commissionAmount = (session.amount_total / 100) * 0.10
        await supabaseAdmin.from('affiliate_referrals').insert({
          affiliate_id: affiliate.id,
          referred_trader_id: trader_id,
          order_id,
          commission_pct: 10,
          commission_amount_usd: commissionAmount,
          status: 'pending',
        })
      }
    }

    // 10. Send email
    const { data: traderProfile } = await supabaseAdmin
      .from('profiles').select('*').eq('id', trader_id).single()
    
    await sendEmail({
      to: traderProfile!.email,
      subject: `Your TCG FUNDED Account ${accountNum} is Ready`,
      react: AccountCreatedEmail({
        name: traderProfile!.full_name ?? 'Trader',
        accountNumber: accountNum,
        planLabel: `${plan!.size_label} ${plan!.drawdown_type_label}`,
        market: plan!.market,
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      }),
    })
  }

  return NextResponse.json({ received: true })
}
