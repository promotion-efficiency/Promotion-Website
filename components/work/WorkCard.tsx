'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '@/lib/projects'
import WorkCaseCursor from '@/components/home/WorkCaseCursor'
import { useFinePointer, usePlayCursor } from '@/components/home/HeroPlayCursor'

type WorkCardProps = {
  project: Project
  index: number
}

export default function WorkCard({ project, index }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const finePointer = useFinePointer()
  const { cursor, onMouseEnter, onMouseLeave, onMouseMove } = usePlayCursor(finePointer)

  const spanClass = project.featured
    ? 'col-span-1 row-span-2 md:col-span-2 md:row-span-2'
    : 'col-span-1 row-span-1'

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={spanClass}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block h-full"
        onMouseEnter={(e) => {
          setHovered(true)
          onMouseEnter(e)
        }}
        onMouseLeave={() => {
          setHovered(false)
          onMouseLeave()
        }}
        onMouseMove={onMouseMove}
      >
        <div className="relative h-full min-h-[280px] overflow-hidden bg-pe-charcoal md:min-h-[320px]">
          <motion.div layoutId={`project-cover-${project.slug}`} className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              sizes={
                project.featured
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, 25vw'
              }
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

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
              {project.serviceFilter}
              <span className="mx-2 text-white/35">·</span>
              {project.year}
            </span>
            <h2 className="mt-2 font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-tight tracking-tight text-white">
              {project.client}
            </h2>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/70 md:text-[13px]">
              {project.resultStat}
            </p>
          </div>
        </div>
      </Link>

      {finePointer && (
        <WorkCaseCursor
          x={cursor.x}
          y={cursor.y}
          visible={cursor.visible}
          label="View case"
        />
      )}
    </motion.div>
  )
}
