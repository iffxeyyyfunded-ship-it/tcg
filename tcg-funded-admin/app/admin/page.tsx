'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  ArrowUpRight, 
  CheckCircle2,
  XCircle,
  Activity,
  BarChart4
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAccounts: 0,
    totalRevenue: 0,
    pendingKYC: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchAdminStats = async () => {
      // Logic for fetching admin stats
      setStats({
        totalUsers: 1420,
        activeAccounts: 842,
        totalRevenue: 1420500,
        pendingKYC: 12
      })
      setLoading(false)
    }
    fetchAdminStats()
  }, [supabase])

  if (loading) return null

  return (
    <div className="space-y-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
         <div>
            <span className="section-label">Fleet Command</span>
            <h1 className="text-4xl font-bold text-white tracking-tight uppercase">Admin Terminal</h1>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-racing-muted group-hover:text-racing-green transition-colors" size={16} />
               <input 
                 type="text" 
                 placeholder="Search Operator ID..." 
                 className="bg-racing-surface border border-racing-border rounded-md pl-10 pr-4 py-2 text-xs font-bold uppercase tracking-widest text-white focus:border-racing-green outline-none w-64 transition-all"
               />
            </div>
         </div>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Fleet', value: stats.totalUsers, icon: <Users size={20} />, color: 'text-white' },
          { label: 'Active Capital', value: stats.activeAccounts, icon: <Activity size={20} />, color: 'text-racing-green' },
          { label: 'Gross Settlement', value: `$${(stats.totalRevenue / 1000000).toFixed(2)}M`, icon: <DollarSign size={20} />, color: 'text-white' },
          { label: 'Pending Verification', value: stats.pendingKYC, icon: <ShieldAlert size={20} />, color: 'text-danger' },
        ].map((stat, i) => (
          <div key={i} className="card-racing !p-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-racing-muted/10">
               {stat.icon}
            </div>
            <span className="stat-label">{stat.label}</span>
            <div className={cn("text-2xl font-bold font-mono mt-1", stat.color)}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Admin Panels */}
      <div className="grid lg:grid-cols-12 gap-6">
         {/* Live Performance Feed */}
         <div className="lg:col-span-8 card-racing !p-0 !bg-racing-surface overflow-hidden">
            <div className="p-6 border-b border-racing-border bg-racing-primary flex items-center justify-between">
               <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Live Fleet Activity</h3>
               <BarChart4 size={16} className="text-racing-muted" />
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.2em] border-b border-racing-border">
                        <th className="px-8 py-4">Operator</th>
                        <th className="px-8 py-4">Equity Delta</th>
                        <th className="px-8 py-4">Efficiency Score</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-racing-border">
                     {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                           <td className="px-8 py-6">
                              <p className="text-[13px] font-bold text-white uppercase">TRDR-XJ82-{i}</p>
                              <p className="text-[10px] text-racing-muted font-bold tracking-widest uppercase">Forex · $100K Account</p>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-sm font-bold text-racing-green font-mono">+$2,420.50</span>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-sm font-bold text-white font-mono">84.22</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button title="View operator details" className="p-2 border border-racing-border rounded text-racing-muted hover:text-white hover:border-racing-green transition-all">
                                 <ArrowUpRight size={16} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Verification Queue */}
         <div className="lg:col-span-4 space-y-6">
            <div className="card-racing !bg-racing-surface !p-8 shadow-border-glow">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">KYC Backlog</h3>
                  <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
               </div>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="p-4 bg-racing-primary border border-racing-border rounded-lg group hover:border-racing-green/30 transition-all flex items-center justify-between">
                        <div>
                           <p className="text-[12px] font-bold text-white uppercase tracking-tight">Operator {i}402</p>
                           <p className="text-[10px] text-racing-muted font-bold uppercase tracking-widest">Passport · Verify</p>
                        </div>
                        <div className="flex gap-2">
                           <button title="Approve verification" className="w-8 h-8 rounded bg-racing-green/10 flex items-center justify-center text-racing-green border border-racing-green/20 hover:bg-racing-green hover:text-black transition-all">
                              <CheckCircle2 size={16} />
                           </button>
                           <button title="Reject verification" className="w-8 h-8 rounded bg-danger/10 flex items-center justify-center text-danger border border-danger/20 hover:bg-danger hover:text-white transition-all">
                              <XCircle size={16} />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-3 bg-racing-primary border border-racing-border text-[10px] font-bold text-racing-muted uppercase tracking-[0.4em] hover:text-white transition-colors">
                  Open Verification Terminal
               </button>
            </div>

            <div className="card-racing !bg-racing-surface !p-8">
               <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-6">Settlement Queue</h3>
               <div className="text-center py-4">
                  <div className="text-3xl font-bold text-racing-green font-mono mb-2">$17,120.50</div>
                  <p className="text-[10px] text-racing-muted font-bold uppercase tracking-widest">Next Window Total</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
