'use client'

import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'

export default function Manifesto() {
  return (
    <section id="manifesto" className="border-t border-pe-gray/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          Manifesto
        </p>
        <div className="mt-12 space-y-6">
          {brand.voice.manifesto.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`font-display uppercase leading-[1.1] tracking-tight ${
                i === brand.voice.manifesto.length - 1
                  ? 'text-2xl text-pe-gray-light md:text-4xl'
                  : 'text-3xl md:text-5xl lg:text-6xl'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
