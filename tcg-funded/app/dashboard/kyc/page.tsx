'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  UserCheck, 
  Upload, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function KYCPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fullName, setFullName] = useState('')
  const [country, setCountry] = useState('')
  
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({
        full_name: fullName,
        country: country,
        kyc_status: 'submitted',
        kyc_submitted_at: new Date().toISOString()
      }).eq('id', user.id)
      
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-up">
         <div className="w-24 h-24 bg-tcg-green/10 border border-tcg-green/30 rounded-[40px] flex items-center justify-center text-tcg-green mb-10">
            <CheckCircle2 size={48} />
         </div>
         <h1 className="text-4xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>KYC SUBMITTED</h1>
         <p className="text-tcg-text text-lg max-w-md font-medium leading-relaxed mb-10">
            Your identity documents are being reviewed. This usually takes 12–24 hours. We will notify you via email once approved.
         </p>
         <button 
           onClick={() => window.location.href = '/dashboard'}
           className="btn-gold px-12 py-5 rounded-2xl font-black tracking-widest text-sm"
         >
            BACK TO DASHBOARD
         </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center gap-6">
         <div className="w-16 h-16 bg-tcg-gold/10 border border-tcg-gold/20 rounded-[28px] flex items-center justify-center text-tcg-gold">
            <UserCheck size={32} />
         </div>
         <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Identity Verification</h1>
            <p className="text-tcg-text font-bold uppercase tracking-widest text-xs">Unlock Payout Eligibility</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
         <div className="lg:col-span-3">
            <div className="bg-tcg-card border border-tcg-border rounded-[48px] p-8 md:p-12">
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-3">Full Name (As on Passport)</label>
                        <input
                           type="text"
                           required
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                           className="w-full bg-tcg-black border border-tcg-border rounded-xl px-4 py-4 text-white focus:border-tcg-gold outline-none"
                           placeholder="John Doe"
                        />
                     </div>
                     <div>
                        <label className="block text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-3">Country of Residence</label>
                        <input
                           type="text"
                           required
                           value={country}
                           onChange={(e) => setCountry(e.target.value)}
                           className="w-full bg-tcg-black border border-tcg-border rounded-xl px-4 py-4 text-white focus:border-tcg-gold outline-none"
                           placeholder="United States"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="block text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-3">Identity Document Upload</label>
                     <div className="border-2 border-dashed border-tcg-border rounded-[32px] p-12 text-center hover:border-tcg-gold/30 transition-all cursor-pointer bg-tcg-black/30 group">
                        <Upload className="mx-auto text-tcg-muted mb-4 group-hover:text-tcg-gold transition-colors" size={48} />
                        <div className="text-white font-bold mb-1">Click to upload document</div>
                        <p className="text-[10px] text-tcg-muted uppercase tracking-widest">Passport, National ID, or Drivers License (JPG, PNG, PDF)</p>
                     </div>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex gap-4">
                     <ShieldCheck className="text-tcg-gold shrink-0" size={20} />
                     <p className="text-xs text-tcg-text leading-relaxed font-medium">
                        Your data is encrypted and handled by our regulated compliance partners. We do not store raw document images on our primary servers.
                     </p>
                  </div>

                  <button
                     disabled={loading}
                     className="w-full btn-gold py-6 rounded-2xl text-lg font-black tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                     {loading ? <Loader2 className="animate-spin" /> : <>SUBMIT FOR REVIEW</>}
                  </button>
               </form>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-6">
            <div className="bg-tcg-card border border-tcg-border rounded-[40px] p-8">
               <h3 className="text-base font-black text-white uppercase tracking-tight mb-8">Verification Rules</h3>
               <div className="space-y-6">
                  {[
                    { title: 'Clear Images', desc: 'Ensure all 4 corners of the document are visible and no glare is present.' },
                    { title: 'Match Details', desc: 'The name on your document must exactly match your TCG profile.' },
                    { title: 'Valid Expiry', desc: 'Documents must be currently valid. Expired IDs will be rejected.' },
                    { title: 'One Profile', desc: 'Only one KYC submission is allowed per individual household.' },
                  ].map((rule, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-8 h-8 rounded-lg bg-tcg-black flex items-center justify-center text-[10px] font-black text-tcg-gold border border-white/5">0{i+1}</div>
                       <div>
                          <div className="text-xs font-black text-white uppercase tracking-wider mb-1">{rule.title}</div>
                          <div className="text-[10px] text-tcg-muted leading-relaxed font-medium">{rule.desc}</div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-tcg-gold/5 border border-tcg-gold/20 rounded-[40px] flex items-center gap-4">
               <FileText className="text-tcg-gold" size={32} />
               <div>
                  <div className="text-xs font-black text-white uppercase tracking-tight">Trader Agreement</div>
                  <p className="text-[10px] text-tcg-muted font-bold">You will be asked to sign the agreement after KYC approval.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
