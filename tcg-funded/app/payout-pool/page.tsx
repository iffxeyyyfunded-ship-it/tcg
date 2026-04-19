'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import { Info, BarChart3, TrendingUp, ShieldCheck, Zap, Repeat, Trophy, PieChart } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

const CORE_FACTORS = [
  { icon: <TrendingUp size={24} />, title: 'Profit Above Buffer', weight: 'High', desc: 'The base of your score. Every % generated above the safety threshold adds immediate value.' },
  { icon: <Repeat size={24} />, title: 'Consistency Score', weight: 'High', desc: 'Rewards steady equity growth over a week. Avoids the "one-hit wonder" gamble.' },
  { icon: <ShieldCheck size={24} />, title: 'Drawdown Management', weight: 'Medium', desc: 'Maintaining a clean equity curve with minimal peaks and valleys improves your multiplier.' },
  { icon: <Zap size={24} />, title: 'Sizing Discipline', weight: 'Medium', desc: 'Standardizes risk per trade. Consistent position sizing shows professional institutional behavior.' },
  { icon: <BarChart3 size={24} />, title: 'Trading Frequency', weight: 'Low', desc: 'Consistent activity throughout the week. Shows you are present and active in the markets.' },
  { icon: <PieChart size={24} />, title: 'Cycle Completion', weight: 'Bonus', desc: 'Loyalty rewards. Every successful payout cycle increases your permanent base score multiplier.' },
]

export default function PayoutPoolPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24" ref={ref}>
        <div className="container">
          {/* Hero */}
          <div className="text-center mb-24 transition-all duration-1000">
             <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6 animate-fade-up">
                Economic Model
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9] animate-fade-up" style={{ fontFamily: 'var(--font-display)' }}>
                THE <span className="gold-text">PAYOUT POOL</span><br />ENGINE
             </h1>
             <p className="text-tcg-text text-xl max-w-2xl mx-auto font-medium leading-relaxed animate-fade-up">
                TCG Funded doesn&apos;t use "profit splits." We use a performance-weighted pool share system. Trade better, score higher, earn more.
             </p>
          </div>

          {/* Logic Cards Column */}
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
             {CORE_FACTORS.map((f, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-10 bg-tcg-card border border-tcg-border rounded-[40px] hover:border-tcg-gold/40 transition-all group",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                   <div className="w-16 h-16 rounded-2xl bg-tcg-black border border-white/5 flex items-center justify-center mb-10 text-tcg-gold group-hover:scale-110 group-hover:animate-glow transition-all">
                      {f.icon}
                   </div>
                   <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/5 text-tcg-muted border border-white/5 tracking-widest">{f.weight}</span>
                   </div>
                   <p className="text-sm text-tcg-text leading-relaxed font-medium">{f.desc}</p>
                </div>
             ))}
          </div>

          {/* Visualizing the Flow */}
          <div className="bg-tcg-card border border-tcg-border rounded-[48px] p-8 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tcg-gold/5 blur-[120px] rounded-full pointer-events-none" />
             
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                      FROM PROFIT <br />TO <span className="gold-text">PAYDAY.</span>
                   </h2>
                   
                   <div className="space-y-8">
                      {[
                        { step: '1', title: 'Activation Window', desc: 'Every Friday to Monday, accounts that reached the profit goal are entered into the cycle pool.' },
                        { step: '2', title: 'Cycle Scoring', desc: 'Our engine audits your behavior metrics (consistency, risk, discipline) to calculate your Share Score.' },
                        { step: '3', title: 'Pool Calculation', desc: 'We sum all trader scores and allocate 40% of company revenue to the weekly pool amount.' },
                        { step: '4', title: 'Friday Distribution', desc: 'Settlements are released. Your share is deposited via bank transfer or crypto.' },
                      ].map(s => (
                        <div key={s.step} className="flex gap-6">
                           <div className="text-2xl font-black text-white/10" style={{ fontFamily: 'var(--font-display)' }}>{s.step}</div>
                           <div>
                              <h4 className="text-lg font-black text-white uppercase mb-2 leading-none">{s.title}</h4>
                              <p className="text-sm text-tcg-text font-medium leading-relaxed">{s.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-tcg-black/50 border border-white/5 p-10 rounded-[40px] shadow-inner">
                   <div className="text-9xl font-black text-tcg-gold/10 mb-8 italic text-center select-none" style={{ fontFamily: 'var(--font-display)' }}>
                      TCG
                   </div>
                   <div className="space-y-6">
                      <div className="p-6 bg-tcg-card border border-tcg-border rounded-2xl flex items-center justify-between">
                         <span className="text-tcg-muted font-bold text-xs uppercase tracking-widest">Active Pool Status</span>
                         <span className="text-tcg-green font-black text-sm uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-tcg-green animate-pulse" /> OPEN
                         </span>
                      </div>
                      <div className="p-6 bg-tcg-card border border-tcg-border rounded-2xl flex items-center justify-between">
                         <span className="text-tcg-muted font-bold text-xs uppercase tracking-widest">Current Pool Amount</span>
                         <span className="text-white font-black text-2xl" style={{ fontFamily: 'var(--font-display)' }}>$84,200</span>
                      </div>
                      <div className="p-6 bg-tcg-card border border-tcg-border rounded-2xl flex items-center justify-between">
                         <span className="text-tcg-muted font-bold text-xs uppercase tracking-widest">Traders in Cycle</span>
                         <span className="text-white font-black text-2xl" style={{ fontFamily: 'var(--font-display)' }}>142</span>
                      </div>
                      <div className="mt-8 text-center">
                         <p className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-4">Payout window ends Friday 5PM EST</p>
                         <div className="flex justify-center gap-2">
                            {[19, ':', 42, ':', '05'].map((t, i) => (
                               <div key={i} className="w-12 h-12 bg-tcg-card rounded-xl flex items-center justify-center text-xl font-black text-tcg-gold border border-tcg-gold/20">
                                  {t}
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
