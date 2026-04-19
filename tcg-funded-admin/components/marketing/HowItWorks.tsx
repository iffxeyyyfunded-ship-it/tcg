'use client'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { CreditCard, ShieldCheck, BarChart4, Coins, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'Selection',
    desc: 'Pick your market, account size, and drawdown protocol. Access is instant.',
    icon: <CreditCard className="text-racing-green" size={24} />,
  },
  {
    num: '02',
    title: 'Verification',
    desc: 'Complete identity KYC and sign your agreement to unlock payout readiness.',
    icon: <ShieldCheck className="text-racing-green" size={24} />,
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'Trade on our high-performance platform. All styles and strategies allowed.',
    icon: <BarChart4 className="text-racing-green" size={24} />,
  },
  {
    num: '04',
    title: 'Settlement',
    desc: 'Weekly payouts every Friday. No denials. No caps. Total transparency.',
    icon: <Coins className="text-racing-green" size={24} />,
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="how-it-works" className="section bg-racing-primary" ref={ref}>
      <div className="container">
        <div className="text-center mb-24">
          <span className="section-label">Operational Workflow</span>
          <h2 className="section-headline text-white mb-6">
            HOW IT <span className="text-racing-green">WORKS</span>
          </h2>
          <p className="text-racing-text-dim text-lg max-w-xl mx-auto">
            A streamlined, transparent journey from setup to your first weekly payday.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={cn(
                "card-racing group relative !p-8 [animation-delay:_var(--delay)]",
                inView ? "animate-fade-up" : "opacity-0"
              )}
              style={{ "--delay": `${150 * i}ms` } as React.CSSProperties}
            >
              <div className="w-12 h-12 rounded bg-racing-green/10 flex items-center justify-center mb-8 border border-racing-green/20 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              
              <div
                className="text-7xl font-bold text-white/[0.03] absolute top-6 right-8 leading-none select-none font-mono"
              >
                {step.num}
              </div>

              <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase tracking-wider">{step.title}</h3>
              <p className="text-[13px] text-racing-text-dim leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link 
            href="/pricing"
            className="btn-primary inline-flex items-center gap-3 px-12 group"
          >
            Deploy Capital Now
            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
