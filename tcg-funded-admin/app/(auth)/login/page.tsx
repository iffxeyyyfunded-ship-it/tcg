'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight, Lock, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-racing-primary flex items-center justify-center px-6 font-sans bg-dots">
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-3 justify-center mb-12 group">
          <img 
            src="/brand/logo.png" 
            alt="TCG Funded" 
            className="h-12 w-auto transition-transform group-hover:scale-105" 
          />
        </Link>

        <div className="card-racing !p-10 !bg-racing-surface shadow-border-glow">
          <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">Access Terminal</h1>
          <p className="text-[13px] text-racing-muted mb-8 font-medium">Authentication required for platform entry.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-racing-muted uppercase tracking-widest mb-3">Email Manifest</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-racing-primary border border-racing-border rounded px-4 py-4 text-sm text-white focus:border-racing-green transition-all outline-none placeholder:text-racing-muted/30"
                placeholder="operator@tcgfunded.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-racing-muted uppercase tracking-widest mb-3">Access Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-racing-primary border border-racing-border rounded px-4 py-4 text-sm text-white focus:border-racing-green transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-danger/10 border border-danger/20 rounded text-danger text-xs font-bold">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full btn-primary h-14 flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? <Loader2 className="animate-spin text-black" /> : <>DEPART TO DASHBOARD <ArrowRight size={18} className="text-black group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <Link href="/register" className="text-[12px] text-racing-muted hover:text-racing-green transition-colors font-bold uppercase tracking-widest">
              No Operational ID? <span className="text-white">Initialize Account</span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-racing-muted/30 text-[9px] font-bold uppercase tracking-[0.3em] pt-4 border-t border-racing-border">
               <ShieldCheck size={12} /> Secure F1-Grade Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
