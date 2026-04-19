'use client'
import Link from 'next/link'
import { Disc as Discord } from 'lucide-react'

const FOOTER_LINKS = {
  explorer: [
    { label: 'Home', href: '/' },
    { label: 'The Problem', href: '/#black-box-problem' },
    { label: 'The Solution', href: '/#glass-box-difference' },
    { label: 'Revenue Engine', href: '/#payout-pool' },
    { label: 'Comparison', href: '/#comparison' },
    { label: 'Community', href: '/#community' },
    { label: 'Transparency', href: '/transparency' },
  ],
  trading: [
    { label: 'Payout Pool', href: '/payout-pool' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Add-Ons', href: '/#add-ons' },
    { label: 'Drawdown Types', href: '/#drawdown-types' },
    { label: 'Score System', href: '/#payout-pool' },
    { label: 'Payout Readiness', href: '/#payout-pool' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Risk Disclosure', href: '/legal/risk-disclosure' },
    { label: 'Refund Policy', href: '/legal/refund-policy' },
    { label: 'Cookie Policy', href: '/legal/cookie-policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-tcg-black border-t border-tcg-border pt-24 pb-12 overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-tcg-gold rounded-lg flex items-center justify-center font-black text-tcg-black text-xl tracking-tighter transition-transform group-hover:scale-110">
                TCG
              </div>
              <div className="text-xl font-black tracking-[4px]">FUNDED</div>
            </Link>
            <p className="text-sm text-tcg-text leading-relaxed font-medium">
              The transparent prop trading firm. Built for consistency, verified winners, and revenue-funded payout pools.
            </p>
            <div className="flex items-center gap-5">
                 <Link href="https://twitter.com" target="_blank" className="text-tcg-muted hover:text-tcg-gold transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                 </Link>
                 <Link href="https://instagram.com" target="_blank" className="text-tcg-muted hover:text-tcg-gold transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                 </Link>
               <Link href="https://discord.com" target="_blank" className="text-tcg-muted hover:text-tcg-gold transition-colors">
                  <Discord size={20} />
               </Link>
                 <Link href="https://youtube.com" target="_blank" className="text-tcg-muted hover:text-tcg-gold transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                 </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[3px] mb-8">Explorer</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.explorer.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-tcg-text hover:text-tcg-gold transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[3px] mb-8">Trading</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.trading.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-tcg-text hover:text-tcg-gold transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-[3px] mb-8">Legal</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-tcg-text hover:text-tcg-gold transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-white/5 pt-12 pb-8">
          <p className="text-[10px] text-tcg-muted leading-relaxed text-center font-medium max-w-4xl mx-auto uppercase tracking-widest">
            TCG FUNDED LLC provides simulated trading evaluation programs. All trading activity 
            occurs in a simulated environment — no real capital is placed at risk in any market. 
            TCG FUNDED is NOT a broker, dealer, exchange, clearinghouse, investment advisor, 
            commodity trading advisor, or any other type of regulated financial intermediary.
            <br /><br />
            Purchasing an account constitutes a purchase of a digital service — not a deposit, 
            investment, or capital contribution. All sales are final. Payout pool distributions 
            are performance-based rewards from company revenue. They are not trading profits, 
            investment returns, or guaranteed income.
            <br /><br />
            Hypothetical/simulated performance results do not represent actual trading and do 
            not guarantee future results. Individual results vary. Past performance does not 
            guarantee future performance.
            <br /><br />
            TCG FUNDED LLC | support@tcgfunded.com | © {new Date().getFullYear()} TCG FUNDED. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
