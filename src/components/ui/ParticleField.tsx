import { useEffect, useRef } from 'react'

type Variant = 'rising' | 'orbit'
type Tone = 'dark' | 'light' | 'lav'

type Props = {
  variant?: Variant
  tone?: Tone
  density?: number
  className?: string
}

const TONES: Record<Tone, string> = {
  dark: '11,11,13',
  light: '255,255,255',
  lav: '143,123,196',
}

/**
 * Lightweight canvas particle field.
 * - rising: motes drift slowly upward (hero backdrop)
 * - orbit: concentric rotating rings of dots (brand / service visuals)
 */
export function ParticleField({ variant = 'rising', tone = 'dark', density = 1, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rgb = TONES[tone]
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = { x: number; y: number; r: number; a: number; vx: number; vy: number; base: number; ring: number; ang: number }
    let parts: P[] = []

    const build = () => {
      parts = []
      if (variant === 'rising') {
        const count = Math.round((w / 9) * density)
        for (let i = 0; i < count; i++) {
          parts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.6 + 0.4,
            a: Math.random() * 0.5 + 0.1,
            vx: (Math.random() - 0.5) * 0.12,
            vy: -(Math.random() * 0.28 + 0.06),
            base: 0, ring: 0, ang: 0,
          })
        }
      } else {
        const rings = 5
        for (let ring = 0; ring < rings; ring++) {
          const radius = (Math.min(w, h) / 2) * (0.32 + ring * 0.13)
          const count = Math.round((10 + ring * 7) * density)
          for (let i = 0; i < count; i++) {
            const ang = (i / count) * Math.PI * 2 + Math.random() * 0.3
            parts.push({
              x: 0, y: 0,
              r: Math.random() * 1.4 + 0.6,
              a: Math.random() * 0.5 + 0.25 - ring * 0.03,
              vx: 0, vy: 0,
              base: radius,
              ring: ring % 2 === 0 ? 1 : -1,
              ang,
            })
          }
        }
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.0045

      if (variant === 'rising') {
        for (const p of parts) {
          if (!reduce) {
            p.x += p.vx
            p.y += p.vy
            if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
            if (p.x < -4) p.x = w + 4
            if (p.x > w + 4) p.x = -4
          }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb},${p.a})`
          ctx.fill()
        }
      } else {
        const cx = w / 2
        const cy = h / 2
        for (const p of parts) {
          const a = reduce ? p.ang : p.ang + t * p.ring
          const x = cx + Math.cos(a) * p.base
          const y = cy + Math.sin(a) * p.base
          const pulse = reduce ? 1 : 0.7 + 0.3 * Math.sin(t * 6 + p.ang * 4)
          ctx.beginPath()
          ctx.arc(x, y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb},${p.a * pulse})`
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [variant, tone, density])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
