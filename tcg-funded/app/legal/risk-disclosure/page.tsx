'use client'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import { AlertTriangle } from 'lucide-react'

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
             <div className="p-3 bg-tcg-red/10 border border-tcg-red/30 rounded-2xl text-tcg-red">
                <AlertTriangle size={32} />
             </div>
             <h1 className="text-5xl font-black text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>Risk <span className="text-tcg-red">Disclosure</span></h1>
          </div>
          
          <div className="prose prose-invert prose-tcg max-w-none text-tcg-text space-y-8 font-medium">
            <p className="text-sm italic">Last Updated: April 19, 2026</p>
            
            <section className="p-8 bg-red-950/20 border border-tcg-red/20 rounded-3xl">
               <h2 className="text-xl font-black text-white uppercase mb-4">CRITICAL NOTICE</h2>
               <p className="text-sm leading-relaxed">
                  Trading in financial markets involves high risk. TCG FUNDED programs are designed to evaluate trading skill in a simulated environment. We do not provide financial advice, and our services should not be construed as investment opportunities. 
               </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">1. Theoretical Performance</h2>
              <p>Performance results are theoretical and do not reflect actual trading in live markets. There are frequent sharp differences between hypothetical performance results and the actual results subsequently achieved by any particular trading program.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">2. Experience Requirement</h2>
              <p>Proprietary trading evaluation requires significant experience and discipline. Most individuals who participate in evaluation programs do not qualify for performance payouts. Professional trading is not a "get rich quick" scheme.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white uppercase mb-4">3. No Guarantees</h2>
              <p>TCG FUNDED makes no guarantees regarding the profitability or payout frequency of any account. All payouts are contingent on meeting specific performance metrics and behavior scores within the TCG ecosystem.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
