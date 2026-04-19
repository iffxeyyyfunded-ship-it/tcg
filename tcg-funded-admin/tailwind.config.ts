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
        racing: {
          primary: '#0A0A0A',
          surface: '#111111',
          card: '#1A1A1A',
          elevated: '#222222',
          green: '#00C896',
          'green-dark': '#00A878',
          'green-glow': '#00C89633',
          border: '#222222',
          'border-hover': '#333333',
          'border-accent': '#00C8964D',
          text: '#FFFFFF',
          'text-dim': '#AAAAAA',
          muted: '#666666',
        },
        danger: '#FF4444',
        warning: '#F59E0B',
        success: '#00C896',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'border-glow': '0 0 0 1px #00C89633',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'ticker': 'ticker 40s linear infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,200,150,0.4)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(0,200,150,0.2)' },
        },
      },
      backgroundImage: {
        'racing-gradient': 'linear-gradient(90deg, #00C896 0%, #00A878 100%)',
        'dot-grid': 'radial-gradient(circle, #ffffff08 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
export default config
