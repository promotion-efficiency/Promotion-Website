/**
 * Brand tokens extracted from /brand/guidelines.pdf (New Identity 2025)
 *
 * Typography (PDF p.2):
 *   - NORD → headlines / display
 *   - GOTHAM → body / UI
 *
 * Tagline (PDF p.1, p.4): "Your Hike to PEAK"
 * Descriptor (PDF p.1): "Marketing Partner"
 *
 * Palette: identity deck uses a dark monochrome system — near-black fields,
 * off-white headline type, mid-gray body copy (Gotham specimen). No accent
 * color is specified in the guidelines; hierarchy is achieved through type weight
 * and contrast alone.
 */
export const brand = {
  colors: {
    black: '#0a0a0a',
    charcoal: '#141414',
    surface: '#1a1a1a',
    gray: '#6b6b6b',
    grayLight: '#9a9a9a',
    white: '#f2f2f2',
    offWhite: '#e8e8e8',
  },
  fonts: {
    display: 'var(--font-nord)',
    body: 'var(--font-gotham)',
  },
  tagline: 'Your Hike to PEAK',
  descriptor: 'Marketing Partner',
  nickname: 'Promoe',
  definition:
    'Promotion efficiency is the art of making every move count — turning attention into momentum, and momentum into measurable growth.',
  voice: {
    thesis: 'We make brands move faster.',
    manifesto: [
      'Promotion Efficiency is the creative destination for ambitious brands.',
      'From concept to production to distribution — we guide every step of your climb.',
      "We don't just support your vision. We empower it.",
    ],
    footerCta: "Let's build something people can't ignore.",
  },
  social: '@PromotionEfficiency',
  email: 'hello@promotionefficiency.com',
} as const

export const stats = [
  { value: 150, suffix: '+', label: 'Campaigns launched' },
  { value: 40, suffix: '+', label: 'Brands scaled' },
  { value: 12, suffix: '', label: 'Markets reached' },
  { value: 8, suffix: '+', label: 'Years climbing' },
] as const

export const services = [
  {
    id: 'branding',
    title: 'Branding',
    line: 'Identity that sticks before anyone reads a word.',
  },
  {
    id: 'social',
    title: 'Social',
    line: 'Content built for the scroll — and the save.',
  },
  {
    id: 'video',
    title: 'Video',
    line: 'Films and cuts that earn attention, not just views.',
  },
  {
    id: 'web',
    title: 'Web',
    line: 'Sites that work as hard as your team does.',
  },
  {
    id: 'paid',
    title: 'Paid Media',
    line: 'Spend smarter. Scale faster. Prove it.',
  },
] as const

export const serviceFilters = ['All', 'Branding', 'Social', 'Video', 'Web', 'Paid Media'] as const

export const quoteServiceOptions = [
  { id: 'branding', label: 'Branding', desc: 'Identity, logos, guidelines' },
  { id: 'social', label: 'Social', desc: 'Content, calendars, community' },
  { id: 'video', label: 'Video', desc: 'Brand films, ads, cutdowns' },
  { id: 'web', label: 'Web', desc: 'Design, dev, landing pages' },
  { id: 'paid', label: 'Paid Media', desc: 'Performance, ads, analytics' },
] as const

export const clients = [
  'Apex Athletics',
  'Summit Co.',
  'Horizon Brands',
  'Forge Digital',
  'Peak Labs',
  'Elevate',
  'Trailhead',
  'Basecamp',
  'Ridge Media',
  'Alpine Group',
] as const

export const testimonials = [
  {
    quote: 'They understood our vision from day one. The work moved faster than we thought possible.',
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'Apex Athletics',
  },
  {
    quote: 'Not vendors — partners. Every campaign felt like an extension of our own team.',
    name: 'Marcus Webb',
    role: 'CMO',
    company: 'Summit Wellness Co.',
  },
  {
    quote: 'From brief to launch in six weeks. Sharp strategy, sharper execution.',
    name: 'Elena Rodriguez',
    role: 'Brand Director',
    company: 'Horizon Brands',
  },
  {
    quote: 'The quote flow told us everything — they think in systems, not one-offs.',
    name: 'James Okonkwo',
    role: 'Head of Growth',
    company: 'Forge Digital',
  },
] as const
