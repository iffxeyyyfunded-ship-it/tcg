'use client'
import { COMPARISON_TABLE } from '@/lib/pricing'
import { Check, X } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export default function ComparisonTable() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="comparison" className="section bg-tcg-black overflow-hidden" ref={ref}>
      <div className="container">
        <div className={cn("text-center mb-20 transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
             Standard Comparison
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
             TCG VS <span className="text-tcg-muted italic">EVERYONE ELSE</span>
          </h2>
          <p className="text-tcg-text text-lg max-w-xl mx-auto font-medium">
             Why settle for a black box when you can trade in the glass box?
          </p>
        </div>

        <div className={cn("relative overflow-hidden transition-all duration-1000 delay-300", inView ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
           <div className="overflow-x-auto pb-8">
              <table className="w-full text-left border-separate border-spacing-y-3">
                 <thead>
                    <tr className="text-tcg-muted text-[10px] font-black uppercase tracking-[3px]">
                       <th className="px-8 py-4">Feature</th>
                       <th className="px-8 py-4 bg-tcg-gold/10 text-tcg-gold rounded-t-2xl border-x border-t border-tcg-gold/30">TCG Funded</th>
                       <th className="px-8 py-4">Typical Prop Firm</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {COMPARISON_TABLE.map((row: any, i: any) => (
                       <tr key={row.feature} className="group">
                          <td className="px-8 py-6 text-white font-bold border-b border-white/5 bg-[#080808]/50 rounded-l-2xl">
                             {row.feature}
                          </td>
                          <td className="px-8 py-6 bg-tcg-gold/[0.03] border-x border-tcg-gold/10 font-black text-white group-last:rounded-b-2xl">
                             <div className="flex items-center gap-3">
                                {row.tcg.includes('✅') || !row.tcg.includes('❌') ? (
                                   <div className="w-5 h-5 rounded-full bg-tcg-green/20 flex items-center justify-center">
                                      <Check size={12} className="text-tcg-green" />
                                   </div>
                                ) : (
                                   <div className="w-5 h-5 rounded-full bg-tcg-red/20 flex items-center justify-center">
                                      <X size={12} className="text-tcg-red" />
                                   </div>
                                )}
                                {row.tcg.replace('✅ ', '').replace('❌ ', '')}
                             </div>
                          </td>
                          <td className="px-8 py-6 text-tcg-text font-medium bg-tcg-card/30 rounded-r-2xl border-b border-white/5">
                             {row.blackbox}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Catchy footer on comparison */}
        <div className="mt-12 p-8 bg-tcg-card/50 border border-tcg-border rounded-[32px] md:flex items-center justify-between gap-8">
           <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Structurally built for you to win.</h4>
              <p className="text-sm text-tcg-text font-medium">Unlike others, our success is directly coupled with yours.</p>
           </div>
           <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-tcg-gold/20 rounded-xl text-xs font-black text-tcg-gold uppercase tracking-widest">
                 $0 Commissions
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-tcg-gold/20 rounded-xl text-xs font-black text-white uppercase tracking-widest">
                 Weekly Payouts
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}
