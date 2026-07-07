'use client'

import { useEffect, useState } from 'react'

type SplitWordmarkProps = {
  size?: 'hero' | 'nav' | 'footer'
  split?: number
  interactive?: boolean
  className?: string
}

const sizes = {
  hero: { line1: 'text-[clamp(3.5rem,14vw,11rem)]', line2: 'text-[clamp(3.5rem,14vw,11rem)]' },
  nav: { line1: 'text-lg md:text-xl', line2: 'text-lg md:text-xl' },
  footer: { line1: 'text-4xl md:text-5xl', line2: 'text-4xl md:text-5xl' },
}

export default function SplitWordmark({
  size = 'hero',
  split = 0,
  interactive = false,
  className = '',
}: SplitWordmarkProps) {
  const [hovered, setHovered] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const s = sizes[size]

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const offset = reduceMotion ? 0 : hovered && interactive ? 28 : split

  return (
    <div
      className={`flex flex-col items-center leading-[0.88] tracking-tight ${className}`}
      onMouseEnter={interactive ? () => setHovered(true) : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
      aria-label="Promotion Efficiency"
    >
      <span
        className={`font-display uppercase transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${s.line1}`}
        style={{ transform: `translateX(${-offset}px)` }}
      >
        Promotion
      </span>
      <span
        className={`font-display uppercase text-pe-gray-light transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${s.line2}`}
        style={{ transform: `translateX(${offset}px)` }}
      >
        Efficiency
      </span>
    </div>
  )
}

export function useWordmarkSplit() {
  const [split, setSplit] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const onScroll = () => {
      const progress = Math.min(window.scrollY / 400, 1)
      setSplit(progress * 120)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return split
}
