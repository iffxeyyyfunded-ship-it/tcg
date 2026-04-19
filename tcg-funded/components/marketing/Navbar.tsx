'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
        isScrolled
          ? 'py-4 bg-tcg-black/80 backdrop-blur-xl border-b border-tcg-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-8 bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-tcg-gold rounded-lg flex items-center justify-center font-black text-tcg-black text-xl tracking-tighter transition-transform group-hover:scale-110">
            TCG
          </div>
          <div className="text-xl font-black tracking-[4px] hidden sm:block">
            FUNDED
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative group pt-2 pb-2"
              onMouseEnter={() => setActiveMega(item.label)}
              onMouseLeave={() => setActiveMega(null)}
            >
              <div className="flex items-center gap-1.5 cursor-pointer">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm font-bold text-tcg-white/70 hover:text-tcg-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sm font-bold text-tcg-white/70 hover:text-tcg-gold transition-colors">
                    {item.label}
                  </span>
                )}
                {item.children && (
                  <ChevronDown
                    size={14}
                    className={cn(
                      'text-tcg-white/30 transition-transform duration-300',
                      activeMega === item.label && 'rotate-180 text-tcg-gold'
                    )}
                  />
                )}
              </div>

              {item.children && (
                <div
                  className={cn(
                    'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-tcg-card border border-tcg-border rounded-2xl p-4 shadow-2xl transition-all duration-300 origin-top',
                    activeMega === item.label
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  )}
                >
                  <div className="grid gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="p-3 text-sm font-semibold text-tcg-white/60 hover:text-tcg-white hover:bg-tcg-white/5 rounded-xl transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-tcg-gold border border-tcg-gold/30 px-5 py-2.5 rounded-xl hover:bg-tcg-gold/10 transition-all"
          >
            Dashboard <LayoutDashboard size={16} />
          </Link>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-tcg-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-tcg-black p-6 transition-all duration-500 lg:hidden',
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-tcg-gold rounded-lg flex items-center justify-center font-black text-tcg-black text-xl tracking-tighter">
              TCG
            </div>
            <div className="text-xl font-black tracking-[4px]">FUNDED</div>
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center text-tcg-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <div className="grid gap-6">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <div className="text-sm font-black text-tcg-white/30 uppercase tracking-[3px] mb-4">
                {item.label}
              </div>
              <div className="grid gap-4 pl-2">
                {item.children
                  ? item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="text-xl font-bold text-tcg-white hover:text-tcg-gold transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))
                  : item.href && (
                      <Link
                        href={item.href}
                        className="text-xl font-bold text-tcg-white hover:text-tcg-gold transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 bg-tcg-gold text-tcg-black font-black uppercase tracking-widest py-5 rounded-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Funded Today
          </Link>
        </div>
      </div>
    </nav>
  )
}
