import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './anim'

/** Module-level handle so any component (nav, marquee…) can reach the instance. */
export const lenisStore: { i: Lenis | null } = { i: null }

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    lenisStore.i = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Smooth anchor navigation
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault()
        lenis.scrollTo(id, { duration: 1.5, offset: 0 })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisStore.i = null
    }
  }, [])
}
