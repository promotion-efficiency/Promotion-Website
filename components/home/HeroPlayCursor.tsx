'use client'

import { useEffect, useState } from 'react'

type Cursor = {
  x: number
  y: number
  visible: boolean
}

export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}

export function useHoverPlayCursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return enabled
}

export function usePlayCursor(enabled: boolean) {
  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0, visible: false })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enabled) return
    setCursor({ x: e.clientX, y: e.clientY, visible: true })
  }

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!enabled) return
    setCursor({ x: e.clientX, y: e.clientY, visible: true })
  }

  const onMouseLeave = () => {
    if (!enabled) return
    setCursor((c) => ({ ...c, visible: false }))
  }

  return { cursor, onMouseMove, onMouseEnter, onMouseLeave }
}

type HeroPlayCursorProps = {
  x: number
  y: number
  visible: boolean
  className?: string
}

export default function HeroPlayCursor({ x, y, visible, className = '' }: HeroPlayCursorProps) {
  if (!visible) return null

  return (
    <div
      className={`pointer-events-none fixed flex items-center gap-2 border border-pe-gray/40 bg-pe-black/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-pe-white backdrop-blur-sm ${className || 'z-[60]'}`}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden
    >
      <span className="text-[8px]">▶</span>
      Play
    </div>
  )
}

export function scrollToVideoChapter() {
  document.getElementById('video-chapter')?.scrollIntoView({ behavior: 'smooth' })
}
