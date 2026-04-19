'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          <h1 className="text-5xl font-black text-white mb-12 uppercase" style={{ fontFamily: 'var(--font-display)' }}>Refund <span className="gold-text">Policy</span></h1>
          <div className="prose prose-invert prose-tcg max-w-none text-tcg-text space-y-8 font-medium">
            <p className="text-sm italic">Last Updated: April 19, 2026</p>
            
            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">1. Digital Nature of Service</h2>
              <p>TCG FUNDED provides digital evaluation services that are delivered instantly upon purchase. Due to the digital nature of our services and the immediate provision of login credentials, all sales are considered final.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">2. Eligibility for Refunds</h2>
              <p>Refunds may only be requested within 14 days of purchase IF no trading activity has been recorded on the account. Once a single trade (even an accidental one) is executed, the service is considered used and no refund will be issued.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">3. Chargebacks</h2>
              <p>Disputing a charge or initiating a chargeback through your bank after service delivery is considered a violation of our Terms. TCG FUNDED reserves the right to terminate all associated accounts and restrict future access for any user who initiates an unauthorized chargeback.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">4. Breach Termination</h2>
              <p>No refunds will be given for accounts terminated due to a breach of trading rules (e.g., drawdown limit hit). This is the nature of an evaluation program.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
