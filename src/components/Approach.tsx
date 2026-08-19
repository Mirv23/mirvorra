import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger, BEZIER, prefersReducedMotion } from '../lib/anim'
import { useI18n } from '../lib/i18n'

/**
 * Scrollytelling tunnel — the section pins for ~4 screens while the scroll
 * position drives video.currentTime (fly-through a sci-fi tunnel). The four
 * process phases fade in/out one after another during the traversal.
 * Encoded all-intra so seeking is frame-precise and butter smooth.
 */
export function Approach() {
  const { t } = useI18n()
  const secRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)

  useLayoutEffect(() => {
    const video = videoRef.current
    const sec = secRef.current
    if (!video || !sec) return
    const reduced = prefersReducedMotion()

    // rAF-smoothed scrubbing: lerp toward the scroll target so fast wheels stay fluid
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
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        target = self.progress
        setIdx(Math.min(3, Math.floor(self.progress * 4)))
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
      },
    })

    return () => {
      st.kill()
      cancelAnimationFrame(raf)
    }
  }, [])

  const phase = t.process.phases[idx]

  return (
    <section id="process" ref={secRef} className="relative bg-void" style={{ height: '420vh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* scroll-driven tunnel */}
        <video
          ref={videoRef}
          src="/videos/tunnel.mp4"
          poster="/videos/tunnel.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-void/40" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />

        {/* header */}
        <div className="container-x absolute inset-x-0 top-0 z-10 flex items-end justify-between pt-24 md:pt-28">
          <div>
            <span className="eyebrow">{t.process.eyebrow}</span>
            <h2 className="display-h mt-3 text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.15]">
              {t.process.titleA} <span className="grad-text">{t.process.titleB}</span>
            </h2>
          </div>
          <span className="hidden max-w-xs text-right text-[0.82rem] leading-relaxed text-mist lg:block">
            {t.process.sub}
          </span>
        </div>

        {/* phase card — swaps as you travel through the tunnel */}
        <div className="container-x absolute inset-x-0 bottom-0 z-10 pb-24 md:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: BEZIER }}
              className="max-w-2xl"
            >
              <div className="stroke-text font-display text-[clamp(3.4rem,9vw,7rem)] font-bold leading-none">
                {phase.n}
              </div>
              <h3 className="display-h mt-3 text-[clamp(1.4rem,3.2vw,2.4rem)] leading-snug">{phase.title}</h3>
              <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-mist md:text-[0.98rem]">{phase.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* progress rail */}
          <div className="mt-10 flex items-center gap-5">
            <span className="font-mono text-[0.66rem] tracking-[0.18em] text-fog">
              {phase.n} / 04
            </span>
            <div className="h-px flex-1 bg-snow/15">
              <div ref={barRef} className="h-px origin-left scale-x-0 bg-gradient-to-r from-violet via-cyan to-mint" />
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${n === idx ? 'bg-cyan' : 'bg-snow/25'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
