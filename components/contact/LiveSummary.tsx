import type { QuoteFormData } from '@/types'

type LiveSummaryProps = {
  form: QuoteFormData
  step: number
  formatBudget: (v: number) => string
}

export default function LiveSummary({ form, step, formatBudget }: LiveSummaryProps) {
  const serviceLabels = form.services.length
    ? form.services.join(', ')
    : '—'

  return (
    <div className="sticky top-28 rounded-sm border border-pe-gray/20 bg-pe-charcoal p-6 md:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
        Your brief so far
      </p>
      <ul className="mt-6 space-y-4 text-sm">
        <li>
          <span className="text-pe-gray">Services</span>
          <p className="mt-1 text-pe-white">{step >= 0 && form.services.length ? serviceLabels : '—'}</p>
        </li>
        <li>
          <span className="text-pe-gray">Budget</span>
          <p className="mt-1 text-pe-white">{step >= 1 ? formatBudget(form.budget) : '—'}</p>
        </li>
        <li>
          <span className="text-pe-gray">Timeline</span>
          <p className="mt-1 text-pe-white">{step >= 2 && form.timeline ? form.timeline : '—'}</p>
        </li>
        <li>
          <span className="text-pe-gray">Contact</span>
          <p className="mt-1 text-pe-white">
            {step >= 3 && form.name ? `${form.name}${form.company ? ` · ${form.company}` : ''}` : '—'}
          </p>
        </li>
      </ul>
    </div>
  )
}
