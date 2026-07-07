import { services } from '@/lib/brand'

export default function ServicesOverview() {
  return (
    <section id="services" className="border-t border-pe-gray/20 bg-pe-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          What we do
        </p>
        <h2 className="mt-4 font-display text-5xl uppercase md:text-7xl">Services</h2>

        <div className="mt-16 grid gap-px bg-pe-gray/20 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.id}
              className="group bg-pe-charcoal p-8 transition-colors hover:bg-pe-surface md:p-10"
            >
              <span className="font-display text-3xl text-pe-gray">0{i + 1}</span>
              <h3 className="mt-4 font-display text-3xl uppercase">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-pe-gray-light">{service.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
