import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        tcg: {
          black:  '#0A0A0A',
          dark:   '#141414',
          card:   '#1A1A1A',
          border: '#2A2A2A',
          muted:  '#555555',
          text:   '#A0A0A0',
          white:  '#FFFFFF',
          gold:   '#F5C842',
          'gold-dim': '#C49C2C',
          blue:   '#4A9EFF',
          green:  '#00FF85',
          red:    '#FF4545',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'var(--font-display)', 'serif'],
        body: ['DM Sans', 'var(--font-body)', 'sans-serif'],
        mono: ['JetBrains Mono', 'var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in-left': 'slideInLeft 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,166,35,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245,166,35,0.6)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%': { textShadow: '0 0 20px rgba(245,166,35,0.5)' },
          '100%': { textShadow: '0 0 40px rgba(245,166,35,0.9), 0 0 80px rgba(245,166,35,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5A623 0%, #f7c05a 50%, #d97706 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
        'card-gradient': 'linear-gradient(135deg, #111111 0%, #0d0d0d 100%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245,166,35,0.15) 0%, transparent 60%)',
        'section-glow': 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245,166,35,0.05) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
