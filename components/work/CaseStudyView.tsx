'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'
import { getNextProject } from '@/lib/projects'
import { markProjectSeen } from '@/lib/workSeen'
import AnimatedStats from '@/components/shared/AnimatedStats'
import Button from '@/components/ui/Button'

type CaseStudyViewProps = {
  project: Project
}

function StoryBlock({ block }: { block: Project['storyBlocks'][0] }) {
  const media = (
    <div className="relative aspect-[4/3] overflow-hidden bg-pe-surface md:aspect-auto md:min-h-[420px] md:flex-1">
      {block.video ? (
        <video
          src={block.video}
          autoPlay
          muted
          loop
          playsInline
          poster={block.image}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image src={block.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      )}
    </div>
  )

  if (block.type === 'full') {
    return (
      <figure className="mb-16 md:mb-24">
        <div className="relative aspect-video w-full overflow-hidden bg-pe-surface">
          {block.video ? (
            <video src={block.video} autoPlay muted loop playsInline poster={block.image} className="h-full w-full object-cover" />
          ) : (
            <Image src={block.image} alt="" fill className="object-cover" sizes="100vw" />
          )}
        </div>
        {block.caption && (
          <figcaption className="mt-4 text-sm text-pe-gray-light">{block.caption}</figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className={`mb-16 flex flex-col gap-6 md:mb-24 md:gap-10 ${block.type === 'split-right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {media}
      {block.caption && (
        <div className="flex flex-col justify-center md:w-2/5">
          <p className="font-display text-2xl uppercase leading-tight md:text-3xl">{block.caption}</p>
        </div>
      )}
    </figure>
  )
}

export default function CaseStudyView({ project }: CaseStudyViewProps) {
  const next = getNextProject(project.slug)

  useEffect(() => {
    markProjectSeen(project.slug)
  }, [project.slug])

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Service', value: project.service },
    { label: 'Timeline', value: project.timeline },
    { label: 'Industry', value: project.industry },
  ]

  return (
    <article>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-pe-surface md:aspect-video">
        <motion.div layoutId={`project-cover-${project.slug}`} className="absolute inset-0">
          {project.video ? (
            <video autoPlay muted loop playsInline poster={project.image} className="h-full w-full object-cover">
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-12">
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">{project.client}</p>
          <h1 className="mt-2 font-display text-5xl uppercase md:text-8xl">{project.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-6 border-b border-pe-gray/20 pb-12 sm:grid-cols-2 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pe-gray">{m.label}</dt>
              <dd className="mt-2 text-sm text-pe-white">{m.value}</dd>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-pe-gray-light">{project.challenge}</p>

        <div className="mt-20">
          {project.storyBlocks.map((block, i) => (
            <StoryBlock key={i} block={block} />
          ))}
        </div>

        <section className="border-t border-pe-gray/20 pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">Results</p>
          <AnimatedStats stats={project.statCallouts} className="mt-10" />
        </section>

        <div className="mt-20 flex flex-wrap gap-4">
          <Button href="/contact">Start a project</Button>
          <Button href="/work" variant="ghost">← All work</Button>
        </div>
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-pe-gray/20 bg-pe-charcoal"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-10 md:px-10">
          <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-pe-surface md:h-24 md:w-36">
            <Image src={next.image} alt={next.title} fill className="object-cover transition-transform group-hover:scale-105" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-pe-gray">Next project</p>
            <p className="font-display text-2xl uppercase group-hover:text-pe-off-white md:text-3xl">
              {next.title} →
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
