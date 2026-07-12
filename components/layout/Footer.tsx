'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brand } from '@/lib/brand'
import HeroPlayCursor, {
  scrollToVideoChapter,
  useHoverPlayCursor,
  usePlayCursor,
} from '@/components/home/HeroPlayCursor'

const PRESS_EMAIL = 'press@promotionefficiency.com'

const CHANNELS = [
  { label: 'Instagram', href: 'https://instagram.com/PromotionEfficiency' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/promotion-efficiency' },
  { label: 'X', href: 'https://x.com/PromotionEfficiency' },
] as const

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Cookies', href: '#' },
] as const

const actionBoxClass =
  'border border-pe-gray/40 bg-pe-black/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-white backdrop-blur-sm transition-colors hover:border-pe-gray/60'

function FooterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 py-8 md:grid-cols-[minmax(0,34%)_1fr] md:items-start md:gap-10 md:py-10">
      <p className="text-base text-pe-gray-light md:text-lg">{label}</p>
      <div>{children}</div>
    </div>
  )
}

function FooterDivider() {
  return <div className="h-px w-full bg-pe-white/20" aria-hidden />
}

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const hoverPlayCursor = useHoverPlayCursor()
  const { cursor, onMouseMove, onMouseEnter, onMouseLeave } = usePlayCursor(hoverPlayCursor)
  const year = new Date().getFullYear()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brand.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${brand.email}`
    }
  }

  return (
    <footer className="border-t border-pe-white/10 bg-pe-black">
      {hoverPlayCursor && (
        <HeroPlayCursor
          x={cursor.x}
          y={cursor.y}
          visible={cursor.visible}
          className="z-[120]"
        />
      )}

      <div className="w-full px-[5vw] py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,42%)_1fr] lg:gap-16 xl:gap-20">
          <div>
            <h2 className="font-sans text-[clamp(2.25rem,4.8vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-pe-white">
              Contact
            </h2>
            <p className="mt-1 font-sans text-[clamp(2.25rem,4.8vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-pe-gray">
              Press and careers
            </p>

            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToVideoChapter()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  scrollToVideoChapter()
                }
              }}
              onMouseEnter={onMouseEnter}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              aria-label="Play showreel"
              className={`relative mt-10 aspect-[16/10] w-full overflow-hidden bg-pe-charcoal ${
                hoverPlayCursor ? 'cursor-none' : ''
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
                alt=""
                fill
                className="pointer-events-none object-cover"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-pe-black/25" aria-hidden />

              <div
                className="absolute bottom-4 left-4 z-10 md:bottom-5 md:left-5"
                onClick={(event) => event.stopPropagation()}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-white/80">
                  Say hello
                </p>
                <a
                  href={`mailto:${brand.email}`}
                  className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-pe-white transition-opacity hover:opacity-70"
                >
                  {brand.email}
                </a>
              </div>

              {!hoverPlayCursor && (
                <span
                  className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${actionBoxClass}`}
                >
                  <span className="mr-1.5 text-[8px]" aria-hidden>
                    ▶
                  </span>
                  Play
                </span>
              )}

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  void copyEmail()
                }}
                onMouseEnter={onMouseLeave}
                className={`absolute bottom-4 right-4 z-10 cursor-pointer md:bottom-5 md:right-5 ${actionBoxClass}`}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <FooterRow label="Press + Media">
              <p className="max-w-md text-sm leading-relaxed text-pe-gray-light md:text-[15px] md:leading-7">
                For information, images, and media resources.
              </p>
              <a
                href={`mailto:${PRESS_EMAIL}`}
                className="mt-3 inline-block text-sm text-pe-white underline decoration-pe-white/30 underline-offset-4 transition-colors hover:decoration-pe-white"
              >
                {PRESS_EMAIL}
              </a>
            </FooterRow>

            <FooterDivider />

            <FooterRow label="Recruitment">
              <p className="max-w-md text-sm leading-relaxed text-pe-gray-light md:text-[15px] md:leading-7">
                One team, one climb.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-block text-sm text-pe-white underline decoration-pe-white/30 underline-offset-4 transition-colors hover:decoration-pe-white"
              >
                Work with us
              </Link>
            </FooterRow>

            <FooterDivider />

            <FooterRow label="Channels">
              <ul className="space-y-2">
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-pe-white transition-opacity hover:opacity-70"
                    >
                      {channel.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterRow>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-pe-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-pe-gray">© 2018—{year}</p>
          <div className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-pe-gray-light transition-colors hover:text-pe-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
