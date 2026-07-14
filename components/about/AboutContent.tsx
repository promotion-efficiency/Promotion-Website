'use client'

import { useState } from 'react'
import Image from 'next/image'
import { brand } from '@/lib/brand'
import { studioLocation, team, values } from '@/lib/team'
import QuoteCTA from '@/components/shared/QuoteCTA'
import StudioNews from '@/components/home/StudioNews'
import WorkCaseCursor from '@/components/home/WorkCaseCursor'
import { useFinePointer, usePlayCursor } from '@/components/home/HeroPlayCursor'

const JUMP_LINKS = [
  { label: 'Values', href: '#values' },
  { label: 'Team', href: '#team' },
  { label: 'Locations', href: '#locations' },
  { label: 'Studio News', href: '#studio-news' },
] as const

function ValuePattern({ pattern }: { pattern: 'ascend' | 'intersect' | 'grid' }) {
  if (pattern === 'ascend') {
    return (
      <>
        <span className="absolute inset-[12%] rounded-full bg-pe-teal/60 blur-3xl transition-[opacity,transform] duration-500 group-hover:scale-110 group-hover:opacity-95" />
        <span className="absolute left-[30%] top-[32%] h-[48%] w-[48%] rounded-full bg-pe-teal/45 blur-2xl transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-90" />
      </>
    )
  }

  if (pattern === 'intersect') {
    return (
      <>
        <span className="absolute left-[14%] top-[22%] h-[48%] w-[42%] rounded-full bg-pe-orange/60 blur-3xl transition-[opacity,transform] duration-500 group-hover:scale-110 group-hover:opacity-95" />
        <span className="absolute right-[14%] bottom-[18%] h-[42%] w-[40%] rounded-full bg-pe-orange/50 blur-2xl transition-[opacity,transform] duration-500 group-hover:scale-110 group-hover:opacity-90" />
        <span className="absolute left-[38%] top-[36%] h-[28%] w-[28%] rounded-full bg-pe-orange/45 blur-xl transition-[opacity,transform] duration-500 group-hover:scale-105" />
      </>
    )
  }

  return (
    <>
      <span className="absolute inset-[16%] rounded-full bg-pe-teal/60 blur-3xl transition-[opacity,transform] duration-500 group-hover:scale-110 group-hover:opacity-95" />
      <span className="absolute left-[30%] top-[28%] h-[48%] w-[48%] rounded-full bg-pe-teal/45 blur-2xl transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-90" />
    </>
  )
}

