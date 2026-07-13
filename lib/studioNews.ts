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
]

export const featuredNews = studioNews[0]
export const moreNews = studioNews.slice(1)
