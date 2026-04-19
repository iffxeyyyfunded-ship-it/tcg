import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// This route runs every Friday at 5PM EST to process the pool
export async function GET(req: Request) {
  // Basic security check for cron
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const today = new Date().toISOString().split('T')[0]
    
    // 1. Find the active "open" pool
    const { data: pool, error: poolError } = await supabaseAdmin
      .from('payout_pools')
      .select('*')
      .eq('status', 'open')
      .single()

    if (poolError || !pool) {
      return NextResponse.json({ error: 'No open pool found' }, { status: 404 })
    }

    // 2. Sum up all revenue records for this week
    const { data: revenue, error: revError } = await supabaseAdmin
      .from('revenue_records')
      .select('gross_revenue')
      .gte('date', pool.week_start)
      .lte('date', pool.week_end)

    if (revError) throw revError

    const totalRevenue = revenue.reduce((acc, curr) => acc + parseFloat(curr.gross_revenue), 0)
    const poolAmount = totalRevenue * 0.40
    const opsAmount = totalRevenue * 0.45
    const profitAmount = totalRevenue * 0.15

    // 3. Get all payout requests that are "requested"
    const { data: requests, error: reqError } = await supabaseAdmin
      .from('payout_requests')
      .select('*, accounts(*)')
      .eq('pool_id', pool.id)
      .eq('status', 'requested')

    if (reqError) throw reqError

    const totalScores = requests.reduce((acc, curr) => acc + parseFloat(curr.score), 0)

    // 4. Calculate distributions
    if (totalScores > 0) {
      for (const payoutReq of requests) {
        const sharePct = parseFloat(payoutReq.score) / totalScores
        const amount = sharePct * poolAmount

        await supabaseAdmin
          .from('payout_requests')
          .update({
            pool_share_pct: sharePct,
            payout_amount: amount,
            status: 'approved'
          })
          .eq('id', payoutReq.id)
      }
    }

    // 5. Update and Close the pool
    await supabaseAdmin
      .from('payout_pools')
      .update({
        gross_revenue: totalRevenue,
        pool_amount: poolAmount,
        ops_amount: opsAmount,
        profit_amount: profitAmount,
        total_scores: totalScores,
        total_payouts_distributed: poolAmount,
        total_traders_paid: requests.length,
        status: 'calculating',
        distributed_at: new Date().toISOString()
      })
      .eq('id', pool.id)

    // 6. Create next week's pool
    const nextWeekStart = new Date(pool.week_end)
    nextWeekStart.setDate(nextWeekStart.getDate() + 1)
    const nextWeekEnd = new Date(nextWeekStart)
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 6)

    await supabaseAdmin.from('payout_pools').insert({
      week_start: nextWeekStart.toISOString().split('T')[0],
      week_end: nextWeekEnd.toISOString().split('T')[0],
      status: 'open'
    })

    return NextResponse.json({ 
      success: true, 
      processedRequests: requests.length,
      poolAmount,
      totalRevenue 
    })

  } catch (err: any) {
    console.error('Cron Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
