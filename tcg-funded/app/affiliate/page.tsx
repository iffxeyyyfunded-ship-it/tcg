'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import { Gift, Share2, Wallet, Users, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Hero */}
          <div className="text-center mb-24 animate-fade-up">
             <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
                Partnership
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: 'var(--font-display)' }}>
                THE TCG <span className="gold-text">AFFILIATE</span><br />NETWORK.
             </h1>
             <p className="text-tcg-text text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Earn 10% commission on every referral. No limits. No delays. Weekly payouts.
             </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-24">
             {[
               { icon: <Gift size={32} />, title: '10% Commission', desc: 'Industry-leading flat commission on every purchase your referrals make.' },
               { icon: <Share2 size={32} />, title: 'Direct Links', desc: 'Easy-to-use referral codes and landing page links.' },
               { icon: <Wallet size={32} />, title: 'Weekly Payouts', desc: 'Commissions are calculated and paid every week alongside trader payouts.' },
             ].map((f, i) => (
                <div key={i} className="p-10 bg-tcg-card border border-tcg-border rounded-[40px] hover:border-tcg-gold/30 transition-all text-center">
                   <div className="w-16 h-16 rounded-2xl bg-tcg-gold/10 flex items-center justify-center mb-8 mx-auto text-tcg-gold">
                      {f.icon}
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                   <p className="text-sm text-tcg-text leading-relaxed font-bold">{f.desc}</p>
                </div>
             ))}
          </div>

          {/* How to join */}
          <div className="bg-tcg-card border border-tcg-border rounded-[48px] p-10 md:p-20 relative overflow-hidden mb-24">
             <div className="absolute top-0 left-0 w-64 h-64 bg-tcg-gold/5 blur-[120px] rounded-full" />
             
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                      HOW TO <span className="gold-text">JOIN.</span>
                   </h2>
                   <div className="space-y-6">
                      {[
                        'Register for a TCG Funded account (it&apos;s free).',
                        'Navigate to your dashboard to get your unique code.',
                        'Share with your community, followers, or friends.',
                        'Watch your affiliate wallet grow in real-time.',
                      ].map((s, i) => (
                        <div key={i} className="flex gap-4 items-center">
                           <CheckCircle2 className="text-tcg-gold shrink-0" size={20} />
                           <span className="text-lg text-white font-bold">{s}</span>
                        </div>
                      ))}
                   </div>
                   <div className="mt-12">
                      <button className="btn-gold px-12 py-5 rounded-2xl text-lg font-black tracking-widest">
                         GET YOUR LINK NOW
                      </button>
                   </div>
                </div>

                <div className="relative">
                   <div className="absolute -inset-4 bg-tcg-gold/20 blur-3xl opacity-20 rounded-full" />
                   <div className="relative bg-tcg-black border border-white/5 p-10 rounded-[40px] text-center">
                      <Users className="mx-auto text-tcg-gold mb-8" size={64} />
                      <div className="text-4xl font-black text-white mb-2 uppercase" style={{ fontFamily: 'var(--font-display)' }}>1,420+</div>
                      <div className="text-xs text-tcg-muted font-black uppercase tracking-[3px]">Active Affiliates</div>
                      <div className="mt-8 border-t border-white/5 pt-8 grid grid-cols-2 gap-4">
                         <div>
                            <div className="text-xl font-bold text-white">$242,400</div>
                            <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest">Paid Out</div>
                         </div>
                         <div>
                            <div className="text-xl font-bold text-white">10%</div>
                            <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest">Commission Rate</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
