import Link from 'next/link';
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  BarChart4,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null)
  const [recentKYC, setRecentKYC] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Fetch some aggregate stats
      const { data: profiles } = await supabase.from('profiles').select('id, kyc_status', { count: 'exact' })
      const { data: accounts } = await supabase.from('accounts').select('id, account_size', { count: 'exact' })
      const { data: revenue } = await supabase.from('revenue_records').select('gross_revenue')
      
      const { data: kycQueue } = await supabase
        .from('profiles')
        .select('*')
        .eq('kyc_status', 'submitted')
        .limit(5)

      setStats({
        traders: profiles?.length || 0,
        accounts: accounts?.length || 0,
        revenue: revenue?.reduce((acc, curr) => acc + parseFloat(curr.gross_revenue), 0) || 0,
        pendingKYC: profiles?.filter(p => p.kyc_status === 'submitted').length || 0
      })
      setRecentKYC(kycQueue || [])
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) return null

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              System Command
            </h1>
            <p className="text-tcg-text text-sm font-bold uppercase tracking-widest">
              Live Network Statistics
            </p>
         </div>
         <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:border-tcg-green transition-all">
               System Log
            </button>
            <button className="px-6 py-3 bg-tcg-green text-tcg-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-400 transition-colors">
               Manual Sync
            </button>
         </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Total Traders', value: stats.traders, icon: <Users size={20} />, color: 'text-white' },
           { label: 'Active Accounts', value: stats.accounts, icon: <BarChart4 size={20} />, color: 'text-white' },
           { label: 'Gross Revenue', value: `$${(stats.revenue / 1000).toFixed(1)}K`, icon: <Wallet size={20} />, color: 'text-tcg-green' },
           { label: 'Pending KYC', value: stats.pendingKYC, icon: <CheckCircle2 size={20} />, color: 'text-tcg-gold' },
         ].map((s, i) => (
            <div key={i} className="p-8 bg-[#080808] border border-tcg-border rounded-[32px] group hover:border-white/20 transition-all">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl text-tcg-muted group-hover:text-white transition-colors">{s.icon}</div>
                  <ArrowUpRight size={16} className="text-tcg-muted opacity-0 group-hover:opacity-100 transition-all" />
               </div>
               <div className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-2">{s.label}</div>
               <div className={cn("text-4xl font-black", s.color)} style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
            </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         {/* KYC Queue Summary */}
         <div className="bg-tcg-card border border-tcg-border rounded-[40px] p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>KYC Queue</h3>
               <Link href="/admin/kyc" className="text-[10px] font-black text-tcg-green uppercase tracking-[3px] hover:underline">View All</Link>
            </div>
            
            {recentKYC.length === 0 ? (
              <div className="py-12 border border-dashed border-tcg-border rounded-3xl text-center text-tcg-muted font-bold text-sm">
                 Queue is clear. Great work!
              </div>
            ) : (
              <div className="space-y-4">
                 {recentKYC.map(p => (
                   <div key={p.id} className="flex items-center justify-between p-4 bg-tcg-black border border-white/5 rounded-2xl group hover:border-tcg-green/30 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black italic">PK</div>
                         <div>
                            <div className="text-sm font-bold text-white leading-none mb-1">{p.email}</div>
                            <div className="text-[10px] text-tcg-muted uppercase tracking-widest">{p.full_name || 'Anonymous'}</div>
                         </div>
                      </div>
                      <Link href={`/admin/kyc/${p.id}`} className="p-3 rounded-xl bg-tcg-green/10 text-tcg-green hover:bg-tcg-green hover:text-tcg-black transition-all">
                         <Activity size={18} />
                      </Link>
                   </div>
                 ))}
              </div>
            )}
         </div>

         {/* System Performance / Pool Status */}
         <div className="bg-tcg-card border border-tcg-border rounded-[40px] p-8 md:p-10">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Pool Status</h3>
                <div className="px-3 py-1 bg-tcg-green/10 border border-tcg-green/30 rounded-full text-[10px] font-black text-tcg-green uppercase tracking-widest">Active</div>
             </div>

             <div className="space-y-6">
                <div className="p-8 bg-tcg-black border border-white/5 rounded-3xl flex items-center justify-between">
                   <div>
                      <div className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-2">Weekly Revenue</div>
                      <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>$42,800</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] text-tcg-muted font-black uppercase tracking-[3px] mb-2">Pool Allocation (40%)</div>
                      <div className="text-3xl font-black text-tcg-gold" style={{ fontFamily: 'var(--font-display)' }}>$17,120</div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-[#0B0B0B] border border-white/5 rounded-2xl">
                      <div className="text-[9px] text-tcg-muted font-black uppercase tracking-[2px] mb-1">Trader Entries</div>
                      <div className="text-xl font-bold text-white">42 Active</div>
                   </div>
                   <div className="p-6 bg-[#0B0B0B] border border-white/5 rounded-2xl">
                      <div className="text-[9px] text-tcg-muted font-black uppercase tracking-[2px] mb-1">Total Scores</div>
                      <div className="text-xl font-bold text-white">284.42</div>
                   </div>
                </div>

                <button className="w-full btn-gold py-5 rounded-2xl font-black tracking-widest uppercase text-sm flex items-center justify-center gap-3">
                   <TrendingUp size={18} /> Process Weekly Payouts
                </button>
             </div>
         </div>
      </div>
    </div>
  )
}
