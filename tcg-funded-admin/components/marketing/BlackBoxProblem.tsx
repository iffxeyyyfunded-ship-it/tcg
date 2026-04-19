'use client'
import { X, Check, CircleAlert } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const PROBLEMS = [
  { title: 'Payout Denials', desc: 'Hit targets, then get stalled by "reviews".' },
  { title: 'Hidden Economics', desc: 'Your success is their liability.' },
  { title: 'No Transparency', desc: 'You cannot see what funds payouts.' },
  { title: 'Commission Drain', desc: 'Hidden fees eating your profit share.' },
]

const SOLUTIONS = [
  { title: 'Revenue-Funded Pool', desc: '40% of all company revenue funds the pool.' },
  { title: 'Zero Payout Denials', desc: 'Meet the rules, get paid. No questions.' },
  { title: 'Full Transparency', desc: 'Revenue, pool size, and payouts are live.' },
  { title: 'Zero Commissions', desc: '$0 fees across all tradeable assets.' },
]

export default function BlackBoxProblem() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="transparent-model" className="section bg-racing-primary overflow-hidden" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="section-label">Trust & Transparency</span>
          <h2 className="section-headline text-white mb-6">
            THE <span className="text-danger">BLACK BOX</span> PROBLEM
          </h2>
          <p className="text-racing-text-dim max-w-2xl mx-auto">
            Most prop firms treat your success as a cost. We treat it as our core product.
            TCG transitions from the industry standard "Liability Model" to a pooled "Revenue Model".
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="card-racing border-danger/20 hover:border-danger/40 !bg-racing-surface">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-racing-border">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                   <CircleAlert size={20} className="text-danger" />
                 </div>
                 <h3 className="card-title text-white">Liability Model</h3>
              </div>
              <span className="text-[10px] font-bold text-danger uppercase tracking-widest">Industry Standard</span>
            </div>
            
            <div className="space-y-4">
              {PROBLEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-racing-primary border border-racing-border rounded-[8px]">
                  <div className="w-5 h-5 rounded-full bg-danger/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={12} className="text-danger" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-[13px] text-racing-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Card */}
          <div className="card-racing border-racing-green/20 !shadow-border-glow !bg-racing-surface">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-racing-border">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-racing-green/10 flex items-center justify-center">
                   <Check size={20} className="text-racing-green" />
                 </div>
                 <h3 className="card-title text-white">The Glass Box</h3>
              </div>
              <span className="text-[10px] font-bold text-racing-green uppercase tracking-widest">TCG Funded</span>
            </div>

            <div className="space-y-4">
               {SOLUTIONS.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-racing-primary border border-racing-border rounded-[8px] hover:border-racing-green/30 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-racing-green/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-racing-green" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-[13px] text-racing-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
