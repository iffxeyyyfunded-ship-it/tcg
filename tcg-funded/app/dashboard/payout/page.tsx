'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  TrendingUp, 
  Wallet, 
  Clock, 
  History, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  BarChart4
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PayoutPage() {
  const [profile, setProfile] = useState<any>(null)
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [payouts, setPayouts] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        const { data: accounts } = await supabase.from('accounts').select('*').eq('user_id', user.id).eq('payout_eligible', true)
        const { data: payouts } = await supabase.from('payout_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
        
        setProfile(profile)
        setAccounts(accounts || [])
        setPayouts(payouts || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) return null

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-6">
         <div className="w-16 h-16 bg-tcg-gold/10 border border-tcg-gold/20 rounded-[28px] flex items-center justify-center text-tcg-gold">
            <Wallet size={32} />
         </div>
         <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Payout Center</h1>
            <p className="text-tcg-text font-bold uppercase tracking-widest text-xs">Claim your share of the pool</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Request Payout Section */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-tcg-card border border-tcg-border rounded-[48px] p-8 md:p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-gold/5 blur-[80px] rounded-full" />
               
               <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight relative z-10" style={{ fontFamily: 'var(--font-display)' }}>Request Friday Settlement</h3>
               
               {accounts.length === 0 ? (
                 <div className="p-12 border border-dashed border-tcg-border rounded-[32px] text-center bg-tcg-black/30">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-tcg-muted mx-auto mb-6">
                       <BarChart4 size={32} />
                    </div>
                    <h4 className="text-white font-bold mb-2">No eligible accounts found.</h4>
                    <p className="text-tcg-text text-sm mb-0">Accounts must reach the 3% Cycle Goal and be active for at least 5 trading days to be eligible for the Friday pool.</p>
                 </div>
               ) : (
                 <div className="space-y-6">
                    {accounts.map(acc => (
                       <div key={acc.id} className="p-8 bg-tcg-black border border-tcg-border rounded-[32px] hover:border-tcg-gold/30 transition-all group">
                          <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-tcg-gold/10 rounded-xl text-tcg-gold"><CheckCircle2 size={24} /></div>
                                <div>
                                   <div className="text-sm font-black text-white uppercase mb-1">{acc.account_number}</div>
                                   <div className="text-[10px] text-tcg-muted uppercase tracking-widest font-black">${acc.account_size/1000}K · {acc.drawdown_type.toUpperCase()}</div>
                                </div>
                             </div>
                             <div className="text-right">
                                <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest mb-1">Current Score</div>
                                <div className="text-2xl font-black text-tcg-gold">{acc.current_score}</div>
                             </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-white/5">
                             <div className="flex-1 text-center sm:text-left">
                                <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest mb-1">Estimated Pool Share</div>
                                <div className="text-white font-bold">Waiting for Friday Calculation...</div>
                             </div>
                             <button className="btn-gold px-10 py-4 rounded-xl text-sm font-black tracking-widest w-full sm:w-auto">
                                ENTER WEEKLY POOL
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
               )}

               <div className="mt-10 p-6 bg-tcg-gold/5 border border-tcg-gold/20 rounded-2xl flex gap-4">
                  <TrendingUp className="text-tcg-gold shrink-0" size={20} />
                  <p className="text-xs text-tcg-text leading-relaxed font-medium">
                     <strong className="text-white">Friday 5PM EST Payout Window:</strong> All entries submitted before this time will be processed for the weekly pool distribution. Payments are settled by Monday 12PM EST.
                  </p>
               </div>
            </div>

            {/* Payout History */}
            <div className="bg-tcg-card border border-tcg-border rounded-[48px] p-8 md:p-12 overflow-hidden">
               <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8" style={{ fontFamily: 'var(--font-display)' }}>Payout History</h3>
               {payouts.length === 0 ? (
                 <div className="py-20 text-center text-tcg-muted flex flex-col items-center">
                    <History size={48} className="mb-4 opacity-20" />
                    <div className="text-xs font-black uppercase tracking-widest">No previous payouts found</div>
                 </div>
               ) : (
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-[10px] font-black text-tcg-muted uppercase tracking-[3px] border-b border-white/5">
                             <th className="pb-4">Date</th>
                             <th className="pb-4">Account</th>
                             <th className="pb-4">Status</th>
                             <th className="pb-4 text-right">Amount</th>
                          </tr>
                       </thead>
                       <tbody className="text-sm">
                          {payouts.map(p => (
                             <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 font-bold text-white">{new Date(p.created_at).toLocaleDateString()}</td>
                                <td className="py-6 text-tcg-text">TCG-00242</td>
                                <td className="py-6 capitalize font-bold">
                                   <span className={cn(
                                     "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                     p.status === 'paid' ? "bg-tcg-green/10 text-tcg-green border border-tcg-green/20" : "bg-tcg-gold/10 text-tcg-gold border border-tcg-gold/20"
                                   )}>
                                      {p.status}
                                   </span>
                                </td>
                                <td className="py-6 text-right font-black text-white">${p.payout_amount?.toLocaleString()}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
               )}
            </div>
         </div>

         {/* Sidebar Guides */}
         <div className="space-y-6">
            <div className="bg-tcg-card border border-tcg-border rounded-[40px] p-8">
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white mb-6">
                  <Clock size={24} />
               </div>
               <h4 className="text-lg font-black text-white uppercase tracking-tight mb-4">Payout Schedule</h4>
               <div className="space-y-6">
                  {[
                    { day: 'Friday 5PM', action: 'Entry Window Closes' },
                    { day: 'Friday NIGHT', action: 'Score Auditing' },
                    { day: 'Saturday AM', action: 'Pool Calculation' },
                    { day: 'Monday 12PM', action: 'Settlement Sent' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs pb-3 border-b border-white/5 last:border-0 last:pb-0">
                       <span className="text-tcg-gold font-black uppercase tracking-widest">{item.day}</span>
                       <span className="text-white font-bold">{item.action}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-tcg-card border border-tcg-border rounded-[40px] p-8">
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white mb-6">
                  <HelpCircle size={24} />
               </div>
               <h4 className="text-lg font-black text-white uppercase tracking-tight mb-4">FAQ</h4>
               <div className="space-y-4">
                  {[
                    'How is my local score verified?',
                    'Can I keep my account active after a payout?',
                    'Are there any payout limits or caps?',
                  ].map((q, i) => (
                    <button key={i} className="w-full flex items-center justify-between text-left text-[11px] font-bold text-tcg-text hover:text-tcg-gold transition-colors pb-3 border-b border-white/5 last:border-0 last:pb-0">
                       {q} <ArrowRight size={14} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-tcg-red/5 border border-tcg-red/20 rounded-[40px] flex items-center gap-4">
               <AlertCircle className="text-tcg-red shrink-0" size={32} />
               <div>
                  <div className="text-xs font-black text-white uppercase tracking-tight">Zero Denials policy</div>
                  <p className="text-[10px] text-tcg-muted font-bold leading-relaxed">If you met the rules and your KYC is approved, you are mathematically guaranteed your payout share.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
