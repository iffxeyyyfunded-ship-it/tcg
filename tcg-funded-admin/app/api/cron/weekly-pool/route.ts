// app/api/cron/weekly-pool/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { calculateShareScore, calculatePayoutAmount } from '@/lib/score-engine'
import { sendEmail } from '@/lib/resend'
import PayoutPaidEmail from '@/emails/PayoutPaidEmail'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Get current open pool
    const { data: pool } = await supabaseAdmin
      .from('weekly_pools')
      .select('*')
      .eq('status', 'open')
      .order('week_start', { ascending: false })
      .limit(1)
      .single()

    if (!pool) return NextResponse.json({ error: 'No open pool' }, { status: 404 })

    // 2. Set pool to calculating
    await supabaseAdmin.from('weekly_pools').update({ status: 'calculating' }).eq('id', pool.id)

    // 3. Get all eligible payout requests
    const { data: requests } = await supabaseAdmin
      .from('payout_requests')
      .select('*, trader_accounts(*), profiles(*)')
      .eq('status', 'pending')

    if (!requests || requests.length === 0) {
      await supabaseAdmin.from('weekly_pools').update({ status: 'closed' }).eq('id', pool.id)
      await openNextPool()
      return NextResponse.json({ message: 'No eligible requests' })
    }

    // 4. Sum up total scores
    const totalScores = requests.reduce((sum, r) => sum + Number(r.share_score), 0)

    // 5. Calculate and update payouts
    for (const req of requests) {
      const { sharePercent, payoutAmount } = calculatePayoutAmount(
        Number(req.share_score), totalScores, Number(pool.pool_amount_usd)
      )

      await supabaseAdmin.from('payout_requests').update({
        pool_id: pool.id,
        total_scores: totalScores,
        pool_share_pct: sharePercent,
        gross_payout_usd: payoutAmount,
        net_payout_usd: payoutAmount,
        status: 'approved',
        approved_at: new Date().toISOString(),
      }).eq('id', req.id)

      // 6. Send email
      // Note: PayoutPaidEmail template would be implemented similarly to AccountCreatedEmail
      await sendEmail({
        to: req.profiles.email,
        subject: `💰 Your TCG FUNDED Payout: $${payoutAmount.toFixed(2)}`,
        html: `
          <div>
            <h1>Payout Approved</h1>
            <p>Your share of the weekly pool ($${payoutAmount.toFixed(2)}) has been approved.</p>
          </div>
        `
      })
    }

    // 7. Close pool and update stats
    const actualPaid = requests.reduce((sum, r) => {
       const { payoutAmount } = calculatePayoutAmount(Number(r.share_score), totalScores, Number(pool.pool_amount_usd))
       return sum + payoutAmount
    }, 0)

    await supabaseAdmin.from('weekly_pools').update({
      status: 'paid',
      total_eligible_traders: requests.length,
      total_scores: totalScores,
      actual_paid_usd: actualPaid,
      paid_at: new Date().toISOString(),
    }).eq('id', pool.id)

    // 8. Open next week's pool
    await openNextPool()

    return NextResponse.json({ success: true, processed: requests.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

async function openNextPool() {
  const nextWeekStart = new Date()
  nextWeekStart.setDate(nextWeekStart.getDate() + (7 - nextWeekStart.getDay() + 1) % 7 || 7)
  
  const weekStart = new Date(nextWeekStart)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  const payoutDate = new Date(weekStart)
  payoutDate.setDate(payoutDate.getDate() + 4)

  const weekNum = getWeekNumber(weekStart)

  await supabaseAdmin.from('weekly_pools').insert({
    week_number: weekNum,
    year: weekStart.getFullYear(),
    week_start: weekStart.toISOString().split('T')[0],
    week_end: weekEnd.toISOString().split('T')[0],
    payout_date: payoutDate.toISOString().split('T')[0],
    status: 'open',
  })
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
