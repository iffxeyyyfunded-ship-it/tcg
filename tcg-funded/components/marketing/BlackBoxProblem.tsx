'use client'
import { X, CheckCircle2 } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

const PROBLEMS = [
  { title: 'Payout Denials', desc: 'Hit targets, then get stalled by reviews.' },
  { title: 'Hidden Economics', desc: 'Your success becomes their cost.' },
  { title: 'Rule Changes', desc: 'Goalposts shift mid-account.' },
  { title: 'Profit Clawbacks', desc: 'Profits recast as hypothetical.' },
  { title: 'Risk Reviews', desc: 'Profitable accounts facing interrogations.' },
  { title: 'Trader Bans', desc: 'Consistent winners get flagged as a problem.' },
  { title: 'No Transparency', desc: 'You cannot see what funds payouts.' },
  { title: 'Commission Drain', desc: '$3–$7 per lot, every trade.' },
]

const SOLUTIONS = [
  { title: 'Revenue-Funded Pool', desc: '40% of revenue funds payouts weekly.' },
  { title: 'Zero Payout Denials', desc: 'Meet the rules, get paid. Period.' },
  { title: 'Full Transparency', desc: 'Revenue, costs, pool. All live.' },
  { title: 'No Rule Changes', desc: 'Rules are fixed forever.' },
  { title: 'Winners Welcome', desc: 'Profitable traders strengthen us.' },
  { title: 'Friday Payday', desc: 'Paid weekly, cleared by Monday.' },
  { title: 'Zero Commissions', desc: '$0 across all instruments.' },
  { title: 'No Caps', desc: 'Keep 100% of your pool share.' },
]

export default function BlackBoxProblem() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="black-box-problem" className="section relative overflow-hidden bg-tcg-black" ref={ref}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={cn("text-center mb-20 transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="inline-block bg-tcg-red/10 border border-tcg-red/20 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-red uppercase tracking-[3px] mb-6">
            The Industry Problem
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none">
            THE <span className="text-tcg-red">BLACK BOX</span> MODEL
          </h2>
          <p className="text-tcg-text text-lg max-w-2xl mx-auto font-medium">
             Most prop firms hide the math. They need you to lose to survive. 
             If you win too much, you become a liability.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Black Box Problem Card */}
          <div className={cn("transition-all duration-1000 delay-300", inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
            <div className="bg-[#0D0808] border border-tcg-red/20 rounded-[32px] overflow-hidden group hover:border-tcg-red/40 transition-colors">
              <div className="px-8 py-6 border-b border-tcg-red/10 bg-tcg-red/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-tcg-red/20 flex items-center justify-center">
                     <X size={16} className="text-tcg-red" />
                   </div>
                   <span className="font-bold text-white uppercase tracking-wider">The Payout Problem</span>
                </div>
                <span className="text-[10px] font-black text-tcg-red/60 uppercase">Industry Standard</span>
              </div>
              <div className="p-8 space-y-4">
                {PROBLEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-tcg-red/5 border border-white/5 group-hover:bg-tcg-red/[0.07] transition-colors">
                    <X size={18} className="text-tcg-red/40 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-tcg-text leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TCG Solution Card */}
          <div className={cn("transition-all duration-1000 delay-500", inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10")}>
            <div className="bg-[#080D08] border border-tcg-green/20 rounded-[32px] overflow-hidden group hover:border-tcg-green/40 transition-colors">
              <div className="px-8 py-6 border-b border-tcg-green/10 bg-tcg-green/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-tcg-green/20 flex items-center justify-center">
                     <CheckCircle2 size={16} className="text-tcg-green" />
                   </div>
                   <span className="font-bold text-white uppercase tracking-wider text-tcg-green">The TCG Solution</span>
                </div>
                <span className="text-[10px] font-black text-tcg-green/60 uppercase">The Glass Box</span>
              </div>
              <div className="p-8 space-y-4">
                 {SOLUTIONS.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-tcg-green/5 border border-white/5 group-hover:bg-tcg-green/[0.07] transition-colors">
                    <CheckCircle2 size={18} className="text-tcg-green mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-tcg-text leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
