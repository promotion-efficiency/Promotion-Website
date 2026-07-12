'use client'

type HeroVisualProps = {
  className?: string
}

/** Monochrome climb metaphor — KOTO-style composition for PE brand */
export default function HeroVisual({ className = '' }: HeroVisualProps) {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-auto w-full max-w-[min(92vw,520px)] ${className}`}
      aria-hidden="true"
    >
      {/* Parachute canopy */}
      <path
        d="M260 28 C170 28 108 72 88 118 C148 98 212 88 260 88 C308 88 372 98 432 118 C412 72 350 28 260 28Z"
        fill="#9a9a9a"
        className="hero-float-slow"
      />
      <line x1="180" y1="118" x2="220" y2="168" stroke="#6b6b6b" strokeWidth="2" />
      <line x1="340" y1="118" x2="300" y2="168" stroke="#6b6b6b" strokeWidth="2" />

      {/* Floating cluster */}
      <circle cx="205" cy="198" r="34" fill="#e8e8e8" />
      <circle cx="260" cy="182" r="38" fill="#f2f2f2" />
      <circle cx="315" cy="198" r="34" fill="#e8e8e8" />
      <circle cx="232" cy="228" r="30" fill="#f2f2f2" />
      <circle cx="288" cy="228" r="30" fill="#e8e8e8" />

      {/* Peak cube */}
      <rect x="238" y="196" width="44" height="44" fill="#6b6b6b" stroke="#f2f2f2" strokeWidth="2" />
      <path d="M238 196 L260 178 L282 196" fill="#9a9a9a" stroke="#f2f2f2" strokeWidth="2" />
      <line x1="260" y1="178" x2="260" y2="240" stroke="#f2f2f2" strokeWidth="1.5" opacity="0.35" />

      {/* Ground */}
      <ellipse cx="260" cy="332" rx="168" ry="28" fill="#1a1a1a" />
      <ellipse cx="260" cy="328" rx="140" ry="18" fill="#141414" />

      {/* Left plant */}
      <path
        d="M148 328 C148 300 132 278 128 258 C142 268 154 286 158 306 C162 318 154 328 148 328Z"
        fill="#9a9a9a"
        className="hero-float"
      />
      <line x1="152" y1="328" x2="152" y2="348" stroke="#6b6b6b" strokeWidth="3" strokeLinecap="round" />

      {/* Right plant */}
      <path
        d="M372 328 C372 302 388 276 392 252 C378 264 366 288 362 308 C358 320 366 328 372 328Z"
        fill="#9a9a9a"
        className="hero-float-delayed"
      />
      <path d="M388 252 L404 238 L400 258 L416 248 L406 268" stroke="#f2f2f2" strokeWidth="2" strokeLinecap="round" />
      <line x1="372" y1="328" x2="372" y2="348" stroke="#6b6b6b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
