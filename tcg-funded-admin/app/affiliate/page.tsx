'use client'
import { CheckCircle2, Users, DollarSign, BarChart3, Zap, ArrowRight, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import Link from 'next/link'

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-racing-primary overflow-x-hidden font-sans">
      <Navbar />
      
      <main className="pt-32 pb-24 bg-dots">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in">
             <span className="section-label">Partnership Program</span>
             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
                SCALE WITH <span className="text-racing-green">THE FLEET.</span>
             </h1>
             <p className="text-racing-text-dim text-lg max-w-2xl mx-auto">
                Promote the industry&apos;s most transparent prop firm. 
                High conversion rates. Instant payouts. Lifetime recurring revenue.
             </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
             {[
               { label: 'Baseline Commission', value: '15%', icon: <DollarSign size={20} /> },
               { label: 'Settlement Window', value: 'Instant', icon: <Zap size={20} /> },
               { label: 'Tracking Cookies', value: '60 Days', icon: <BarChart3 size={20} /> },
             ].map((stat, i) => (
                <div key={i} className="card-racing !p-10 !bg-racing-surface text-center group">
                   <div className="w-12 h-12 rounded-lg bg-racing-green/10 flex items-center justify-center mb-8 mx-auto text-racing-green group-hover:scale-110 transition-transform">
                      {stat.icon}
                   </div>
                   <span className="stat-label">{stat.label}</span>
                   <div className="text-4xl font-bold text-white font-mono mt-1">{stat.value}</div>
                </div>
             ))}
          </div>

          {/* Features */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
             <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-tight">Partner Perks</h2>
                <div className="space-y-6">
                   {[
                     'Real-time dashboard tracking every click and conversion.',
                     'Custom promo codes for your audience.',
                     'Dedicated affiliate manager for high-volume partners.',
                     'Marketing assets and high-perfomance ad creatives.',
                     'Standard payout logic: Weekly settlements via Stripe or Crypto.',
                   ].map((text, i) => (
                      <div key={i} className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-racing-green/20 flex items-center justify-center shrink-0 mt-1">
                            <CheckCircle2 className="text-racing-green" size={14} />
                         </div>
                         <p className="text-racing-text-dim text-sm leading-relaxed">{text}</p>
                      </div>
                   ))}
                </div>
             </div>

             <div className="card-racing !p-12 !bg-racing-surface shadow-border-glow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-racing-green/5 blur-[100px] rounded-full" />
                <Users className="text-racing-green mb-8" size={64} />
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Ready to deploy?</h3>
                <p className="text-racing-text-dim text-sm mb-10 leading-relaxed">
                   Our affiliate program is selective. We look for partners who value transparency 
                   and long-term results as much as we do.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                      Apply Now <ArrowRight size={18} />
                   </button>
                   <button className="btn-secondary flex-1">
                      Partner Login
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
