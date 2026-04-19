import Hero from '@/components/marketing/Hero'
import BlackBoxProblem from '@/components/marketing/BlackBoxProblem'
import GlassBoxSolution from '@/components/marketing/GlassBoxSolution'
import HowItWorks from '@/components/marketing/HowItWorks'
import PayoutPool from '@/components/marketing/PayoutPool'
import PricingTable from '@/components/marketing/PricingTable'
import AddOns from '@/components/marketing/AddOns'
import ComparisonTable from '@/components/marketing/ComparisonTable'
import Community from '@/components/marketing/Community'
import SupportSection from '@/components/marketing/SupportSection'
import Footer from '@/components/marketing/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-tcg-black overflow-x-hidden">
      {/* Scroll sections */}
      <Hero />
      <BlackBoxProblem />
      <GlassBoxSolution />
      <HowItWorks />
      <PayoutPool />
      <PricingTable />
      <AddOns />
      <ComparisonTable />
      <div className="bg-tcg-black py-20 relative">
        <div className="container text-center">
           <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-6 py-2 text-xs font-black text-tcg-gold uppercase tracking-[5px] mb-8 animate-pulse">
              Built for traders who win.
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
              Stop playing the <span className="gold-text">Black Box.</span><br />
              Switch to the Glass Box.
           </h2>
        </div>
      </div>
      <Community />
      <SupportSection />
      <Footer />
    </div>
  )
}
