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
    orange: '#e84a1a',
    teal: '#20505b',
    ink: '#212121',
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
    line: 'Visual and verbal systems that define how brands show up, stand out, and stay ahead.',
    body: 'We build identities that hold across every surface — strategy first, then systems teams can actually use.',
    offerings: [
      'Brand strategy',
      'Visual identity',
      'Verbal identity',
      'Naming and nomenclature',
      'Guidelines',
      'Art direction',
      'Typography',
      'Iconography',
    ],
    accent: 'orange' as const,
    mediaLabel: ['EVERY', 'BRAND', 'MOVE'],
    // TODO: replace with final service-specific showreels
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-her-laptop-in-a-cafe-4450-large.mp4',
  },
  {
    id: 'social',
    title: 'Social',
    line: 'Content built for the scroll — and the save. Platforms, community, and campaigns that earn attention.',
    body: 'Social systems that keep the brand sharp without drowning it in noise.',
    offerings: [
      'Content systems',
      'Community management',
      'Campaign concepts',
      'Creator partnerships',
      'Channel strategy',
      'Social listening',
      'Format playbooks',
      'Always-on calendars',
    ],
    accent: 'teal' as const,
    mediaLabel: ['FEED', 'THAT', 'LANDS'],
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-phone-showing-a-social-app-42921-large.mp4',
  },
  {
    id: 'video',
    title: 'Video',
    line: 'Films and cuts that earn attention, not just views — made to move the story forward.',
    body: 'From brand films to performance cutdowns, motion that works across every surface.',
    offerings: [
      'Brand films',
      'Campaign spots',
      'Cutdowns',
      'Motion design',
      'Editing and finishing',
      'Sound direction',
      'Content series',
      'Launch assets',
    ],
    accent: 'orange' as const,
    mediaLabel: ['MOVE', 'THE', 'FRAME'],
    video: '/assets/hero-bg.mp4',
  },
  {
    id: 'web',
    title: 'Web',
    line: 'Websites to digital products. We create experiences where brands and people meet.',
    body: 'Tangible. Useful. Unforgettable. Design and development matched to the rest of the climb.',
    offerings: [
      'Website design',
      'User experience',
      'Interface design',
      'Landing pages',
      'Prototyping',
      'Design systems',
      'Development',
      'Experiential digital',
    ],
    accent: 'teal' as const,
    mediaLabel: ['BUILD', 'WHAT', 'WORKS'],
    video: '/assets/showreel.mov',
  },
  {
    id: 'paid',
    title: 'Paid Media',
    line: 'Launch new ideas, enter new markets, and stay front-of-mind — with spend you can prove.',
    body: 'Performance with taste. Media plans and creative testing that turn budget into momentum.',
    offerings: [
      'Media strategy',
      'Campaign setup',
      'Audience planning',
      'Creative testing',
      'Optimization',
      'Reporting',
      'Platform mix',
      'Scale plans',
    ],
    accent: 'orange' as const,
    mediaLabel: ['SPEND', 'THAT', 'CLIMBS'],
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4',
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

export type ClientLogo = {
  name: string
  logo?: string
}

export const clientLogos: readonly ClientLogo[] = [
  { name: 'Apex Athletics' },
  { name: 'Summit Co.' },
  { name: 'Horizon Brands' },
  { name: 'Forge Digital' },
  { name: 'Peak Labs' },
  { name: 'Elevate' },
  { name: 'Trailhead' },
  { name: 'Basecamp' },
  { name: 'Ridge Media' },
  { name: 'Alpine Group' },
  { name: 'Northline' },
  { name: 'Meridian' },
  { name: 'Crest & Co.' },
  { name: 'Vantage' },
  { name: 'Summit Media' },
]

/** @deprecated Use clientLogos instead */
export const clients = clientLogos.map((c) => c.name)

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
