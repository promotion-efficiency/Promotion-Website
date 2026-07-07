# Cursor Prompt — Promotion Efficiency Marketing Agency Website

> **How to use:** Paste this entire document into a new Cursor Agent chat (or save as a `.cursor/rules` / project rule). Start with: *"Build this website from scratch. Follow the prompt exactly."*

---

## Mission

Build a **brand-new, production-quality marketing agency website** for **Promotion Efficiency** — a creative marketing partner for local and ambitious brands. The site should feel **modern, cool, fun, and confident** — not corporate, not template-y, not a broken scroll experiment.

This is a **full rebuild from scratch**. Ignore any previous hero/mask/GSAP experiments in this repo. You may delete old code and start clean.

**North star:** A site that feels like the love child of [Copula](https://copula.agency/), [DZ!NR](https://dzinrstudio.com/), [Glitch & Grit](https://glitchandgrit.com/), [IPER](https://iper.com.au/), and [State of AI Design](https://stateofaidesign.com/) — but unmistakably **Promotion Efficiency**.

---

## Brand Guidelines (Promotion Efficiency — New Identity 2025)

### Identity
| Element | Value |
|---|---|
| **Company name** | Promotion Efficiency |
| **Short name / nickname** | Promoe |
| **Tagline** | **Your Hike to PEAK** |
| **Descriptor** | Marketing Partner |
| **Metaphor** | The climb to peak / summit / elevation — growth as a journey, not a sprint |

### Brand voice
- Confident, warm, ambitious — not stiff or jargon-heavy
- Speaks to **local businesses** and brands that want **deeply impactful, integrated communications**
- One-stop partner: **concept → production → distribution**
- Key line to weave in: *"We don't just support your vision; we empower it."*
- Positioning: creative destination offering branding, communications, production, and distribution under one roof

### Typography
| Role | Font | Usage |
|---|---|---|
| **Headlines / display** | **NORD** | Hero headlines, section titles, big statements, marquee text |
| **Body / UI** | **GOTHAM** | Paragraphs, nav, buttons, labels, forms |

> If NORD/Gotham font files are not available, use close substitutes and leave a `// TODO: swap to licensed NORD + Gotham` comment:
> - NORD substitute → **Bebas Neue**, **Oswald**, or **Archivo Black** (tight, bold, editorial)
> - Gotham substitute → **Inter**, **Manrope**, or **DM Sans** (clean geometric sans)

### Color direction (infer from identity deck)
- **Primary background:** near-black `#0a0a0a` or deep charcoal `#111`
- **Primary text:** off-white `#f0f0f0` / `#e8e8e8`
- **Accent:** one bold accent for CTAs and highlights — electric lime, summit orange, or alpine ice blue (pick ONE and commit; avoid rainbow)
- **Secondary:** muted gray for body copy `rgba(255,255,255,0.55)`
- High contrast. Dark-mode-first. No generic purple gradients.

### Logo / wordmark
- Stacked or horizontal: **PROMOTION / EFFICIENCY**
- Serif or bold editorial treatment for the wordmark (Instrument Serif is acceptable if NORD isn't loaded for the logo specifically)
- Tagline **"Your Hike to PEAK"** appears in hero, footer, and meta — never buried

### Social
- Handle: `@PromotionEfficiency` (or `@Promotion Efficiency` per deck)

---

## Design Inspiration — What to Steal (and What NOT to)

### 1. [Copula Agency](https://copula.agency/) — *Personality + manifesto energy*
**Take:**
- Big, bold split headlines ("Your creative / agency")
- Playful CTA language ("Let's bond" → adapt to PE voice: **"Start the climb"**, **"Reach peak"**, **"Let's hike"**)
- Manifesto block: short punchy paragraphs about who you are
- Services as clean cards with expandable detail
- Featured work grid with hover states
- Client logo strip
- Blog/teaser section at bottom

**Skip:** Generic agency-template grid with no motion

---

### 2. [DZ!NR Studio](https://dzinrstudio.com/) — *Bold motion + showreel culture*
**Take:**
- Full-viewport **video showreel** hero (muted, autoplay, loop)
- **Marquee / ticker text** on project names (repeating horizontal scroll: `Prink Prink Prink`)
- Numbered sections (`00`, `01`, `02`) for editorial structure
- Project cards with category tags (year, industry, service type)
- Dark, high-energy, design-forward aesthetic
- "Be the brand they never stop talking about" energy — adapt to PE: **"Be the brand they never stop climbing toward"**

**Skip:** Overly chaotic layout with no hierarchy

---

### 3. [Glitch & Grit](https://glitchandgrit.com/contact) — *Editorial restraint + human touch*
**Take:**
- Minimal, confident contact page
- Direct copy: *"Have a project in mind? Tell us what you're building..."*
- Open roles / culture section (optional: "Join the hike")
- Clean form with personality, not 12 fields
- Footer: simple links, social, no clutter

**Skip:** Too sparse for a full homepage — use this energy for Contact/About subpages

---

### 4. [IPER](https://iper.com.au/) — *Interactive conversion machine*
**Take:**
- **Multi-step interactive quote/brief form** (6 steps, progress indicator `01/06`) — THIS IS KEY for PE
  - Step 1: About you
  - Step 2: What do you need? (branding, video, social, campaign, full-service, etc.)
  - Step 3: Budget range slider
  - Step 4: Timeline/deadline
  - Step 5: Project details (textarea)
  - Step 6: Submit + thank you
- Bold hero: **"THE production studio YOU'VE BEEN LOOKING FOR"** → PE version: **"THE MARKETING PARTNER FOR YOUR HIKE TO PEAK"**
- Numbered content sections `(1) What we've done`, `(2) What we do`, etc.
- Client logo marquee (infinite scroll)
- Testimonial carousel
- "Show more" work expansion

**Skip:** Brisbane-local SEO copy — keep PE global/region-agnostic unless specified

---

### 5. [State of AI Design](https://stateofaidesign.com/) — *Scroll-driven editorial excellence*
**Take:**
- Chapter-based scroll narrative (`01 Tools`, `02 Craft`, `03 Teams`)
- Sticky section nav / progress indicator on scroll
- Big stat counters animated on scroll (e.g. `50+ brands elevated`, `100+ campaigns`, etc.)
- Pull quotes with attribution
- Smooth section transitions, generous whitespace
- "Scroll to read" entry affordance

**Skip:** Report/long-form article format for the whole site — use this for the **About** or **Services** page structure

---

## Site Architecture

```
/                  → Home (showreel hero + manifesto + featured work + CTA)
/work              → Case studies grid + filters
/work/[slug]       → Individual case study (hero video/image, challenge, approach, results)
/services          → Services breakdown (chapter-style scroll)
/about             → Story, team, values, "the hike" metaphor
/contact           → Multi-step brief form (IPER-style) + direct contact info
/blog (optional)   → Insights / news (Copula-style cards)
```

**Global elements:**
- Fixed nav: Logo left | Work · Services · About · Contact right | CTA button **"Start the climb"**
- Footer: tagline, social links, email, nav repeat, © Promotion Efficiency
- Page transitions (subtle fade or slide, ~400ms)
- Custom cursor optional (small dot + ring on desktop only)

---

## Homepage — Section by Section

### 1. Hero (DZ!NR + Copula)
- Full-viewport dark hero
- Background: muted autoplay showreel OR cinematic image collage (athleticism, brands, production BTS)
- Center or left-aligned:
  - Small label: `Marketing Partner`
  - H1 (NORD): **YOUR HIKE TO** / **PEAK** (two-line, massive)
  - Sub (Gotham): one sentence from brand deck
  - CTA: **Start the climb** (primary) + **View our work** (ghost)
- Bottom: marquee ticker of client names or service keywords
- Scroll indicator: `Scroll to explore` with animated chevron

### 2. Manifesto (Copula)
- Short bold statement: who PE is in 2–3 sentences
- Split text animation on scroll (words fade/slide in staggered)
- Optional: horizontal scroll text strip

### 3. Featured Work (DZ!NR + IPER)
- 3–6 project cards, large imagery/video thumbnails
- Hover: scale image, show project name + category tags
- Marquee row of repeating project titles on hover or always-on
- "See all work →" link

### 4. Services snapshot (numbered)
- `(01) Branding & Identity`
- `(02) Creative Production`
- `(03) Digital & Social`
- `(04) Strategy & Distribution`
- Each: icon/title/one-liner + "Learn more →"
- Accordion or hover-expand for detail

### 5. Stats (State of AI Design)
- Animated counters on scroll:
  - `X+ Brands partnered`
  - `X+ Campaigns delivered`
  - `X+ Years climbing`
  - `X Countries reached` (if applicable, else skip)
- Large numbers, small labels, clean grid

### 6. Testimonials (IPER)
- Horizontal scroll or auto-carousel
- Quote + name + company
- Minimal card design

### 7. Client logos (IPER + Copula)
- Infinite marquee, grayscale logos → color on hover
- Placeholder logos OK (use `[Client]` styled blocks until real assets provided)

### 8. CTA band
- Full-width: **"Ready to reach your peak?"**
- Button → `/contact`

### 9. Footer
- Logo + tagline
- Nav links + social
- `hello@promotionefficiency.com` (placeholder email OK)

---

## Contact Page — Multi-Step Form (IPER-inspired, REQUIRED)

Build a **6-step wizard** with:
- Progress bar + step counter (`01 / 06`)
- Smooth step transitions (slide left/right)
- **Back** and **Next** buttons
- Form fields:

| Step | Question | Input type |
|---|---|---|
| 1 | What's your name / company? | Text inputs |
| 2 | What are you looking for? | Multi-select chips (Branding, Video Production, Social Media, Campaign, Full-Service, Something Else) |
| 3 | What's your budget? | Range slider `$2k — $100k+` |
| 4 | When do you need this? | Date picker or "ASAP / 1-3 months / Flexible" |
| 5 | Tell us about your project | Textarea |
| 6 | Email + submit | Email input + submit button |

- Success state: animated checkmark + "We'll be in touch within 24 hours"
- Error state: inline validation, friendly copy
- Store submissions: API route or Formspree/Resend integration (stub OK with `// TODO: connect backend`)

---

## Interaction & Motion Spec

Use **Framer Motion** or **GSAP + ScrollTrigger** — pick one, don't mix both.

| Interaction | Spec |
|---|---|
| Page load | Staggered fade-up on hero text (0.6s total) |
| Scroll sections | Fade + translateY(40px → 0) on enter viewport |
| Marquee | CSS or GSAP infinite horizontal scroll, 30–60s loop |
| Project cards | Hover: image scale 1.05, overlay fade in, cursor "View" |
| Stats | Count up from 0 when 50% visible |
| Nav | Transparent on hero → solid dark bg on scroll |
| Form steps | Slide transition 300ms ease |
| Reduced motion | Respect `prefers-reduced-motion` — disable marquees and heavy scroll animations |

**Performance rules:**
- Lazy-load images and videos below fold
- Use `next/image` for all images
- Videos: muted, `playsInline`, poster frame fallback
- Target Lighthouse 90+ performance

---

## Tech Stack (required)

```
Framework:     Next.js 15 (App Router)
Language:      TypeScript
Styling:       Tailwind CSS v4
Animation:     Framer Motion (preferred) OR GSAP
Fonts:         next/font (NORD + Gotham or substitutes)
Deployment:    Vercel-ready
```

**Do NOT use:**
- Vite (unless explicitly asked)
- Broken SVG mask experiments
- `mix-blend-mode` hacks for text knockout
- External mask-image URLs (unreliable)
- Building while `dev` server corrupts `.next` — never run `build` and `dev` simultaneously

---

## Content Placeholders (use until real copy provided)

**Hero H1:**
```
YOUR HIKE TO
PEAK
```

**Manifesto:**
```
Promotion Efficiency is the creative destination for ambitious brands.
From concept to production to distribution — we guide every step of your climb.
We don't just support your vision. We empower it.
```

**Services:**
1. **Branding & Identity** — Logos, visual systems, brand strategy
2. **Creative Production** — Video, photo, content creation
3. **Digital & Social** — Campaigns, social content, paid media
4. **Strategy & Distribution** — Go-to-market, channel strategy, analytics

**Placeholder projects (3 minimum):**
- Project Alpha — Sports / Brand Film / 2025
- Project Beta — Wellness / Social Campaign / 2025
- Project Gamma — Corporate / Brand Identity / 2024

Use Unsplash/Mixkit stock for placeholder media. Mark all as `// TODO: replace with client assets`.

---

## Visual Do's and Don'ts

### Do
- Dark, cinematic, editorial
- Big type, tight letter-spacing on headlines
- Numbered sections for structure
- Interactive form as a centerpiece feature
- Smooth, intentional motion
- Mobile-first responsive design
- Accessible: semantic HTML, focus states, alt text, keyboard nav

### Don't
- Generic Webflow agency template look
- Purple/blue AI-gradient aesthetic
- Tiny unreadable body text
- Broken scroll-pin heroes (learn from past failures)
- Opaque white logo blocking all media with no effect
- 10 different fonts
- Lorem ipsum everywhere — use real-ish PE copy from this prompt

---

## File Structure (suggested clean scaffold)

```
app/
  layout.tsx
  page.tsx                    # Home
  work/page.tsx
  work/[slug]/page.tsx
  services/page.tsx
  about/page.tsx
  contact/page.tsx
  globals.css
components/
  layout/
    Header.tsx
    Footer.tsx
    Marquee.tsx
  home/
    Hero.tsx
    Manifesto.tsx
    FeaturedWork.tsx
    ServicesPreview.tsx
    Stats.tsx
    Testimonials.tsx
    ClientLogos.tsx
    CTABand.tsx
  contact/
    BriefWizard.tsx           # 6-step form
    StepIndicator.tsx
  ui/
    Button.tsx
    ProjectCard.tsx
    SectionLabel.tsx
lib/
  projects.ts                 # placeholder case study data
  animations.ts
public/
  fonts/                      # NORD + Gotham if available
  assets/
```

---

## Implementation Order

1. **Scaffold** — Next.js + Tailwind + fonts + layout (Header/Footer)
2. **Home hero** — video/showreel + headline + CTA (no scroll-pin complexity yet)
3. **Marquee + manifesto** — establish motion language
4. **Work grid** — project cards with hover
5. **Services + stats sections**
6. **Contact wizard** — full 6-step form
7. **Subpages** — /work, /about, /services
8. **Polish** — page transitions, mobile, reduced motion, SEO meta tags
9. **Swap placeholders** — real copy, fonts, images when provided

---

## Definition of Done

- [ ] Site runs at `localhost:3000` with zero console errors
- [ ] All pages navigable, responsive on mobile + desktop
- [ ] Hero feels cinematic and on-brand (not plain text on black)
- [ ] Multi-step contact form works end-to-end with success state
- [ ] At least 3 case study pages with unique content
- [ ] Marquee, scroll animations, and hover states all functional
- [ ] `prefers-reduced-motion` respected
- [ ] README with dev commands and placeholder swap instructions
- [ ] No dependency on broken mask/SVG experiments from previous attempts

---

## Kick-off Message (paste this to start the agent)

```
Build the Promotion Efficiency marketing agency website from scratch using the full prompt in PROMOTION-EFFICIENCY-WEBSITE-PROMPT.md.

Delete all broken hero/mask code from previous attempts. Start clean.

Priority order:
1. Scaffold + layout + fonts
2. Homepage hero with showreel and "YOUR HIKE TO PEAK" headline
3. Multi-step contact form (6 steps, IPER-style)
4. Featured work section with marquee
5. Remaining homepage sections
6. Subpages

Match the modern, cool, fun agency vibe from Copula, DZ!NR, Glitch&Grit, IPER, and State of AI Design — but make it unmistakably Promotion Efficiency.

Use Framer Motion for animations. Dark mode first. No broken scroll-pin heroes.
```
