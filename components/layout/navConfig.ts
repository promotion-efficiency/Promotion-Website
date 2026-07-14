export const PRIMARY_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const CHANNEL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/PromotionEfficiency' },
  { label: 'Email', href: 'mailto:hello@promotionefficiency.com' },
] as const

export const navLinkClass =
  'text-[10px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 hover:text-pe-orange'

export const navFloatClass =
  'flex h-10 max-w-full items-center gap-3 border border-pe-white/15 bg-pe-black/80 px-2.5 backdrop-blur-md md:h-11 md:gap-4 md:px-3'

export const navFloatHeroClass =
  'flex h-10 max-w-full items-center gap-3 border border-white/20 bg-black/45 px-2.5 backdrop-blur-md md:h-11 md:gap-4 md:px-3'

export const navPanelClass =
  'w-[min(100vw-10vw,22rem)] overflow-hidden border border-t-0 border-pe-white/15 bg-pe-black/95 backdrop-blur-md'

export const navMenuClass =
  'hidden items-center gap-4 border-l border-pe-white/15 pl-3 md:gap-5 md:pl-4 lg:flex'

export const navMenuHeroClass =
  'hidden items-center gap-4 border-l border-white/20 pl-3 md:gap-5 md:pl-4 lg:flex'

export const navFloatWrapClass =
  'fixed top-4 left-[5vw] z-50 flex max-w-[calc(100vw-10vw)] flex-col items-start gap-2 md:top-5'

/** Compact nav crumb: current page label + link target. */
export function getCompactNavContext(pathname: string): { label: string; href: string } {
  if (pathname === '/') return { label: 'Home', href: '/' }
  if (pathname.startsWith('/work')) return { label: 'Work', href: '/work' }
  if (pathname.startsWith('/about')) return { label: 'About', href: '/about' }
  if (pathname.startsWith('/services')) return { label: 'Services', href: '/services' }
  if (pathname.startsWith('/contact')) return { label: 'Contact', href: '/contact' }
  return { label: 'Home', href: '/' }
}
