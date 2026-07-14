'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { brand, serviceFilters } from '@/lib/brand'
import { projects, type Project } from '@/lib/projects'
import { readSeenProjects } from '@/lib/workSeen'
import WorkCaseCursor from '@/components/home/WorkCaseCursor'
import { useFinePointer, usePlayCursor } from '@/components/home/HeroPlayCursor'

type WorkMode = 'projects' | 'partnerships'

const PARTNERSHIPS = projects.filter((p) => p.featured)

function WorkRailCta({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`group relative flex w-full flex-col justify-between gap-6 bg-pe-orange p-5 text-white transition-colors hover:bg-pe-white hover:text-pe-orange lg:max-w-[15rem] lg:gap-8 ${className}`}
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
          Get a quote
        </p>
        <p className="mt-3 font-sans text-xl font-medium leading-snug tracking-tight">
          Ready to start the climb?
        </p>
        <p className="mt-2 text-xs leading-relaxed opacity-80">
          Four steps. Two minutes. Tell us what you need.
        </p>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
        Start a project →
      </span>
    </Link>
  )
}

function ProjectTile({
  project,
  onHover,
  active,
  seen,
  onMouseMove,
  onMouseEnterCursor,
  onMouseLeaveCursor,
  alwaysShowMeta,
}: {
  project: Project
  onHover: (project: Project | null) => void
  active: boolean
  seen: boolean
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void
  onMouseEnterCursor: (e: React.MouseEvent<HTMLElement>) => void
  onMouseLeaveCursor: () => void
  alwaysShowMeta: boolean
}) {
  const [videoOn, setVideoOn] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <div
      className={`relative transition-opacity duration-300 ${active ? 'z-50' : 'z-0'}`}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        href={`/work/${project.slug}`}
        className={`group relative block aspect-[4/5] overflow-hidden bg-pe-charcoal sm:aspect-[4/3] ${
          active ? 'cursor-none' : ''
        }`}
        onMouseEnter={(e) => {
          setVideoOn(true)
          onMouseEnterCursor(e)
        }}
        onMouseLeave={() => {
          setVideoOn(false)
          onMouseLeaveCursor()
        }}
        onMouseMove={onMouseMove}
      >
        <motion.div layoutId={`project-cover-${project.slug}`} className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        </motion.div>

        {videoOn && project.video && !prefersReduced && (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 z-10 h-full w-full object-cover"
          />
        )}

        <div
          className={`absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            alwaysShowMeta
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
          }`}
        />

        {seen && (
          <span className="absolute right-3 top-3 z-40 flex items-center gap-1.5 border border-white/25 bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <span aria-hidden>✓</span>
            Just seen
          </span>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 z-30 p-4 transition-[opacity,transform] duration-300 md:p-5 ${
            alwaysShowMeta
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'
          }`}
        >
          <p className="font-display text-[clamp(1.75rem,7vw,3.5rem)] uppercase leading-[0.9] tracking-tight text-white">
            {project.client}
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
            {project.serviceFilter}
            <span className="mx-2 text-white/35">·</span>
            {project.year}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default function WorkIndex() {
  const prefersReduced = useReducedMotion()
  const finePointer = useFinePointer()
  const { cursor, onMouseMove, onMouseEnter, onMouseLeave } = usePlayCursor(finePointer)
  const [mode, setMode] = useState<WorkMode>('projects')
  const [filter, setFilter] = useState<string>('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [hovered, setHovered] = useState<Project | null>(null)
  const [seen, setSeen] = useState<Set<string>>(new Set())

  useEffect(() => {
    const sync = () => setSeen(new Set(readSeenProjects()))
    sync()
    window.addEventListener('focus', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.removeEventListener('focus', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  const list = useMemo(() => {
    const source = mode === 'partnerships' ? PARTNERSHIPS : projects
    if (filter === 'All') return source
    return source.filter((p) => p.serviceFilter === filter)
  }, [mode, filter])

  // Spotlight only on fine pointer (desktop). Touch stays clean.
  const spotlight = Boolean(hovered) && finePointer && !prefersReduced

  return (
    <>
      <section className="relative min-h-svh bg-pe-black pt-24 md:pt-28">
        <div className="relative flex flex-col lg:flex-row lg:items-start">
          {/* Mobile: static intro. Desktop: sticky rail */}
          <aside
            className={`w-full shrink-0 bg-pe-black px-[5vw] pb-8 pt-2 lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-7rem)] lg:w-[min(22rem,28vw)] lg:flex-col lg:justify-between lg:self-start lg:pt-0 lg:pb-10 xl:w-[min(24rem,26vw)] ${
              spotlight ? 'z-50' : 'z-20'
            }`}
          >
            <div>
              <h1 className="font-sans text-[clamp(1.85rem,6vw,2.75rem)] font-medium leading-none tracking-tight text-pe-white">
                Our work
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-pe-gray-light lg:max-w-[16rem]">
                Ambitious ideas for ambitious brands. {brand.tagline}.
              </p>

              <nav
                className="mt-8 flex gap-6 overflow-x-auto pb-1 lg:mt-10 lg:flex-col lg:gap-5 lg:overflow-visible lg:pb-0"
                aria-label="Work sections"
              >
                <button
                  type="button"
                  onClick={() => setMode('projects')}
                  className={`flex shrink-0 items-start gap-2 text-left text-sm font-medium transition-colors ${
                    mode === 'projects' ? 'text-pe-white' : 'text-pe-gray hover:text-pe-white'
                  }`}
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      mode === 'projects' ? 'bg-pe-white' : 'bg-transparent'
                    }`}
                    aria-hidden
                  />
                  <span>Projects</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('partnerships')}
                  className={`flex shrink-0 items-start gap-2 text-left transition-colors ${
                    mode === 'partnerships' ? 'text-pe-white' : 'text-pe-gray hover:text-pe-white'
                  }`}
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      mode === 'partnerships' ? 'bg-pe-white' : 'bg-transparent'
                    }`}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-medium">Partnerships</span>
                    <span className="mt-1 hidden max-w-[14rem] text-xs leading-relaxed text-pe-gray lg:block">
                      A closer look at long-term collaborations and their lasting impact.
                    </span>
                  </span>
                </button>
              </nav>
            </div>

            <div className="mt-10 hidden lg:mt-0 lg:block">
              <WorkRailCta />
            </div>
          </aside>

          <div className="relative min-w-0 flex-1 px-[5vw] pb-24 lg:px-0 lg:pb-28 lg:pl-6 lg:pr-[5vw] xl:pl-8">
            <motion.div
              key={`${mode}-${filter}`}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:gap-6"
            >
              {list.map((project) => (
                <ProjectTile
                  key={project.slug}
                  project={project}
                  onHover={setHovered}
                  active={spotlight && hovered?.slug === project.slug}
                  seen={seen.has(project.slug)}
                  onMouseMove={onMouseMove}
                  onMouseEnterCursor={onMouseEnter}
                  onMouseLeaveCursor={onMouseLeave}
                  alwaysShowMeta={!finePointer}
                />
              ))}
            </motion.div>

            {list.length === 0 && (
              <p className="py-24 text-sm text-pe-gray-light">No work in this filter yet.</p>
            )}

            <div className="mt-10 lg:hidden">
              <WorkRailCta />
            </div>
          </div>
        </div>

        <div
          className={`pointer-events-none fixed inset-0 z-40 hidden bg-black/75 backdrop-blur-[8px] transition-opacity duration-300 lg:block lg:left-[min(22rem,28vw)] xl:left-[min(24rem,26vw)] ${
            spotlight ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden
        />

        <div
          className={`fixed bottom-5 right-[5vw] z-[60] transition-opacity duration-300 md:bottom-8 ${
            spotlight ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <div className="relative">
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full right-0 mb-2 max-h-[50vh] min-w-[10rem] overflow-y-auto border border-pe-white/15 bg-pe-black/95 py-2 backdrop-blur-md"
                >
                  {serviceFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setFilter(item)
                        setFilterOpen(false)
                      }}
                      className={`block w-full px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                        filter === item
                          ? 'text-pe-orange'
                          : 'text-pe-white hover:text-pe-orange'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="border border-pe-white/20 bg-pe-black/90 px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-pe-white backdrop-blur-md transition-colors hover:border-pe-white/50"
              aria-expanded={filterOpen}
              aria-haspopup="listbox"
            >
              Filter{filter !== 'All' ? ` · ${filter}` : ' ='}
            </button>
          </div>
        </div>
      </section>

      {finePointer && (
        <WorkCaseCursor
          x={cursor.x}
          y={cursor.y}
          visible={cursor.visible && spotlight}
          label="View case"
        />
      )}
    </>
  )
}
