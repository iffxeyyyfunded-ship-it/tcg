'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          kyc_status: 'not_submitted',
          referral_code: Math.random().toString(36).substring(2, 10).toUpperCase()
        }
      }
    })

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
          <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">Initialize ID</h1>
          <p className="text-[13px] text-racing-muted mb-8 font-medium">Join the high-performance revenue fleet.</p>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-racing-muted uppercase tracking-widest mb-3">Target Email</label>
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
              <label className="block text-[11px] font-bold text-racing-muted uppercase tracking-widest mb-3">System Access Key</label>
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
              {loading ? <Loader2 className="animate-spin text-black" /> : <>START INITIALIZATION <Zap size={18} className="text-black group-hover:scale-125 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <Link href="/login" className="text-[12px] text-racing-muted hover:text-racing-green transition-colors font-bold uppercase tracking-widest">
              Already possess an ID? <span className="text-white">Terminal Entrance</span>
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
