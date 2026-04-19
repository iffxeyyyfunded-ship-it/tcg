'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ArrowUpRight, ShieldCheck, Activity, Users, DollarSign, Wallet } from 'lucide-react'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

const DUMMY_DATA = [
  { week: 'Week 1', revenue: 45000, pool: 18000 },
  { week: 'Week 2', revenue: 52000, pool: 20800 },
  { week: 'Week 3', revenue: 48000, pool: 19200 },
  { week: 'Week 4', revenue: 61000, pool: 24400 },
  { week: 'Week 5', revenue: 55000, pool: 22000 },
  { week: 'Week 6', revenue: 67000, pool: 26800 },
  { week: 'Week 7', revenue: 72000, pool: 28800 },
  { week: 'Week 8', revenue: 85000, pool: 34000 },
]

export default function TransparencyPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-tcg-black overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block bg-tcg-gold/10 border border-tcg-gold/30 rounded-full px-4 py-1.5 text-[10px] font-black text-tcg-gold uppercase tracking-[3px] mb-6">
               Public Trust
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
               WE PUBLISH <br /><span className="gold-text">EVERY NUMBER.</span>
            </h1>
            <p className="text-tcg-text text-xl max-w-2xl font-medium leading-relaxed">
               Live revenue, pool balances, and payout rates. Most firms hide the math. We make it the first thing you see.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
             {[
               { label: 'Total Revenue (All Time)', value: '$1.42M', icon: <DollarSign size={20} />, trend: '+12%' },
               { label: 'Current Pool Amount', value: '$84,200', icon: <Wallet size={20} />, trend: 'Live' },
               { label: 'Total Payouts Distributed', value: '$568K', icon: <ShieldCheck size={20} />, trend: 'Verified' },
               { label: 'Active Funded Traders', value: '1,240', icon: <Users size={20} />, trend: '+42' },
             ].map((stat, i) => (
                <div key={i} className="p-8 bg-tcg-card border border-tcg-border rounded-[32px] hover:border-tcg-gold/30 transition-all">
                   <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-white/5 rounded-2xl text-tcg-gold">{stat.icon}</div>
                      <div className="text-[10px] font-black text-tcg-green uppercase tracking-widest">{stat.trend}</div>
                   </div>
                   <div className="text-xs text-tcg-muted font-black uppercase tracking-widest mb-1">{stat.label}</div>
                   <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                </div>
             ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
             {/* Weekly Revenue */}
             <div className="p-8 bg-tcg-card border border-tcg-border rounded-[40px]">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-lg font-black text-white uppercase tracking-tight">Weekly Revenue</h3>
                   <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest">Last 12 Weeks</div>
                </div>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DUMMY_DATA}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                         <XAxis 
                            dataKey="week" 
                            stroke="#555" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                         />
                         <YAxis 
                            stroke="#555" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(v: any) => `$${v / 1000}k`}
                         />
                         <Tooltip 
                            contentStyle={{ background: '#111', border: '1px solid #2A2A2A', borderRadius: '12px' }}
                            itemStyle={{ color: '#F5C842' }}
                         />
                         <Bar dataKey="revenue" fill="#F5C842" radius={[4, 4, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Pool Growth */}
             <div className="p-8 bg-tcg-card border border-tcg-border rounded-[40px]">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-lg font-black text-white uppercase tracking-tight">Pool Allocation</h3>
                   <div className="text-[10px] text-tcg-muted font-black uppercase tracking-widest">40% Revenue Weighted</div>
                </div>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={DUMMY_DATA}>
                         <defs>
                            <linearGradient id="colorPool" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#F5C842" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#F5C842" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                         <XAxis 
                            dataKey="week" 
                            stroke="#555" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                         />
                         <YAxis 
                            stroke="#555" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(v: any) => `$${v / 1000}k`}
                         />
                         <Tooltip 
                            contentStyle={{ background: '#111', border: '1px solid #2A2A2A', borderRadius: '12px' }}
                            itemStyle={{ color: '#F5C842' }}
                         />
                         <Area type="monotone" dataKey="pool" stroke="#F5C842" fillOpacity={1} fill="url(#colorPool)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Proof of Stake / Payout History */}
          <div className="p-8 bg-tcg-card border border-tcg-border rounded-[40px] overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Recent Payouts</h3>
                   <p className="text-sm text-tcg-text font-medium">Verified Friday settlements.</p>
                </div>
                <div className="p-4 bg-tcg-green/10 border border-tcg-green/30 rounded-2xl flex items-center gap-3">
                   <Activity className="text-tcg-green animate-pulse" size={16} />
                   <span className="text-[10px] font-black text-tcg-green uppercase tracking-widest">Network Live</span>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-[10px] font-black text-tcg-muted uppercase tracking-[3px] border-b border-white/5">
                         <th className="pb-4">Date</th>
                         <th className="pb-4">Account Size</th>
                         <th className="pb-4">Score</th>
                         <th className="pb-4 text-right">Payout Amount</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm">
                      {[
                        { date: 'Apr 18, 2026', size: '$200K', score: '8.42', amount: '$4,210.00' },
                        { date: 'Apr 18, 2026', size: '$100K', score: '12.10', amount: '$6,050.50' },
                        { date: 'Apr 18, 2026', size: '$50K', score: '5.20', amount: '$2,600.00' },
                        { date: 'Apr 18, 2026', size: '$200K', score: '7.15', amount: '$3,575.00' },
                        { date: 'Apr 18, 2026', size: '$10K', score: '3.40', amount: '$1,700.00' },
                      ].map((p, i) => (
                         <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <td className="py-6 font-bold text-white">{p.date}</td>
                            <td className="py-6 text-tcg-text">{p.size}</td>
                            <td className="py-6 font-mono text-tcg-gold">{p.score}</td>
                            <td className="py-6 text-right font-black text-white">{p.amount}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             <div className="mt-8 text-center text-[10px] font-black text-tcg-muted uppercase tracking-[3px]">
                Showing last 5 of <span className="text-white">1,240</span> payouts.
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
