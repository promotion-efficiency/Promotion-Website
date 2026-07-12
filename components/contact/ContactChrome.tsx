'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { LayoutGroup, motion } from 'framer-motion'
import Link from 'next/link'
import NavLogo from '@/components/brand/NavLogo'
import NavCompactPanel from '@/components/layout/NavCompact'
import {
  navFloatClass,
  navFloatWrapClass,
  navLinkClass,
  getCompactNavContext,
} from '@/components/layout/navConfig'
import { navLayoutTransition, navSmoothTransition } from '@/lib/navMotion'

export default function ContactChrome() {
  const [compactOpen, setCompactOpen] = useState(false)
  const pathname = usePathname()
  const compactNav = getCompactNavContext(pathname)

  return (
    <header className={navFloatWrapClass}>
      <LayoutGroup id="contact-nav">
        <motion.div layout className={`${navFloatClass} overflow-hidden`} transition={navLayoutTransition}>
          <motion.div layout="position" transition={navLayoutTransition}>
            <NavLogo className="brightness-0" />
          </motion.div>

          <motion.div
            layout
            className="flex min-w-0 flex-1 items-center"
            transition={navLayoutTransition}
          >
            <Link
              href={compactNav.href}
              className={`${navLinkClass} border-l border-pe-white/15 pl-3 text-pe-gray-light md:pl-4`}
            >
              {compactNav.label}
            </Link>

            <motion.button
              type="button"
              onClick={() => setCompactOpen((v) => !v)}
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center text-pe-gray-light transition-colors hover:text-pe-white"
              aria-label={compactOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={compactOpen}
            >
              <motion.span
                className="block h-px w-4 bg-current"
                animate={{ scaleX: compactOpen ? 0.6 : 1 }}
                transition={navLayoutTransition}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <NavCompactPanel open={compactOpen} onClose={() => setCompactOpen(false)} />
      </LayoutGroup>
    </header>
  )
}
