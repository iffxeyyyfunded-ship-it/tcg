import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/marketing/Navbar'

export const metadata: Metadata = {
  title: {
    default: 'TCG Funded | Transparent Prop Firm — Forex, Crypto & Futures',
    template: '%s | TCG Funded',
  },
  description: 'TCG Funded is the transparent prop trading firm. No denials, no caps, no commissions. Revenue-funded weekly payouts every Friday. Trade Forex, Crypto & Futures.',
  keywords: ['prop firm', 'funded trader', 'forex prop firm', 'crypto prop trading', 'TCG funded', 'trading challenge', 'funded account'],
  authors: [{ name: 'TCG Funded' }],
  creator: 'TCG Funded',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tcgfunded.com',
    siteName: 'TCG Funded',
    title: 'TCG Funded | The Transparent Prop Firm',
    description: 'No payout denials. No commissions. No caps. Weekly payouts every Friday. Get funded today.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TCG Funded' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCG Funded | The Transparent Prop Firm',
    description: 'No payout denials. No commissions. No caps. Weekly payouts every Friday.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-tcg-gold selection:text-tcg-black">
        <Navbar />
        <main>{children}</main>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111111',
              border: '1px solid #2A2A2A',
              color: '#FFFFFF',
            },
          }}
        />
      </body>
    </html>
  )
}
