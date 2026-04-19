'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ACCOUNT_SIZES, DRAWDOWN_TYPES, ADDONS, getPrice } from '@/lib/pricing'
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Loader2, 
  CheckCircle2,
  Lock,
  ChevronLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function OrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  
  const market = searchParams.get('market') || 'forex'
  const size = parseInt(searchParams.get('size') || '50000')
  const type = searchParams.get('type') || 'eod_trailing'

  const basePrice = getPrice(size as any, type as any)
  const discountedPrice = basePrice * 0.35
  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find(a => a.id === id)
    return sum + (addon?.price || 0)
  }, 0)
  
  const total = discountedPrice + addonsPrice

  const handleCheckout = async () => {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push(`/login?redirect=/order?market=${market}&size=${size}&type=${type}`)
      return
    }

    // Logic for stripe checkout would go here
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert('Stripe Integration: Successful payment simulation.')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-racing-primary text-white font-sans overflow-x-hidden">
      <div className="container py-12 md:py-24">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-racing-muted hover:text-white transition-colors mb-12 group">
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Back to Pricing</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Configuration Column */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="section-label">Order Manifest</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">Checkout Deployment</h1>
              <p className="text-racing-text-dim max-w-lg leading-relaxed">
                Confirm your institutional capital allocation and select performance modifications below.
              </p>
            </div>

            {/* Selected Base Config */}
            <div className="card-racing !p-8 !bg-racing-surface border-racing-green/20">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-racing-green/10 flex items-center justify-center text-racing-green">
                        <Zap size={24} />
                     </div>
                     <div>
                        <h4 className="text-xl font-bold text-white uppercase tracking-tighter">${size / 1000}K Institutional Account</h4>
                        <p className="text-[11px] text-racing-muted uppercase tracking-widest font-bold">Market: {market} · Protocol: {type.replace('_', ' ')}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <span className="text-3xl font-bold text-white font-mono">${discountedPrice.toFixed(2)}</span>
                     <p className="text-[10px] text-racing-muted line-through font-mono">${basePrice.toFixed(2)}</p>
                  </div>
               </div>
               <div className="bg-racing-green/5 border border-racing-green/20 p-4 rounded flex items-center justify-between">
                  <span className="text-[11px] font-bold text-racing-green uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} /> Seasonal Launch Discount Applied
                  </span>
                  <span className="text-[11px] font-bold text-racing-green uppercase tracking-widest text-right">65% OFF</span>
               </div>
            </div>

            {/* Performance Add-ons */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-6">Performance Mods</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ADDONS.map(addon => (
                  <button
                    key={addon.id}
                    onClick={() => setSelectedAddons(prev => prev.includes(addon.id) ? prev.filter(id => id !== addon.id) : [...prev, addon.id])}
                    className={cn(
                      "card-racing !p-6 flex items-center justify-between transition-all text-left",
                      selectedAddons.includes(addon.id) ? "border-racing-green bg-racing-green/[0.03] shadow-border-glow" : "border-racing-border"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        selectedAddons.includes(addon.id) ? "bg-racing-green border-racing-green shadow-[0_0_10px_#00C896]" : "border-white/10"
                      )}>
                        {selectedAddons.includes(addon.id) && <CheckCircle2 size={12} className="text-black" />}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-white uppercase tracking-tight">{addon.label}</div>
                        <div className="text-[10px] text-racing-muted font-bold uppercase tracking-widest">+${addon.price}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5">
            <div className="card-racing !bg-racing-surface !p-10 shadow-border-glow sticky top-32 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-racing-green/5 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.4em] mb-10 pb-4 border-b border-racing-border">Settlement Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[13px] font-medium">
                  <span className="text-racing-muted uppercase tracking-widest">Base Allocation</span>
                  <span className="text-white font-mono">${discountedPrice.toFixed(2)}</span>
                </div>
                {selectedAddons.map(id => {
                  const addon = ADDONS.find(a => a.id === id)
                  return (
                    <div key={id} className="flex justify-between text-[13px] font-medium animate-fade-in">
                      <span className="text-racing-muted uppercase tracking-widest underline decoration-racing-green/30">{addon?.label}</span>
                      <span className="text-white font-mono">+${addon?.price.toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>

              <div className="pt-8 border-t border-racing-border mb-10">
                <div className="flex justify-between items-end">
                   <div>
                      <span className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.3em] block mb-1">Total Settlement</span>
                      <span className="text-4xl font-bold text-white font-mono">${total.toFixed(2)}</span>
                   </div>
                   <div className="bg-racing-green text-black px-2 py-1 rounded text-[10px] font-bold uppercase mb-1">PROCESSED LIVE</div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full btn-primary h-16 flex items-center justify-center gap-3 relative overflow-hidden group mb-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-black" size={24} />
                ) : (
                  <>
                    <Lock size={18} className="text-black" />
                    DEPART TO SECURE CHECKOUT
                    <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center">
                 <p className="text-[10px] font-bold text-racing-muted uppercase tracking-widest leading-loose">
                    SECURED BY STRIPE · INSTANT PROVISIONING <br />
                    256-BIT ENCRYPTION · NO RECURRING FEES
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
