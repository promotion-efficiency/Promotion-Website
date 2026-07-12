'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { brand, services } from '@/lib/brand'
import { assetPath } from '@/lib/paths'

const EXPLORE_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Manifesto', href: '/#manifesto' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/contact' },
] as const

const SERVICE_LINKS = services.map((service) => ({
  label: service.title,
  href: `/#services`,
}))

const STUDIO_LINKS = [
  { label: 'Careers', href: '/contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Press', href: 'mailto:press@promotionefficiency.com' },
] as const

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/PromotionEfficiency',
    icon: (
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.75-3.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/promotion-efficiency',
    icon: (
      <path d="M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15ZM8.25 9.75V18H6V9.75h2.25ZM7.125 6.75a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25ZM18 18h-2.25v-4.05c0-.975-.018-2.227-1.356-2.227-1.357 0-1.564 1.06-1.564 2.153V18H10.5V9.75H12.6v1.162h.033c.285-.54 1.08-1.11 2.227-1.11 2.383 0 2.82 1.568 2.82 3.608V18Z" />
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/PromotionEfficiency',
    icon: (
      <path d="M4 4 9.5 12.9 4.2 20h2.3l4.1-5.4 3.3 5.4H20l-5.7-8.3L19.4 4h-2.3l-3.8 5L10.4 4H4Zm2.6 1.5h1.7l10.1 14.9H16.7L6.6 5.5Z" />
    ),
  },
] as const

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{title}</h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const year = new Date().getFullYear()

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReduced
      ? ['inset(0% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)']
      : ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)'],
  )

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReduced ? ['0%', '0%', '0%'] : ['6%', '0%', '0%'],
  )

  return (
    <footer ref={footerRef} className="sticky bottom-0 z-0 bg-black text-white">
      <motion.div style={{ clipPath }} className="overflow-hidden">
        <motion.div style={{ y: contentY }} className="px-[5vw] pb-10 pt-16 md:pb-12 md:pt-20">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center">
            <Link href="/" aria-label="Promotion Efficiency home" className="inline-flex">
              <Image
                src={assetPath('/assets/pe-wordmark-nav.png')}
                alt="Promotion Efficiency"
                width={360}
                height={123}
                unoptimized
                className="h-10 w-auto object-contain md:h-12"
                priority={false}
              />
            </Link>

            <div className="mt-14 grid w-full gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
              <FooterColumn title="Explore" links={EXPLORE_LINKS} />
              <FooterColumn title="Services" links={SERVICE_LINKS} />
              <FooterColumn
                title="Get in touch"
                links={[
                  { label: 'Contact', href: '/contact' },
                  { label: brand.email, href: `mailto:${brand.email}` },
                ]}
              />
              <FooterColumn title="The studio" links={STUDIO_LINKS} />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-[1200px] border-t border-white/15 pt-8 md:mt-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/80">
                  Promotion Efficiency
                </p>
                <p className="mt-1 text-[12px] text-white/50">© 2018—{year}</p>
              </div>

              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="h-4 w-4 fill-current"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
