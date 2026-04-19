'use client'
import { MessageSquare, Globe, LifeBuoy, Disc as Discord } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

const SUPPORT_CARDS = [
  {
    icon: <MessageSquare className="text-tcg-gold" size={24} />,
    title: '24/7 AI Support',
    desc: 'Instant answers to any rule or payout question, anytime.',
  },
  {
    icon: <Globe className="text-tcg-gold" size={24} />,
    title: '20+ Languages',
    desc: 'Global support localized for your trading environment.',
  },
  {
    icon: <LifeBuoy className="text-tcg-gold" size={24} />,
    title: 'Live Chat',
    desc: 'Speak with real trading experts for complex issues.',
  },
  {
    icon: <Discord className="text-tcg-gold" size={24} />,
    title: 'Discord Help',
    desc: 'Community-driven support and official TCG moderators.',
  },
]

export default function SupportSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="support" className="section bg-tcg-black pt-0" ref={ref}>
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {SUPPORT_CARDS.map((card, i) => (
              <div
                key={card.title}
                className={cn(
                  "p-8 bg-tcg-card/50 border border-tcg-border rounded-[32px] hover:border-tcg-gold/30 transition-all",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                 <div className="w-12 h-12 rounded-2xl bg-tcg-black border border-white/5 flex items-center justify-center mb-6">
                    {card.icon}
                 </div>
                 <h4 className="text-base font-black text-white mb-2 uppercase tracking-tight">{card.title}</h4>
                 <p className="text-xs text-tcg-text leading-relaxed font-medium">{card.desc}</p>
              </div>
           ))}
        </div>
      </div>
    </section>
  )
}
