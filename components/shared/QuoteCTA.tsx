import Button from '@/components/ui/Button'

export default function QuoteCTA() {
  return (
    <section className="border-t border-pe-gray/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          Get a quote
        </p>
        <h2 className="mt-4 font-display text-5xl uppercase md:text-7xl">
          Ready to start?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-pe-gray-light">
          Four steps. Two minutes. Tell us what you need and we&apos;ll map the climb.
        </p>
        <div className="mt-10">
          <Button href="/contact">Start a project</Button>
        </div>
      </div>
    </section>
  )
}