function ValuesSection() {
  return (
    <section id="values" className="scroll-mt-28 border-t border-pe-gray/20 py-20 md:py-28">
      <div className="w-full px-[5vw]">
        <h2 className="max-w-4xl font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-snug tracking-tight text-pe-white">
          <span className="font-semibold">Our values.</span>{' '}
          <span className="text-pe-gray-light">
            Built on optimism. Driven by collaboration. Defined by craft.
          </span>
        </h2>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-6">
          {values.map((value) => (
            <article key={value.id} className="group about-reveal">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-pe-charcoal">
                <ValuePattern pattern={value.pattern} />
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:gap-5">
                <h3 className="shrink-0 font-sans text-sm font-semibold text-pe-white md:w-28">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-pe-gray-light">{value.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const [active, setActive] = useState<string | null>(null)
  const activeMember = team.find((member) => member.name === active) ?? null

  return (
    <section id="team" className="scroll-mt-28 border-t border-pe-gray/20 bg-pe-charcoal py-20 md:py-28">
      <div className="w-full px-[5vw]">
        <h2 className="mx-auto max-w-3xl text-center font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-snug tracking-tight text-pe-white">
          A team that brings local expertise and global perspective together under one roof.
        </h2>

        <div className="relative mt-16 md:mt-20">
          <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-gray md:block">
            The team ({team.length})
          </div>
          <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-gray md:block">
            (1) Studio
          </div>

          <div className="relative mx-auto max-w-4xl px-2 md:px-16">
            <div className="relative flex min-h-[19.5rem] items-end justify-center pb-8 md:min-h-[21.5rem] md:pb-10">
              {activeMember && (
                <div className="pointer-events-none absolute top-0 left-1/2 z-20 w-[min(70vw,14rem)] -translate-x-1/2 text-center">
                  <div className="relative aspect-[4/5] overflow-hidden bg-pe-surface">
                    <Image
                      src={activeMember.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="224px"
                    />
                  </div>
                  <p className="mt-3 font-sans text-sm font-semibold text-pe-white">
                    {activeMember.role}
                  </p>
                </div>
              )}
            </div>

            <div className="relative z-0 flex flex-wrap justify-center gap-x-5 gap-y-4 text-center md:gap-x-7 md:gap-y-5">
              {team.map((member) => {
                const isActive = active === member.name

                return (
                  <button
                    key={member.name}
                    type="button"
                    onMouseEnter={() => setActive(member.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(member.name)}
                    onBlur={() => setActive(null)}
                    className={`font-sans text-sm font-medium tracking-tight transition-colors duration-200 md:text-base ${
                      isActive
                        ? 'text-pe-white'
                        : active
                          ? 'text-pe-gray/40'
                          : 'text-pe-gray-light'
                    }`}
                  >
                    {member.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-12 flex justify-center md:mt-16">
            <div className="inline-flex items-center gap-2 border border-pe-white/15 bg-pe-black/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-pe-white backdrop-blur-sm">
              <span className="text-pe-orange">●</span>
              {studioLocation.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LocationsSection() {
  const finePointer = useFinePointer()
  const { cursor, onMouseMove, onMouseLeave } = usePlayCursor(finePointer)
  const [cursorOnImage, setCursorOnImage] = useState(false)

  return (
    <section id="locations" className="scroll-mt-28 border-t border-pe-gray/20 py-20 md:py-28">
      <div className="w-full px-[5vw]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          Locations (1)
        </p>
        <div className="mt-4 h-px w-full bg-pe-white/20" />

        <h2 className="mt-8 max-w-4xl font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-snug tracking-tight text-pe-white">
          <span className="font-semibold">Our studio.</span>{' '}
          <span className="text-pe-gray-light">{studioLocation.label}.</span>
        </h2>

        <article className="about-reveal mt-12 max-w-4xl">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioLocation.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`block ${finePointer && cursorOnImage ? 'cursor-none' : ''}`}
            aria-label={`View ${studioLocation.label} location`}
          >
            <div
              className="relative aspect-[16/10] overflow-hidden bg-pe-charcoal"
              onMouseEnter={() => setCursorOnImage(true)}
              onMouseMove={onMouseMove}
              onMouseLeave={() => {
                onMouseLeave()
                setCursorOnImage(false)
              }}
            >
              <Image
                src={studioLocation.image}
                alt={`${studioLocation.label} studio`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 56rem"
              />
            </div>
          </a>
          <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-8">
            <div>
              <h3 className="font-sans text-lg font-medium text-pe-white">{studioLocation.city}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-pe-gray">Our home studio</p>
            </div>
            <p className="max-w-sm text-sm text-pe-gray-light md:text-right">{studioLocation.address}</p>
          </div>
        </article>
      </div>

      <WorkCaseCursor
        x={cursor.x}
        y={cursor.y}
        visible={finePointer && cursorOnImage && cursor.visible}
        label="View location"
      />
    </section>
  )
}

export default function AboutContent() {
  return (
    <>
      <section className="relative h-[50svh] min-h-[20rem] w-full overflow-hidden bg-pe-charcoal">
        <Image
          src={studioLocation.image}
          alt={`${studioLocation.label} — Promotion Efficiency`}
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">About us</p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-pe-gray-light md:text-base">
                {brand.definition}
              </p>
            </div>

            <div className="ml-auto w-full max-w-2xl text-right">
              <nav
                className="mb-6 flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
                aria-label="About sections"
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
                One studio. One market focus. One goal. Make the best work{' '}
                <span className="italic text-pe-gray-light">humanly possible</span>.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
      <TeamSection />
      <LocationsSection />
      <StudioNews />

      <QuoteCTA />
    </>
  )
}
