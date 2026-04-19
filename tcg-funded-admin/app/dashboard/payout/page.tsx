'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  History, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Info,
  DollarSign,
  Wallet
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PayoutHub() {
  const [profile, setProfile] = useState<any>(null)
  const [accounts, setAccounts] = useState<any[]>([])
  const [payouts, setPayouts] = useState<any[]>([])
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
        // Mock payouts for UI demo
        setPayouts([
          { id: 1, date: '2026-04-18', amount: 4210.00, status: 'paid', account: 'TCG-MASTER-420' },
          { id: 2, date: '2026-04-11', amount: 1550.25, status: 'processing', account: 'TCG-MASTER-69' },
        ])
      }
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) return null

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
         <div>
            <span className="section-label">Financial Settlements</span>
            <h1 className="text-4xl font-bold text-white tracking-tight uppercase">Payout Hub</h1>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-right">
               <span className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.2em] block mb-1">Next Settlement Engine</span>
               <span className="text-sm font-bold text-racing-green uppercase tracking-widest bg-racing-green/10 px-3 py-1 rounded">Friday 17:00 EST</span>
            </div>
         </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="card-racing overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-racing-muted/10 group-hover:text-racing-green/10 transition-colors">
               <Wallet size={24} />
            </div>
            <span className="stat-label">Total Payouts Received</span>
            <div className="stat-value text-white">${accounts.reduce((acc, curr) => acc + (curr.total_payouts_received || 0), 0).toFixed(2)}</div>
         </div>

         <div className="card-racing overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-racing-muted/10 group-hover:text-racing-green/10 transition-colors">
               <DollarSign size={24} />
            </div>
            <span className="stat-label">Projected Next Share</span>
            <div className="stat-value text-racing-green">$1,420.50</div>
         </div>

         <div className="card-racing overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-racing-muted/10 group-hover:text-racing-green/10 transition-colors">
               <Activity size={24} />
            </div>
            <span className="stat-label">Aggregate Score</span>
            <div className="stat-value text-white">42.10</div>
         </div>
      </div>

      {/* Eligible Accounts */}
      <div className="space-y-6">
         <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] pb-2 border-b border-racing-border">Performance Contributions</h3>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accounts.map(acc => (
               <div key={acc.id} className="card-racing !bg-racing-surface !p-8 group hover:border-racing-green/30">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-racing-green/10 flex items-center justify-center text-racing-green transition-transform group-hover:scale-110">
                           <CheckCircle2 size={24} />
                        </div>
                        <div>
                           <p className="text-[12px] font-bold text-white font-mono uppercase">{acc.account_number}</p>
                           <p className="text-[10px] text-racing-muted font-bold uppercase tracking-widest">Score Multiplier Enabled</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="stat-label">Current Score</span>
                        <div className="text-xl font-bold text-white font-mono">{acc.current_score || '0.00'}</div>
                     </div>
                  </div>
                  <div className="w-full h-1.5 bg-racing-primary rounded-full overflow-hidden mb-2">
                     <div className="h-full bg-racing-green shadow-[0_0_8px_#00C896] w-[75%]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-racing-muted uppercase tracking-widest">
                     <span>Deployment Health: Excellent</span>
                     <span>75/100 Efficiency</span>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Payout History Table */}
      <div className="card-racing !p-0 !bg-racing-surface overflow-hidden shadow-border-glow">
         <div className="p-6 border-b border-racing-border bg-racing-primary flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Settlement Archives</h3>
            <History size={16} className="text-racing-muted" />
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.2em] border-b border-racing-border">
                     <th className="px-8 py-4">Release Date</th>
                     <th className="px-8 py-4">Asset ID</th>
                     <th className="px-8 py-4">Yield (USD)</th>
                     <th className="px-8 py-4 text-right">Settlement Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-racing-border">
                  {payouts.map(p => (
                     <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6 text-[13px] font-bold text-white uppercase tracking-tight">{p.date}</td>
                        <td className="px-8 py-6 text-[13px] font-medium text-racing-text-dim">{p.account}</td>
                        <td className="px-8 py-6 text-[14px] font-bold text-white font-mono group-hover:text-racing-green transition-colors">${p.amount.toFixed(2)}</td>
                        <td className="px-8 py-6 text-right">
                           <span className={cn(
                             "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border transition-all",
                             p.status === 'paid' ? "bg-racing-green/10 text-racing-green border-racing-green/20" : "bg-racing-muted/10 text-racing-muted border-racing-border"
                           )}>
                              {p.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
