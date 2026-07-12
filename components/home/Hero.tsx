'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HeroPlayCursor, {
  scrollToVideoChapter,
  useFinePointer,
  usePlayCursor,
} from '@/components/home/HeroPlayCursor'
import HeroConsentBar from '@/components/home/HeroConsentBar'
import { useWordmarkSplit } from '@/components/brand/SplitWordmark'
import { brand } from '@/lib/brand'
import { assetPath } from '@/lib/paths'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const split = useWordmarkSplit()
  const prefersReduced = useReducedMotion()
  const finePointer = useFinePointer()
  const { cursor, onMouseMove, onMouseLeave } = usePlayCursor(finePointer)
  const [parallax, setParallax] = useState(0)

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
    const onScroll = () => setParallax(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyY = prefersReduced ? 0 : parallax * 0.04

  const handleHeroClick = () => {
    void videoRef.current?.play()
    scrollToVideoChapter()
  }

  const handleHeroKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scrollToVideoChapter()
    }
  }

  return (
    <>
      {finePointer && <HeroPlayCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />}

      <section
        className={`relative isolate min-h-screen overflow-hidden ${finePointer ? 'cursor-none' : ''}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={handleHeroClick}
        onKeyDown={handleHeroKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Play showreel"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          aria-hidden
          src={assetPath('/assets/hero-bg.mp4')}
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-pe-black/80 via-pe-black/35 to-transparent"
          aria-hidden
        />

        {!finePointer && (
          <span className="pointer-events-none absolute right-6 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 border border-pe-gray/30 bg-pe-black/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-white backdrop-blur-sm md:right-10">
            <span className="text-[8px]" aria-hidden>
              ▶
            </span>
            Play
          </span>
        )}

        <HeroConsentBar />

        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 z-10 w-full px-6 pb-10 md:px-10 md:pb-14"
          style={{ y: copyY }}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="flex max-w-3xl flex-col items-start leading-[1.02] text-pe-white">
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

          <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed md:text-lg">
            {brand.tagline}. Concept to production to distribution — one partner for the whole climb.
          </p>
        </motion.div>
      </section>
    </>
  )
}
