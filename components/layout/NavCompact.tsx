'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CHANNEL_LINKS,
  navPanelClass,
  PRIMARY_NAV,
} from '@/components/layout/navConfig'
import { navSmoothEase, navSmoothTransition } from '@/lib/navMotion'

type NavCompactPanelProps = {
  open: boolean
  onClose: () => void
  variant?: 'light' | 'hero'
}

export default function NavCompactPanel({
  open,
  onClose,
  variant = 'light',
}: NavCompactPanelProps) {
  const pathname = usePathname()
  const isHero = variant === 'hero'

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          key="nav-panel"
          aria-label="Primary"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={navSmoothTransition}
          className={
            isHero
              ? 'mt-0 w-full overflow-hidden border border-t-0 border-white/20 bg-black/90 backdrop-blur-md'
              : navPanelClass
          }
        >
          <div className="flex flex-col gap-5 px-4 py-6">
            {PRIMARY_NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ delay: i * 0.03, duration: 0.32, ease: navSmoothEase }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block text-[1.65rem] font-normal leading-tight tracking-tight transition-opacity duration-300 hover:opacity-65 ${
                    pathname === item.href
                      ? isHero
                        ? 'text-white'
                        : 'text-pe-white'
                      : isHero
                        ? 'text-white/85'
                        : 'text-pe-gray-light'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div
            className={`border-t px-4 py-5 ${
              isHero ? 'border-white/10' : 'border-pe-white/10'
            }`}
          >
            <p
              className={`mb-3 text-[9px] font-medium uppercase tracking-[0.14em] ${
                isHero ? 'text-white/45' : 'text-pe-gray'
              }`}
            >
              Channels
            </p>
            <div
              className={`flex flex-col gap-2.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
                isHero ? 'text-white/70' : 'text-pe-gray-light'
              }`}
            >
              {CHANNEL_LINKS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className={`transition-opacity duration-300 hover:opacity-65 ${
                    isHero ? 'hover:text-white' : 'hover:text-pe-white'
                  }`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.03, duration: 0.3, ease: navSmoothEase }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
