import { useEffect, useRef } from 'react'
import { gsap } from '../lib/anim'

/**
 * Custom cursor: an instant dot + a lagging ring. The ring expands over
 * interactive elements and morphs into a labeled badge over [data-cursor="…"].
 * Desktop (fine pointer) only.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.documentElement.classList.add('has-cursor')
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dx = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power2.out' })
    const dy = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power2.out' })
    const rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    let seen = false
    const move = (e: MouseEvent) => {
      if (!seen) {
        seen = true
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY, opacity: 1 })
      }
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const target = e.target as Element
      const labeled = target.closest?.('[data-cursor]') as HTMLElement | null
      const interactive = target.closest?.('a, button, [role="button"], input, textarea') as HTMLElement | null
      const txt = labeled?.getAttribute('data-cursor') || ''

      if (txt) {
        label.textContent = txt
        gsap.to(ring, { scale: 3, backgroundColor: 'rgba(244,244,250,0.96)', borderColor: 'rgba(244,244,250,0)', duration: 0.35 })
        gsap.to(label, { opacity: 1, duration: 0.25 })
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.25 })
      } else if (interactive || labeled) {
        gsap.to(ring, { scale: 1.7, backgroundColor: 'rgba(244,244,250,0)', borderColor: 'rgba(244,244,250,0.5)', duration: 0.3 })
        gsap.to(label, { opacity: 0, duration: 0.2 })
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 })
      } else {
        gsap.to(ring, { scale: 1, backgroundColor: 'rgba(244,244,250,0)', borderColor: 'rgba(244,244,250,0.35)', duration: 0.3 })
        gsap.to(label, { opacity: 0, duration: 0.2 })
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 })
      }
    }

    const down = () => gsap.to(dot, { scale: 0.55, duration: 0.15 })
    const up = () => gsap.to(dot, { scale: 1, duration: 0.25, ease: 'back.out(3)' })
    const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    const enter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 })

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-2 w-2 rounded-full bg-snow mix-blend-difference md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-10 w-10 items-center justify-center rounded-full border border-snow/35 md:flex"
      >
        <span
          ref={labelRef}
          className="font-mono text-[3.5px] font-medium uppercase tracking-[0.12em] text-void opacity-0"
        />
      </div>
    </>
  )
}
