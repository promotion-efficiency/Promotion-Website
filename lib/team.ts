export type TeamMember = {
  name: string
  role: string
  detail: string
  image: string
}

// TODO: replace with real team photos
export const team: TeamMember[] = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Creative Director',
    detail: 'Thinks in storyboards before spreadsheets.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    name: 'Jordan Kim',
    role: 'Head of Strategy',
    detail: 'Will ask "but does it move the needle?" at least twice.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
  },
  {
    name: 'Sam Okonkwo',
    role: 'Lead Producer',
    detail: 'Has never met a deadline he didn\'t respect.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
  },
  {
    name: 'Mia Chen',
    role: 'Design Director',
    detail: 'Believes white space is a feature, not a bug.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
  },
]

export const principles = [
  {
    title: 'Every move counts',
    body: 'Promotion efficiency isn\'t about doing more — it\'s about making each campaign, each asset, each dollar work harder than the last.',
  },
  {
    title: 'Climb together',
    body: 'We partner at every elevation. Strategy without production is a deck. Production without strategy is noise.',
  },
  {
    title: 'Speed with substance',
    body: 'We move fast because we\'ve done this before — not because we cut corners.',
  },
  {
    title: 'Prove it',
    body: 'Beautiful work that doesn\'t perform is decoration. We measure what matters.',
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
