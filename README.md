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

## Deploy (GitHub Pages)

Pushes to `main` build a static export and deploy via [GitHub Actions](.github/workflows/nextjs.yml).

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main` (or run the workflow manually)
3. Site URL: `https://promotion-efficiency.github.io/Promotion-Website/`

Local Pages build check:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY_NAME=Promotion-Website npm run build
```

Output is written to `out/`.

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

- Fonts: NORD (display) + Gotham (body) in `public/fonts/`
- Replace placeholder media in `lib/projects.ts`
- Connect quote form backend in `components/contact/QuoteFlow.tsx`
