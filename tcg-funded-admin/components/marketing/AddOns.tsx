'use client'
import { ADDONS } from '@/lib/pricing'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export default function AddOns() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="add-ons" className="section bg-racing-primary" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <span className="section-label">Performance Enhancements</span>
          <h2 className="section-headline text-white mb-6">
            CORE <span className="text-racing-green">UPGRADES</span>
          </h2>
          <p className="text-racing-text-dim text-lg max-w-xl mx-auto">
             Available precision modifications to optimize your capital deployment at checkout.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADDONS.map((addon: any, i: any) => (
            <div
              key={addon.id}
              className={cn(
                "card-racing !p-8 group flex flex-col items-start relative [animation-delay:_var(--delay)]",
                addon.popular && "border-racing-green/40 shadow-border-glow",
                inView ? "animate-fade-up" : "opacity-0"
              )}
              style={{ "--delay": `${100 + i * 100}ms` } as React.CSSProperties}
            >
              {addon.popular && (
                <div className="absolute -top-3 left-8 bg-racing-green text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                   TOP MOD
                </div>
              )}
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform select-none">{addon.icon}</div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-tight leading-none">{addon.label}</h3>
              <p className="text-[13px] text-racing-muted leading-relaxed mb-10">{addon.description}</p>
              
              <div className="w-full flex items-center justify-between mt-auto pt-6 border-t border-racing-border">
                 <span className="text-2xl font-bold text-racing-green font-mono">+${addon.price}</span>
                 <span className="text-[10px] text-racing-muted font-bold uppercase tracking-widest">Deployment Fee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
