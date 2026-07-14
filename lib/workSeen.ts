const SEEN_KEY = 'pe-work-seen'

export function readSeenProjects(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : []
  } catch {
    return []
  }
}

export function markProjectSeen(slug: string) {
  if (typeof window === 'undefined') return
  try {
    const next = new Set(readSeenProjects())
    next.add(slug)
    localStorage.setItem(SEEN_KEY, JSON.stringify([...next]))
  } catch {
    // ignore
  }
}
