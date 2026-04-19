'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import PricingTable from '@/components/marketing/PricingTable'
import { ShieldCheck, Zap, Coins, Clock } from 'lucide-react'

export default function StandalonePricingPage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
               INSTANT <br /><span className="gold-text">FUNDING.</span>
            </h1>
            <p className="text-tcg-text text-xl max-w-2xl mx-auto font-medium leading-relaxed">
               Pick your size. Customize your drawdown. Trade across 100+ markets with zero commissions.
            </p>
          </div>

          <PricingTable />

          {/* Additional context on this page */}
          <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { icon: <Clock />, title: '5 Min Setup', desc: 'Accounts are provisioned instantly after payment confirmation.' },
               { icon: <ShieldCheck />, title: 'Secure Checkout', desc: 'Industry-standard encryption via Stripe and 3D Secure.' },
               { icon: <Zap />, title: 'No Hidden Fees', desc: 'The price you see is the price you pay. No monthly subscriptions.' },
               { icon: <Coins />, title: 'Refund Policy', desc: 'Fair refund policy applied before any trading activity starts.' },
             ].map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                   <div className="w-12 h-12 rounded-2xl bg-tcg-card border border-tcg-border flex items-center justify-center text-tcg-gold mb-6">
                      {f.icon}
                   </div>
                   <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">{f.title}</h4>
                   <p className="text-xs text-tcg-text leading-relaxed font-medium">{f.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
