import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const counter = { v: 0 }

    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    })

    // Letters glitch-in
    tl.from('.pre-letter', {
      yPercent: 120,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
    })

    // Progress 0 -> 100
    tl.to(
      counter,
      {
        v: 100,
        duration: reduce ? 0.3 : 1.8,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      },
      '-=0.2',
    )

    if (barRef.current) {
      tl.to(barRef.current, { scaleX: 1, duration: reduce ? 0.3 : 1.8, ease: 'power2.inOut' }, '<')
    }

    // Screen wipe out
    tl.to(wordRef.current, { y: -40, opacity: 0, duration: 0.5, ease: 'power3.in' })
    tl.to(
      root.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      },
      '-=0.2',
    )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-bg"
      aria-hidden="true"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div ref={wordRef} className="relative flex flex-col items-center">
        <div className="overflow-hidden">
          <div className="flex font-display text-5xl font-bold tracking-tight md:text-7xl">
            {'MIRVORRA'.split('').map((ch, i) => (
              <span key={i} className="pre-letter inline-block text-gradient">
                {ch}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 h-px w-56 overflow-hidden bg-white/10 md:w-72">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary"
          />
        </div>
        <div className="mt-4 font-body text-sm tabular-nums text-muted-text">
          {count.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  )
}
