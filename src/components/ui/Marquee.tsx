import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/anim'
import { lenisStore } from '../../lib/useLenis'

/**
 * Infinite marquee whose speed reacts to scroll velocity
 * and whose direction follows the scroll direction.
 */
export function Marquee({
  children,
  speed = 70,
  className = '',
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return
    let x = 0
    let dir = 1
    let w = inner.scrollWidth / 2

    const ro = new ResizeObserver(() => {
      w = inner.scrollWidth / 2
    })
    ro.observe(inner)

    const tick = (_t: number, dt: number) => {
      const v = lenisStore.i?.velocity ?? 0
      const target = v < -1 ? -1 : 1
      dir += (target - dir) * 0.06
      x -= ((speed + Math.min(Math.abs(v) * 4, 400)) * dir * dt) / 1000
      if (w > 0) {
        // keep x in (-w, 0]
        x = -((((-x) % w) + w) % w)
      }
      gsap.set(inner, { x })
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [speed])

  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex shrink-0 items-center will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
