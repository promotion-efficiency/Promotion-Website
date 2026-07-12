'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CHANNEL_LINKS,
  navLinkClass,
  PRIMARY_NAV,
} from '@/components/layout/navConfig'
import { liquidEase, liquidSpring } from '@/lib/navMotion'

type NavCompactPanelProps = {
  open: boolean
  onClose: () => void
}

const panelItem = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 + i * 0.045, duration: 0.4, ease: liquidEase },
  }),
  exit: { opacity: 0, x: -6, transition: { duration: 0.2 } },
}

export default function NavCompactPanel({ open, onClose }: NavCompactPanelProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          key="nav-panel"
          aria-label="Primary"
          initial={{ opacity: 0, height: 0, y: -6 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -6 }}
          transition={liquidSpring}
          className="w-[min(100vw-10vw,15rem)] overflow-hidden border border-t-0 border-pe-white/15 bg-pe-black/90 backdrop-blur-md"
        >
          <motion.div
            className="flex flex-col gap-4 px-4 py-5"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {PRIMARY_NAV.map((item, i) => (
              <motion.div key={item.href} custom={i} variants={panelItem}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`${navLinkClass} ${pathname === item.href ? 'text-pe-white' : 'text-pe-gray-light'}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-pe-white/10 px-4 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.12, duration: 0.35, ease: liquidEase }}
          >
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.14em] text-pe-gray">Channels</p>
            <div className="flex flex-col gap-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-pe-gray-light">
              {CHANNEL_LINKS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="transition-colors hover:text-pe-white"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.35, ease: liquidEase }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
