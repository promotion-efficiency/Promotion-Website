'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { brand, services } from '@/lib/brand'
import { assetPath } from '@/lib/paths'
import QuoteCTA from '@/components/shared/QuoteCTA'
import ClientMarquee from '@/components/shared/ClientMarquee'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80'

const JUMP_LINKS = services.map((service) => ({
  label: service.title,
  href: `#${service.id}`,
}))

function mediaSrc(src: string) {
  return src.startsWith('http') ? src : assetPath(src)
}

function ServiceVideoCard({
  src,
  label,
}: {
  src: string
  label: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    void video.play().catch(() => {})
  }, [src])

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-pe-charcoal">
      <video
        key={src}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        src={mediaSrc(src)}
        aria-label={`${label} reel`}
      />
    </div>
  )
}

export default function ServicesContent() {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const activeService = services[activeIndex] ?? services[0]

  useEffect(() => {
    const syncActive = () => {
      const nodes = sectionRefs.current.filter(Boolean) as HTMLElement[]
      if (!nodes.length) return

      // Active = last article whose top has crossed ~40% down the viewport
      const trigger = window.innerHeight * 0.4
      let next = 0
      for (let i = 0; i < nodes.length; i++) {
        const top = nodes[i]!.getBoundingClientRect().top
        if (top <= trigger) next = Number(nodes[i]!.dataset.index) || i
      }
      setActiveIndex((prev) => (prev === next ? prev : next))
    }

    syncActive()
    window.addEventListener('scroll', syncActive, { passive: true })
    window.addEventListener('resize', syncActive)
    return () => {
      window.removeEventListener('scroll', syncActive)
      window.removeEventListener('resize', syncActive)
    }
  }, [])

  return (
    <>
      <section className="relative h-[50svh] min-h-[20rem] w-full overflow-hidden bg-pe-charcoal">
        <Image
          src={mediaSrc(HERO_IMAGE)}
          alt="Promotion Efficiency services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </section>

      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="w-full px-[5vw]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
                Services
              </p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-pe-gray-light md:text-base">
                From concept to production to distribution — one partner for the whole climb.{' '}
                {brand.tagline}.
              </p>
            </div>

            <div className="ml-auto w-full max-w-2xl text-right">
              <nav
                className="mb-6 flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
                aria-label="Service sections"
              >
                <span className="text-pe-gray">(Jump to)</span>
                {JUMP_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-pe-white transition-colors hover:text-pe-orange"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <h1 className="font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-snug tracking-tight text-pe-white">
                Five disciplines. One system. Every move counted.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-pe-gray/20 bg-pe-black py-16 md:py-24">
        <div className="w-full px-[5vw]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
            {/* Left rail — service title top-left, video bottom-left */}
            <aside className="flex w-full shrink-0 flex-col lg:sticky lg:top-28 lg:h-[calc(100svh-7rem)] lg:w-[26rem] lg:justify-between lg:self-start lg:pb-6 xl:w-[30rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-sans text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none tracking-tight text-pe-white">
                    {activeService.title}
                  </h2>
                  <p className="mt-5 max-w-[20rem] text-sm leading-relaxed text-pe-gray-light">
                    {activeService.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 hidden lg:mt-0 lg:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`video-${activeService.id}`}
                    initial={prefersReduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ServiceVideoCard
                      src={activeService.video}
                      label={activeService.title}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </aside>

            {/* Right scrolling content */}
            <div className="ml-auto w-full max-w-xl space-y-28 md:space-y-36 lg:max-w-[min(34rem,38vw)]">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  id={service.id}
                  data-index={index}
                  ref={(el) => {
                    sectionRefs.current[index] = el
                  }}
                  className="scroll-mt-28"
                >
                  <div className="mb-8 lg:hidden">
                    <h2 className="font-sans text-[clamp(2.25rem,8vw,3.25rem)] font-medium leading-none tracking-tight text-pe-white">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-pe-gray-light">
                      {service.body}
                    </p>
                    <div className="mt-8">
                      <ServiceVideoCard src={service.video} label={service.title} />
                    </div>
                  </div>

                  <p className="font-sans text-[clamp(1.2rem,2.2vw,1.65rem)] font-medium leading-snug tracking-tight text-pe-white">
                    {service.line}
                  </p>

                  <ul className="mt-10 md:mt-12">
                    {service.offerings.map((item) => (
                      <li
                        key={item}
                        className="border-t border-pe-white/12 py-3.5 text-sm text-pe-white last:border-b md:py-4 md:text-[15px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClientMarquee />
      <QuoteCTA />
    </>
  )
}
