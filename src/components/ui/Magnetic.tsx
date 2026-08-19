import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../../lib/anim'

/** Wrapper that magnetically pulls its content toward the cursor. */
export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}
