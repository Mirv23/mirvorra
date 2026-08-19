import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { ScrollTrigger, prefersReducedMotion } from '../lib/anim'

/**
 * Sticky tunnel backdrop: the video is pinned behind every section rendered
 * inside this wrapper, and the scroll position across the whole wrapper
 * drives video.currentTime — you fly through the tunnel as you read.
 * All-intra encoding keeps seeking frame-precise; a rAF lerp keeps it smooth.
 * Desaturated to fit the monochrome / silver palette.
 */
export function TunnelScroll({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!wrap || !video) return
    const reduced = prefersReducedMotion()

    let target = 0
    let current = 0
    let raf = 0
    const smooth = () => {
      raf = requestAnimationFrame(smooth)
      current += (target - current) * 0.12
      if (video.readyState >= 1 && video.duration) {
        const tt = Math.max(0, Math.min(video.duration - 0.05, current * video.duration))
        if (Math.abs(video.currentTime - tt) > 0.01) {
          try {
            video.currentTime = tt
          } catch {
            /* seek not ready yet */
          }
        }
      }
    }
    if (!reduced) {
      video.load()
      raf = requestAnimationFrame(smooth)
    }

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        target = self.progress
      },
    })

    return () => {
      st.kill()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative bg-void">
      {/* pinned video layer */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/tunnel.mp4"
          poster="/videos/tunnel.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{ filter: 'saturate(0.18) brightness(0.8) contrast(1.08)' }}
        />
        <div className="absolute inset-0 bg-void/50" />
        <div className="grain absolute inset-0" />
      </div>

      {/* content scrolls over the pinned video */}
      <div className="relative -mt-[100svh]">{children}</div>

      {/* handoff into the next solid section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-night" />
    </div>
  )
}
