import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { assetPath } from '@/lib/paths'
import './globals.css'

// TODO: swap to licensed NORD + Gotham per /brand/guidelines.pdf
const nord = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nord',
})

const gotham = Inter({
  subsets: ['latin'],
  variable: '--font-gotham',
})

export const metadata: Metadata = {
  title: 'Promotion Efficiency — Your Hike to PEAK',
  description:
    'Promotion Efficiency is the marketing partner for ambitious brands. From concept to production to distribution — we make brands move faster.',
  icons: {
    icon: [{ url: assetPath('/assets/nav-mark-pe.png'), type: 'image/png' }],
    apple: assetPath('/assets/nav-mark-pe.png'),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nord.variable} ${gotham.variable}`}>
      <body className="bg-pe-black text-pe-white antialiased">{children}</body>
    </html>
  )
}
