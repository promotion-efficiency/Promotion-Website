type WorkCaseCursorProps = {
  x: number
  y: number
  visible: boolean
  label?: string
  icon?: string
}

export default function WorkCaseCursor({
  x,
  y,
  visible,
  label = 'View case',
  icon = '↗',
}: WorkCaseCursorProps) {
  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed z-[70] flex items-center gap-2 border border-white/30 bg-black/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden
    >
      <span className="text-[8px]">{icon}</span>
      {label}
    </div>
  )
}
