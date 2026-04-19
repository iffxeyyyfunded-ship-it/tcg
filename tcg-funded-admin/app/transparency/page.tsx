'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ShieldCheck, Activity, Users, DollarSign, Wallet, TrendingUp } from 'lucide-react'
import Navbar from '@/components/marketing/Navbar'
import Footer from '@/components/marketing/Footer'

const DUMMY_DATA = [
  { week: 'W1', revenue: 45000, pool: 18000 },
  { week: 'W2', revenue: 52000, pool: 20800 },
  { week: 'W3', revenue: 48000, pool: 19200 },
  { week: 'W4', revenue: 61000, pool: 24400 },
  { week: 'W5', revenue: 55000, pool: 22000 },
  { week: 'W6', revenue: 67000, pool: 26800 },
  { week: 'W7', revenue: 72000, pool: 28800 },
  { week: 'W8', revenue: 85000, pool: 34000 },
]

export default function TransparencyPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-racing-primary overflow-x-hidden font-sans">
      <Navbar />
      
      <main className="pt-32 pb-24 bg-dots">
        <div className="container">
          {/* Header */}
          <div className="mb-20">
            <span className="section-label">Public Trust Terminal</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
               RADICAL <br /><span className="text-racing-green">TRANSPARENCY.</span>
            </h1>
            <p className="text-racing-text-dim text-lg md:text-xl max-w-2xl leading-relaxed">
               Most firms hide the math. We publish every dollar. 
               Live revenue, pool balances, and verified payouts—available 24/7.
            </p>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
             {[
               { label: 'Cumulative Revenue', value: '$1.42M', icon: <DollarSign size={20} />, trend: '+12.4%' },
               { label: 'Active Pool Balance', value: '$84,200', icon: <Wallet size={20} />, trend: 'Live' },
               { label: 'Paid Settlements', value: '$568K', icon: <ShieldCheck size={20} />, trend: 'Verified' },
               { label: 'Funded Operators', value: '1,240', icon: <Users size={20} />, trend: '+42' },
             ].map((stat, i) => (
                <div key={i} className="card-racing group !bg-racing-surface">
                   <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-10 rounded-lg bg-racing-green/10 flex items-center justify-center text-racing-green">
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-bold text-racing-green bg-racing-green/10 px-2 py-1 rounded">
                        {stat.trend}
                      </span>
                   </div>
                   <span className="stat-label">{stat.label}</span>
                   <div className="text-3xl font-bold text-white font-mono mt-1">{stat.value}</div>
                </div>
             ))}
          </div>

          {/* Visual Analytics Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
             {/* Revenue Flow Chart */}
             <div className="card-racing !bg-racing-surface !p-8">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-1">Revenue Generation</h3>
                      <p className="text-[11px] text-racing-muted font-medium">Weekly Inflow Analysis</p>
                   </div>
                   <Activity size={16} className="text-racing-muted" />
                </div>
                <div className="h-[280px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DUMMY_DATA}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                         <XAxis 
                            dataKey="week" 
                            stroke="#444" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                         />
                         <YAxis 
                            stroke="#444" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(v: any) => `$${v / 1000}k`}
                         />
                         <Tooltip 
                            contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#00C896' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                         />
                         <Bar dataKey="revenue" fill="#00C896" radius={[2, 2, 0, 0]} barSize={32} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Pool Growth Chart */}
             <div className="card-racing !bg-racing-surface !p-8">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-1">Payout Pool Depth</h3>
                      <p className="text-[11px] text-racing-muted font-medium">40% Revenue Allocation Flow</p>
                   </div>
                   <TrendingUp size={16} className="text-racing-muted" />
                </div>
                <div className="h-[280px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={DUMMY_DATA}>
                         <defs>
                            <linearGradient id="colorPool" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#00C896" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="#00C896" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                         <XAxis 
                            dataKey="week" 
                            stroke="#444" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                         />
                         <YAxis 
                            stroke="#444" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(v: any) => `$${v / 1000}k`}
                         />
                         <Tooltip 
                            contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#00C896' }}
                         />
                         <Area type="monotone" dataKey="pool" stroke="#00C896" strokeWidth={2} fillOpacity={1} fill="url(#colorPool)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Settlement Proof Table */}
          <div className="card-racing !bg-racing-surface !p-0 overflow-hidden shadow-border-glow">
             <div className="p-8 border-b border-racing-border bg-racing-primary flex items-center justify-between">
                <div>
                   <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">Verified Settlements</h3>
                   <p className="text-xs text-racing-text-dim font-medium">Live processing logs for Friday payoffs.</p>
                </div>
                <div className="p-4 bg-racing-green/5 border border-racing-green/20 rounded flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-racing-green animate-pulse" />
                   <span className="text-[10px] font-bold text-racing-green uppercase tracking-[0.2em]">Settlement Engine: Online</span>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-racing-primary border-b border-racing-border">
                      <tr className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.3em]">
                         <th className="px-8 py-4">Trade Window</th>
                         <th className="px-8 py-4">Allocation</th>
                         <th className="px-8 py-4">Relative Score</th>
                         <th className="px-8 py-4 text-right">Settlement (USD)</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-racing-border">
                      {[
                        { date: 'Friday — APR 18', size: '$200K Account', score: '8.42', amount: '$4,210.00' },
                        { date: 'Friday — APR 18', size: '$100K Account', score: '12.10', amount: '$6,050.50' },
                        { date: 'Friday — APR 11', size: '$200K Account', score: '15.20', amount: '$8,600.00' },
                        { date: 'Friday — APR 04', size: '$50K Account', score: '7.15', amount: '$3,575.00' },
                        { date: 'Friday — APR 04', size: '$10K Account', score: '3.40', amount: '$1,700.00' },
                      ].map((p, i) => (
                         <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                            <td className="px-8 py-6 text-[13px] font-bold text-white">{p.date}</td>
                            <td className="px-8 py-6 text-[13px] font-medium text-racing-text-dim">{p.size}</td>
                            <td className="px-8 py-6 text-[14px] font-bold text-racing-green font-mono">{p.score}</td>
                            <td className="px-8 py-6 text-right text-[14px] font-bold text-white font-mono group-hover:text-racing-green transition-colors">{p.amount}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             <div className="p-6 bg-racing-primary border-t border-racing-border text-center">
                <span className="text-[10px] font-bold text-racing-muted uppercase tracking-[0.4em]">
                   Audited by TCG Settlement Protocol
                </span>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
