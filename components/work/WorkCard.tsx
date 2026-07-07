'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '@/lib/projects'

type WorkCardProps = {
  project: Project
  index: number
}

export default function WorkCard({ project, index }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  const spanClass = project.featured
    ? 'col-span-1 row-span-2 md:col-span-2 md:row-span-2'
    : 'col-span-1 row-span-1'

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={spanClass}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative h-full min-h-[280px] overflow-hidden bg-pe-surface transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)] md:min-h-[320px]">
          <motion.div layoutId={`project-cover-${project.slug}`} className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={project.featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          </motion.div>

          {hovered && project.video && !prefersReduced && (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 z-10 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-pe-black/80 via-pe-black/20 to-transparent" />

          <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-pe-white/30 opacity-0 transition-opacity group-hover:opacity-100">
            <span aria-hidden>→</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pe-gray-light">
              {project.serviceFilter}
            </span>
            <h2 className="mt-1 font-display text-2xl uppercase md:text-3xl">{project.client}</h2>
            <p className="mt-1 text-xs text-pe-off-white">{project.resultStat}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
