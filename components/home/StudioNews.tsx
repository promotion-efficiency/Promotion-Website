'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { studioNews, type StudioNewsItem } from '@/lib/studioNews'
import WorkCaseCursor from '@/components/home/WorkCaseCursor'
import { useFinePointer, usePlayCursor } from '@/components/home/HeroPlayCursor'

const CARD_WIDTH = 'w-[min(78vw,22rem)]'

function NewsDivider() {
  return (
    <div className="flex w-full items-center" aria-hidden>
      <span className="h-1 w-1 shrink-0 rounded-full bg-pe-white" />
      <div className="h-px flex-1 bg-pe-white/35" />
      <span className="h-1 w-1 shrink-0 rounded-full bg-pe-white" />
      <div className="h-px flex-1 bg-pe-white/35" />
      <span className="h-1 w-1 shrink-0 rounded-full bg-pe-white" />
    </div>
  )
}

function NewsMeta({ category, date }: { category: string; date: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em]">
      <span className="bg-pe-surface px-2 py-1 text-pe-gray-light">{category}</span>
      <span className="text-pe-gray">{date}</span>
    </div>
  )
}

type NewsCardProps = {
  item: StudioNewsItem
  onImageEnter: () => void
  onImageMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onImageLeave: () => void
}

function NewsCard({ item, onImageEnter, onImageMove, onImageLeave }: NewsCardProps) {
  return (
    <article className={`group shrink-0 snap-start ${CARD_WIDTH}`}>
      <Link href={item.href} className="block">
        <div
          className="relative aspect-[4/3] overflow-hidden bg-pe-charcoal"
          onMouseEnter={onImageEnter}
          onMouseMove={onImageMove}
          onMouseLeave={onImageLeave}
        >
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 78vw, 22rem"
          />
        </div>

        <h3 className="mt-5 line-clamp-3 font-sans text-base font-medium leading-snug tracking-tight text-pe-white transition-colors group-hover:text-pe-white/90 md:text-lg">
          {item.title}
        </h3>

        <div className="mt-5">
          <NewsMeta category={item.category} date={item.date} />
        </div>
      </Link>
    </article>
  )
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center border border-pe-white/20 text-sm text-pe-white transition-colors hover:border-pe-white/50"
      aria-label={direction === 'prev' ? 'Previous articles' : 'Next articles'}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  )
}

export default function StudioNews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const { cursor, onMouseMove, onMouseLeave } = usePlayCursor(finePointer)
  const [cursorOnImage, setCursorOnImage] = useState(false)

  const handleImageEnter = () => setCursorOnImage(true)

  const handleImageLeave = () => {
    onMouseLeave()
    setCursorOnImage(false)
  }

  const scrollCarousel = (direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return

    const firstCard = track.querySelector('article')
    const gap = 24
    const amount = firstCard ? firstCard.getBoundingClientRect().width + gap : 360

    track.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="border-t border-pe-white/10 bg-pe-black py-20 md:py-28">
      <div className="w-full px-[5vw]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-none text-pe-white">
              Studio News
            </h2>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
              Press, talks, and events
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              <CarouselButton direction="prev" onClick={() => scrollCarousel('prev')} />
              <CarouselButton direction="next" onClick={() => scrollCarousel('next')} />
            </div>
            <Link
              href="/about"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-gray-light transition-colors hover:text-pe-white"
            >
              [ View all ]
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <NewsDivider />

          <div
            ref={trackRef}
            className="scrollbar-hide -mr-[5vw] flex gap-6 overflow-x-auto scroll-smooth pr-[5vw] pt-4 pb-2 snap-x snap-mandatory"
          >
            {studioNews.map((item) => (
              <NewsCard
                key={item.slug}
                item={item}
                onImageEnter={handleImageEnter}
                onImageMove={onMouseMove}
                onImageLeave={handleImageLeave}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
          <CarouselButton direction="prev" onClick={() => scrollCarousel('prev')} />
          <CarouselButton direction="next" onClick={() => scrollCarousel('next')} />
        </div>
      </div>

      <WorkCaseCursor
        x={cursor.x}
        y={cursor.y}
        visible={finePointer && cursorOnImage && cursor.visible}
        label="View article"
      />
    </section>
  )
}
