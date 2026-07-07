# Promotion Efficiency

Modern marketing agency website — Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion + GSAP.

## Brand assets

- Guidelines: `/brand/guidelines.pdf`
- Logo: `/brand/logo.svg`
- Tokens: `lib/brand.ts` (colors, fonts, copy from guidelines)

## Dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|---|---|
| `/` | Splitting wordmark hero → manifesto → services → video chapter → stats → horizontal work rail → client marquee → testimonials → quote CTA |
| `/work` | Filterable case study grid with horizontal scroll on mobile |
| `/work/[slug]` | Individual case study |
| `/about` | Philosophy + brand definition |
| `/contact` | 4-step quote flow with summary |

## Key interactions

- **Split wordmark** — PROMOTION / EFFICIENCY separate on scroll; hover replay in nav + footer
- **GSAP stats** — count up on scroll
- **GSAP work rail** — pinned horizontal scroll with hover video previews
- **Quote flow** — 4 steps + confirmation summary (Framer Motion transitions)
- **Testimonial carousel** — auto-advance, pause on hover, swipe on mobile

## TODO

- Swap Bebas Neue / Inter → licensed NORD / Gotham
- Replace placeholder media in `lib/projects.ts`
- Connect quote form backend in `components/contact/QuoteFlow.tsx`
