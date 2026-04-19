'use client'
import Link from 'next/link'
import { ArrowRight, Users, Gift, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

const TICKER_ITEMS = [
  'Zero Commissions',
  'No Payout Denials',
  'Weekly Payouts Every Friday',
  'No Hidden Rules',
  'All Trading Styles Allowed',
  'News Trading Allowed',
  'Weekend Holding Allowed',
  'Automated Systems Allowed',
  'Forex · Crypto · Futures',
  'Up to $200K Accounts',
  'No Payout Caps',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-racing-primary bg-dots pt-20"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-racing-green/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Social Proof Badge */}
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="flex -space-x-3">
             <div className="w-8 h-8 rounded-full border-2 border-racing-primary bg-racing-card flex items-center justify-center text-[8px] font-bold">TCG</div>
             <div className="w-8 h-8 rounded-full border-2 border-racing-primary bg-racing-green flex items-center justify-center text-[8px] font-bold text-black">TCG</div>
             <div className="w-8 h-8 rounded-full border-2 border-racing-primary bg-racing-elevated flex items-center justify-center text-[8px] font-bold">TCG</div>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-racing-text-dim">
            <span className="text-white font-bold">12,400+</span> traders in Discord
            <span className="w-px h-3 bg-racing-border mx-1" />
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-racing-green animate-pulse" />
               <span className="text-racing-green font-bold">142</span> online
            </div>
          </div>
        </div>

        {/* Display Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.05] tracking-[-0.03em] max-w-4xl animate-fade-up">
          TRADE ELITE ASSETS.<br />
          <span className="text-racing-green">GET PAID WEEKLY.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-racing-text-dim max-w-xl mb-12 leading-relaxed animate-fade-up">
          TCG Funded is the transparent prop firm built for professional traders. 
          No denials, no caps, no hidden rules. Just high performance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-up">
          <Link
            href="/pricing"
            className="btn-primary flex items-center justify-center gap-2 min-w-[200px]"
          >
            Get Funded Now
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/#how-it-works"
            className="btn-secondary flex items-center justify-center gap-2 min-w-[200px]"
          >
            How it Works
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Hero Features / Ticker-like section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full border-t border-racing-border pt-10 animate-fade-in">
           <div>
              <span className="section-label">Payouts</span>
              <p className="text-white font-bold text-lg">Every Friday</p>
           </div>
           <div>
              <span className="section-label">Cap</span>
              <p className="text-white font-bold text-lg">No Limits</p>
           </div>
           <div>
              <span className="section-label">Trading</span>
              <p className="text-white font-bold text-lg">All Styles</p>
           </div>
           <div>
              <span className="section-label">Platform</span>
              <p className="text-white font-bold text-lg">$0 Fees</p>
           </div>
        </div>
      </div>

      {/* Dynamic Ticker at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-racing-border bg-racing-surface/50 backdrop-blur-sm py-4 overflow-hidden translate-y-1/2">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-8 group">
              <span className="w-1.5 h-1.5 rounded-full bg-racing-green group-hover:scale-150 transition-transform" />
              <span className="text-[11px] font-bold text-racing-text-dim uppercase tracking-widest">{item}</span>
              <span className="text-racing-muted mx-4">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
