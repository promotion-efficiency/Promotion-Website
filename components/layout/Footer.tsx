import Link from 'next/link'
import SplitWordmark from '@/components/brand/SplitWordmark'
import Button from '@/components/ui/Button'
import { brand } from '@/lib/brand'

const NAV = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-pe-gray/20 bg-pe-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl uppercase leading-tight md:text-6xl">
              {brand.voice.footerCta}
            </h2>
            <div className="mt-8">
              <Button href="/contact">Start a project</Button>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-pe-gray-light">
              <span className="text-pe-white font-semibold">Promotion efficiency</span>{' '}
              — {brand.definition}
            </p>
            <p className="text-xs uppercase tracking-[0.14em] text-pe-gray">
              {brand.tagline} · {brand.descriptor}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-pe-gray/20 pt-10 md:flex-row md:items-center">
          <SplitWordmark size="footer" interactive split={0} className="!items-start" />

          <div className="flex flex-wrap gap-6 text-sm text-pe-gray-light">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-pe-white">
                {item.label}
              </Link>
            ))}
            <a href={`mailto:${brand.email}`} className="hover:text-pe-white">
              {brand.email}
            </a>
            <span>{brand.social}</span>
          </div>
        </div>

        <p className="mt-10 text-xs text-pe-gray">
          © {new Date().getFullYear()} Promotion Efficiency. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
