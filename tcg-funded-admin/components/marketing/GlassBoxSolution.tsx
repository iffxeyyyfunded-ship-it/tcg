'use client'
import { Search, ScrollText, Trophy, ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const FEATURES = [
  {
    icon: <Search className="text-tcg-gold" size={32} />,
    title: 'Transparent Payouts',
    desc: 'Every dollar in the pool is verified. We show the math so you know you will get paid.',
  },
  {
    icon: <ScrollText className="text-tcg-gold" size={32} />,
    title: 'Fixed Rules Forever',
    desc: 'No moving goalposts. No sudden "risk reviews" when you start winning too much.',
  },
  {
    icon: <Trophy className="text-tcg-gold" size={32} />,
    title: 'Profitable? Good.',
    desc: 'We are built to handle winners. Your success strengthens our revenue-funded pool.',
  },
]

export default function GlassBoxSolution() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="glass-box-difference" className="section relative bg-tcg-black overflow-hidden" ref={ref}>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-section-glow pointer-events-none" />

      <div className="container relative z-10">
        <div className={cn("text-center mb-24 transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
            The Glass Box difference
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
            BUILT FOR <span className="gold-text">CONSISTENCY.</span>
          </h2>
          <p className="text-tcg-text text-lg max-w-2xl mx-auto font-medium mb-12">
            Our answer to the black box. Revenue, costs, and payouts — all visible, all verifiable.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16 px-4 md:px-0">
            {FEATURES.map((item, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-8 bg-tcg-card rounded-[32px] border border-tcg-border hover:border-tcg-gold/40 transition-all duration-500 group",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-tcg-gold/10 flex items-center justify-center mb-8 border border-tcg-gold/20 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-sm text-tcg-text leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={cn("flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-700", inView ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
             <Link 
               href="/pricing"
               className="btn-gold flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-black"
               style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
             >
               GET FUNDED INSTANTLY
             </Link>
             <Link 
               href="/transparency"
               className="btn-ghost flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-bold"
             >
               See Our Revenue, Live <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
