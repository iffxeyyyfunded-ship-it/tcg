'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          <h1 className="text-5xl font-black text-white mb-12 uppercase" style={{ fontFamily: 'var(--font-display)' }}>Cookie <span className="gold-text">Policy</span></h1>
          <div className="prose prose-invert prose-tcg max-w-none text-tcg-text space-y-8 font-medium">
            <p className="text-sm italic">Last Updated: April 19, 2026</p>
            
            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">1. What are cookies?</h2>
              <p>Cookies are small text files stored on your device that help our website function correctly, remember your preferences, and analyze how you use our platform.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">2. Essential Cookies</h2>
              <p>We use essential cookies to maintain your session with Supabase, keep you logged into the dashboard, and manage your Stripe checkout process. These cannot be disabled as they are required for the core functionality of our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">3. Analytics Cookies</h2>
              <p>We use Vercel Analytics to understand how our site is used. This helps us optimize performance and improve the user experience. All analytics data is processed anonymously.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">4. Managing Cookies</h2>
              <p>You can adjust your browser settings to refuse or delete cookies. However, please note that disabling cookies will prevent you from logging into the trader dashboard or completing account purchases.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
