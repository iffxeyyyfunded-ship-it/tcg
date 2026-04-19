// app/api/revenue/live/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const { data: stats, error: statsError } = await supabaseAdmin.rpc('get_revenue_stats')
    if (statsError) throw statsError
    
    const { data: currentPool } = await supabaseAdmin
      .from('weekly_pools')
      .select('pool_amount_usd, week_start, week_end, payout_date, total_eligible_traders')
      .eq('status', 'open')
      .order('week_start', { ascending: false })
      .limit(1)
      .single()

    const { data: allTimePaid } = await supabaseAdmin
      .from('payout_requests')
      .select('net_payout_usd')
      .eq('status', 'paid')

    const totalPaid = allTimePaid?.reduce((sum, r) => sum + (Number(r.net_payout_usd) ?? 0), 0) ?? 0

    const { count: traderCount } = await supabaseAdmin
      .from('trader_accounts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    return NextResponse.json({
      allTimeRevenue: stats?.all_time_revenue ?? 0,
      thisWeekRevenue: stats?.this_week_revenue ?? 0,
      currentPoolAmount: currentPool?.pool_amount_usd ?? 0,
      payoutDate: currentPool?.payout_date,
      totalPayoutsDistributed: totalPaid,
      activeTradersCount: traderCount ?? 0,
      eligibleTradersThisCycle: currentPool?.total_eligible_traders ?? 0,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
