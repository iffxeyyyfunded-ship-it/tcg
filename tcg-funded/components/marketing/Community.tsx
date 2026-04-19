'use client'
import { Disc as Discord, ArrowUpRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SOCIALS = [
  { icon: <span></span>, label: 'span / X', value: '18.4K Followers', color: '#1DA1F2', href: 'https://twitter.com' },
  { icon: <span></span>, label: 'span', value: '12.1K Followers', color: '#E4405F', href: 'https://instagram.com' },
  { icon: <Discord size={24} />, label: 'Discord', value: '12,400 Members', color: '#5865F2', href: 'https://discord.com' },
  { icon: <span></span>, label: 'YouTube', value: '5.2K Subscribers', color: '#FF0000', href: 'https://youtube.com' },
]

export default function Community() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="community" className="section bg-[#080808]" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={cn("transition-all duration-1000", inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
            <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
               Social Proof
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
               JOIN THE <br /><span className="gold-text">COMMUNITY.</span>
            </h2>
            <p className="text-tcg-text text-lg leading-relaxed mb-10 max-w-lg font-medium">
               Trade with verified winners. Our community is where the alpha is shared, payouts are celebrated, and real transparency lives.
            </p>

            <div className="grid grid-cols-2 gap-4">
               {SOCIALS.map((social, i) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="group p-6 bg-tcg-card border border-tcg-border rounded-3xl hover:border-tcg-gold/40 transition-all"
                  >
                     <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-white/5 text-white transition-colors group-hover:text-tcg-gold">
                           {social.icon}
                        </div>
                        <ArrowUpRight size={18} className="text-tcg-muted group-hover:text-tcg-gold transition-colors" />
                     </div>
                     <div className="text-xs text-tcg-muted font-black uppercase tracking-widest mb-1">{social.label}</div>
                     <div className="text-sm text-white font-bold">{social.value}</div>
                  </Link>
               ))}
            </div>
          </div>

          <div className={cn("transition-all duration-1000 delay-500", inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10")}>
             <div className="relative p-1 bg-gradient-to-br from-tcg-gold/30 to-transparent rounded-[40px]">
                <div className="bg-tcg-card rounded-[39px] p-10 md:p-16 h-full flex flex-col justify-center relative overflow-hidden">
                   {/* Decorative background elements */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-gold/5 blur-[80px] rounded-full" />
                   
                   <div className="text-6xl md:text-8xl font-black text-tcg-gold mb-8 italic" style={{ fontFamily: 'var(--font-display)', opacity: 0.1 }}>
                      TCG
                   </div>
                   
                   <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      Ready to start your journey?
                   </h3>
                   <p className="text-tcg-text font-medium mb-10 leading-relaxed">
                      Launch your funded account today and join thousands of traders who have switched to the glass box model.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/pricing"
                        className="btn-gold px-10 py-5 rounded-2xl text-center font-black tracking-widest"
                      >
                         GET STARTED
                      </Link>
                      <Link
                        href="/affiliate"
                        className="btn-ghost px-10 py-5 rounded-2xl text-center font-bold"
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
