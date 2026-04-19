'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react'

const NAV_ITEMS = [
  {
    label: 'Why TCG',
    children: [
      { label: 'The Transparent Model', href: '/#transparent-model' },
      { label: 'Payout Pool', href: '/#payout-pool' },
      { label: 'Score System', href: '/#score-system' },
      { label: 'Comparison', href: '/#comparison' },
    ],
  },
  {
    label: 'Learn',
    children: [
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Drawdown Types', href: '/#drawdown-types' },
      { label: 'Payout Readiness', href: '/#payout-readiness' },
      { label: 'Tutorials', href: '/tutorials' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'Transparency Dashboard', href: '/transparency' },
      { label: 'Community', href: '/#community' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Affiliate', href: '/affiliate' },
]

const MARKETS = ['Forex', 'Crypto', 'Futures']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [marketIdx, setMarketIdx] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setMarketIdx(i => (i + 1) % MARKETS.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-[#1e1e1e]' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Market Pill */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                  <span className="text-black font-black text-sm" style={{ fontFamily: 'var(--font-display)' }}>T</span>
                </div>
                <span
                  className="text-xl font-black tracking-[3px] text-white"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '4px' }}
                >
                  TCG<span className="text-[#F5A623]"> FUNDED</span>
                </span>
              </Link>

              {/* Market ticker pill */}
              <div className="hidden md:flex items-center gap-1 bg-[#111] border border-[#1e1e1e] rounded-full px-3 py-1">
                {MARKETS.map((m, i) => (
                  <span
                    key={m}
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                      i === marketIdx
                        ? 'bg-[#F5A623] text-black'
                        : 'text-[#555]'
                    }`}
                  >
                    {m}
                  </span>
                ))}
                <span className="text-xs text-[#333] ml-1">Futures Coming Soon</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-[#a0a0a0] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#a0a0a0] hover:text-white transition-colors">
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl">
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-[#a0a0a0] hover:text-white hover:bg-[#161616] transition-colors border-b border-[#111] last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/help"
                className="text-sm text-[#a0a0a0] hover:text-white transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 btn-ghost px-4 py-2 rounded-lg text-sm font-semibold"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <Link
                href="/pricing"
                className="btn-gold px-5 py-2 rounded-lg text-sm font-bold relative z-10"
              >
                Get Funded
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0a0a0a] border-t border-[#1e1e1e] px-6 py-4 space-y-1">
            {NAV_ITEMS.map(item => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-3 text-sm text-[#a0a0a0] hover:text-white border-b border-[#111]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="border-b border-[#111]">
                    <span className="block py-3 text-sm font-semibold text-[#555] uppercase tracking-wider text-xs">{item.label}</span>
                    {item.children?.map(c => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block py-2 pl-3 text-sm text-[#a0a0a0] hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/dashboard" className="btn-ghost text-center py-3 rounded-xl text-sm font-semibold">
                Dashboard
              </Link>
              <Link href="/pricing" className="btn-gold text-center py-3 rounded-xl text-sm font-bold relative z-10">
                Get Funded Today
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
