'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Stat = { value: number; suffix: string; label: string }

type AnimatedStatsProps = {
  stats: Stat[]
  className?: string
}

export default function AnimatedStats({ stats, className = '' }: AnimatedStatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      countersRef.current.forEach((el, i) => {
        if (el) el.textContent = `${stats[i].value}${stats[i].suffix}`
      })
      return
    }

    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = countersRef.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          onUpdate: () => {
            const display = stat.suffix === 'x' || stat.suffix === 'M' || stat.suffix === 'K'
              ? obj.val.toFixed(stat.suffix === 'x' ? 1 : stat.suffix === 'M' ? 1 : 0)
              : Math.round(obj.val)
            el.textContent = `${display}${stat.suffix}`
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [stats])

  return (
    <div ref={sectionRef} className={`grid grid-cols-2 gap-8 md:grid-cols-4 ${className}`}>
      {stats.map((stat, i) => (
        <div key={stat.label}>
          <span
            ref={(el) => { countersRef.current[i] = el }}
            className="font-display text-5xl text-pe-white md:text-7xl"
          >
            0{stat.suffix}
          </span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-pe-gray-light">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
