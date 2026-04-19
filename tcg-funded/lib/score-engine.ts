// TCG Funded Score Engine
// Better score, bigger share, bigger payout.

export interface ScoreFactors {
  profitAboveBuffer: number    // % profit above buffer zone
  consistencyScore: number     // how spread out profits are across days (0-1)
  sizingDiscipline: number     // no oversizing (0-1)
  tradingFrequency: number     // trades per day consistency (0-1)
  drawdownManagement: number   // how well they manage drawdown (0-1)
  ruleCompliance: number       // no rule violations (0-1)
  cycleCompletion: number      // full cycles completed (integer)
  addOnBoosts: number          // multipliers from add-ons (e.g., 1.25)
}

/**
 * Calculates the Trader Share Score.
 * Formula: (ProfitBase * BehaviorMultiplier * Boosts) + CycleBonus
 */
export function calculateScore(factors: ScoreFactors): number {
  // Profit Base is the primary driver
  const base = factors.profitAboveBuffer * 10

  // Behavior multipliers (weighted factors)
  const behavior = (
    factors.consistencyScore * 0.25 +
    factors.sizingDiscipline * 0.15 +
    factors.tradingFrequency * 0.10 +
    factors.drawdownManagement * 0.20 +
    factors.ruleCompliance * 0.30
  )

  // Apply boosts and add cycle completion bonus
  return (base * behavior * factors.addOnBoosts) + factors.cycleCompletion
}

/**
 * Calculates the final payout amount from the pool.
 * Formula: (Trader Score / All Scores) * Pool Amount
 */
export function calculatePayout(
  traderScore: number,
  totalScores: number,
  poolAmount: number
): number {
  if (totalScores === 0) return 0
  const sharePercent = traderScore / totalScores
  return sharePercent * poolAmount
}
