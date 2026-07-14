export type StudioNewsItem = {
  slug: string
  title: string
  excerpt?: string
  image: string
  category: 'Press' | 'Talks' | 'Events'
  date: string
  href: string
}

// TODO: replace with real press links and assets
export const studioNews: StudioNewsItem[] = [
  {
    slug: 'peak-performance-marketing',
    title: 'Peak performance marketing is the new brand moat, says Promotion Efficiency',
    excerpt:
      'In a conversation with Campaign Brief, our team argues that speed-to-market and creative efficiency are becoming the defining edge for growth-stage brands.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    category: 'Press',
    date: 'Thu 19 Nov',
    href: '#',
  },
  {
    slug: 'campaigns-lack-imagination',
    title: 'Campaigns are innovative but lack imagination',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Press',
    date: 'Wed 8 Apr',
    href: '#',
  },
  {
    slug: 'social-first-launch-playbook',
    title: 'Social-first launches: smart strategy, vague timelines',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'Press',
    date: 'Wed 18 Mar',
    href: '#',
  },
  {
    slug: 'brand-climb-framework',
    title: 'The brand climb framework: from brief to broadcast in six weeks',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    category: 'Talks',
    date: 'Mon 3 Feb',
    href: '#',
  },
  {
    slug: 'efficiency-over-volume',
    title: 'Why efficiency beats volume in modern campaign planning',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    category: 'Press',
    date: 'Fri 24 Jan',
    href: '#',
  },
  {
    slug: 'riyadh-creative-summit',
    title: 'Promotion Efficiency opens Riyadh studio ahead of regional summit',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    category: 'Events',
    date: 'Tue 14 Jan',
    href: '#',
  },
  {
    slug: 'short-form-vs-long-form',
    title: 'Short-form is winning attention, but long-form is winning trust',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e939e113?w=800&q=80',
    category: 'Press',
    date: 'Thu 9 Jan',
    href: '#',
  },
  {
    slug: 'peak-creative-panel',
    title: 'Your Hike to PEAK: live panel on scaling creative without losing edge',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    category: 'Talks',
    date: 'Sat 21 Dec',
    href: '#',
  },
  {
    slug: 'distribution-first-brands',
    title: 'Distribution-first brands are rewriting the launch playbook',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'Press',
    date: 'Wed 11 Dec',
    href: '#',
  },
  {
    slug: 'year-end-studio-open-house',
    title: 'Studio open house: behind the campaigns that moved the needle in 2025',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    category: 'Events',
    date: 'Fri 6 Dec',
    href: '#',
  },
]

export const featuredNews = studioNews[0]
export const moreNews = studioNews.slice(1)
