'use client'
import { COMPARISON_TABLE } from '@/lib/pricing'
import { Check, X, ShieldCheck } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export default function ComparisonTable() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="comparison" className="section bg-racing-primary overflow-hidden" ref={ref}>
      <div className="container">
        <div className="text-center mb-20 animate-fade-in">
          <span className="section-label">Institutional Benchmarking</span>
          <h2 className="section-headline text-white mb-6 uppercase tracking-tight">
             TCG VS <span className="text-racing-muted font-normal italic">THE INDUSTRY</span>
          </h2>
          <p className="text-racing-text-dim text-lg max-w-xl mx-auto">
             Why deploy capital in a black box when you can trade in the high-performance glass box?
          </p>
        </div>

        <div className="card-racing !bg-racing-surface !p-0 overflow-hidden shadow-border-glow animate-fade-up">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-racing-primary border-b border-racing-border">
                       <th className="px-8 py-5 text-[10px] font-bold text-racing-muted uppercase tracking-[0.3em]">Operational Feature</th>
                       <th className="px-8 py-5 text-[11px] font-bold text-racing-green uppercase tracking-[0.3em] bg-racing-green/5 border-x border-racing-green/10">TCG Protocol</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-racing-muted uppercase tracking-[0.3em]">Legacy Prop Firm</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-racing-border">
                    {COMPARISON_TABLE.map((row: any, i: any) => (
                       <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6 text-white font-bold text-[13px] tracking-tight">
                             {row.feature}
                          </td>
                          <td className="px-8 py-6 bg-racing-green/5 border-x border-racing-green/10 font-bold text-[13px] text-white">
                             <div className="flex items-center gap-3">
                                {row.tcg.includes('✅') || !row.tcg.includes('❌') ? (
                                   <div className="w-5 h-5 rounded-full bg-racing-green/20 flex items-center justify-center">
                                      <Check size={12} className="text-racing-green" />
                                   </div>
                                ) : (
                                   <div className="w-5 h-5 rounded-full bg-danger/20 flex items-center justify-center">
                                      <X size={12} className="text-danger" />
                                   </div>
                                )}
                                {row.tcg.replace('✅ ', '').replace('❌ ', '')}
                             </div>
                          </td>
                          <td className="px-8 py-6 text-racing-text-dim font-medium text-[13px]">
                             {row.blackbox}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Comparison Summary Footer */}
        <div className="mt-12 card-racing !p-6 md:flex items-center justify-between gap-8 border-racing-green/20 bg-racing-surface/50">
           <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-racing-green/10 flex items-center justify-center text-racing-green">
                 <ShieldCheck size={20} />
              </div>
              <div>
                 <h4 className="text-sm font-bold text-white uppercase tracking-tight">Structurally Aligned For Returns</h4>
                 <p className="text-[12px] text-racing-muted">Unlike legacy competitors, our yield is directly coupled with your performance.</p>
              </div>
           </div>
           <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-racing-primary border border-racing-border rounded text-[10px] font-bold text-racing-green uppercase tracking-widest">$0 Commissions</span>
              <span className="px-4 py-2 bg-racing-primary border border-racing-border rounded text-[10px] font-bold text-white uppercase tracking-widest">Weekly Settlement</span>
           </div>
        </div>
      </div>
    </section>
  )
}
