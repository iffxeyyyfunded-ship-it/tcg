'use client'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { Check, Info, TrendingUp, Activity, PieChart } from 'lucide-react'

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
    <section id="payout-pool" className="section bg-racing-primary relative overflow-hidden" ref={ref}>
      <div className="container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <span className="section-label">Yield Distribution Protocol</span>
          <h2 className="section-headline text-white mb-6">
             TRADE. COMPETE. <span className="text-racing-green">GET PAID.</span>
          </h2>
          <p className="text-racing-text-dim text-lg max-w-2xl mx-auto mb-12">
            TCG Funded transitions from standard liability models to a pooled revenue model. 
            You compete for market share, not against the firm.
          </p>
        </div>

        {/* Donut Chart & Allocation */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative flex items-center justify-center animate-fade-in [animation-delay:200ms]">
             <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_30px_rgba(0,200,150,0.1)]">
                {/* Payout Pool - 40% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#00C896" strokeWidth="24"
                  strokeDasharray={`${0.40 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
                  strokeDashoffset="0" transform="rotate(-90 100 100)" />
                {/* Ops - 45% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#222" strokeWidth="24"
                  strokeDasharray={`${0.45 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${0.40 * 2 * Math.PI * 80}`} transform="rotate(-90 100 100)" />
                {/* Profit - 15% */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#333" strokeWidth="24"
                  strokeDasharray={`${0.15 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
                  strokeDashoffset={`-${0.85 * 2 * Math.PI * 80}`} transform="rotate(-90 100 100)" />
                
                <text x="100" y="95" textAnchor="middle" fill="#00C896" fontSize="28" fontWeight="700" className="font-mono">40%</text>
                <text x="100" y="115" textAnchor="middle" fill="#666" fontSize="8" fontWeight="bold">TO TRADERS</text>
             </svg>

             {/* Legend */}
             <div className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 space-y-4">
                {[
                  { color: '#00C896', label: 'Trader Payout Pool', pct: '40%' },
                  { color: '#222', label: 'Operating Costs', pct: '45%' },
                  { color: '#333', label: 'Company Profit', pct: '15%' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="text-sm text-white font-bold">{item.pct}</div>
                      <div className="text-[10px] text-racing-muted uppercase tracking-widest">{item.label}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="animate-fade-up [animation-delay:400ms]">
             <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">
                Revenue-Funded Pool Depth.
             </h3>
             <p className="text-racing-text-dim text-lg leading-relaxed mb-8">
                Your payouts are funded by company revenue, not trading losses. 40% of all gross company revenue is allocated 
                weekly to the payout pool—fully verifiable on the public ledger.
             </p>

             {/* Formula box */}
             <div className="card-racing !bg-racing-surface !p-8 mb-10 overflow-hidden relative shadow-border-glow">
                <div className="text-racing-muted text-[11px] uppercase tracking-widest mb-6 font-bold">Payout Calculation Protocol</div>
                <div className="text-xl md:text-2xl font-bold text-white mb-6 uppercase flex flex-col md:flex-row md:items-center gap-2">
                  SETTLEMENT = <span className="text-racing-green font-mono"> (YourScore / TotalScore) × Pool</span>
                </div>
                <div className="text-racing-muted text-sm border-t border-racing-border pt-6 leading-relaxed">
                  Example: You maintain a score of <span className="text-white font-bold">5.0</span> in a <span className="text-white font-bold">100</span> point network 
                  with a <span className="text-white font-bold">$100,000</span> weekly pool allocation.
                  <br />
                  <span className="inline-block mt-3 text-racing-green font-bold uppercase tracking-widest bg-racing-green/10 px-3 py-1 rounded">
                    Your Settlement: $5,000.00
                  </span>
                </div>
             </div>

             <div className="flex flex-wrap gap-4">
                <Link href="/pricing" className="btn-primary flex items-center gap-2">
                   Get Funded <TrendingUp size={16} />
                </Link>
                <Link href="/transparency" className="btn-secondary flex items-center gap-2">
                   Live Pool Data <Activity size={16} />
                </Link>
             </div>
          </div>
        </div>

        {/* Payout Cycle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           {POOL_STEPS.map((s, i) => (
             <div
               key={i}
               className="card-racing !p-6 flex gap-5 group"
             >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-racing-green/10 border border-racing-green/20 flex items-center justify-center text-racing-green font-mono font-bold text-sm group-hover:bg-racing-green group-hover:text-black transition-all">
                   {s.step}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-2 uppercase tracking-widest">{s.title}</h4>
                  <p className="text-[12px] text-racing-muted leading-relaxed">{s.desc}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Zero Payout Denials Banner */}
        <div className="mt-20 text-center animate-fade-in [animation-delay:800ms]">
           <div className="inline-flex items-center gap-4 bg-racing-green/5 border border-racing-green/20 rounded-full px-10 py-5">
              <div className="w-2.5 h-2.5 rounded-full bg-racing-green animate-pulse shadow-[0_0_12px_#00C896]" />
              <span className="text-racing-green font-bold tracking-[0.4em] text-xs uppercase">
                ZERO PAYOUT DENIALS · NETWORK RECORD: 100% SUCCESS
              </span>
           </div>
        </div>
      </div>
    </section>
  )
}
