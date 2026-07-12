'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { assetPath } from '@/lib/paths'

const SCROLL_SECTION_VH = 200

export default function ManifestoReel() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.88],
    prefersReduced ? [1, 1] : [0.56, 1],
  )

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

  return (
    <section
      ref={sectionRef}
      id="video-chapter"
      className="relative bg-pe-black"
      style={{ height: prefersReduced ? undefined : `${SCROLL_SECTION_VH}vh` }}
    >
      <div
        className={`overflow-hidden bg-pe-black ${
          prefersReduced ? 'relative h-[85vh] min-h-[560px]' : 'sticky top-0 h-screen'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative h-full w-full origin-center overflow-hidden rounded-[10px] will-change-transform"
            style={{ scale: videoScale }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label="Showreel"
              src={assetPath('/assets/showreel.mov')}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
