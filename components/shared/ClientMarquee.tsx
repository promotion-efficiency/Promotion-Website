'use client'

import Image from 'next/image'
import { clientLogos } from '@/lib/brand'
import { assetPath } from '@/lib/paths'

export default function ClientMarquee() {
  return (
    <section className="bg-pe-charcoal py-24 md:py-32">
      <div className="w-full px-[5vw]">
        <h2 className="max-w-2xl font-sans text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-snug text-pe-white">
          Brands we&apos;ve climbed with
        </h2>
        <p className="mt-3 max-w-xl text-sm text-pe-gray md:text-base">
          Across industries. Across markets. Across moments.
        </p>

        <div className="mt-14 grid grid-cols-2 border-l border-t border-pe-gray/20 sm:grid-cols-3 lg:grid-cols-5">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="flex min-h-[120px] items-center justify-center border-r border-b border-pe-gray/20 px-5 py-12 md:min-h-[140px] md:py-14"
            >
              {client.logo ? (
                <Image
                  src={assetPath(client.logo)}
                  alt={client.name}
                  width={160}
                  height={64}
                  className="max-h-12 w-auto max-w-[85%] object-contain brightness-0 md:max-h-14"
                />
              ) : (
                <span className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-pe-white/75 md:text-sm">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
