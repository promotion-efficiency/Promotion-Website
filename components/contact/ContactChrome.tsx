import Link from 'next/link'
import SplitWordmark from '@/components/brand/SplitWordmark'

export default function ContactChrome() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-pe-gray/20 bg-pe-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" aria-label="Promotion Efficiency home">
          <SplitWordmark size="nav" interactive split={0} />
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-pe-gray-light transition-colors hover:text-pe-white"
        >
          ← Back
        </Link>
      </div>
    </header>
  )
}
