'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import NavLogo from '@/components/brand/NavLogo'
import NavCompactPanel from '@/components/layout/NavCompact'
import {
  navFloatClass,
  navFloatWrapClass,
  navLinkClass,
  navMenuClass,
  PRIMARY_NAV,
  getCompactNavContext,
} from '@/components/layout/navConfig'
import { liquidEase, liquidTransition } from '@/lib/navMotion'

const linkReveal = {
  hidden: { opacity: 0, x: 12, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.035, duration: 0.45, ease: liquidEase },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -10,
    filter: 'blur(3px)',
    transition: { delay: i * 0.02, duration: 0.3, ease: liquidEase },
  }),
}

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [pastHero, setPastHero] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [compactOpen, setCompactOpen] = useState(false)

  const inHero = isHome && !pastHero
  const compactBar = !inHero
  const blendNav = inHero

  useEffect(() => {
    setPastHero(!isHome)
    setCompactOpen(false)
    setMenuOpen(false)
  }, [isHome])

  useEffect(() => {
    const onScroll = () => {
      if (!isHome) {
        setPastHero(true)
        return
      }
      setPastHero(window.scrollY > window.innerHeight * 0.85)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (inHero) setCompactOpen(false)
  }, [inHero])

  useEffect(() => {
    document.body.style.overflow = menuOpen || compactOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, compactOpen])

  const floatClass = `${navFloatClass} ${blendNav ? 'mix-blend-difference' : ''} overflow-hidden`
  const linkClass = blendNav
    ? `${navLinkClass} text-pe-white`
    : `${navLinkClass} text-pe-gray-light`

  const compactNav = getCompactNavContext(pathname)

  return (
    <header className={navFloatWrapClass}>
      <LayoutGroup id="site-nav">
        <motion.div
          layout
          className={floatClass}
          transition={liquidTransition}
          style={{ borderRadius: compactOpen && compactBar ? 0 : undefined }}
        >
          <motion.div layout="position" transition={liquidTransition}>
            <NavLogo />
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            {inHero ? (
              <motion.nav
                key="hero-nav"
                layout
                className={navMenuClass}
                aria-label="Primary"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={liquidTransition}
              >
                {PRIMARY_NAV.map((item, i) => (
                  <motion.span
                    key={item.href}
                    custom={i}
                    variants={linkReveal}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="inline-block whitespace-nowrap"
                  >
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </motion.span>
                ))}
              </motion.nav>
            ) : (
              <motion.div
                key="compact-nav"
                layout
                className="flex min-w-0 flex-1 items-center"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={liquidTransition}
              >
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.45, ease: liquidEase }}
                >
                  <Link
                    href={compactNav.href}
                    className={`${navLinkClass} border-l border-pe-white/15 pl-3 text-pe-gray-light md:pl-4`}
                  >
                    {compactNav.label}
                  </Link>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => setCompactOpen((v) => !v)}
                  className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center text-pe-gray-light transition-colors hover:text-pe-white"
                  aria-label={compactOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={compactOpen}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.4, ease: liquidEase }}
                >
                  <motion.span
                    className="block h-px w-4 bg-current"
                    animate={{ scaleX: compactOpen ? 0.6 : 1 }}
                    transition={liquidTransition}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {inHero && (
            <motion.button
              type="button"
              layout
              className={`ml-1 flex h-7 w-7 shrink-0 items-center justify-center lg:hidden ${blendNav ? 'text-pe-white' : 'text-pe-gray-light'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              transition={liquidTransition}
            >
              <span className={`block h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`my-1 block h-px w-4 bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {inHero && menuOpen && (
            <motion.nav
              key="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={liquidTransition}
              className={`${navFloatClass} w-full min-w-[12rem] overflow-hidden border-t-0`}
            >
              <div className="flex flex-col gap-3 p-3">
                {PRIMARY_NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ delay: i * 0.04, duration: 0.35, ease: liquidEase }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`${navLinkClass} text-pe-gray-light`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {compactBar && (
          <NavCompactPanel open={compactOpen} onClose={() => setCompactOpen(false)} />
        )}
      </LayoutGroup>
    </header>
  )
}
