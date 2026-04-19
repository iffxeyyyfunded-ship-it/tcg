// lib/score-engine.ts

export interface AccountScoreInput {
  totalProfitPct: number
  bufferZonePct: number
  tradingDays: TradingDay[]
  cycleStartDate: string
  cycleEndDate: string
  planConsistencyPct: number
  addOns: { id: string }[]
  maxLossPct: number | null
  currentDrawdownPct: number
  drawdownType: string
}

interface TradingDay {
  daily_profit_pct: number
  daily_profit_usd: number
  trades_count: number
  lots_traded: number
}

export function calculateShareScore(input: AccountScoreInput): number {
  const profitAboveBuffer = Math.max(0, input.totalProfitPct - input.bufferZonePct)
  
  if (profitAboveBuffer === 0 || input.tradingDays.length === 0) return 0

  // BASE SCORE: profit above buffer (0–10 range)
  const baseScore = Math.min(profitAboveBuffer * 2, 10)

  // CONSISTENCY SCORE (0–1 multiplier)
  const dailyProfits = input.tradingDays.map(d => d.daily_profit_usd)
  const totalProfit = dailyProfits.reduce((a, b) => a + b, 0)
  const maxDayProfit = Math.max(...dailyProfits)
  const maxDayPct = totalProfit > 0 ? (maxDayProfit / totalProfit) * 100 : 100
  const hasConsistencyGateway = input.addOns.some(a => a.id === 'consistency_gateway')
  const consistencyScore = hasConsistencyGateway ? 1 : 
    maxDayPct <= input.planConsistencyPct ? 1 : 
    Math.max(0, 1 - ((maxDayPct - input.planConsistencyPct) / 100))

  // DISCIPLINE SCORE: drawdown management (0–1 multiplier)
  const disciplineScore = input.maxLossPct 
    ? Math.max(0.5, 1 - (input.currentDrawdownPct / input.maxLossPct))
    : 1

  // ACTIVITY SCORE: regular trading (0–1 multiplier)
  const activeDays = input.tradingDays.length
  const activityScore = Math.min(1, activeDays / 10)

  // COMBINE
  let score = baseScore * consistencyScore * disciplineScore * activityScore

  // ADD-ON BOOSTS
  if (input.addOns.some(a => a.id === 'multiplier_boost')) score *= 1.5
  if (input.addOns.some(a => a.id === 'individual_boost')) score *= 1.25

  return Math.round(score * 10000) / 10000
}

export function calculatePayoutAmount(
  traderScore: number,
  allScoresTotal: number,
  poolAmount: number
): { sharePercent: number; payoutAmount: number } {
  if (allScoresTotal === 0 || traderScore === 0) {
    return { sharePercent: 0, payoutAmount: 0 }
  }
  const sharePercent = (traderScore / allScoresTotal) * 100
  const payoutAmount = (sharePercent / 100) * poolAmount
  return {
    sharePercent: Math.round(sharePercent * 10000) / 10000,
    payoutAmount: Math.round(payoutAmount * 100) / 100,
  }
}
