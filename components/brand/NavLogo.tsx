import Image from 'next/image'
import Link from 'next/link'

type NavLogoProps = {
  href?: string
  className?: string
  tabIndex?: number
}

const WORDMARK_W = 248
const WORDMARK_H = 85

export default function NavLogo({ href = '/', className = '', tabIndex }: NavLogoProps) {
  return (
    <Link
      href={href}
      tabIndex={tabIndex}
      className={`inline-flex shrink-0 items-center overflow-visible ${className}`}
      aria-label="Promotion Efficiency home"
    >
      <Image
        src="/assets/pe-wordmark-nav.png"
        alt="Promotion Efficiency"
        width={WORDMARK_W}
        height={WORDMARK_H}
        unoptimized
        className="h-5 w-auto max-w-none object-contain object-left md:h-[1.375rem]"
        priority
      />
    </Link>
  )
}
