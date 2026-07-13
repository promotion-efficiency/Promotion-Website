'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HeroPlayCursor, { useFinePointer, usePlayCursor } from '@/components/home/HeroPlayCursor'
import HeroConsentBar from '@/components/home/HeroConsentBar'
import { useWordmarkSplit } from '@/components/brand/SplitWordmark'
import { brand } from '@/lib/brand'
import { assetPath } from '@/lib/paths'
import { liquidSpring, liquidTransition } from '@/lib/navMotion'

const HERO_VIDEO_SRC = `${assetPath('/assets/hero-bg.mp4')}?v=canon-2026`

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const split = useWordmarkSplit()
  const prefersReduced = useReducedMotion()
  const finePointer = useFinePointer()
  const { cursor, onMouseMove, onMouseLeave } = usePlayCursor(finePointer)
  const [parallax, setParallax] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let playing = false

    const play = async () => {
      if (playing) return
      try {
        video.muted = true
        await video.play()
        playing = true
      } catch {
        // Autoplay can be blocked until user interaction.
      }
    }

    const onCanPlay = () => {
      void play()
    }

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void play()
    } else {
      video.addEventListener('canplay', onCanPlay, { once: true })
    }

    return () => video.removeEventListener('canplay', onCanPlay)
  }, [])

  useEffect(() => {
    if (expanded) return

    const onScroll = () => setParallax(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [expanded])

  useEffect(() => {
    if (!expanded) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded])

  const copyY = prefersReduced || expanded ? 0 : parallax * 0.04
  const contentTransition = prefersReduced ? { duration: 0.2 } : liquidTransition

  const expandHero = () => {
    void videoRef.current?.play()
    setExpanded(true)
  }

  const handleHeroClick = () => {
    if (expanded) {
      setExpanded(false)
      return
    }

    expandHero()
  }

  const handleHeroKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (expanded) setExpanded(false)
      else expandHero()
    }
  }

  return (
    <>
      {expanded && <div className="min-h-screen" aria-hidden />}

      {finePointer && !expanded && (
        <HeroPlayCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
      )}

      <motion.section
        layout
        className={`isolate overflow-hidden bg-black ${
          expanded ? 'fixed inset-0 z-[100]' : 'relative min-h-screen'
        } ${finePointer && !expanded ? 'cursor-none' : ''}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={handleHeroClick}
        onKeyDown={handleHeroKeyDown}
        role="button"
        tabIndex={0}
        aria-label={expanded ? 'Close showreel' : 'Play showreel'}
        transition={liquidTransition}
      >
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          animate={{
            scale: expanded ? (prefersReduced ? 1 : 1.08) : 1,
          }}
          transition={prefersReduced ? { duration: 0.25 } : liquidSpring}
        >
          <video
            key={HERO_VIDEO_SRC}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            aria-hidden
            src={HERO_VIDEO_SRC}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10"
          animate={{
            opacity: expanded ? 0 : 1,
            filter: expanded && !prefersReduced ? 'blur(10px)' : 'blur(0px)',
          }}
          transition={contentTransition}
          style={{ pointerEvents: expanded ? 'none' : 'auto' }}
          aria-hidden={expanded}
        >
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
            aria-hidden
          />

          {/* Mobile: Koto-style centered play + bottom-left headline */}
          <div className="pointer-events-none absolute inset-0 flex flex-col md:hidden">
            <div className="flex flex-1 flex-col items-center justify-center px-[5vw]">
              <span className="flex h-11 w-11 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-sm">
                <span className="ml-0.5 text-[10px]" aria-hidden>
                  ▶
                </span>
              </span>
              <p className="mt-4 text-lg font-medium tracking-tight text-white">Showreel</p>
            </div>

            <div className="px-[5vw] pb-28">
              <p className="text-sm font-light text-white/85">We&apos;re Promotion Efficiency</p>
              <p className="mt-1 font-sans text-[clamp(2rem,9vw,2.75rem)] font-light leading-[1.05] tracking-tight text-white/55">
                {brand.descriptor}
              </p>
            </div>
          </div>

          {/* Desktop: play badge on right */}
          {!finePointer && (
            <span className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-2 border border-white/30 bg-black/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:flex md:right-10">
              <span className="text-[8px]" aria-hidden>
                ▶
              </span>
              Play
            </span>
          )}

          <HeroConsentBar />

          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 hidden w-full px-[5vw] pb-10 md:block md:pb-14"
            style={{ y: copyY }}
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="flex max-w-3xl flex-col items-start leading-[1.02] text-white">
              <span
                className="font-sans text-[clamp(2.25rem,5.5vw,4.25rem)] font-light tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(${-split}px)` }}
              >
                We make brands
              </span>
              <span
                className="font-sans text-[clamp(2.25rem,5.5vw,4.25rem)] font-light tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(${split}px)` }}
              >
                move faster.
              </span>
            </h1>

            <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-white/85 md:text-lg">
              {brand.tagline}. Concept to production to distribution — one partner for the whole climb.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  )
}
