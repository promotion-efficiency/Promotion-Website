'use client'

import Image from 'next/image'
import { clientLogos } from '@/lib/brand'
import { assetPath } from '@/lib/paths'

export default function ClientMarquee() {
  return (
    <section className="bg-pe-charcoal py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="max-w-xl font-sans text-2xl font-semibold leading-snug text-pe-white md:text-[1.75rem]">
          Brands we&apos;ve climbed with
        </h2>
        <p className="mt-2 max-w-xl text-sm text-pe-gray md:text-base">
          Across industries. Across markets. Across moments.
        </p>

        <div className="mt-10 grid grid-cols-2 border-l border-t border-pe-gray/20 sm:grid-cols-3 lg:grid-cols-5">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="flex min-h-[88px] items-center justify-center border-r border-b border-pe-gray/20 px-4 py-8 md:min-h-[104px] md:py-10"
            >
              {client.logo ? (
                <Image
                  src={assetPath(client.logo)}
                  alt={client.name}
                  width={140}
                  height={56}
                  className="max-h-10 w-auto max-w-[85%] object-contain brightness-0 md:max-h-12"
                />
              ) : (
                <span className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-pe-white/75 md:text-xs">
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
