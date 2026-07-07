'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import SplitWordmark, { useWordmarkSplit } from '@/components/brand/SplitWordmark'
import { brand } from '@/lib/brand'

export default function Hero() {
  const split = useWordmarkSplit()
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 md:px-10">
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center text-center">
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-pe-gray-light"
        >
          {brand.descriptor}
        </motion.p>

        <SplitWordmark size="hero" split={split} />

        <motion.h1
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 max-w-3xl font-display text-3xl uppercase leading-[1.05] tracking-tight text-pe-white md:text-5xl lg:text-6xl"
        >
          {brand.voice.thesis}
        </motion.h1>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-pe-gray-light md:text-base"
        >
          {brand.tagline}. Concept to production to distribution — one partner for the whole climb.
        </motion.p>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button href="/contact">Start a project</Button>
          <Button href="/work" variant="ghost">
            See the work
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-pe-gray">Scroll</span>
        {!prefersReduced && (
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="block h-6 w-px bg-pe-gray"
          />
        )}
      </motion.div>
    </section>
  )
}
