'use client'
import { X, CheckCircle2, Coins, FileText, Trophy } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const PROBLEMS = [
  { title: 'Payout Denials', desc: 'Hit targets, then get stalled by reviews.' },
  { title: 'Profit Lost to "Going Live"', desc: 'Profits recast as hypothetical after the fact.' },
  { title: 'Hidden Economics', desc: 'Your success becomes their cost.' },
  { title: 'Deductions & Penalties', desc: 'Strategy deductions appear after the fact.' },
  { title: 'Risk Reviews', desc: 'Profitable accounts face interrogations.' },
  { title: 'Restriction Creep', desc: 'Rules shift mid-account without notice.' },
  { title: 'Banning Profitable Traders', desc: 'Consistent winners get flagged as a problem.' },
  { title: 'No Revenue Disclosure', desc: 'You cannot see what funds payouts week to week.' },
]

const SOLUTIONS = [
  { title: 'Revenue-Funded Pool', desc: '40% of revenue funds the pool weekly.' },
  { title: 'No Path to Live', desc: 'Simulation-only by design. No bait-and-switch.' },
  { title: 'Friday Payday', desc: 'Get paid weekly. Cleared by Monday.' },
  { title: 'No Payout Denials', desc: 'If you meet the rules, you get paid. Period.' },
  { title: 'Full Transparency', desc: 'Revenue, costs, pool allocation. All visible.' },
  { title: 'No Rule Changes', desc: 'Rules are fixed. No moving goalposts.' },
  { title: 'Winners Welcome', desc: 'Profitable traders strengthen the model.' },
  { title: 'Zero Commissions', desc: '$0 commissions across all instruments we offer.' },
]

export default function BlackBox() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="transparent-model" className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-section-glow pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-20 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="inline-block bg-[#111] border border-[#1e1e1e] rounded-full px-4 py-1.5 text-xs font-bold text-[#555] uppercase tracking-widest mb-6">
            The Industry Problem
          </div>
          <h2
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
          >
            THE <span className="text-[#ef4444]">BLACK BOX</span> MODEL
          </h2>
          <p className="text-[#a0a0a0] text-lg max-w-xl mx-auto">
            Most prop firms hide the math. Traders see marketing while firms control the outcome.
          </p>
          <p className="text-[#555] mt-2 italic">Sound familiar?</p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Delayed payouts', 'Sudden rule changes', 'Profit clawbacks'].map(t => (
              <span key={t} className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-[#ef4444] text-xs font-semibold px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Two column comparison */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Black Box Column */}
          <div className={`${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            <div className="bg-[#0d0808] border border-[rgba(239,68,68,0.2)] rounded-2xl overflow-hidden cursor-pointer hover:border-[rgba(239,68,68,0.4)] transition-colors duration-300">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.05)]">
                <div className="w-8 h-8 rounded-lg bg-[rgba(239,68,68,0.2)] flex items-center justify-center">
                  <X size={16} className="text-[#ef4444]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">The Black Box Firm</div>
                  <div className="text-xs text-[#ef4444]">Losers fund winners</div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {PROBLEMS.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex items-start gap-3 p-3 rounded-xl bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.1)] ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.3 + i * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(239,68,68,0.15)] flex items-center justify-center mt-0.5">
                      <X size={12} className="text-[#ef4444]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-xs text-[#a0a0a0]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TCG Solution Column */}
          <div className={`${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
            <div className="bg-[#080d08] border border-[rgba(34,197,94,0.2)] rounded-2xl overflow-hidden cursor-pointer hover:border-[rgba(34,197,94,0.4)] transition-colors duration-300">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.05)]">
                <div className="w-8 h-8 rounded-lg bg-[rgba(34,197,94,0.15)] flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-[#22c55e]" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">The TCG Model</div>
                  <div className="text-xs text-[#22c55e]">Revenue funds winners</div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {SOLUTIONS.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex items-start gap-3 p-3 rounded-xl bg-[rgba(34,197,94,0.04)] border border-[rgba(34,197,94,0.1)] ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.4 + i * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center mt-0.5">
                      <CheckCircle2 size={12} className="text-[#22c55e]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-xs text-[#a0a0a0]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Glass Box Reveal */}
        <div className={`mt-20 text-center ${inView ? 'animate-fade-up delay-500' : 'opacity-0'}`}>
          <div className="inline-block bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.2)] rounded-full px-4 py-1.5 text-xs font-bold text-[#F5A623] uppercase tracking-widest mb-6">
            The TCG Difference
          </div>
          <h2
            className="text-5xl md:text-7xl font-black mb-4 gold-text"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
          >
            THE OPEN BOOK
          </h2>
          <p className="text-[#a0a0a0] text-lg max-w-xl mx-auto mb-8">
            Our answer to the industry&apos;s black box. Revenue, costs, and payouts. All visible, all verifiable.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { label: 'Transparent payouts', icon: <Coins className="text-[#F5A623]" size={32} /> },
              { label: 'Fixed rules forever', icon: <FileText className="text-[#F5A623]" size={32} /> },
              { label: 'Profitable? Good.', icon: <Trophy className="text-[#F5A623]" size={32} /> },
            ].map(item => (
              <div key={item.label} className="card-gold-border rounded-xl p-6 text-center cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <div className="text-sm font-semibold text-white uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pricing" className="btn-gold relative z-10 px-8 py-4 rounded-xl text-base font-black" style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>
              GET FUNDED INSTANTLY
            </a>
            <a href="/transparency" className="btn-ghost px-8 py-4 rounded-xl text-base font-semibold">
              See Our Revenue, Live →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
