'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { projects, type Project } from '@/lib/projects'
import { liquidEase } from '@/lib/navMotion'
import WorkViewToggle from '@/components/home/WorkViewToggle'
import { useWorkListMode } from '@/components/home/WorkListMode'
import WorkCaseCursor from '@/components/home/WorkCaseCursor'
import { useFinePointer, usePlayCursor } from '@/components/home/HeroPlayCursor'

function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const scrollY = window.scrollY
    const { style } = document.body
    const previousOverflow = style.overflow
    const previousPosition = style.position
    const previousTop = style.top
    const previousWidth = style.width

    style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.width = '100%'

    return () => {
      style.overflow = previousOverflow
      style.position = previousPosition
      style.top = previousTop
      style.width = previousWidth
      window.scrollTo(0, scrollY)
    }
  }, [locked])
}

function ListDivider() {
  return (
    <div className="flex w-full items-center" aria-hidden>
      <span className="h-1 w-1 shrink-0 rounded-full bg-pe-white" />
      <div className="h-px flex-1 bg-pe-white/35" />
      <span className="h-1 w-1 shrink-0 rounded-full bg-pe-white" />
      <div className="h-px flex-1 bg-pe-white/35" />
      <span className="h-1 w-1 shrink-0 rounded-full bg-pe-white" />
    </div>
  )
}

