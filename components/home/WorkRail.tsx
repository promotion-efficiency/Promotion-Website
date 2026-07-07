'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkRail() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const getScroll = () => track.scrollWidth - window.innerWidth + 80

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-pe-charcoal">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-8 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase md:text-7xl">Case studies</h2>
          </div>
          <Link
            href="/work"
            className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-pe-gray-light hover:text-pe-white md:block"
          >
            All work →
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 px-6 pb-24 pt-8 md:px-10 md:gap-8"
        style={{ width: 'max-content' }}
      >
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative block w-[75vw] shrink-0 md:w-[42vw] lg:w-[36vw]"
            onMouseEnter={() => setHoveredSlug(project.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-pe-surface">
              {hoveredSlug === project.slug && project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 75vw, 36vw"
                />
              )}
              <div className="absolute inset-0 bg-pe-black/20 transition-colors group-hover:bg-pe-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.14em] text-pe-gray-light">
                  {project.service} · {project.year}
                </p>
                <h3 className="mt-2 font-display text-4xl uppercase md:text-5xl">
                  {project.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
