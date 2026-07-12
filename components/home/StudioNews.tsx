import Image from 'next/image'
import Link from 'next/link'
import { featuredNews, moreNews } from '@/lib/studioNews'

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

function FeaturedNewsCard() {
  return (
    <article className="group lg:col-span-6">
      <Link href={featuredNews.href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-pe-charcoal">
          <Image
            src={featuredNews.image}
            alt=""
            fill
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <h3 className="mt-6 max-w-xl font-sans text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium leading-snug tracking-tight text-pe-white transition-colors group-hover:text-pe-white/90">
          {featuredNews.title}
        </h3>

        {featuredNews.excerpt && (
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-pe-gray-light md:text-[15px] md:leading-7">
            {featuredNews.excerpt}
          </p>
        )}

        <div className="mt-6">
          <NewsMeta category={featuredNews.category} date={featuredNews.date} />
        </div>
      </Link>
    </article>
  )
}

function CompactNewsCard({ item }: { item: (typeof moreNews)[number] }) {
  return (
    <article className="group lg:col-span-3">
      <Link href={item.href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-pe-charcoal">
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 25vw"
          />
        </div>

        <h3 className="mt-5 font-sans text-base font-medium leading-snug tracking-tight text-pe-white transition-colors group-hover:text-pe-white/90 md:text-lg">
          {item.title}
        </h3>

        <div className="mt-5">
          <NewsMeta category={item.category} date={item.date} />
        </div>
      </Link>
    </article>
  )
}

export default function StudioNews() {
  return (
    <section className="border-t border-pe-white/10 bg-pe-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-none text-pe-white">
              Studio News
            </h2>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
              Press, talks, and events
            </p>
          </div>

          <Link
            href="/about"
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-gray-light transition-colors hover:text-pe-white"
          >
            [ View all ]
          </Link>
        </div>

        <div className="mt-10 md:mt-12">
          <NewsDivider />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-12 lg:gap-8">
          <FeaturedNewsCard />
          {moreNews.map((item) => (
            <CompactNewsCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
