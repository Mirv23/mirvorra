import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Ambient looping video background.
 * - autoplay muted loop, lazy (preload=none — starts loading on first play)
 * - plays only while on screen (IntersectionObserver)
 * - static poster under prefers-reduced-motion
 */
export function VideoBg({
  src,
  poster,
  className = '',
  style,
}: {
  src: string
  poster?: string
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { rootMargin: '120px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`pointer-events-none object-cover ${className}`}
      style={style}
    />
  )
}
