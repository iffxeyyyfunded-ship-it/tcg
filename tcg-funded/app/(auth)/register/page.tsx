'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
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
          full_name: fullName,
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard?registration=success')
    }
  }

  return (
    <div className="min-h-screen bg-tcg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-2 justify-center mb-12 group">
          <div className="w-12 h-12 bg-tcg-gold rounded-xl flex items-center justify-center font-black text-tcg-black text-2xl transition-transform group-hover:scale-110">
            TCG
          </div>
          <div className="text-2xl font-black text-white tracking-[6px]">FUNDED</div>
        </Link>

        <div className="bg-tcg-card border border-tcg-border rounded-[40px] p-10 shadow-2xl">
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Start Winning</h1>
          <p className="text-tcg-text text-sm mb-8 font-medium">Create your credentials to enter the glass box.</p>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-3">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-tcg-black border border-tcg-border rounded-xl px-4 py-4 text-white focus:border-tcg-gold transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-3">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-tcg-black border border-tcg-border rounded-xl px-4 py-4 text-white focus:border-tcg-gold transition-all outline-none"
                placeholder="trader@example.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-tcg-muted uppercase tracking-[3px] mb-3">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-tcg-black border border-tcg-border rounded-xl px-4 py-4 text-white focus:border-tcg-gold transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-tcg-red/10 border border-tcg-red/20 rounded-xl text-tcg-red text-xs font-bold">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full btn-gold py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black tracking-widest disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>REGISTER FREE <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <Link href="/login" className="text-sm text-tcg-text hover:text-tcg-gold transition-colors font-bold">
              Already have an account? <span className="text-white">Login</span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-tcg-muted text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck size={12} /> Privacy Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
