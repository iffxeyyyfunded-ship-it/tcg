export type Market = 'forex' | 'crypto' | 'futures'
export type DrawdownType = 'intraday_trailing' | 'eod_trailing' | 'classic' | 'static'
export type AccountSize = 5000 | 10000 | 25000 | 50000 | 100000 | 200000

export const ACCOUNT_SIZES: AccountSize[] = [5000, 10000, 25000, 50000, 100000, 200000]

export const DRAWDOWN_TYPES: Record<DrawdownType, {
  label: string
  shortLabel: string
  tagline: string
  maxLoss: string
  drawdownType: string
  bufferZone: string
  description: string
  badge?: string
}> = {
  intraday_trailing: {
    label: 'Intraday Trailing',
    shortLabel: 'Intraday',
    tagline: 'Lowest Price',
    maxLoss: '8%',
    drawdownType: 'Intraday Trailing',
    bufferZone: '4%',
    description: 'Follows your equity high tick-by-tick. The tightest trailing model.',
  },
  eod_trailing: {
    label: 'EOD Trailing',
    shortLabel: 'EOD',
    tagline: 'Most Popular',
    maxLoss: '8%',
    drawdownType: 'EOD Trailing',
    bufferZone: '5%',
    description: 'Resets at end of day. Profits locked in overnight raise your floor.',
    badge: 'MOST POPULAR',
  },
  classic: {
    label: 'Classic',
    shortLabel: 'Classic',
    tagline: 'Only at TCG',
    maxLoss: 'N/A',
    drawdownType: 'No Max Drawdown',
    bufferZone: '5%',
    description: 'Your account is never terminated by drawdown. A score system rewards discipline instead.',
    badge: 'EXCLUSIVE',
  },
  static: {
    label: 'Static',
    shortLabel: 'Static',
    tagline: 'Most Predictable',
    maxLoss: '10%',
    drawdownType: 'Static',
    bufferZone: '8%',
    description: 'Fixed from starting balance, never moves. The most predictable model.',
  },
}

// Base pricing matrix (USD)
const BASE_PRICES: Record<AccountSize, Record<DrawdownType, number>> = {
  5000:   { intraday_trailing: 59,  eod_trailing: 69,  classic: 79,  static: 89 },
  10000:  { intraday_trailing: 99,  eod_trailing: 119, classic: 139, static: 159 },
  25000:  { intraday_trailing: 179, eod_trailing: 199, classic: 239, static: 299 },
  50000:  { intraday_trailing: 299, eod_trailing: 349, classic: 399, static: 499 },
  100000: { intraday_trailing: 449, eod_trailing: 519, classic: 599, static: 749 },
  200000: { intraday_trailing: 749, eod_trailing: 879, classic: 999, static: 1249 },
}

export function getPrice(size: AccountSize, type: DrawdownType): number {
  return BASE_PRICES[size][type]
}

export const ADDONS = [
  {
    id: 'reduced_days',
    label: 'Reduced Min Days',
    description: 'Cut 2 days off the minimum trading requirement. Drops from 5 to 3 days.',
    price: 29,
    icon: '📅',
  },
  {
    id: 'no_consistency',
    label: 'Consistency Gateway',
    description: 'Remove the 30% single-day profit cap. No more disqualification for having one great trading day.',
    price: 49,
    icon: '🔓',
    popular: true,
  },
  {
    id: 'multiplier_boost',
    label: 'Multiplier Boost',
    description: 'Multiply your Score, the number that directly scales your payout.',
    price: 79,
    icon: '⚡',
  },
  {
    id: 'individual_boost',
    label: 'Individual Boost',
    description: 'Pick score multipliers to boost by 1.25x each.',
    price: 39,
    icon: '🎯',
  },
  {
    id: 'account_revival',
    label: 'Account Revival',
    description: 'Second chance after breach. Your account resets to starting balance. Classic: reset All-Time DD to 0% anytime.',
    price: 99,
    icon: '🔄',
  },
  {
    id: 'leverage_powerup',
    label: 'Leverage Power-Up',
    description: 'Double your leverage across all instruments. Forex: 1:100 → 1:200. Crypto BTC/ETH: 5:1 → 10:1.',
    price: 49,
    icon: '📈',
  },
  {
    id: 'drawdown_boost',
    label: 'Drawdown Boost (+2%)',
    description: 'Add 2% to your max drawdown limit. E.g. an 8% threshold becomes 10%. More room to trade.',
    price: 59,
    icon: '🛡️',
  },
]

export const COMPARISON_TABLE = [
  { feature: 'Business Model', tcg: 'Transparent: revenue-funded pools', blackbox: 'Black Box: losers fund winners' },
  { feature: 'Financial Transparency', tcg: 'Full: revenue, costs, pool, reserves', blackbox: 'None' },
  { feature: 'Payout Denials', tcg: 'Zero. Structurally impossible', blackbox: 'Common under volatility/stress' },
  { feature: 'Payout Caps', tcg: 'None', blackbox: 'Typically $1K–$8K per period' },
  { feature: 'Platform Fee', tcg: '0%. Traders keep 100%', blackbox: '5–20% platform cut' },
  { feature: 'No Max Drawdown Option', tcg: 'TCG Classic (FX/Crypto)', blackbox: 'Does not exist' },
  { feature: 'Commissions', tcg: 'Zero', blackbox: '$3–$7 per lot / varies' },
  { feature: 'Leverage', tcg: 'Up to 1:100 (1:200 w/ Power-Up)', blackbox: 'Typically 1:30–1:50' },
  { feature: 'Max Funded Accounts', tcg: '10 per household', blackbox: 'Usually 3–5' },
  { feature: 'Payday', tcg: 'Every Friday', blackbox: 'Bi-weekly or monthly' },
  { feature: 'Overnight/Weekend Holding', tcg: 'Allowed', blackbox: 'Usually restricted' },
  { feature: 'Automated Systems', tcg: 'Allowed', blackbox: 'Usually banned' },
  { feature: 'Checkout Add-Ons', tcg: '7 customization options', blackbox: 'None or limited' },
  { feature: 'Payout Mechanism', tcg: 'Performance-weighted pool', blackbox: 'Arbitrary profit split' },
]
