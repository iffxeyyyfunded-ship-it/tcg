'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  Settings, 
  LogOut, 
  TrendingUp, 
  ShieldCheck, 
  Bell,
  Menu,
  X,
  CreditCard,
  UserCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
  { label: 'My Accounts', icon: <CreditCard size={20} />, href: '/dashboard/accounts' },
  { label: 'Payouts', icon: <History size={20} />, href: '/dashboard/payout' },
  { label: 'KYC / Verification', icon: <UserCheck size={20} />, href: '/dashboard/kyc' },
  { label: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    }
    checkUser()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-tcg-black text-white flex overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-tcg-border flex-col p-6 space-y-8 bg-[#080808]">
        <Link href="/" className="flex items-center gap-3 px-2 group">
           <div className="w-10 h-10 bg-tcg-gold rounded-lg flex items-center justify-center font-black text-tcg-black text-xl transition-transform group-hover:scale-110">TCG</div>
           <span className="font-black tracking-[4px] text-lg">FUNDED</span>
        </Link>

        <nav className="flex-1 space-y-2">
           {SIDEBAR_ITEMS.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-tcg-text hover:text-white hover:bg-white/5 transition-all group"
              >
                 <span className="text-tcg-muted group-hover:text-tcg-gold transition-colors">{item.icon}</span>
                 <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
           ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
           <button 
             onClick={handleSignOut}
             className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-tcg-red hover:bg-tcg-red/10 transition-all font-bold uppercase tracking-widest text-sm"
           >
              <LogOut size={20} /> Sign Out
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
               <span className="font-black tracking-[2px] text-sm">TCG</span>
            </div>

            <div className="flex-1 px-6 hidden lg:block">
               <div className="text-xs font-black text-tcg-muted uppercase tracking-[3px]">Good morning, <span className="text-white capitalize">{user.email?.split('@')[0]}</span></div>
            </div>

            <div className="flex items-center gap-4">
               <button className="w-10 h-10 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-tcg-text hover:text-white transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-tcg-gold rounded-full" />
               </button>
               <div className="w-10 h-10 bg-tcg-gold rounded-full flex items-center justify-center">
                  <TrendingUp size={20} className="text-tcg-black" />
               </div>
            </div>
         </header>

         {/* Dashboard Page Content */}
         <main className="flex-1 p-6 md:p-10">
            {children}
         </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={cn(
        "fixed inset-0 bg-tcg-black/80 backdrop-blur-sm z-[100] transition-all duration-300 pointer-events-none opacity-0 lg:hidden",
        sidebarOpen && "opacity-100 pointer-events-auto"
      )} onClick={() => setSidebarOpen(false)}>
         <div 
           className={cn(
             "w-72 h-full bg-[#080808] border-r border-tcg-border p-6 flex flex-col transition-transform duration-300 -translate-x-full",
             sidebarOpen && "translate-x-0"
           )} 
           onClick={e => e.stopPropagation()}
         >
            <div className="flex items-center justify-between mb-12">
               <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-tcg-gold rounded-lg"></div >
                  <span className="font-bold tracking-widest uppercase">TCG</span>
               </div>
               <button onClick={() => setSidebarOpen(false)}><X size={24} /></button>
            </div>
            <nav className="flex-1 space-y-2">
              {SIDEBAR_ITEMS.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-tcg-text"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                  </Link>
              ))}
            </nav>
         </div>
      </div>
    </div>
  )
}
