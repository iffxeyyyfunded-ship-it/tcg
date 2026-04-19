'use client'
import Link from 'next/link'
import { ArrowRight, Users, Gift } from 'lucide-react'
import { useEffect, useRef } from 'react'

const TICKER_ITEMS = [
  '✓ Zero Commissions',
  '✓ No Payout Denials',
  '✓ Weekly Payouts Every Friday',
  '✓ No Hidden Rules',
  '✓ All Trading Styles Allowed',
  '✓ News Trading Allowed',
  '✓ Weekend Holding Allowed',
  '✓ Automated Systems Allowed',
  '✓ Forex · Crypto · Futures',
  '✓ Up to $200K Accounts',
  '✓ No Payout Caps',
  '✓ 0% Platform Fee',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    let raf: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 200, 66, ${p.opacity})` // #F5C842 approx
        ctx.fill()
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-tcg-black"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-hero-glow" />
         <div 
           className="absolute inset-0"
           style={{
             backgroundImage: `linear-gradient(rgba(245,200,66,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,200,66,0.03) 1px, transparent 1px)`,
             backgroundSize: '80px 80px',
           }}
         />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" style={{ opacity: 0.6 }} />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-[#111] border border-tcg-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-up"
        >
          <span className="w-2 h-2 rounded-full bg-tcg-gold animate-pulse shadow-[0_0_8px_#F5C842]" />
          <span className="text-[10px] text-tcg-gold font-black uppercase tracking-[3px]">The Transparent Prop Firm</span>
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.9] tracking-tight animate-fade-up"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-2px' }}
        >
          A PROP FIRM THAT<br />
          <span className="gold-text">CAN HANDLE WINNERS.</span>
        </h1>

        {/* Subhead */}
        <p
          className="text-lg md:text-xl text-tcg-text max-w-2xl mb-12 leading-relaxed animate-fade-up font-medium"
        >
          We want you to win. TCG is the only prop firm that doesn&apos;t need you to lose to survive.{' '}
          <span className="text-white font-bold underline decoration-tcg-gold/30 underline-offset-4">No commissions. No denials. No caps. No restrictions.</span>
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up"
        >
          <Link
            href="/pricing"
            className="btn-gold flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-lg font-black"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '2px' }}
          >
            START TRADING TODAY
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/tutorials"
            className="btn-ghost flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-lg font-bold"
          >
            <Gift size={20} />
            Free Giveaways
          </Link>
        </div>

        {/* Social proof */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 animate-fade-up"
        >
          <div className="flex items-center gap-3 text-sm text-tcg-text">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-tcg-black bg-[#1A1A1A] flex items-center justify-center text-[10px] font-black italic">
                   TCG
                </div>
              ))}
            </div>
            <span><strong className="text-white">12,400+</strong> traders in Discord</span>
          </div>

          <div className="hidden sm:block w-px h-8 bg-tcg-border" />

          <div className="flex items-center gap-3 text-sm text-tcg-text">
             <div className="w-2 h-2 rounded-full bg-tcg-green animate-pulse" />
             <span><span className="text-white font-bold">142</span> online right now</span>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative border-t border-tcg-border bg-[#080808] py-4 overflow-hidden z-20">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center whitespace-nowrap px-10 text-xs font-black uppercase tracking-[2px]">
                <span className="text-tcg-gold">{item.split(' ')[0]}</span>
                <span className="text-tcg-white ml-2">{item.split(' ').slice(1).join(' ')}</span>
                <span className="ml-10 text-tcg-border">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
