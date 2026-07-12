import { assetPath } from '@/lib/paths'

export type StoryBlock = {
  type: 'full' | 'split-left' | 'split-right'
  image: string
  video?: string
  caption?: string
}

export type StatCallout = {
  value: number
  suffix: string
  label: string
}

export type Project = {
  slug: string
  title: string
  client: string
  year: string
  location: string
  industry: string
  service: string
  serviceFilter: string
  image: string
  video?: string
  description: string
  challenge: string
  approach: string
  results: string[]
  resultStat: string
  timeline: string
  featured?: boolean
  storyBlocks: StoryBlock[]
  statCallouts: StatCallout[]
}

export const projects: Project[] = [
  {
    slug: 'nymph-beauty',
    title: 'Nymph Beauty',
    client: 'Nymph',
    year: '2025',
    location: 'Los Angeles, CA',
    industry: 'Beauty',
    service: 'Brand Identity',
    serviceFilter: 'Branding',
    image: assetPath('/assets/work/nymph.png'),
    description: 'Packaging and product design for a refined hair care launch.',
    challenge: 'Stand out in a crowded beauty aisle with a small SKU count and no paid media.',
    approach: 'Built a tactile identity system across comb, bottle, and digital — marble textures, serif type, and warm neutrals.',
    results: ['Sell-through in first month', 'Featured in beauty press', 'DTC launch on schedule'],
    resultStat: 'Launch-ready identity in 8 weeks',
    timeline: '8 weeks',
    featured: true,
    storyBlocks: [
      {
        type: 'full',
        image: assetPath('/assets/work/nymph.png'),
        caption: 'Marble comb and conditioner packaging — one system, two hero products.',
      },
    ],
    statCallouts: [
      { value: 2, suffix: '', label: 'Hero SKUs designed' },
      { value: 8, suffix: '', label: 'Weeks to launch' },
    ],
  },
  {
    slug: 'ritual-renewal',
    title: 'Ritual of Renewal',
    client: 'NEAV',
    year: '2025',
    location: 'Copenhagen, DK',
    industry: 'Wellness',
    service: 'Brand Identity',
    serviceFilter: 'Branding',
    image: assetPath('/assets/work/ritual.png'),
    description: 'A quiet luxury identity built around heat, steam, and silence.',
    challenge: 'Launch a wellness ritual brand without leaning on clichéd spa visuals.',
    approach: 'Circular disc system with embossed patterns, minimal type, and a black-field art direction.',
    results: ['Cohesive retail toolkit', 'Strong wholesale interest', 'Premium shelf presence'],
    resultStat: 'Complete brand system in 10 weeks',
    timeline: '10 weeks',
    featured: true,
    storyBlocks: [
      {
        type: 'full',
        image: assetPath('/assets/work/ritual.png'),
        caption: 'Heat. Steam. Silence. — your ritual of renewal.',
      },
    ],
    statCallouts: [
      { value: 4, suffix: '', label: 'Disc variants' },
      { value: 10, suffix: '', label: 'Weeks to system' },
    ],
  },
  {
    slug: 'rylee-cru-flagship',
    title: 'Flagship Store',
    client: 'Rylee & Cru',
    year: '2023',
    location: 'Carlsbad, CA',
    industry: 'Retail',
    service: 'Interior Design',
    serviceFilter: 'Web',
    image: assetPath('/assets/work/indio-white.png'),
    description: 'Organic interiors with architectural character for a flagship retail space.',
    challenge: 'Translate a soft, family-led brand into a physical environment with permanence.',
    approach: 'Space planning, furniture curation, and a digital case study site for INDIO WHITE.',
    results: ['Flagship opened on schedule', 'Press coverage', 'Repeat client engagement'],
    resultStat: 'Flagship delivered in 14 weeks',
    timeline: '14 weeks',
    storyBlocks: [
      {
        type: 'full',
        image: assetPath('/assets/work/indio-white.png'),
        caption: 'Arched doorways, natural light, and curated softness — the Rylee & Cru flagship.',
      },
    ],
    statCallouts: [
      { value: 1, suffix: '', label: 'Flagship location' },
      { value: 14, suffix: '', label: 'Weeks to open' },
    ],
  },
  {
    slug: 'freja-ecommerce',
    title: 'Freja E-Commerce',
    client: 'Freja',
    year: '2024',
    location: 'Stockholm, SE',
    industry: 'Fashion',
    service: 'Web Design',
    serviceFilter: 'Web',
    image: assetPath('/assets/work/freja.png'),
    description: 'A mobile-first shop and brand story for a Scandinavian accessories label.',
    challenge: 'Sell $980 handbags online without losing the intimacy of a boutique experience.',
    approach: 'Editorial product pages, founder narrative, and a restrained serif-led design system.',
    results: ['2.1% mobile conversion', 'Awwwards nomination', 'Expanded SKU catalog'],
    resultStat: '3x mobile conversion in 12 weeks',
    timeline: '12 weeks',
    storyBlocks: [
      {
        type: 'full',
        image: assetPath('/assets/work/freja.png'),
        caption: 'Product and story on mobile — quiet elegance, meaningful pieces.',
      },
    ],
    statCallouts: [
      { value: 3, suffix: 'x', label: 'Mobile conversion' },
      { value: 12, suffix: '', label: 'Weeks to launch' },
    ],
  },
  {
    slug: 'freja-chrystie-shop',
    title: 'Chrystie Collection',
    client: 'Freja',
    year: '2024',
    location: 'Stockholm, SE',
    industry: 'Fashion',
    service: 'E-Commerce',
    serviceFilter: 'Web',
    image: assetPath('/assets/work/freja-tablet.png'),
    description: 'Tablet-first shop experience for the Chrystie bag line.',
    challenge: 'Showcase multiple SKUs and brand story on one screen without clutter.',
    approach: 'Product grid, inline add-to-cart, and an editorial about section in a single scroll.',
    results: ['Higher AOV on tablet', 'Faster browse-to-cart', 'Unified bag collection launch'],
    resultStat: 'Collection shop live in 6 weeks',
    timeline: '6 weeks',
    storyBlocks: [
      {
        type: 'full',
        image: assetPath('/assets/work/freja-tablet.png'),
        caption: 'Chrystie bags in black and oat — shop grid with about Freja below.',
      },
    ],
    statCallouts: [
      { value: 4, suffix: '', label: 'Bag variants' },
      { value: 6, suffix: '', label: 'Weeks to launch' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return projects[0]
  return projects[(i + 1) % projects.length]
}
