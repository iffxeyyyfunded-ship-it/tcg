'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          <h1 className="text-5xl font-black text-white mb-12 uppercase" style={{ fontFamily: 'var(--font-display)' }}>Privacy <span className="gold-text">Policy</span></h1>
          <div className="prose prose-invert prose-tcg max-w-none text-tcg-text space-y-8 font-medium">
            <p className="text-sm italic">Last Updated: April 19, 2026</p>
            
            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">1. Information Collection</h2>
              <p>We collect information necessary to provide our services, including name, email address, payment details (processed securely via Stripe), and KYC identity documentation (processed securely via regulated third parties).</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">2. Use of Information</h2>
              <p>We use your information to manage your trading accounts, process performance payouts, provide support, and ensure compliance with anti-money laundering (AML) regulations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">3. Data Security</h2>
              <p>We implement professional-grade security measures to protect your data. Your identity documents are stored in encrypted environments through our KYC partner and are only accessible by authorized compliance personnel.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">4. Third Parties</h2>
              <p>We never sell your personal data. We only share data with necessary service providers: Supabase (database), Stripe (payments), Resend (emails), and our KYC provider.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
