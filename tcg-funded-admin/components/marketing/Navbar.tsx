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
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'Transparency', href: '/transparency' },
      { label: 'Community', href: '/#community' },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 h-16 flex items-center',
        isScrolled
          ? 'bg-racing-primary/80 backdrop-blur-xl border-b border-racing-border shadow-lg'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/brand/logo.png" 
            alt="TCG Funded" 
            className="h-9 w-auto transition-transform group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative group py-2"
              onMouseEnter={() => setActiveMega(item.label)}
              onMouseLeave={() => setActiveMega(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[13px] font-medium text-racing-text-dim hover:text-white transition-colors uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[13px] font-medium text-racing-text-dim hover:text-white transition-colors uppercase tracking-wider">
                    {item.label}
                  </span>
                )}
                {item.children && (
                  <ChevronDown
                    size={14}
                    className={cn(
                      'text-racing-muted transition-transform duration-300',
                      activeMega === item.label && 'rotate-180 text-racing-green'
                    )}
                  />
                )}
              </div>

              {item.children && (
                <div
                  className={cn(
                    'absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-racing-surface border border-racing-border rounded-lg p-3 shadow-2xl transition-all duration-200 origin-top',
                    activeMega === item.label
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  )}
                >
                  <div className="grid gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="px-3 py-2 text-[13px] font-medium text-racing-text-dim hover:text-racing-green hover:bg-racing-green/10 rounded transition-all"
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
            className="hidden sm:flex items-center gap-2 text-xs font-bold bg-racing-green text-black px-5 py-2.5 rounded hover:bg-racing-green-dark transition-all uppercase tracking-wider"
          >
             Dashboard <LayoutDashboard size={14} />
          </Link>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-racing-primary p-6 transition-all duration-500 lg:hidden',
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-racing-green rounded flex items-center justify-center font-bold text-black text-xl tracking-tighter">
              TCG
            </div>
            <div className="text-xl font-bold tracking-[4px] text-white">FUNDED</div>
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={28} />
          </button>
        </div>

        <div className="grid gap-8">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <div className="text-[11px] font-bold text-racing-muted uppercase tracking-[3px] mb-4">
                {item.label}
              </div>
              <div className="grid gap-4 pl-2">
                {item.children
                  ? item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="text-2xl font-bold text-white hover:text-racing-green transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))
                  : item.href && (
                      <Link
                        href={item.href}
                        className="text-2xl font-bold text-white hover:text-racing-green transition-colors"
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
            href="/pricing"
            className="w-full flex items-center justify-center gap-2 bg-racing-green text-black font-bold uppercase tracking-widest py-5 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Funded Today
          </Link>
        </div>
      </div>
    </nav>
  )
}
