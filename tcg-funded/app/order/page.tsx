'use client'
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'
import { ADDONS, getPrice, type AccountSize, type DrawdownType } from '@/lib/pricing'
import { CheckCircle2, ShieldCheck, Ticket, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

function OrderContent() {
  const searchParams = useSearchParams()
  const market = searchParams.get('market') || 'forex'
  const size = parseInt(searchParams.get('size') || '25000') as AccountSize
  const type = searchParams.get('type') as DrawdownType || 'eod_trailing'

  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [coupon, setCoupon] = useState('TCGLAUNCH')
  const [isProcessing, setIsProcessing] = useState(false)

  const basePrice = getPrice(size, type)
  const addonsPrice = ADDONS.filter(a => selectedAddons.includes(a.id)).reduce((acc, curr) => acc + curr.price, 0)
  const subtotal = basePrice + addonsPrice
  const discount = coupon.toUpperCase() === 'TCGLAUNCH' ? subtotal * 0.65 : 0
  const total = subtotal - discount

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    // Here we would call our /api/checkout route
    setTimeout(() => {
      alert('Stripe redirect would happen here.')
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      {/* Selection Summary & Add-ons */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-tcg-card border border-tcg-border rounded-[32px] p-8">
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8">Customize Your Account</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ADDONS.map((addon: any) => (
              <button
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={cn(
                  "p-6 rounded-2xl border text-left transition-all group",
                  selectedAddons.includes(addon.id)
                    ? 'bg-tcg-gold/5 border-tcg-gold shadow-[0_0_20px_rgba(245,200,66,0.1)]'
                    : 'bg-tcg-black border-tcg-border hover:border-white/20'
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl">{addon.icon}</span>
                  <div className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                    selectedAddons.includes(addon.id) ? 'bg-tcg-gold border-tcg-gold' : 'border-white/10'
                  )}>
                    {selectedAddons.includes(addon.id) && <CheckCircle2 size={12} className="text-tcg-black" />}
                  </div>
                </div>
                <h4 className="text-sm font-black text-white uppercase mb-2">{addon.label}</h4>
                <p className="text-[10px] text-tcg-text leading-relaxed mb-4 line-clamp-2">{addon.description}</p>
                <div className="text-sm font-black text-tcg-gold">+${addon.price}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary Checkout Card */}
      <div className="relative">
        <div className="sticky top-32 space-y-6">
          <div className="bg-tcg-card border border-tcg-gold/30 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tcg-gold/5 blur-3xl rounded-full" />
            
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-sm">
                  <span className="text-tcg-muted font-bold uppercase tracking-wider">Account</span>
                  <span className="text-white font-black capitalize">{market} ${size/1000}K</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-tcg-muted font-bold uppercase tracking-wider">Drawdown</span>
                  <span className="text-white font-black">{type.split('_').join(' ').toUpperCase()}</span>
               </div>
               {selectedAddons.length > 0 && (
                 <div className="flex justify-between text-sm">
                    <span className="text-tcg-muted font-bold uppercase tracking-wider">Add-ons ({selectedAddons.length})</span>
                    <span className="text-white font-black">+${addonsPrice}</span>
                 </div>
               )}
            </div>

            <div className="relative mb-8">
               <input 
                 type="text" 
                 value={coupon}
                 onChange={(e) => setCoupon(e.target.value)}
                 placeholder="Coupon Code"
                 className="w-full bg-tcg-black border border-tcg-border rounded-xl px-4 py-4 text-sm font-bold text-white uppercase placeholder:text-tcg-muted focus:border-tcg-gold transition-all outline-none"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-tcg-gold">
                  <Ticket size={18} />
               </div>
            </div>

            <div className="space-y-3 mb-8 border-t border-white/5 pt-8">
               <div className="flex justify-between text-base">
                  <span className="text-white font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="text-white font-black">${subtotal.toFixed(2)}</span>
               </div>
               {discount > 0 && (
                 <div className="flex justify-between text-base text-tcg-green">
                    <span className="font-bold uppercase tracking-widest">Discount (65%)</span>
                    <span className="font-black">-${discount.toFixed(2)}</span>
                 </div>
               )}
               <div className="flex justify-between text-2xl pt-4">
                  <span className="text-white font-black uppercase tracking-widest">Total</span>
                  <span className="text-tcg-gold font-black">${total.toFixed(2)}</span>
               </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full btn-gold py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <>PURCHASE NOW <ArrowRight size={20} /></>}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-tcg-muted">
               <ShieldCheck size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Stripe Secure Platform</span>
            </div>
          </div>
          
          <div className="p-6 bg-tcg-card border border-tcg-border rounded-2xl text-[10px] text-tcg-muted font-medium leading-relaxed italic">
             * By clicking &quot;Purchase Now&quot;, you agree to the TCG Funded Terms of Service and Risk Disclosure. All sales are final. Accounts are for simulated evaluation purposes only.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
               SECURE <span className="gold-text">CHECKOUT</span>
            </h1>
          </div>

          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
               <Loader2 className="animate-spin text-tcg-gold" size={48} />
            </div>
          }>
            <OrderContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
