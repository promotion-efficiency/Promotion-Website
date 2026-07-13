'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import LiveSummary from '@/components/contact/LiveSummary'
import { quoteServiceOptions, brand } from '@/lib/brand'
import { stepSlide } from '@/lib/animations'
import type { QuoteFormData } from '@/types'

const TOTAL_STEPS = 4
const BUDGET_MIN = 2000
const BUDGET_MAX = 100000

const timelineOptions = ['ASAP', '1–3 months', '3–6 months', 'Just exploring'] as const

const serviceIcons: Record<string, string> = {
  branding: '◆',
  social: '◎',
  video: '▶',
  web: '□',
  paid: '↗',
}

const initial: QuoteFormData = {
  services: [],
  budget: 25000,
  timeline: '',
  name: '',
  company: '',
  email: '',
  details: '',
}

const friendlyErrors: Record<string, string> = {
  services: 'Pick at least one — we need to know where to aim.',
  timeline: 'No rush? Tell us anyway — even "just exploring" helps.',
  name: 'We\'d love to know what to call you.',
  email: 'Need a valid email so we can actually reach you.',
}

export default function QuoteFlow() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState<QuoteFormData>(initial)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const touchStart = useRef(0)
  const prefersReduced = useReducedMotion()

  const update = (patch: Partial<QuoteFormData>) => setForm((f) => ({ ...f, ...patch }))

  const toggleService = (id: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }))
  }

  const formatBudget = (v: number) => {
    if (v >= BUDGET_MAX) return 'SAR 100K+'
    if (v >= 1000) return `SAR ${Math.round(v / 1000)}K`
    return `SAR ${v.toLocaleString()}`
  }

  const go = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
    setError('')
  }

  const validate = (): string => {
    if (step === 0 && form.services.length === 0) return friendlyErrors.services
    if (step === 2 && !form.timeline) return friendlyErrors.timeline
    if (step === 3) {
      if (!form.name.trim()) return friendlyErrors.name
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        return friendlyErrors.email
      }
    }
    return ''
  }

  const next = () => {
    const err = validate()
    if (err) { setError(err); return }
    if (step < TOTAL_STEPS - 1) go(step + 1)
    else submit()
  }

  const submit = () => {
    // TODO: connect backend
    console.log('Quote submitted:', form)
    setDone(true)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return
    if (diff > 0) next()
    else if (step > 0) go(step - 1)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center border border-pe-white">
          <span>✓</span>
        </div>
        <h2 className="font-display text-4xl uppercase">You&apos;re on the list</h2>
        <p className="mt-4 max-w-md text-pe-gray-light leading-relaxed">
          We&apos;ll reply within 1 business day with next steps. Your hike to peak starts here.
        </p>
        <div className="mt-8 border border-pe-gray/20 p-6 text-sm">
          <p className="text-pe-gray uppercase tracking-wider text-[10px]">Summary</p>
          <ul className="mt-4 space-y-2 text-pe-gray-light">
            <li>{form.services.join(', ')}</li>
            <li>{formatBudget(form.budget)} · {form.timeline}</li>
            <li>{form.name} · {form.email}</li>
          </ul>
        </div>
      </motion.div>
    )
  }

  const steps = [
    {
      title: 'What do you need?',
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          {quoteServiceOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleService(opt.id)}
              className={`flex gap-4 border p-5 text-left transition-all ${
                form.services.includes(opt.id)
                  ? 'border-pe-white bg-pe-white/5'
                  : 'border-pe-gray/30 hover:border-pe-gray-light'
              }`}
            >
              <span className="font-display text-2xl text-pe-gray-light" aria-hidden>
                {serviceIcons[opt.id]}
              </span>
              <div>
                <span className="font-display text-xl uppercase">{opt.label}</span>
                <p className="mt-1 text-xs text-pe-gray-light">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "What's your budget?",
      body: (
        <div>
          <p className="font-display text-6xl">{formatBudget(form.budget)}</p>
          <input
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={1000}
            value={form.budget}
            onChange={(e) => update({ budget: Number(e.target.value) })}
            className="mt-8 w-full accent-pe-white"
            aria-label="Budget range"
          />
          <div className="mt-2 flex justify-between text-xs text-pe-gray">
            <span>SAR 2K</span>
            <span>SAR 100K+</span>
          </div>
        </div>
      ),
    },
    {
      title: 'When do you need it?',
      body: (
        <div className="grid grid-cols-2 gap-3">
          {timelineOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update({ timeline: opt })}
              className={`border p-4 text-sm font-semibold uppercase tracking-wider transition-all ${
                form.timeline === opt
                  ? 'border-pe-white bg-pe-white/5'
                  : 'border-pe-gray/30 hover:border-pe-gray-light'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Almost there',
      body: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name *"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full border-b border-pe-gray/30 bg-transparent py-3 outline-none placeholder:text-pe-gray focus:border-pe-white"
          />
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => update({ company: e.target.value })}
            className="w-full border-b border-pe-gray/30 bg-transparent py-3 outline-none placeholder:text-pe-gray focus:border-pe-white"
          />
          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            className="w-full border-b border-pe-gray/30 bg-transparent py-3 outline-none placeholder:text-pe-gray focus:border-pe-white"
          />
          <textarea
            placeholder="Anything else? (optional)"
            rows={3}
            value={form.details}
            onChange={(e) => update({ details: e.target.value })}
            className="w-full resize-none border-b border-pe-gray/30 bg-transparent py-3 outline-none placeholder:text-pe-gray focus:border-pe-white"
          />
        </div>
      ),
    },
  ]

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="mb-6 flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 transition-colors ${
                i <= step ? 'bg-pe-white' : 'bg-pe-gray/30'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={prefersReduced ? undefined : stepSlide}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h2 className="font-display text-3xl uppercase md:text-4xl">{steps[step].title}</h2>
            <div className="mt-8">{steps[step].body}</div>
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-4 text-sm text-pe-off-white" role="alert">
            {error}
          </p>
        )}

        <div className="mt-10 flex justify-between gap-4">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => go(step - 1)}>Back</Button>
          ) : (
            <span />
          )}
          <Button onClick={next}>{step === TOTAL_STEPS - 1 ? 'Submit' : 'Next'}</Button>
        </div>
      </div>

      <div className="hidden lg:block">
        <LiveSummary form={form} step={step} formatBudget={formatBudget} />
      </div>
    </div>
  )
}

export function ContactPageContent() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-10 md:pt-32">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl uppercase leading-tight md:text-6xl">
          Tell us what you&apos;re building
        </h1>
        <p className="mt-4 text-pe-gray-light leading-relaxed">
          We&apos;ll take it from here. Four quick steps — then we&apos;re on the climb together.
        </p>
      </div>

      <div className="mt-12">
        <QuoteFlow />
      </div>

      <div className="mt-20 border-t border-pe-gray/20 pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pe-gray">
          Prefer to reach out directly?
        </p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-pe-gray-light">
          <a href={`mailto:${brand.email}`} className="hover:text-pe-white">
            {brand.email}
          </a>
          <span>{brand.social}</span>
        </div>
      </div>
    </div>
  )
}
