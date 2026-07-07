'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '@/lib/projects'
import { serviceFilters } from '@/lib/brand'
import WorkCard from '@/components/work/WorkCard'
import ClientMarquee from '@/components/shared/ClientMarquee'
import QuoteCTA from '@/components/shared/QuoteCTA'

export default function WorkIndex() {
  const [filter, setFilter] = useState<string>('All')
  const prefersReduced = useReducedMotion()

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.serviceFilter === filter)

  return (
    <>
      <div className="pt-28 pb-8 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
            Case studies
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.95] md:text-7xl lg:text-8xl">
            Work that moved the needle
          </h1>

          <div className="mt-10 flex flex-wrap gap-2">
            {serviceFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
                  filter === f
                    ? 'border-pe-white bg-pe-white text-pe-black'
                    : 'border-pe-gray/30 text-pe-gray-light hover:border-pe-gray-light'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <motion.div
          key={filter}
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-4 md:grid-cols-4 md:gap-5"
        >
          {filtered.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </div>

      <ClientMarquee />
      <QuoteCTA />
    </>
  )
}
