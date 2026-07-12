'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { liquidEase } from '@/lib/navMotion'
import { projects } from '@/lib/projects'

const SLIDE_INTERVAL_MS = 5500

export default function ManifestoReel() {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex] ?? projects[0]

  useEffect(() => {
    if (prefersReduced) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [prefersReduced])

  return (
    <section
      id="video-chapter"
      className="relative h-[85vh] min-h-[560px] overflow-hidden bg-pe-black"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={activeProject.slug}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: liquidEase }}
        >
          <Image
            src={activeProject.image}
            alt={activeProject.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-pe-black via-pe-black/80 to-transparent md:h-56"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center px-6 pb-16 md:px-10 md:pb-20">
        <p className="max-w-5xl text-center font-sans text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-pe-white">
          We make brands move faster.
        </p>
      </div>
    </section>
  )
}
