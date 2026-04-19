'use client'
import { Disc as Discord, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SOCIALS = [
  { icon: <span></span>, label: 'span / X', value: '18.4K Traders', href: 'https://twitter.com' },
  { icon: <span></span>, label: 'span', value: '12.1K Members', href: 'https://instagram.com' },
  { icon: <Discord size={20} />, label: 'Discord', value: '12,400 Elite', href: 'https://discord.com' },
  { icon: <span></span>, label: 'YouTube', value: '5.2K Analysts', href: 'https://youtube.com' },
]

export default function Community() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="community" className="section bg-racing-primary" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={cn("animate-fade-in")}>
            <span className="section-label">Operator Network</span>
            <h2 className="section-headline text-white mb-8">
               JOIN THE <br /><span className="text-racing-green">ELITE FLEET.</span>
            </h2>
            <p className="text-racing-text-dim text-lg leading-relaxed mb-10 max-w-lg">
               Trade alongside verified winners. Our community is where high-performance alpha is shared, 
               and every payout is celebrated. No noise, just data.
            </p>

            <div className="grid grid-cols-2 gap-4">
               {SOCIALS.map((social, i) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="card-racing !p-6 flex flex-col items-start gap-4 group"
                  >
                     <div className="w-full flex items-center justify-between">
                        <div className="w-10 h-10 rounded bg-racing-green/10 flex items-center justify-center text-racing-green transition-transform group-hover:scale-110">
                           {social.icon}
                        </div>
                        <ArrowUpRight size={16} className="text-racing-muted group-hover:text-racing-green transition-colors" />
                     </div>
                     <div>
                        <div className="text-[11px] text-racing-muted font-bold uppercase tracking-widest mb-1">{social.label}</div>
                        <div className="text-sm text-white font-bold">{social.value}</div>
                     </div>
                  </Link>
               ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="animate-fade-up [animation-delay:400ms]">
             <div className="card-racing !bg-racing-surface !p-1 shadow-border-glow">
                <div className="bg-racing-primary rounded-[11px] p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden border border-racing-border">
                   {/* Background Decor */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-racing-green/5 blur-[80px] rounded-full pointer-events-none" />
                   
                   <div className="flex items-center gap-3 mb-8">
                      <div className="bg-racing-green/10 px-3 py-1 rounded border border-racing-green/20 text-[10px] font-bold text-racing-green uppercase tracking-widest">Deploy Alpha</div>
                   </div>
                   
                   <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">
                      Ready to deploy your strategy?
                   </h3>
                   <p className="text-racing-text-dim text-[15px] mb-10 leading-relaxed">
                      Launch your funded account today and transition to the high-performance revenue model. 
                      Elite assets. Zero commissions. Weekly settlement.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/pricing"
                        className="btn-primary px-10 py-5 text-center flex items-center justify-center gap-2 group"
                      >
                         START DEPLOYMENT
                         <Zap size={18} className="transition-transform group-hover:scale-125" />
                      </Link>
                      <Link
                        href="/affiliate"
                        className="btn-secondary px-10 py-5 text-center flex items-center justify-center gap-2"
                      >
                         Affiliate Program
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
