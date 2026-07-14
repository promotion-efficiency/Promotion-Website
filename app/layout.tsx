import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { assetPath } from '@/lib/paths'
import CookieConsentBar from '@/components/shared/CookieConsentBar'
import './globals.css'

const nord = localFont({
  src: [
    { path: '../public/fonts/Nord-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Nord-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Nord-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-nord',
  display: 'swap',
})

const gotham = localFont({
  src: [
    { path: '../public/fonts/Gotham-Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Gotham-Book.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Gotham-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Gotham-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-gotham',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Promotion Efficiency — Your Hike to PEAK',
  description:
    'Promotion Efficiency is the marketing partner for ambitious brands. From concept to production to distribution — we make brands move faster.',
  icons: {
    icon: [{ url: assetPath('/assets/pe-favicon.png'), type: 'image/png', sizes: '512x512' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nord.variable} ${gotham.variable}`}>
      <body className="bg-pe-black text-pe-white antialiased">
        {children}
        <CookieConsentBar />
      </body>
    </html>
  )
}
