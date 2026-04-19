'use client'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { CreditCard, ShieldCheck, BarChart4, Coins } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'Purchase',
    desc: 'Pick your market, account size, and drawdown. Instant access — no evaluation wait.',
    icon: <CreditCard className="text-tcg-gold" size={32} />,
  },
  {
    num: '02',
    title: 'Verify',
    desc: 'Complete identity verification and sign your agreement to unlock eligibility.',
    icon: <ShieldCheck className="text-tcg-gold" size={32} />,
  },
  {
    num: '03',
    title: 'Trade',
    desc: 'Use our high-performance dashboard. Your rules, your strategy. All styles allowed.',
    icon: <BarChart4 className="text-tcg-gold" size={32} />,
  },
  {
    num: '04',
    title: 'Get Paid',
    desc: 'Weekly payouts every Friday. No denials. No caps. Bank transfers to 190+ countries.',
    icon: <Coins className="text-tcg-gold" size={32} />,
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="how-it-works" className="section bg-tcg-black" ref={ref}>
      <div className="container">
        <div className={cn("text-center mb-24 transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
            Your Path
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-none tracking-tight">
            HOW IT <span className="gold-text">WORKS</span>
          </h2>
          <p className="text-tcg-text text-lg max-w-xl mx-auto font-medium">
            A simple, transparent journey from setup to weekly payday.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={cn(
                "relative p-8 bg-tcg-card border border-tcg-border rounded-[32px] hover:border-tcg-gold/40 transition-all duration-500 group",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${100 + i * 150}ms` }}
            >
              {/* Connector line for desktop */}
              {i < 3 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-tcg-border to-transparent z-10" />
              )}

              <div className="w-16 h-16 rounded-2xl bg-tcg-gold/10 flex items-center justify-center mb-8 border border-tcg-gold/20 group-hover:animate-float">
                {step.icon}
              </div>
              
              <div
                className="text-7xl font-black text-tcg-white/5 absolute top-6 right-8 leading-none select-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.num}
              </div>

              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{step.title}</h3>
              <p className="text-sm text-tcg-text leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className={cn("text-center mt-20 transition-all duration-1000 delay-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <Link 
            href="/pricing"
            className="btn-gold inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-black"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
          >
            START TRADING TODAY
          </Link>
        </div>
      </div>
    </section>
  )
}
