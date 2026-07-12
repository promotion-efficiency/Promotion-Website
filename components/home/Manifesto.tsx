'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { liquidEase } from '@/lib/navMotion'

const primaryLines = [
  brand.voice.manifesto[0],
  brand.voice.manifesto[1],
]

const secondaryLine = brand.voice.manifesto[2]

const lines = [
  {
    text: primaryLines[0],
    className:
      'font-sans text-[clamp(1.75rem,4.2vw,3.25rem)] font-normal leading-[1.15] tracking-[-0.02em] text-pe-white',
  },
  {
    text: primaryLines[1],
    className:
      'font-sans text-[clamp(1.75rem,4.2vw,3.25rem)] font-normal leading-[1.15] tracking-[-0.02em] text-pe-white',
  },
  {
    text: secondaryLine,
    className:
      'pt-4 font-sans text-[clamp(1.5rem,3.5vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.02em] text-pe-gray md:pt-6',
  },
]

function RevealLine({
  children,
  index,
  className = '',
  show,
}: {
  children: React.ReactNode
  index: number
  className?: string
  show: boolean
}) {
  return (
    <div className="overflow-hidden py-[0.12em]">
      <motion.p
        className={className}
        initial={false}
        animate={show ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.85,
          delay: index * 0.12,
          ease: liquidEase,
        }}
      >
        {children}
      </motion.p>
    </div>
  )
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(sectionRef, { once: true, amount: 0.2, margin: '0px 0px -80px 0px' })
  const show = Boolean(prefersReduced || inView)

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="border-t border-pe-gray/20 bg-pe-black py-28 md:py-40"
    >
      <div className="w-full px-[5vw]">
        <div className="max-w-5xl">
          {lines.map((line, i) => (
            <RevealLine key={line.text} index={i} className={line.className} show={show}>
              {line.text}
            </RevealLine>
          ))}
        </div>
      </div>
    </section>
  )
}
