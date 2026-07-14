export type TeamMember = {
  name: string
  role: string
  detail: string
  image: string
  location: string
}

export const studioLocation = {
  city: 'Khobar',
  country: 'Saudi Arabia',
  label: 'Khobar, Saudi Arabia',
  address: 'Khobar, Eastern Province, Saudi Arabia',
  image: '/assets/khobar-studio.png',
} as const

// TODO: replace with real team photos
export const team: TeamMember[] = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Creative Director',
    detail: 'Thinks in storyboards before spreadsheets.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Jordan Kim',
    role: 'Head of Strategy',
    detail: 'Will ask "but does it move the needle?" at least twice.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Sam Okonkwo',
    role: 'Lead Producer',
    detail: "Has never met a deadline he didn't respect.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Mia Chen',
    role: 'Design Director',
    detail: 'Believes white space is a feature, not a bug.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Noah Al-Rashid',
    role: 'Creative Lead',
    detail: 'Builds stories brands can climb on.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Layla Mansour',
    role: 'Brand Strategist',
    detail: 'Turns ambition into a clear brief.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Omar Faris',
    role: 'Motion Designer',
    detail: 'Makes stillness feel intentional.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Sara Habib',
    role: 'Social Lead',
    detail: 'Knows what the scroll rewards.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Daniel Park',
    role: 'Web Director',
    detail: 'Designs products people actually use.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80',
    location: studioLocation.label,
  },
  {
    name: 'Hana Al-Mutairi',
    role: 'Producer',
    detail: 'Keeps the climb on schedule.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80',
    location: studioLocation.label,
  },
]

export const values = [
  {
    id: 'optimism',
    title: 'Optimism',
    body: "Optimism is practical. Spotting what's strong and what's possible in every brief. It's a belief in your brand's potential — and a want to realize it.",
    pattern: 'ascend' as const,
  },
  {
    id: 'co-creation',
    title: 'Co-Creation',
    body: 'We flex to fit. Our process. Your priorities. Whatever the pace. Ideas shaped with insight and understanding, together as one team.',
    pattern: 'intersect' as const,
  },
  {
    id: 'craft',
    title: 'Craft',
    body: 'Everywhere your brand shows up. In pixels. In print. In product. We make it unmistakable. Built to flex. Made to last.',
    pattern: 'grid' as const,
  },
] as const

export const principles = [
  {
    title: 'Every move counts',
    body: "Promotion efficiency isn't about doing more — it's about making each campaign, each asset, each dollar work harder than the last.",
  },
  {
    title: 'Climb together',
    body: 'We partner at every elevation. Strategy without production is a deck. Production without strategy is noise.',
  },
  {
    title: 'Speed with substance',
    body: "We move fast because we've done this before — not because we cut corners.",
  },
  {
    title: 'Prove it',
    body: "Beautiful work that doesn't perform is decoration. We measure what matters.",
  },
] as const

export const press = [
  'Campaign Brief',
  'Adweek',
  "It's Nice That",
  'The Drum',
  'Design Week',
  'Creative Review',
] as const
