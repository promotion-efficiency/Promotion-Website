'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { liquidEase } from '@/lib/navMotion'
import { projects } from '@/lib/projects'

const SLIDE_INTERVAL_MS = 5500

function ReelProgress({ activeIndex, prefersReduced }: { activeIndex: number; prefersReduced: boolean }) {
  return (
    <div className="flex gap-2">
      {projects.map((project, index) => {
        const isPast = index < activeIndex
        const isActive = index === activeIndex

        return (
          <div
            key={project.slug}
            className="relative h-px flex-1 overflow-hidden bg-white/20"
            aria-hidden
          >
            {isPast && <div className="absolute inset-0 bg-white" />}
            {isActive && !prefersReduced && (
              <motion.div
                key={`${project.slug}-${activeIndex}`}
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
              />
            )}
            {isActive && prefersReduced && <div className="absolute inset-0 bg-white" />}
          </div>
        )
      })}
    </div>
  )
}

export default function ManifestoReel() {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex] ?? projects[0]
  const indexLabel = String(activeIndex + 1).padStart(2, '0')
  const totalLabel = String(projects.length).padStart(2, '0')

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
      className="relative h-[85vh] min-h-[560px] overflow-hidden bg-pe-charcoal"
    >
      <div className="absolute inset-0">
        {projects.map((project, index) => {
          const isActive = index === activeIndex

          return (
            <motion.div
              key={project.slug}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: prefersReduced ? 0.2 : 0.9, ease: liquidEase }}
              style={{ zIndex: isActive ? 2 : 1 }}
              aria-hidden={!isActive}
            >
              <Image
                src={project.image}
                alt={isActive ? project.title : ''}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </motion.div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,10,0.5)_100%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-black via-black/85 to-transparent md:h-64"
        aria-hidden
      />

      <div className="pointer-events-none absolute left-[5vw] top-24 z-10 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.span
            key={indexLabel}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: liquidEase }}
            className="font-display text-[clamp(5rem,14vw,11rem)] leading-none text-white/10"
          >
            {indexLabel}
          </motion.span>
        </AnimatePresence>
      </div>

      <p
        className="pointer-events-none absolute right-[5vw] top-1/2 z-10 hidden -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45 [writing-mode:vertical-rl] md:block"
        aria-hidden
      >
        Showreel
      </p>

      <div className="absolute left-[5vw] right-[5vw] top-28 z-10 md:top-32">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Featured work
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: liquidEase }}
            className="mt-4"
          >
            <Link
              href={`/work/${activeProject.slug}`}
              className="group pointer-events-auto inline-block"
            >
              <h3 className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.95] text-white transition-opacity group-hover:opacity-80">
                {activeProject.client}
              </h3>
              <p className="mt-3 text-sm text-white/75">
                {activeProject.title} · {activeProject.year}
              </p>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-[5vw] right-[5vw] z-10 md:bottom-10">
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          <span>
            {indexLabel} / {totalLabel}
          </span>
          <span className="hidden sm:inline text-white/70">{activeProject.industry}</span>
        </div>
        <ReelProgress activeIndex={activeIndex} prefersReduced={Boolean(prefersReduced)} />
      </div>
    </section>
  )
}
