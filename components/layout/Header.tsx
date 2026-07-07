'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import SplitWordmark from '@/components/brand/SplitWordmark'
import Button from '@/components/ui/Button'

const NAV = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const SECTIONS = [
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'proof', label: 'Proof' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setPastHero(y > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-pe-black/90 backdrop-blur-md border-b border-pe-gray/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="block">
          {pastHero ? (
            <SplitWordmark size="nav" interactive split={0} />
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pe-gray-light">
              PE
            </span>
          )}
        </Link>

        {pastHero && (
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`/#${s.id}`}
                className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pe-gray-light transition-colors hover:text-pe-white"
              >
                {s.label}
              </a>
            ))}
          </nav>
        )}

        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-pe-gray-light transition-colors hover:text-pe-white"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="!px-4 !py-2 !text-[10px]">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block h-px w-5 bg-pe-white transition-transform ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span className={`my-1.5 block h-px w-5 bg-pe-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-pe-white transition-transform ${menuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-pe-gray/20 bg-pe-black px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {[...NAV, { label: 'Services', href: '/#services' }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.12em]"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" onClick={() => setMenuOpen(false)}>
              Start a project
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
