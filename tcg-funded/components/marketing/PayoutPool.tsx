'use client'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { CheckCircle2, Info } from 'lucide-react'

const POOL_STEPS = [
  { step: 1, title: 'Your Profit', desc: 'Profit above your safety buffer starts your score.' },
  { step: 2, title: 'Behavior Score', desc: 'Consistency and discipline move your score up.' },
  { step: 3, title: 'Share Score', desc: 'Profit + behavior combine into your final score.' },
  { step: 4, title: 'Pool Share', desc: 'Higher local score = bigger slice of the total pool.' },
  { step: 5, title: 'Your Payout', desc: 'Your slice of the pool is your actual payday check.' },
  { step: 6, title: 'Friday Payday', desc: 'Activated every Friday. Paid fast & direct.' },
]

export default function PayoutPool() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="payout-pool" className="section bg-[#080808] relative overflow-hidden" ref={ref}>
      <div className="container relative z-10">
        <div className={cn("text-center mb-20 transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
            The Payout Pool
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
             TRADE. COMPETE. <span className="gold-text">GET PAID.</span>
          </h2>
          <p className="text-tcg-text text-lg max-w-2xl mx-auto font-medium mb-12">
            Better score, bigger share, bigger payout. You compete for pool share against other traders — not against TCG.
          </p>
        </div>

        {/* Donut Chart & Allocation */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className={cn("relative flex items-center justify-center transition-all duration-1000 delay-300", inView ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
             <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_30px_rgba(245,200,66,0.1)]">
                {/* Payout Pool - 40% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#F5C842" strokeWidth="24"
                  strokeDasharray={`${0.40 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
                  strokeDashoffset="0" transform="rotate(-90 100 100)" />
                {/* Ops - 45% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#2A2A2A" strokeWidth="24"
                  strokeDasharray={`${0.45 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${0.40 * 2 * Math.PI * 80}`} transform="rotate(-90 100 100)" />
                {/* Profit - 15% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#444" strokeWidth="24"
                  strokeDasharray={`${0.15 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${0.85 * 2 * Math.PI * 80}`} transform="rotate(-90 100 100)" />
                
                <text x="100" y="95" textAnchor="middle" fill="#F5C842" fontSize="28" fontWeight="900" style={{ fontFamily: 'var(--font-display)' }}>40%</text>
                <text x="100" y="115" textAnchor="middle" fill="#A0A0A0" fontSize="8" fontWeight="bold">TO TRADERS</text>
             </svg>

             {/* Legend */}
             <div className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 space-y-4">
                {[
                  { color: '#F5C842', label: 'Trader Payout Pool', pct: '40%' },
                  { color: '#2A2A2A', label: 'Operating Costs', pct: '45%' },
                  { color: '#444', label: 'Company Profit', pct: '15%' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <div>
                      <div className="text-sm text-white font-black">{item.pct}</div>
                      <div className="text-[10px] text-tcg-text uppercase tracking-widest">{item.label}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className={cn("transition-all duration-1000 delay-500", inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10")}>
             <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Revenue-Funded Pool.
             </h3>
             <p className="text-tcg-text text-lg leading-relaxed mb-8">
                Prizes aren&apos;t funded from trader losses. 40% of all company revenue goes into the weekly payout pool — fully visible, fully verifiable.
             </p>

             {/* Formula box */}
             <div className="bg-tcg-card border border-tcg-border rounded-3xl p-8 mb-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tcg-gold/5 blur-3xl rounded-full" />
                <div className="text-tcg-text text-xs uppercase tracking-widest mb-4 font-black">Share Formula</div>
                <div className="text-xl md:text-2xl font-black text-white mb-4 uppercase" style={{ fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
                  PAYOUT = <span className="text-tcg-gold">(Your Score / All Scores)</span> × Pool
                </div>
                <div className="text-tcg-text text-sm border-t border-white/5 pt-6 mt-6 leading-relaxed">
                  Example: Your score is <span className="text-white font-bold">5</span> · Total scores: <span className="text-white font-bold">100</span> · Pool: <span className="text-white font-bold">$50,000</span>
                  <br />
                  <span className="inline-block mt-2">
                    Your share: 5% · <strong className="text-tcg-gold">Your payout: $2,500</strong>
                  </span>
                </div>
             </div>

             <div className="flex flex-wrap gap-4">
                <Link href="/payout-pool" className="btn-gold px-8 py-4 rounded-xl text-sm font-black">
                   Explore Score Factors
                </Link>
                <Link href="/transparency" className="btn-ghost px-8 py-4 rounded-xl text-sm font-bold">
                   Live Revenue Data
                </Link>
             </div>
          </div>
        </div>

        {/* 6 Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           {POOL_STEPS.map((s, i) => (
             <div
               key={i}
               className={cn(
                 "flex gap-5 p-6 bg-tcg-card border border-tcg-border rounded-3xl hover:border-tcg-gold/30 transition-all group",
                 inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
               )}
               style={{ transitionDelay: `${700 + i * 100}ms` }}
             >
                <div className="shrink-0 w-10 h-10 rounded-full bg-tcg-gold/10 border border-tcg-gold/20 flex items-center justify-center text-tcg-gold font-black text-sm">
                   {s.step}
                </div>
                <div>
                  <h4 className="text-base font-black text-white mb-2 uppercase tracking-tight">{s.title}</h4>
                  <p className="text-sm text-tcg-text leading-relaxed">{s.desc}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Zero payout denials banner */}
        <div className={cn("mt-16 text-center transition-all duration-1000 delay-[1.5s]", inView ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
           <div className="inline-flex items-center gap-4 bg-tcg-green/10 border border-tcg-green/30 rounded-full px-10 py-5">
              <div className="w-3 h-3 rounded-full bg-tcg-green animate-pulse shadow-[0_0_10px_#00FF85]" />
              <span className="text-tcg-green font-black tracking-[4px] text-sm uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                ZERO PAYOUT DENIALS. EVER.
              </span>
           </div>
        </div>
      </div>
    </section>
  )
}
