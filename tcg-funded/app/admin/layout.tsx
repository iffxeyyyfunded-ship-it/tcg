'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  ShieldCheck, 
  Users, 
  Wallet, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Bell,
  Menu,
  X,
  Activity,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ADMIN_SIDEBAR_ITEMS = [
  { label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/admin' },
  { label: 'Traders', icon: <Users size={20} />, href: '/admin/traders' },
  { label: 'KYC Queue', icon: <UserCheck size={20} />, href: '/admin/kyc' },
  { label: 'Payout Requests', icon: <Wallet size={20} />, href: '/admin/payouts' },
  { label: 'Revenue & Pools', icon: <Activity size={20} />, href: '/admin/revenue' },
  { label: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
]

function LayoutDashboard({ size }: { size: number }) { return <ShieldCheck size={size} /> }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      
      if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
        router.push('/dashboard')
      } else {
        setAdmin(session.user)
      }
    }
    checkAdmin()
  }, [supabase, router])

  if (!admin) return null

  return (
    <div className="min-h-screen bg-tcg-black text-white flex overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-tcg-border flex-col p-6 space-y-8 bg-[#050505]">
        <Link href="/" className="flex items-center gap-3 px-2 group">
           <div className="w-10 h-10 bg-tcg-green rounded-lg flex items-center justify-center font-black text-tcg-black text-xl transition-transform group-hover:scale-110">TCG</div>
           <span className="font-black tracking-[4px] text-lg text-tcg-green">ADMIN</span>
        </Link>

        <nav className="flex-1 space-y-2">
           {ADMIN_SIDEBAR_ITEMS.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-tcg-text hover:text-white hover:bg-white/5 transition-all group"
              >
                 <span className="text-tcg-muted group-hover:text-tcg-green transition-colors">{item.icon}</span>
                 <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
           ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
           <button 
             onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
             className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-tcg-red hover:bg-tcg-red/10 transition-all font-bold uppercase tracking-widest text-sm"
           >
              <LogOut size={20} /> Exit Admin
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto relative">
         {/* Top Bar */}
         <header className="h-20 border-b border-tcg-border bg-tcg-black/50 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4 lg:hidden">
               <button onClick={() => setSidebarOpen(true)} className="p-2 text-tcg-text">
                  <Menu size={24} />
               </button>
               <span className="font-black tracking-[2px] text-sm text-tcg-green">ADMIN</span>
            </div>

            <div className="flex-1 px-6 hidden lg:block">
               <div className="text-xs font-black text-tcg-muted uppercase tracking-[3px]">System Health: <span className="text-tcg-green">Optimal</span></div>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 px-4 py-2 bg-tcg-green/10 border border-tcg-green/20 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-tcg-green animate-pulse" />
                  <span className="text-[10px] font-black text-tcg-green uppercase tracking-widest">Live Operations</span>
               </div>
            </div>
         </header>

         {/* Admin Page Content */}
         <main className="flex-1 p-6 md:p-10">
            {children}
         </main>
      </div>
    </div>
  )
}
