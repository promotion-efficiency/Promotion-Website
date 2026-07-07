'use client'

import { clients } from '@/lib/brand'

export default function ClientMarquee() {
  const items = [...clients, ...clients]

  return (
    <section className="border-t border-pe-gray/20 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          Brands we&apos;ve climbed with
        </p>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="marquee-track">
          {items.map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="mx-10 font-display text-3xl uppercase text-pe-gray transition-colors duration-300 hover:text-pe-white md:mx-14 md:text-5xl"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