function WorkProjectPanel({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: liquidEase }}
      className="flex min-h-0 flex-1 flex-col justify-between gap-10"
    >
      <div>
        <h2 className="font-sans text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-pe-white">
          {project.client}
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-pe-gray-light md:text-[15px] md:leading-7">
          {project.description} {project.approach}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm bg-pe-surface">
          <Image src={project.image} alt="" fill className="object-cover" sizes="44px" />
        </div>
        <div>
          <p className="text-sm text-pe-white">{project.title}</p>
          <p className="mt-0.5 text-xs text-pe-gray-light">
            {project.year}, {project.industry}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectImageCard({
  project,
  finePointer,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: {
  project: Project
  finePointer: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`relative block h-[52vh] w-full shrink-0 overflow-hidden bg-pe-charcoal md:h-[58vh] ${
        finePointer ? 'cursor-none' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 60vw"
      />
    </Link>
  )
}

function MobileWorkStack() {
  return (
    <section className="bg-pe-black px-[5vw] py-14 md:hidden">
      <h2 className="font-sans text-[clamp(2.25rem,9vw,3rem)] font-medium leading-none tracking-tight text-pe-white">
        Our work
      </h2>

      <div className="mt-10 flex flex-col gap-12">
        {projects.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-pe-charcoal">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-active:scale-[1.02]"
                sizes="92vw"
              />
              {project.video && (
                <span
                  className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white/80 backdrop-blur-sm"
                  aria-hidden
                >
                  <span className="text-[9px]">▶</span>
                </span>
              )}
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-sans text-lg font-medium text-pe-white">
                  {project.client}
                </h3>
                <p className="mt-1 text-sm text-pe-gray">{project.title}</p>
              </div>
              <span className="shrink-0 text-lg text-pe-gray-light" aria-hidden>
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const snapLockRef = useRef(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stackMetrics, setStackMetrics] = useState({ cardHeight: 0, gap: 32, clipHeight: 0 })
  const [cursorOnImage, setCursorOnImage] = useState(false)
  const finePointer = useFinePointer()
  const prefersReduced = useReducedMotion()
  const { cursor, onMouseMove, onMouseLeave } = usePlayCursor(finePointer)
  const activeProject = projects[activeIndex] ?? projects[0]

  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight
      const isDesktop = window.innerWidth >= 768
      setStackMetrics({
        cardHeight: vh * (isDesktop ? 0.58 : 0.52),
        gap: 32,
        clipHeight: vh * (isDesktop ? 0.78 : 0.68),
      })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const getSectionScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const scrollable = section.offsetHeight - window.innerHeight
      const progress =
        scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable))
      const index = Math.min(
        projects.length - 1,
        Math.round(progress * (projects.length - 1)),
      )

      return { rect, sectionTop, scrollable, progress, index }
    }

    const snapToProject = (index: number) => {
      const { sectionTop, scrollable } = getSectionScroll()
      if (scrollable <= 0) return

      const targetScroll =
        projects.length === 1
          ? sectionTop
          : sectionTop + (index / (projects.length - 1)) * scrollable

      snapLockRef.current = true
      window.scrollTo({
        top: targetScroll,
        behavior: prefersReduced ? 'auto' : 'smooth',
      })

      window.setTimeout(() => {
        snapLockRef.current = false
      }, prefersReduced ? 0 : 480)
    }

    const updateScroll = () => {
      if (snapLockRef.current) return

      const { rect, progress, index, scrollable } = getSectionScroll()
      if (scrollable <= 0 || rect.bottom < 0 || rect.top > window.innerHeight) return

      setScrollProgress(progress)
      setActiveIndex(index)
    }

    let snapTimeout: ReturnType<typeof setTimeout> | undefined

    const scheduleSnap = () => {
      clearTimeout(snapTimeout)
      snapTimeout = setTimeout(() => {
        if (snapLockRef.current) return

        const { rect, progress, scrollable } = getSectionScroll()
        if (scrollable <= 0) return
        if (rect.bottom < window.innerHeight * 0.3 || rect.top > window.innerHeight * 0.7) {
          return
        }

        const snappedIndex = Math.min(
          projects.length - 1,
          Math.round(progress * (projects.length - 1)),
        )
        const sectionTop = window.scrollY + rect.top
        const targetScroll =
          projects.length === 1
            ? sectionTop
            : sectionTop + (snappedIndex / (projects.length - 1)) * scrollable

        if (Math.abs(window.scrollY - targetScroll) > 12) {
          snapToProject(snappedIndex)
        }
      }, prefersReduced ? 0 : 180)
    }

    const onScroll = () => {
      updateScroll()
      scheduleSnap()
    }

    const onScrollEnd = () => {
      scheduleSnap()
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    window.addEventListener('scrollend', onScrollEnd)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScroll)
      window.removeEventListener('scrollend', onScrollEnd)
      clearTimeout(snapTimeout)
    }
  }, [prefersReduced])

  const { cardHeight, gap, clipHeight } = stackMetrics
  const maxStackTravel = Math.max(0, (projects.length - 1) * (cardHeight + gap))
  const centerOffset = cardHeight > 0 ? (clipHeight - cardHeight) / 2 : 0
  const stackTranslateY = centerOffset - scrollProgress * maxStackTravel

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-pe-black md:block"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,32%)_1fr] md:gap-8 lg:grid-cols-[minmax(0,34%)_1fr] lg:gap-10">
          <aside className="flex min-w-0 flex-col justify-between px-[5vw] py-10 md:h-[78vh] md:px-0 md:pl-[5vw] md:pr-6 md:py-0">
            <AnimatePresence mode="wait">
              <WorkProjectPanel key={activeProject.slug} project={activeProject} />
            </AnimatePresence>
          </aside>

          <div className="relative h-[68vh] min-w-0 overflow-hidden px-[5vw] md:h-[78vh] md:px-0 md:pr-[5vw]">
            <div
              className="flex flex-col gap-8 will-change-transform"
              style={{ transform: `translate3d(0, ${stackTranslateY}px, 0)` }}
            >
              {projects.map((project) => (
                <ProjectImageCard
                  key={project.slug}
                  project={project}
                  finePointer={finePointer}
                  onMouseEnter={() => setCursorOnImage(true)}
                  onMouseLeave={() => {
                    onMouseLeave()
                    setCursorOnImage(false)
                  }}
                  onMouseMove={onMouseMove}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <WorkCaseCursor
        x={cursor.x}
        y={cursor.y}
        visible={finePointer && cursorOnImage && cursor.visible}
      />
    </section>
  )
}

function ListView({ fullscreen = false }: { fullscreen?: boolean }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const finePointer = useFinePointer()
  const prefersReduced = useReducedMotion()
  const hoveredProject = projects.find((project) => project.slug === hoveredSlug)
  const showPreview = Boolean(finePointer && !prefersReduced && hoveredProject)

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {showPreview && hoveredProject && (
          <motion.div
            key={hoveredProject.slug}
            className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center px-[5vw]"
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: liquidEase }}
          >
            <div className="relative aspect-[16/10] w-full max-w-[min(90vw,720px)] overflow-hidden">
              <Image
                src={hoveredProject.image}
                alt=""
                fill
                className="object-cover motion-safe:animate-[workPreviewDrift_6s_ease-in-out_infinite_alternate]"
                sizes="720px"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ListDivider />

      {projects.map((project, index) => {
        const isHovered = hoveredSlug === project.slug
        const isDimmed = hoveredSlug !== null && !isHovered

        return (
          <div key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className={`relative z-40 block py-5 transition-opacity duration-300 md:py-7 ${
                isDimmed ? 'opacity-30' : 'opacity-100'
              }`}
              onClick={fullscreen ? (event) => event.preventDefault() : undefined}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              onFocus={() => setHoveredSlug(project.slug)}
              onBlur={() => setHoveredSlug(null)}
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_auto_auto] md:items-center md:gap-8">
                <span
                  className={`col-span-2 font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-none transition-colors duration-300 md:col-span-1 ${
                    isHovered ? 'text-pe-white' : 'text-pe-white/85'
                  }`}
                >
                  {project.title}
                </span>
                <span
                  className={`text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300 md:text-center md:text-sm ${
                    isHovered ? 'text-pe-white' : 'text-pe-white/55'
                  }`}
                >
                  {project.client}
                </span>
                <span
                  className={`text-xs transition-colors duration-300 md:text-sm ${
                    isHovered ? 'text-pe-gray-light' : 'text-pe-gray/70'
                  }`}
                >
                  {project.year}
                </span>
                <span
                  className={`text-right text-xs tabular-nums transition-colors duration-300 md:text-sm ${
                    isHovered ? 'text-pe-gray-light' : 'text-pe-gray/70'
                  }`}
                >
                  /{String(index + 1).padStart(3, '0')}
                </span>
              </div>
            </Link>
            <ListDivider />
          </div>
        )
      })}
    </div>
  )
}

export default function LatestWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(sectionRef, { amount: 0.12, margin: '0px 0px -80px 0px' })
  const { listMode, setListMode } = useWorkListMode()

  useScrollLock(listMode)

  useEffect(() => {
    return () => setListMode(false)
  }, [setListMode])

  useEffect(() => {
    if (!listMode) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setListMode(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [listMode])

  return (
    <>
      <div id="work" ref={sectionRef}>
        <MobileWorkStack />
        {!listMode && <WorkShowcase />}
      </div>

      <AnimatePresence>
        {listMode && (
          <motion.div
            key="work-list-overlay"
            className="fixed inset-0 z-[90] overflow-y-auto bg-pe-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: liquidEase }}
            role="dialog"
            aria-modal="true"
            aria-label="Work list view"
          >
            <div
              className="flex min-h-full items-center py-24 md:py-28"
              style={{ paddingLeft: '5vw', paddingRight: '5vw' }}
            >
              <ListView fullscreen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WorkViewToggle
        visible={listMode || sectionInView}
        listMode={listMode}
        onToggle={() => setListMode((v) => !v)}
      />
    </>
  )
}
