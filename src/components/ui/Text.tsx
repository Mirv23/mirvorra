import { useEffect, useMemo, useRef } from 'react'
import { gsap } from '../../lib/anim'

const DEVANAGARI = /[ऀ-ॿ]/

type RevealTextProps = {
  text: string
  className?: string
  by?: 'chars' | 'words'
  delay?: number
  stagger?: number
  /** undefined → scroll-triggered; boolean → plays when true (hero intro) */
  play?: boolean
}

/**
 * Kinetic text reveal: each unit slides up from behind an overflow mask.
 * Devanagari text is always split by words to keep glyph clusters intact.
 */
export function RevealText({ text, className = '', by = 'chars', delay = 0, stagger = 0.028, play }: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const words = useMemo(() => text.split(' '), [text])
  const mode = DEVANAGARI.test(text) ? 'words' : by

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-r]')
    if (play === false) {
      gsap.set(targets, { yPercent: 120, rotate: 3 })
      return
    }
    const tween = gsap.fromTo(
      targets,
      { yPercent: 120, rotate: 3 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.15,
        ease: 'expo.out',
        stagger,
        delay,
        ...(play === undefined
          ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
          : {}),
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [play, text, mode, delay, stagger])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="inline-block overflow-hidden align-top py-[0.14em] -my-[0.14em]">
            {mode === 'chars' ? (
              w.split('').map((c, ci) => (
                <span key={ci} data-r className="inline-block will-change-transform">
                  {c}
                </span>
              ))
            ) : (
              <span data-r className="inline-block will-change-transform">
                {w}
              </span>
            )}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/** Paragraph whose words light up one by one, scrubbed by scroll position. */
export function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const words = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-w]')
    const tween = gsap.fromTo(
      targets,
      { opacity: 0.13 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.6,
        duration: 0.9,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span data-w>{w}</span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

type CounterProps = {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

/** Number that counts up when it enters the viewport. */
export function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 2, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = prefix + obj.v.toFixed(decimals) + suffix
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [to, prefix, suffix, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {prefix + (0).toFixed(decimals) + suffix}
    </span>
  )
}
