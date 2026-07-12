'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'pe-cookie-ack'

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 4.5h3M9 4.5h3M5.5 2v5M5.5 9.5v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M2 9.5h3M9 9.5h3M8.5 7v2.5M8.5 2v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HeroConsentBar() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY))
  }, [])

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  const accept = (e: React.MouseEvent) => {
    stop(e)
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="pointer-events-auto absolute bottom-6 right-[5vw] z-20 flex max-w-[min(92vw,520px)] items-center gap-2.5 border border-pe-white/15 bg-pe-black/55 py-2 pl-3 pr-2 backdrop-blur-md mix-blend-difference md:bottom-7"
      onClick={stop}
      role="group"
      aria-label="Cookie notice"
    >
      <p
        className={`min-w-0 flex-1 text-[10px] font-light leading-snug text-pe-white ${expanded ? '' : 'truncate md:max-w-[280px]'}`}
      >
        Like most websites, we use cookies to improve your experience and better understand how you use our site.
      </p>

      <span className="hidden h-4 w-px shrink-0 bg-pe-white/25 sm:block" aria-hidden />

      <button
        type="button"
        onClick={(e) => {
          stop(e)
          setExpanded((v) => !v)
        }}
        className="flex h-8 w-8 shrink-0 items-center justify-center border border-pe-white/20 text-pe-white transition-colors hover:border-pe-white/50"
        aria-label="Cookie settings"
      >
        <SettingsIcon />
      </button>

      <button
        type="button"
        onClick={accept}
        className="flex h-8 w-8 shrink-0 items-center justify-center border border-pe-white/20 text-pe-white transition-colors hover:border-pe-white/50"
        aria-label="Accept cookies"
      >
        <CheckIcon />
      </button>
    </div>
  )
}
