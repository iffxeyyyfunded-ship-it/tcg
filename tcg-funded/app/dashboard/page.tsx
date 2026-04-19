'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Trophy, 
  ShieldAlert, 
  Clock, 
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardOverview() {
  const [profile, setProfile] = useState<any>(null)
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        const { data: accounts } = await supabase.from('accounts').select('*').eq('user_id', user.id)
        
        setProfile(profile)
        setAccounts(accounts || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) return null

  return (
    <div className="space-y-10">
      {/* Welcome & KYC Alert */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Trader Overview
            </h1>
            <p className="text-tcg-text text-sm font-bold uppercase tracking-widest">
              Status: <span className={cn(
                "px-2 py-0.5 rounded text-[10px] ml-2",
                profile?.kyc_status === 'approved' ? "bg-tcg-green/10 text-tcg-green border border-tcg-green/20" : "bg-tcg-red/10 text-tcg-red border border-tcg-red/20"
              )}>
                {profile?.kyc_status?.toUpperCase() || 'NOT SUBMITTED'}
              </span>
            </p>
         </div>
         <Link 
           href="/pricing"
           className="btn-gold px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-black"
         >
           <Plus size={18} /> New Account
         </Link>
      </div>

      {profile?.kyc_status !== 'approved' && (
        <div className="bg-tcg-red/5 border border-tcg-red/20 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-tcg-red/10 flex items-center justify-center text-tcg-red">
                 <AlertCircle size={24} />
              </div>
              <div>
                 <h4 className="text-white font-black uppercase tracking-tight text-sm">Action Required: Complete KYC</h4>
                 <p className="text-tcg-text text-xs font-medium">Verification is required before you can request any payouts.</p>
              </div>
           </div>
           <Link href="/dashboard/kyc" className="px-6 py-3 bg-tcg-red text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-colors text-center">
              Verify Now
           </Link>
        </div>
      )}

      {/* Main Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="p-8 bg-tcg-card border border-tcg-border rounded-[32px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={64} /></div>
            <div className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-6">Total Equity</div>
            <div className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
               ${accounts.reduce((acc, curr) => acc + parseFloat(curr.current_balance), 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-tcg-green text-[10px] font-black uppercase tracking-widest">
               <ArrowUpRight size={14} /> 2.4% Across All Accounts
            </div>
         </div>

         <div className="p-8 bg-tcg-card border border-tcg-border rounded-[32px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert size={64} /></div>
            <div className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-6">Total Payouts</div>
            <div className="text-4xl font-black text-tcg-gold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
               ${accounts.reduce((acc, curr) => acc + parseFloat(curr.total_payouts_received || 0), 0).toLocaleString()}
            </div>
            <div className="text-tcg-text text-[10px] font-black uppercase tracking-widest">
               Next Window: Friday 5PM EST
            </div>
         </div>

         <div className="p-8 bg-tcg-card border border-tcg-border rounded-[32px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={64} /></div>
            <div className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-6">Aggregate Score</div>
            <div className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
               {accounts.reduce((acc, curr) => acc + parseFloat(curr.current_score || 0), 0).toFixed(2)}
            </div>
            <Link href="/payout-pool" className="flex items-center gap-1.5 text-tcg-gold text-[10px] font-black uppercase tracking-widest hover:underline transition-all">
               Calculate Share <ArrowUpRight size={14} />
            </Link>
         </div>
      </div>

      {/* Account List */}
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Your Accounts</h3>
            <Link href="/dashboard/accounts" className="text-[10px] font-black text-tcg-muted uppercase tracking-[3px] hover:text-tcg-gold transition-colors">View All Accounts</Link>
         </div>

         {accounts.length === 0 ? (
           <div className="p-20 border border-dashed border-tcg-border rounded-[40px] text-center">
              <div className="w-16 h-16 bg-tcg-card rounded-2xl flex items-center justify-center text-tcg-muted mx-auto mb-6">
                 <Plus size={32} />
              </div>
              <h4 className="text-white font-bold mb-2">No active accounts.</h4>
              <p className="text-tcg-text text-sm mb-8">Purchase your first funded account to start trading.</p>
              <Link href="/pricing" className="btn-gold px-10 py-4 rounded-xl font-black inline-block text-sm uppercase tracking-widest">Purchase Account</Link>
           </div>
         ) : (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {accounts.map(acc => (
                 <div key={acc.id} className="p-8 bg-tcg-card border border-tcg-border rounded-[40px] hover:border-tcg-gold/30 transition-all group">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center text-tcg-black",
                            acc.status === 'active' ? "bg-tcg-green" : "bg-tcg-muted"
                          )}>
                             <CheckCircle2 size={20} />
                          </div>
                          <div>
                             <div className="text-xs font-black text-white leading-none mb-1">{acc.account_number}</div>
                             <div className="text-[10px] text-tcg-muted uppercase tracking-widest font-bold capitalize">{acc.market} · {acc.drawdown_type.split('_').join(' ')}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-sm font-black text-white uppercase tracking-tight">${(acc.account_size / 1000).toFixed(0)}K Account</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8 border-y border-white/5 py-6">
                       <div>
                          <div className="text-[9px] text-tcg-muted font-black uppercase tracking-widest mb-1">Balance</div>
                          <div className="text-lg font-black text-white">${acc.current_balance.toLocaleString()}</div>
                       </div>
                       <div>
                          <div className="text-[9px] text-tcg-muted font-black uppercase tracking-widest mb-1">Score</div>
                          <div className="text-lg font-black text-tcg-gold">{acc.current_score || '0.00'}</div>
                       </div>
                       <div>
                          <div className="text-[9px] text-tcg-muted font-black uppercase tracking-widest mb-1">Max DD</div>
                          <div className="text-lg font-black text-tcg-red">{acc.max_drawdown_pct}%</div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-tcg-muted">
                             <Clock size={12} /> Cycle Start: {acc.cycle_start_date ? new Date(acc.cycle_start_date).toLocaleDateString() : 'N/A'}
                          </div>
                       </div>
                       <Link 
                         href={`/dashboard/accounts/${acc.id}`}
                         className="p-3 bg-white/5 border border-white/10 rounded-xl text-tcg-text hover:text-white transition-all hover:bg-tcg-gold/10 hover:border-tcg-gold"
                       >
                          <ArrowUpRight size={18} />
                       </Link>
                    </div>
                 </div>
              ))}
           </div>
         )}
      </div>

      {/* Notifications / Activity */}
      <div className="bg-tcg-card border border-tcg-border rounded-[48px] p-8 md:p-12">
         <h3 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>Recent Activity</h3>
         <div className="space-y-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-[24px] hover:bg-white/5 transition-all group">
                 <div className="w-12 h-12 rounded-2xl bg-tcg-black border border-white/5 flex items-center justify-center text-tcg-gold">
                    <TrendingUp size={20} />
                 </div>
                 <div className="flex-1">
                    <div className="text-sm font-black text-white uppercase tracking-tight mb-1">Daily Trade Log Recorded</div>
                    <div className="text-xs text-tcg-text font-medium">Your activity for account TCG-42069 has been synchronized. Score updated.</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest mb-1">Today</div>
                    <div className="text-sm font-bold text-tcg-green">+0.42%</div>
                 </div>
              </div>
            ))}
         </div>
         <div className="mt-8 text-center">
            <button className="text-[10px] font-black text-tcg-muted uppercase tracking-[3px] hover:text-tcg-gold transition-colors">Load More Activity</button>
         </div>
      </div>
    </div>
  )
}
