'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '@/lib/brand'

gsap.registerPlugin(ScrollTrigger)

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
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
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${stat.suffix}`
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="border-t border-pe-gray/20 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          By the numbers
        </p>
        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <span
                ref={(el) => { countersRef.current[i] = el }}
                className="font-display text-6xl text-pe-white md:text-8xl"
              >
                0{stat.suffix}
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-pe-gray-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
