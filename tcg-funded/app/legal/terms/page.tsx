'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          <h1 className="text-5xl font-black text-white mb-12 uppercase" style={{ fontFamily: 'var(--font-display)' }}>Terms of <span className="gold-text">Service</span></h1>
          <div className="prose prose-invert prose-tcg max-w-none text-tcg-text space-y-8 font-medium">
            <p className="text-sm italic">Last Updated: April 19, 2026</p>
            
            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">1. Introduction</h2>
              <p>Welcome to TCG Funded (trading as "TCG FUNDED" or "The Capital Guru"). By accessing our website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">2. Nature of Service</h2>
              <p>TCG FUNDED LLC provides simulated trading evaluation programs. All trading activity occurs in a simulated environment using virtual capital. TCG FUNDED is NOT a broker, dealer, or regulated financial intermediary. No real money is ever placed at risk in live financial markets by our traders.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">3. Eligibility</h2>
              <p>Users must be at least 18 years of age and reside in a jurisdiction where our services are not restricted by local laws or regulations. It is the user&apos;s responsibility to ensure compliance with local laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">4. Account Purchase & Fees</h2>
              <p>Purchasing a TCG Funded account is a purchase of a digital evaluation service. This is not a deposit or an investment. All fees are one-time payments unless otherwise specified. We reserve the right to change pricing at any time without prior notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">5. Performance Payouts</h2>
              <p>Payout distributions are performance-based rewards derived from TCG FUNDED company revenue. These are not "trading profits" in a traditional sense, as no real trading occurs. Payout eligibility depends on adherence to all evaluation rules and score system parameters.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">6. Prohibited Behavior</h2>
              <p>Users are prohibited from using strategies that exploit platform latency, arb-trading between unrelated entities, or any behavior that TCG FUNDED deems non-institutional or abusive to the simulated environment. We reserve the right to terminate any account found in violation.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
