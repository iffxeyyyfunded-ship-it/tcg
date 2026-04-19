'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, 
  ArrowUpRight, 
  Trophy, 
  ShieldAlert, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity
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
        const { data: accounts } = await supabase.from('accounts').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
        
        setProfile(profile)
        setAccounts(accounts || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) return null

  const totalValue = accounts.reduce((acc, curr) => acc + parseFloat(curr.current_balance), 0)
  const totalPayouts = accounts.reduce((acc, curr) => acc + parseFloat(curr.total_payouts_received || 0), 0)
  const avgScore = accounts.length > 0 ? (accounts.reduce((acc, curr) => acc + parseFloat(curr.current_score || 0), 0) / accounts.length).toFixed(2) : "0.00"

  return (
    <div className="space-y-12">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="section-label">Command Center</span>
          <h1 className="text-4xl font-bold text-white tracking-tight leading-none">Trader Overview</h1>
        </div>
        <Link 
          href="/pricing"
          className="btn-primary flex items-center gap-2 group"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          New Capital Allocation
        </Link>
      </div>

      {/* Verification Warning */}
      {profile?.kyc_status !== 'approved' && (
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">KYC Verification Missing</h4>
              <p className="text-xs text-racing-text-dim">Your account is active, but you must complete verification to enable payouts.</p>
            </div>
          </div>
          <Link href="/dashboard/kyc" className="px-4 py-2 border border-danger/30 text-danger rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-danger hover:text-white transition-all">
            Start KYC
          </Link>
        </div>
      )}

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Aggregate Equity', value: `$${totalValue.toLocaleString()}`, icon: <TrendingUp size={20} />, accent: 'text-white' },
          { label: 'Total Withdrawals', value: `$${totalPayouts.toLocaleString()}`, icon: <ShieldAlert size={20} />, accent: 'text-racing-green' },
          { label: 'Mean Performance Score', value: avgScore, icon: <Trophy size={20} />, accent: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="card-racing overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-racing-muted/10 group-hover:text-racing-green/10 transition-colors">
              {stat.icon}
            </div>
            <span className="stat-label">{stat.label}</span>
            <div className={cn("stat-value", stat.accent)}>{stat.value}</div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-racing-muted uppercase tracking-wider">
               <Activity size={12} className="text-racing-green" /> Live Market Feed Active
            </div>
          </div>
        ))}
      </div>

      {/* Accounts Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-racing-border pb-4">
          <h3 className="text-xl font-bold text-white tracking-tight uppercase">Capital Accounts</h3>
          <Link href="/dashboard/accounts" className="text-[11px] font-bold text-racing-muted hover:text-racing-green transition-colors uppercase tracking-widest">Manage All Assets</Link>
        </div>

        {accounts.length === 0 ? (
          <div className="py-24 border border-dashed border-racing-border rounded-xl text-center bg-racing-surface/30">
            <div className="w-16 h-16 bg-racing-primary border border-racing-border rounded-xl flex items-center justify-center text-racing-muted mx-auto mb-6">
              <Plus size={32} />
            </div>
            <h4 className="text-white font-bold mb-2">No Active Funding Found</h4>
            <p className="text-racing-text-dim text-sm max-w-xs mx-auto mb-8">Deploy your first capital allocation and start your funded trading journey today.</p>
            <Link href="/pricing" className="btn-primary inline-flex px-10">Purchase Training Account</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map(acc => (
              <div key={acc.id} className="card-racing group">
                <div className="flex items-center justify-between mb-8 border-b border-racing-border pb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      acc.status === 'active' ? "bg-racing-green/10 text-racing-green" : "bg-racing-muted/10 text-racing-muted"
                    )}>
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-white leading-none mb-1 font-mono uppercase">{acc.account_number}</p>
                      <p className="text-[10px] font-bold text-racing-muted tracking-widest uppercase">{acc.market} · {acc.drawdown_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/5">
                      ${(acc.account_size / 1000).toFixed(0)}K ALLOCATED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div>
                    <span className="stat-label">Net Equity</span>
                    <p className="text-lg font-bold text-white font-mono">${acc.current_balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="stat-label">Behavioral Score</span>
                    <p className="text-lg font-bold text-racing-green font-mono">{acc.current_score || '0.00'}</p>
                  </div>
                  <div>
                    <span className="stat-label">Max Loss Gap</span>
                    <p className="text-lg font-bold text-danger font-mono">{acc.max_drawdown_pct}%</p>
                  </div>
                </div>

                <Link 
                  href={`/dashboard/accounts/${acc.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-racing-primary border border-racing-border text-[11px] font-bold text-racing-text-dim uppercase tracking-widest hover:border-racing-green hover:text-white transition-all"
                >
                  View Performance Terminal <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance History (Recent Activity) */}
      <div className="card-racing !bg-racing-surface !p-0 overflow-hidden">
        <div className="p-6 border-b border-racing-border bg-racing-primary flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Transaction Log</h3>
          <Activity size={16} className="text-racing-muted" />
        </div>
        
        <div className="p-1">
          {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-6 p-5 hover:bg-white/5 transition-all group rounded-lg">
                <div className="w-10 h-10 rounded bg-racing-primary border border-racing-border flex items-center justify-center text-racing-green shrink-0">
                   <TrendingUp size={18} />
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-[13px] font-bold text-white uppercase tracking-tight truncate">Equity Synchronization Triggered</p>
                   <p className="text-[11px] text-racing-muted font-medium">Daily trade reconciliation complete for TCG-MASTER-00{i}. Performance data verified.</p>
                </div>
                <div className="text-right shrink-0">
                   <p className="text-sm font-bold text-racing-green font-mono">+0.42%</p>
                   <p className="text-[10px] text-racing-muted font-bold uppercase tracking-widest mt-1">2h ago</p>
                </div>
             </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-racing-border text-center bg-racing-primary/30">
          <button className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.3em] hover:text-white transition-colors">Sync Archives</button>
        </div>
      </div>
    </div>
  )
}
