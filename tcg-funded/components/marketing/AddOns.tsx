'use client'
import { ADDONS } from '@/lib/pricing'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export default function AddOns() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="add-ons" className="section bg-[#080808]" ref={ref}>
      <div className="container px-6 max-w-7xl">
        <div className={cn("text-center mb-16 transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="inline-block bg-tcg-card border border-tcg-border rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-6">
             Performance Add-Ons
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-none tracking-tight">
            7 PERFORMANCE <span className="gold-text">MODS</span>
          </h2>
          <p className="text-tcg-text text-lg max-w-xl mx-auto font-medium">
             Bolt on performance upgrades at checkout to customize your account.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADDONS.map((addon: any, i: any) => (
            <div
              key={addon.id}
              className={cn(
                "relative p-8 bg-tcg-card border rounded-[32px] transition-all duration-500 group",
                addon.popular ? "border-tcg-gold/40 bg-tcg-gold/[0.03]" : "border-tcg-border",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              {addon.popular && (
                <div className="absolute -top-3 left-8 bg-tcg-gold text-tcg-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[2px] uppercase">
                   POPULAR
                </div>
              )}
              <div className="text-4xl mb-6 group-hover:animate-float transition-transform">{addon.icon}</div>
              <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{addon.label}</h3>
              <p className="text-xs text-tcg-text leading-relaxed mb-8 font-medium">{addon.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                 <span className="text-2xl font-black text-tcg-gold" style={{ fontFamily: 'var(--font-display)' }}>+${addon.price}</span>
                 <span className="text-[10px] text-tcg-muted font-black uppercase tracking-[2px]">at checkout</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
