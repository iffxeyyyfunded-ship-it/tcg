'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Bell,
  Menu,
  X,
  CreditCard,
  UserCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
  { label: 'My Accounts', icon: <CreditCard size={18} />, href: '/dashboard/accounts' },
  { label: 'Payout Hub', icon: <History size={18} />, href: '/dashboard/payout' },
  { label: 'Verification', icon: <UserCheck size={18} />, href: '/dashboard/kyc' },
  { label: 'Settings', icon: <Settings size={18} />, href: '/dashboard/settings' },
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
    <div className="min-h-screen bg-racing-primary text-white flex overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-[240px] border-r border-racing-border flex-col bg-[#0D0D0D] z-50">
        <div className="h-16 flex items-center px-6 border-b border-racing-border">
          <Link href="/" className="flex items-center gap-3 group">
             <img 
               src="/brand/logo.png" 
               alt="TCG Funded" 
               className="h-8 w-auto transition-transform group-hover:scale-105" 
             />
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-8 overflow-y-auto">
          <div>
            <span className="section-label px-2">Main Menu</span>
            <nav className="space-y-1">
               {SIDEBAR_ITEMS.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-racing-text-dim hover:text-white hover:bg-white/5 transition-all group"
                  >
                     <span className="text-racing-muted group-hover:text-racing-green transition-colors">{item.icon}</span>
                     <span className="text-[13px] font-semibold tracking-wide">{item.label}</span>
                  </Link>
               ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-racing-border bg-racing-surface/30">
           <button 
             onClick={handleSignOut}
             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-danger hover:bg-danger/10 transition-all font-bold text-xs uppercase tracking-widest"
           >
              <LogOut size={18} /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative bg-dots">
         {/* Top Bar */}
         <header className="h-16 border-b border-racing-border bg-racing-primary/50 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4 lg:hidden">
               <button 
                 onClick={() => setSidebarOpen(true)} 
                 aria-label="Open sidebar"
                 className="p-2 text-racing-text-dim hover:text-white transition-colors"
               >
                  <Menu size={20} />
               </button>
               <span className="font-bold tracking-[2px] text-xs">TCG</span>
            </div>

            <div className="flex-1 px-4 hidden lg:block">
               <div className="text-[11px] font-bold text-racing-muted uppercase tracking-[3px]">
                 Account: <span className="text-white">Active</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button 
                 aria-label="View notifications"
                 className="w-9 h-9 border border-racing-border rounded-md flex items-center justify-center text-racing-text-dim hover:text-white hover:border-racing-border-hover transition-colors relative"
               >
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-racing-green rounded-full shadow-[0_0_8px_#00C896]" />
               </button>
               <div className="flex items-center gap-3 pl-4 border-l border-racing-border">
                  <div className="text-right hidden sm:block">
                    <p className="text-[12px] font-bold text-white leading-none mb-1 capitalize">{user.email?.split('@')[0]}</p>
                    <p className="text-[10px] font-medium text-racing-muted uppercase tracking-wider">Trader ID: {user.id.slice(0, 8)}</p>
                  </div>
                  <div className="w-9 h-9 bg-racing-green/10 border border-racing-green/20 rounded-full flex items-center justify-center">
                    <TrendingUp size={18} className="text-racing-green" />
                  </div>
               </div>
            </div>
         </header>

         {/* Dashboard Page Content */}
         <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
               {children}
            </div>
         </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={cn(
        "fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-all duration-300 pointer-events-none opacity-0 lg:hidden",
        sidebarOpen && "opacity-100 pointer-events-auto"
      )} onClick={() => setSidebarOpen(false)}>
         <div 
           className={cn(
             "w-[240px] h-full bg-[#0D0D0D] border-r border-racing-border flex flex-col transition-transform duration-300 -translate-x-full",
             sidebarOpen && "translate-x-0"
           )} 
           onClick={e => e.stopPropagation()}
         >
            <div className="h-16 flex items-center justify-between px-6 border-b border-racing-border">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-racing-green rounded flex items-center justify-center font-bold text-black text-sm tracking-tighter">TCG</div>
                  <span className="font-bold tracking-[0.2em] text-sm">FUNDED</span>
               </div>
               <button 
                 onClick={() => setSidebarOpen(false)} 
                 aria-label="Close sidebar"
                 className="text-racing-text-dim hover:text-white transition-colors"
               >
                 <X size={20} />
               </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {SIDEBAR_ITEMS.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-racing-text-dim"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="text-[13px] font-semibold tracking-wide">{item.label}</span>
                  </Link>
              ))}
            </nav>
         </div>
      </div>
    </div>
  )
}
