'use client'
import Link from 'next/link'
import { Disc as Discord, ChevronRight } from 'lucide-react'

const FOOTER_LINKS = {
  explorer: [
    { label: 'Platform Home', href: '/' },
    { label: 'Transparent Model', href: '/#transparent-model' },
    { label: 'Payout Pool', href: '/#payout-pool' },
    { label: 'Public Transparency', href: '/transparency' },
    { label: 'Tutorials', href: '/tutorials' },
  ],
  trading: [
    { label: 'Account Pricing', href: '/pricing' },
    { label: 'Drawdown Protocols', href: '/#drawdown-types' },
    { label: 'Affiliate Portal', href: '/affiliate' },
    { label: 'Trader Discord', href: 'https://discord.com' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Risk Disclosure', href: '/legal/risk-disclosure' },
    { label: 'Refund Policy', href: '/legal/refund-policy' },
  ],
}

export default function Footer() {
  return (
    <>
      <footer className="bg-racing-primary border-t border-racing-border pt-24 pb-32">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
            {/* Brand Column */}
            <div className="space-y-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-racing-green rounded flex items-center justify-center font-bold text-black text-lg tracking-tighter transition-transform group-hover:scale-105">
                  TCG
                </div>
                <div className="text-lg font-bold tracking-[0.2em] text-white">FUNDED</div>
              </Link>
              <p className="text-[13px] text-racing-text-dim leading-relaxed font-medium">
                The high-performance prop firm built for verified winners. 
                Full transparency. $0 commissions. Weekly pools.
              </p>
              <div className="flex items-center gap-5">
                 <Link href="https://twitter.com" target="_blank" className="text-racing-muted hover:text-racing-green transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                 </Link>
                 <Link href="https://instagram.com" target="_blank" className="text-racing-muted hover:text-racing-green transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                 </Link>
                 <Link href="https://discord.com" target="_blank" className="text-racing-muted hover:text-racing-green transition-colors">
                    <Discord size={18} />
                 </Link>
                 <Link href="https://youtube.com" target="_blank" className="text-racing-muted hover:text-racing-green transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                 </Link>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <span className="section-label">Platform</span>
              <ul className="space-y-3">
                {FOOTER_LINKS.explorer.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-racing-text-dim hover:text-white transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="section-label">Operations</span>
              <ul className="space-y-3">
                {FOOTER_LINKS.trading.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-racing-text-dim hover:text-white transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="section-label">Regulatory</span>
              <ul className="space-y-3">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-racing-text-dim hover:text-white transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Legal Disclosure */}
          <div className="border-t border-racing-border pt-12">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-[10px] text-racing-muted leading-relaxed uppercase tracking-[0.2em] font-medium">
                DISCLAIMER: TCG Funded LLC provides high-performance simulated trading evaluations. All trading activity is executed in a non-financial simulation environment. TCG Funded is not a brokerage, investment advisor, or regulated financial entity.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[9px] text-racing-muted font-bold uppercase tracking-widest border-y border-racing-border/50 py-4">
                 <span>No Market Risk</span>
                 <span>Instant Funded</span>
                 <span>Global Settlements</span>
                 <span>Stripe Verified</span>
                 <span className="text-racing-green">F1 Fintech Tech-Stack</span>
                 <span>© {new Date().getFullYear()} TCG FUNDED</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY PROMO BANNER (Mandatory) */}
      <div className="promo-banner group overflow-hidden">
        <div className="container relative flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="bg-black/20 px-2 py-0.5 rounded text-[10px] font-black group-hover:bg-black/30 transition-colors tracking-tighter">LIMITED LAUNCH OFFER</div>
              <p className="text-[14px]">Get <span className="underline">65% OFF</span> your first account purchase today.</p>
           </div>
           
           <Link href="/pricing" className="flex items-center gap-1 bg-black text-white text-[11px] font-bold px-6 py-2 rounded-full uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Claim Discount <ChevronRight size={14} />
           </Link>

           {/* Animated Background Element */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-white/20 blur-[60px] rounded-full pointer-events-none -translate-x-full group-hover:translate-x-[200%] transition-transform duration-[3s]" />
        </div>
      </div>
    </>
  )
}
