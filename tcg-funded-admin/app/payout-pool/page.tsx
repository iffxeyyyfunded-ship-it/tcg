'use client'
import { useState, useEffect } from 'react'
import { 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import Link from 'next/link'

export default function PayoutPoolDetailed() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-racing-primary overflow-x-hidden font-sans">
      <Navbar />
      
      <main className="pt-32 pb-24 bg-dots">
        <div className="container">
          {/* Header */}
          <div className="mb-20 animate-fade-in">
             <span className="section-label">Yield Protocol Architecture</span>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 uppercase tracking-tight leading-none">
                SCORE <br /><span className="text-racing-green">SYSTEM.</span>
             </h1>
             <p className="text-racing-text-dim text-lg md:text-xl max-w-2xl leading-relaxed">
                Profit alone is not the goal. Disciplined execution is. 
                Our algorithm rewards consistency, risk management, and size scalability.
             </p>
          </div>

          {/* Factor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
             {[
               { title: 'Consistency', desc: 'Maintain stable trade sizing and avoid erratic betting patterns.', icon: <Activity size={24} /> },
               { title: 'Risk Control', desc: 'Maximum drawdown management and stop-loss deployment data.', icon: <ShieldCheck size={24} /> },
               { title: 'Net Efficiency', desc: 'Calculated profit relative to maximum risk taken during the cycle.', icon: <TrendingUp size={24} /> },
               { title: 'Volume Stability', desc: 'Steady throughput of trade execution across the window.', icon: <Zap size={24} /> },
             ].map((f, i) => (
                <div key={i} className="card-racing !p-8 group">
                   <div className="w-12 h-12 rounded-lg bg-racing-green/10 flex items-center justify-center mb-8 text-racing-green group-hover:scale-110 transition-transform">
                      {f.icon}
                   </div>
                   <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
                   <p className="text-[13px] text-racing-muted leading-relaxed">{f.desc}</p>
                </div>
             ))}
          </div>

          {/* Detailed Mechanics Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
             <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-tight leading-none">
                   PROFIT <span className="text-racing-green">IS JUST 1/3</span> <br />OF THE EQUATION.
                </h2>
                <p className="text-racing-text-dim text-lg mb-10 leading-relaxed">
                   In a revenue-funded model, the firm prioritizes assets that show institutional-grade discipline. 
                   Traders with high consistency scores receive larger pool allocations than "gap and go" gamblers.
                </p>
                
                <div className="space-y-4 mb-12">
                   {[
                     'Consistency gateway: 30% individual day profit limit.',
                     'Reward weighting: Scores grow exponentially with multi-week consistency.',
                     'Global ledger: Your score is public and verified on-chain.',
                     'Weekly Reset: Every Friday is a fresh deployment window.',
                   ].map((t, i) => (
                     <div key={i} className="flex items-center gap-4 bg-racing-surface/50 border border-racing-border p-4 rounded-lg">
                        <CheckCircle2 size={18} className="text-racing-green" />
                        <span className="text-sm font-bold text-white">{t}</span>
                     </div>
                   ))}
                </div>

                <Link href="/pricing" className="btn-primary flex items-center justify-center gap-2 group">
                   DEPLOY NOW <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
             </div>

             <div className="relative">
                <div className="card-racing !p-12 !bg-racing-surface shadow-border-glow relative overflow-hidden flex flex-col items-center">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-racing-green to-transparent opacity-50" />
                   
                   <Target className="text-racing-green mb-8 opacity-20" size={120} />
                   
                   <div className="text-6xl md:text-8xl font-bold text-racing-green opacity-10 mb-8 italic text-center select-none font-mono tracking-tighter">
                      TCG SCORE
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight text-center">
                      Maximum Alpha Efficiency
                   </h3>
                   <p className="text-racing-muted text-center text-sm mb-10 leading-relaxed max-w-sm">
                      Our system calculates your settlement based on your performance delta relative to the entire fleet.
                   </p>
                   
                   <div className="w-full flex gap-3">
                      {[1, 2, 3, 4, 5].map(i => (
                         <div key={i} className="flex-1 h-12 bg-racing-primary border border-racing-green/20 rounded-md flex items-center justify-center text-xl font-bold text-racing-green font-mono">
                            {i < 4 ? <CheckCircle2 size={24} /> : '-'}
                         </div>
                      ))}
                   </div>
                   <div className="mt-4 text-[10px] font-bold text-racing-muted uppercase tracking-[0.4em]">Algorithm v4.2 Stable</div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
