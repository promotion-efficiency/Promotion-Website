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

// TODO: replace placeholder media with client assets
export const projects: Project[] = [
  {
    slug: 'apex-rise',
    title: 'Apex Rise',
    client: 'Apex Athletics',
    year: '2025',
    industry: 'Sports',
    service: 'Brand Film',
    serviceFilter: 'Video',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-dribbling-the-ball-435-large.mp4',
    description: 'A launch film that turned training footage into a movement.',
    challenge: 'Break through a saturated sports market without a celebrity budget.',
    approach: 'Documentary-style shoot across three cities. Modular cuts for social, web, and in-store.',
    results: ['2.4M organic views', '38% lift in brand recall', 'Sold out first drop'],
    resultStat: '+38% brand recall in 8 weeks',
    timeline: '6 weeks',
    featured: true,
    storyBlocks: [
      { type: 'full', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600&q=80', caption: 'Training sequences shot across three cities in four days.' },
      { type: 'split-left', image: 'https://images.unsplash.com/photo-1517649763961-0c62306601b7?w=1200&q=80', caption: 'Modular framing for 9:16, 1:1, and 16:9 from one production.' },
      { type: 'split-right', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80', video: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-dribbling-the-ball-435-large.mp4', caption: 'The final hero film — 90 seconds, zero filler.' },
    ],
    statCallouts: [
      { value: 2.4, suffix: 'M', label: 'Organic views' },
      { value: 38, suffix: '%', label: 'Brand recall lift' },
      { value: 6, suffix: '', label: 'Weeks to launch' },
    ],
  },
  {
    slug: 'summit-social',
    title: 'Summit Social',
    client: 'Summit Wellness Co.',
    year: '2025',
    industry: 'Wellness',
    service: 'Social Campaign',
    serviceFilter: 'Social',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    description: 'A social-first launch that built an audience from zero.',
    challenge: 'No existing community. Limited paid budget. High expectations.',
    approach: 'UGC engine + polished hero assets. Six-week content sprint with daily posting rhythm.',
    results: ['120K followers in 90 days', '4.2% engagement rate', 'First product sellout'],
    resultStat: '+120% engagement in 6 weeks',
    timeline: '6 weeks',
    featured: true,
    storyBlocks: [
      { type: 'full', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80', caption: 'Hero content designed for save-and-share, not just scroll.' },
      { type: 'split-right', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80', caption: 'UGC engine powered by real community moments.' },
      { type: 'split-left', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80', caption: 'Six-week sprint calendar — daily rhythm, weekly themes.' },
    ],
    statCallouts: [
      { value: 120, suffix: 'K', label: 'New followers' },
      { value: 4.2, suffix: '%', label: 'Engagement rate' },
      { value: 90, suffix: '', label: 'Days to sellout' },
    ],
  },
  {
    slug: 'horizon-rebrand',
    title: 'Horizon Rebrand',
    client: 'Horizon Brands',
    year: '2024',
    industry: 'Corporate',
    service: 'Brand Identity',
    serviceFilter: 'Branding',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    description: 'A full identity system for a company ready to level up.',
    challenge: 'Rebrand without losing fifteen years of customer trust.',
    approach: 'Stakeholder workshops, phased rollout, internal launch before public reveal.',
    results: ['12-channel consistency', '22% more inbound leads', 'Award-nominated system'],
    resultStat: '+22% inbound leads post-launch',
    timeline: '12 weeks',
    storyBlocks: [
      { type: 'full', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80', caption: 'Identity system built for 12 channels from day one.' },
      { type: 'split-left', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80', caption: 'Internal launch before public reveal — trust preserved.' },
    ],
    statCallouts: [
      { value: 22, suffix: '%', label: 'More inbound leads' },
      { value: 12, suffix: '', label: 'Channels unified' },
    ],
  },
  {
    slug: 'forge-performance',
    title: 'Forge Performance',
    client: 'Forge Digital',
    year: '2025',
    industry: 'Tech',
    service: 'Paid Media',
    serviceFilter: 'Paid Media',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    description: 'Performance campaigns that cut CPA in half.',
    challenge: 'Rising CAC on Meta and Google with stale creative.',
    approach: 'Weekly creative sprints, landing page tests, full-funnel attribution setup.',
    results: ['52% CPA reduction', '3.1x ROAS', '40% more qualified demos'],
    resultStat: '52% CPA reduction in 10 weeks',
    timeline: '10 weeks',
    storyBlocks: [
      { type: 'full', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80', caption: 'Weekly creative sprints kept ads fresh and CPA falling.' },
      { type: 'split-right', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', caption: 'Full-funnel attribution from first click to demo booked.' },
    ],
    statCallouts: [
      { value: 52, suffix: '%', label: 'CPA reduction' },
      { value: 3.1, suffix: 'x', label: 'Return on ad spend' },
    ],
  },
  {
    slug: 'peak-web',
    title: 'Peak Web',
    client: 'Peak Labs',
    year: '2025',
    industry: 'SaaS',
    service: 'Web Design',
    serviceFilter: 'Web',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
    description: 'A product site that converts visitors into trials.',
    challenge: 'Beautiful brand site with a 0.8% trial conversion rate.',
    approach: 'UX audit, messaging rewrite, interactive demo section, speed optimization.',
    results: ['2.4% trial conversion', '41% faster load time', 'Featured on Awwwards'],
    resultStat: '3x trial conversion in 8 weeks',
    timeline: '8 weeks',
    storyBlocks: [
      { type: 'full', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80', caption: 'Interactive demo section — show, don\'t tell.' },
      { type: 'split-left', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80', caption: '41% faster load time. Every millisecond counted.' },
    ],
    statCallouts: [
      { value: 3, suffix: 'x', label: 'Trial conversion' },
      { value: 41, suffix: '%', label: 'Faster load time' },
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
