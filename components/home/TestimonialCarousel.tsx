'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { testimonials } from '@/lib/brand'

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (paused || prefersReduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [paused, prefersReduced])

  const go = (dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[index]

  return (
    <section className="border-t border-pe-gray/20 bg-pe-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          Client proof
        </p>

        <div
          className="relative mt-12 min-h-[220px] md:min-h-[180px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
          }}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="max-w-3xl font-display text-3xl uppercase leading-tight md:text-5xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="text-sm font-semibold text-pe-white">{t.name}</span>
                  <span className="text-sm text-pe-gray-light">
                    {' '}— {t.role}, {t.company}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center border border-pe-gray/30 text-sm hover:border-pe-white"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 transition-all ${
                    i === index ? 'w-8 bg-pe-white' : 'w-1.5 bg-pe-gray'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center border border-pe-gray/30 text-sm hover:border-pe-white"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
