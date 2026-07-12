import Link from 'next/link'

type ButtonProps = {
  href?: string
  variant?: 'primary' | 'ghost'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pe-white'
  const variants = {
    primary: 'bg-pe-white text-pe-black hover:bg-pe-off-white',
    ghost: 'border border-pe-gray/40 text-pe-gray-light hover:border-pe-black hover:text-pe-black hover:bg-pe-surface',
  }

  const cls = `${base} ${variants[variant]} ${className} disabled:opacity-40 disabled:pointer-events-none`

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
