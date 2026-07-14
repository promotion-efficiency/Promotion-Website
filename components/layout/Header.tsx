'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import NavLogo from '@/components/brand/NavLogo'
import NavCompactPanel from '@/components/layout/NavCompact'
import {
  navFloatClass,
  navFloatHeroClass,
  navFloatWrapClass,
  navLinkClass,
  navMenuHeroClass,
  PRIMARY_NAV,
  getCompactNavContext,
} from '@/components/layout/navConfig'
import { liquidEase, navLayoutTransition, navSmoothEase, navSmoothTransition } from '@/lib/navMotion'
import { useWorkListMode } from '@/components/home/WorkListMode'
import { useHeroExpandedMode } from '@/components/home/HeroExpandedMode'

const linkReveal = {
  hidden: { opacity: 0, x: 8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.025, duration: 0.32, ease: navSmoothEase },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -6,
    transition: { delay: i * 0.015, duration: 0.22, ease: navSmoothEase },
  }),
}

function useHoverExpand() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return canHover
}

const mobileHeroActionClass =
  'flex items-center justify-center border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/50'

export default function Header() {
  const { listMode } = useWorkListMode()
  const { heroExpanded } = useHeroExpandedMode()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [pastHero, setPastHero] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [compactOpen, setCompactOpen] = useState(false)
  const [navHovered, setNavHovered] = useState(false)
  const canHover = useHoverExpand()

  const inHero = isHome && !pastHero
  const compactBar = !inHero
  const compactExpanded = compactBar && canHover && navHovered && !compactOpen
  const mobileHeroChrome = inHero && !canHover

  useEffect(() => {
    setPastHero(!isHome)
    setCompactOpen(false)
    setMenuOpen(false)
    setNavHovered(false)
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
    if (inHero) {
      setCompactOpen(false)
      setNavHovered(false)
    }
  }, [inHero])

  useEffect(() => {
    document.body.style.overflow = menuOpen || compactOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, compactOpen])

  const floatClass = `${inHero ? navFloatHeroClass : navFloatClass} overflow-hidden ${
    compactOpen && compactBar ? 'rounded-b-none border-b-0' : ''
  }`
  const expandedMenuClass = inHero
    ? navMenuHeroClass
    : 'flex items-center gap-4 border-l border-pe-white/15 pl-3 md:gap-5 md:pl-4'
  const linkClass = inHero
    ? `${navLinkClass} text-white`
    : `${navLinkClass} text-pe-gray-light`

  const compactNav = getCompactNavContext(pathname)

  const handleNavMouseEnter = () => {
    if (compactBar && canHover && !compactOpen) setNavHovered(true)
  }

  const handleNavMouseLeave = () => {
    setNavHovered(false)
  }

  const openCompactPanel = () => {
    setNavHovered(false)
    setCompactOpen(true)
  }

  if (listMode || heroExpanded) return null

  return (
    <header className={mobileHeroChrome ? 'fixed top-0 left-0 right-0 z-50 px-[5vw] pt-4' : navFloatWrapClass}>
      <LayoutGroup id="site-nav">
        {mobileHeroChrome ? (
          <>
            <div className="flex items-center justify-between">
              <NavLogo />
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className={`${mobileHeroActionClass} h-10 px-4 text-[10px] font-semibold uppercase tracking-[0.14em]`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                Menu
              </button>
            </div>

            <NavCompactPanel open={menuOpen} onClose={() => setMenuOpen(false)} variant="hero" />
          </>
        ) : (
          <div className="flex flex-col items-start">
            <motion.div
              layout
              className={floatClass}
              transition={navLayoutTransition}
              onMouseEnter={handleNavMouseEnter}
              onMouseLeave={handleNavMouseLeave}
            >
              <motion.div layout="position" transition={navLayoutTransition}>
                <NavLogo className={inHero ? '' : 'brightness-0'} />
              </motion.div>

              <AnimatePresence mode="popLayout" initial={false}>
                {inHero || compactExpanded ? (
                  <motion.nav
                    key="expanded-nav"
                    layout
                    className={expandedMenuClass}
                    aria-label="Primary"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={navSmoothTransition}
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
                ) : compactBar ? (
                  <motion.div
                    key="compact-nav"
                    layout
                    className="flex min-w-0 flex-1 items-center"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={navSmoothTransition}
                  >
                    <Link
                      href={compactNav.href}
                      className={`${navLinkClass} border-l border-pe-white/15 pl-3 text-pe-gray-light md:pl-4`}
                    >
                      {compactNav.label}
                    </Link>

                    {compactOpen ? (
                      <button
                        type="button"
                        onClick={() => setCompactOpen(false)}
                        className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center text-pe-gray-light transition-colors duration-300 hover:text-pe-white"
                        aria-label="Close menu"
                      >
                        <span className="block h-px w-4 bg-current" aria-hidden />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={openCompactPanel}
                        className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center text-pe-gray-light transition-colors duration-300 hover:text-pe-white"
                        aria-label="Open menu"
                        aria-expanded={compactOpen}
                      >
                        <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
                      </button>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

            {compactBar && (
              <NavCompactPanel open={compactOpen} onClose={() => setCompactOpen(false)} />
            )}
          </div>
        )}
      </LayoutGroup>
    </header>
  )
}
