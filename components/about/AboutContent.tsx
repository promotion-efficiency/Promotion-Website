import Image from 'next/image'
import { brand } from '@/lib/brand'
import { principles, press, team } from '@/lib/team'
import SplitWordmark from '@/components/brand/SplitWordmark'
import QuoteCTA from '@/components/shared/QuoteCTA'

export default function AboutContent() {
  return (
    <>
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">About</p>
          <h1 className="mt-8 max-w-4xl font-display text-4xl uppercase leading-[1.05] md:text-6xl lg:text-7xl">
            {brand.definition}
          </h1>
          <p className="mt-8 max-w-xl text-sm text-pe-gray-light md:text-base">
            {brand.nickname} — {brand.descriptor}. {brand.tagline}.
          </p>
        </div>
      </section>

      <section className="border-t border-pe-gray/20 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">Principles</p>
          <div className="mt-16 space-y-20 md:space-y-28">
            {principles.map((p) => (
              <div key={p.title} className="about-reveal">
                <h2 className="font-display text-4xl uppercase md:text-6xl">{p.title}</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-pe-gray-light">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-pe-gray/20 bg-pe-charcoal py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">Team</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-pe-surface">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl uppercase">{member.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-pe-gray-light">{member.role}</p>
                <p className="mt-2 text-sm text-pe-gray-light">{member.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-pe-gray/20 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">As seen in</p>
        </div>
        <div className="mt-10 overflow-hidden">
          <div className="marquee-track">
            {[...press, ...press].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-10 font-display text-2xl uppercase text-pe-gray transition-colors hover:text-pe-white md:mx-14 md:text-4xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-pe-gray/20 py-20">
        <div className="mx-auto flex max-w-7xl justify-center px-6 md:px-10">
          <SplitWordmark size="footer" interactive split={0} />
        </div>
      </section>

      <QuoteCTA />
    </>
  )
}
