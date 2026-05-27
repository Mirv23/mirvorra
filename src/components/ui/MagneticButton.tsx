import { type ReactNode } from 'react'
import { useMagnetic } from '../../lib/useMagnetic'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  href = '#',
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.4,
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(strength)

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold tracking-tight transition-shadow duration-300 will-change-transform'

  const styles =
    variant === 'primary'
      ? 'text-dark-bg bg-gradient-to-br from-primary to-secondary shadow-[0_0_40px_rgba(61, 159, 255,0.35)] hover:shadow-[0_0_60px_rgba(61, 159, 255,0.55)]'
      : 'text-light-text border border-white/20 hover:border-primary/70 hover:shadow-[0_0_40px_rgba(61, 159, 255,0.25)]'

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  )
}
