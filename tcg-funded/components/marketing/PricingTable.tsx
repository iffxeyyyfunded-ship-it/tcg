'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Info, ArrowRight } from 'lucide-react'
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
  const [selectedSize, setSelectedSize] = useState<AccountSize>(25000)
  const [selectedType, setSelectedType] = useState<DrawdownType>('eod_trailing')

  const price = getPrice(selectedSize, selectedType)
  const discountedPrice = price * 0.35 // 65% OFF as per Master Prompt

  return (
    <section id="pricing" className="section bg-tcg-black overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
            Pricing
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
            CHOOSE YOUR <span className="gold-text">ACCOUNT.</span>
          </h2>
          <p className="text-tcg-text text-lg max-w-xl mx-auto font-medium">
             Select your market, size, and drawdown. Get funded instantly.
          </p>
        </div>

        {/* Market tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-tcg-card border border-tcg-border rounded-2xl p-1.5 gap-1.5">
            {(['forex', 'crypto', 'futures'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMarket(m)}
                disabled={m === 'futures'}
                className={cn(
                  "px-8 py-3 rounded-xl text-sm font-black transition-all uppercase tracking-widest",
                  market === m
                    ? 'bg-tcg-gold text-tcg-black shadow-[0_0_20px_rgba(245,200,66,0.2)]'
                    : m === 'futures'
                    ? 'text-tcg-muted cursor-not-allowed'
                    : 'text-tcg-text hover:text-white hover:bg-white/5'
                )}
              >
                {m === 'futures' ? 'Futures (Soon)' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Account size selector */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {ACCOUNT_SIZES.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-8 py-4 rounded-2xl text-lg font-black transition-all border",
                  selectedSize === size
                    ? 'bg-tcg-gold text-tcg-black border-tcg-gold shadow-[0_0_25px_rgba(245,200,66,0.3)]'
                    : 'bg-tcg-card border-tcg-border text-tcg-text hover:border-tcg-gold/40 hover:text-white'
                )}
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '1px' }}
              >
                {formatSize(size)}
              </button>
            ))}
          </div>
        </div>

        {/* Drawdown type cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(Object.entries(DRAWDOWN_TYPES) as [DrawdownType, typeof DRAWDOWN_TYPES[DrawdownType]][]).map(([key, dt]) => {
            const p = getPrice(selectedSize, key)
            const disc = p * 0.35 // 65% OFF
            const isSelected = selectedType === key
            return (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={cn(
                  "relative p-8 rounded-[32px] text-left transition-all border group",
                  isSelected
                    ? 'bg-tcg-gold/5 border-tcg-gold shadow-[0_0_40px_rgba(245,200,66,0.1)]'
                    : 'bg-tcg-card border-tcg-border hover:border-tcg-gold/30'
                )}
              >
                {dt.badge && (
                  <div className="absolute -top-3 left-8 bg-tcg-gold text-tcg-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[2px] uppercase">
                    {dt.badge}
                  </div>
                )}
                <div className="text-[10px] text-tcg-gold font-black mb-3 uppercase tracking-[2px]">{dt.tagline}</div>
                <div className="text-2xl font-black text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{dt.label}</div>
                <p className="text-xs text-tcg-text mb-8 leading-relaxed font-medium min-h-[40px]">{dt.description}</p>
                
                <div className="border-t border-white/5 pt-6 space-y-1">
                  <div className="text-tcg-muted line-through text-base font-bold italic">{formatPrice(p)}</div>
                  <div className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                     {formatPrice(disc)}
                  </div>
                  <div className="text-[10px] text-tcg-green font-black uppercase tracking-[2px] pt-1">65% Off Launch Choice</div>
                </div>

                {isSelected && (
                  <div className="absolute top-8 right-8">
                    <CheckCircle2 size={24} className="text-tcg-gold" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Final Summary Card */}
        <div className="max-w-4xl mx-auto bg-tcg-card border border-tcg-gold/30 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
           
           <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                 <div className="text-[10px] text-tcg-gold font-black uppercase tracking-[3px] mb-6">Account Summary</div>
                 <h3 className="text-4xl font-black text-white mb-8 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                    READY TO START <br /><span className="gold-text">TRADING?</span>
                 </h3>
                 <div className="space-y-4">
                    {[
                      { label: 'Market', value: market },
                      { label: 'Account Size', value: formatSize(selectedSize) },
                      { label: 'Drawdown Type', value: DRAWDOWN_TYPES[selectedType].label },
                      { label: 'Fees', value: 'One-time, No subscription' },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                         <span className="text-tcg-muted font-bold uppercase tracking-wider">{item.label}</span>
                         <span className="text-white font-black capitalize">{item.value}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col justify-center">
                 <div className="text-center md:text-right mb-8">
                    <div className="text-tcg-muted line-through text-xl font-bold italic mb-1">
                       {formatPrice(getPrice(selectedSize, selectedType))}
                    </div>
                    <div className="text-6xl font-black text-tcg-gold tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                       {formatPrice(getPrice(selectedSize, selectedType) * 0.35)}
                    </div>
                 </div>

                 <Link
                   href={`/order?market=${market}&size=${selectedSize}&type=${selectedType}`}
                   className="btn-gold w-full py-6 rounded-2xl text-xl font-black text-center flex items-center justify-center gap-3"
                   style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
                 >
                   GET FUNDED NOW <ArrowRight size={24} />
                 </Link>
                 <p className="text-center text-[10px] text-tcg-muted font-bold uppercase tracking-[2px] mt-6">
                    ⚡ Secure checkout via Stripe · All cards accepted
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}
