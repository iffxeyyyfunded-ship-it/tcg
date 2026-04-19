'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Info, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { ACCOUNT_SIZES, DRAWDOWN_TYPES, getPrice, type AccountSize, type DrawdownType } from '@/lib/pricing'
import { cn } from '@/lib/utils'

function formatSize(size: number) {
  return size >= 1000 ? `$${(size / 1000).toFixed(0)}K` : `$${size}`
}

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}

export default function PricingTable() {
  const [market, setMarket] = useState<'forex' | 'crypto' | 'futures'>('forex')
  const [selectedSize, setSelectedSize] = useState<AccountSize>(50000)
  const [selectedType, setSelectedType] = useState<DrawdownType>('eod_trailing')

  const price = getPrice(selectedSize, selectedType)
  const discountedPrice = price * 0.35 // 65% OFF

  return (
    <section id="pricing" className="section bg-racing-primary overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Account Configurator</span>
          <h2 className="section-headline text-white mb-6">
            CHOOSE YOUR <span className="text-racing-green">ACCOUNT SIZE</span>
          </h2>
          <p className="text-racing-text-dim max-w-xl mx-auto">
             Select your preferred market and capital allocation. 
             Transparent pricing. No hidden fees. Instant funded.
          </p>
        </div>

        {/* Market Selector Pill Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-racing-surface border border-racing-border rounded-full p-1.5 gap-1.5">
            {(['forex', 'crypto', 'futures'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMarket(m)}
                disabled={m === 'futures'}
                className={cn(
                  "px-8 py-2.5 rounded-full text-[12px] font-bold transition-all uppercase tracking-widest",
                  market === m
                    ? 'bg-racing-green/10 border border-racing-green text-racing-green'
                    : m === 'futures'
                    ? 'text-racing-muted cursor-not-allowed'
                    : 'text-racing-text-dim hover:text-white hover:bg-white/5 border border-transparent'
                )}
              >
                {m === 'futures' ? 'Futures (Soon)' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Account Size Pill Selectors */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {ACCOUNT_SIZES.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-8 py-3 rounded-full text-lg font-bold transition-all border font-mono",
                selectedSize === size
                  ? 'bg-racing-green/10 text-racing-green border-racing-green shadow-border-glow'
                  : 'bg-racing-card border-racing-border text-racing-text-dim hover:border-racing-border-hover hover:text-white'
              )}
            >
              {formatSize(size)}
            </button>
          ))}
        </div>

        {/* Drawdown Type — 2x2 Grid */}
        <div className="mb-16">
          <span className="section-label text-center mb-8">Select Drawdown Protocol</span>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {(Object.entries(DRAWDOWN_TYPES) as [DrawdownType, typeof DRAWDOWN_TYPES[DrawdownType]][]).map(([key, dt]) => {
              const p = getPrice(selectedSize, key)
              const disc = p * 0.35
              const isSelected = selectedType === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={cn(
                    "card-racing text-left group relative !p-8",
                    isSelected ? "border-racing-green shadow-border-glow" : "border-racing-border"
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-racing-green uppercase tracking-[0.2em] mb-1 block">
                        {dt.tagline}
                      </span>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{dt.label}</h3>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-racing-green/20 flex items-center justify-center">
                        <Check size={14} className="text-racing-green" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[13px] text-racing-text-dim mb-10 leading-relaxed max-w-[280px]">
                    {dt.description}
                  </p>

                  <div className="flex items-end justify-between border-t border-racing-border pt-6">
                    <div>
                      <span className="text-[11px] font-bold text-racing-muted uppercase tracking-widest block mb-1">Fee (USD)</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white font-mono">{formatPrice(disc)}</span>
                        <span className="text-sm text-racing-muted line-through font-mono">{formatPrice(p)}</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold bg-racing-green text-black px-2 py-1 rounded">65% OFF</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="card-racing !bg-racing-surface !p-0 overflow-hidden mb-16 max-w-5xl mx-auto">
            <div className="bg-racing-primary p-6 border-b border-racing-border flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Protocol Comparison</h4>
              <div className="flex items-center gap-4 text-xs font-bold text-racing-text-dim">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-racing-green" /> Institutional Quality</span>
                <span className="flex items-center gap-1.5"><Zap size={14} className="text-racing-green" /> Instant Provisioning</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-racing-primary border-b border-racing-border">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-racing-muted uppercase tracking-widest">Feature</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-white uppercase tracking-widest text-right">Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-racing-border">
                  {[
                    { label: 'Maximum Drawdown', value: DRAWDOWN_TYPES[selectedType].maxLoss },
                    { label: 'Drawdown Logic', value: DRAWDOWN_TYPES[selectedType].drawdownType },
                    { label: 'Safety Buffer Zone', value: DRAWDOWN_TYPES[selectedType].bufferZone },
                    { label: 'Minimum Trading Days', value: '5 Days' },
                    { label: 'Consistency Gateway', value: '30% Limit' },
                    { label: 'Profit Target (Per Cycle)', value: '3%' },
                    { label: 'Payout Frequency', value: 'Weekly (Friday)' },
                    { label: 'Commission Fees', value: '$0.00 / lot' },
                    { label: 'Inactivity Threshold', value: '7 Days' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-4 text-[13px] font-medium text-racing-text-dim group-hover:text-white transition-colors">{row.label}</td>
                      <td className="px-8 py-4 text-[13px] font-bold text-white text-right font-mono">
                         <div className="flex items-center justify-end gap-3 italic">
                           {row.value}
                           <div className="w-5 h-5 rounded-full bg-racing-green/10 flex items-center justify-center">
                             <Check size={12} className="text-racing-green" />
                           </div>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        {/* Final Action Summary */}
        <div className="flex justify-center">
           <Link
             href={`/order?market=${market}&size=${selectedSize}&type=${selectedType}`}
             className="btn-primary flex items-center gap-4 px-16 py-5 text-xl font-bold uppercase tracking-widest shadow-border-glow group"
           >
             Get Funded ${selectedSize / 1000}K
             <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
           </Link>
        </div>
        <p className="text-center text-[10px] font-bold text-racing-muted uppercase tracking-[0.2em] mt-8">
          Instant Provisioning · Global Coverage · Stripe Secure
        </p>

      </div>
    </section>
  )
}
