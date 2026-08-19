import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { RevealText } from './ui/Text'

const CARD_BG: [string, string][] = [
  ['#171132', '#2a1e5c'],
  ['#0e2230', '#123a4d'],
  ['#101d1a', '#144538'],
  ['#1c1430', '#35245e'],
  ['#0f1626', '#1c2c4d'],
]
const CARD_ACCENT = ['#8b7cff', '#35d6f0', '#3ef0c0', '#8b7cff', '#35d6f0']

export function Cases() {
  const { t } = useI18n()
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const boundRef = useRef(0)
  const [bound, setBound] = useState(0)

  // measure how far the track can be dragged
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current
      const track = trackRef.current
      if (!wrap || !track) return
      const b = Math.max(0, track.scrollWidth - wrap.clientWidth)
      boundRef.current = b
      setBound(b)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  const x = useMotionValue(0)
  const xVel = useVelocity(x)
  const skewRaw = useTransform(xVel, [-2500, 2500], [5, -5])
  const skew = useSpring(skewRaw, { stiffness: 280, damping: 38 })
  const progressRaw = useTransform(x, (v) => {
    const b = boundRef.current
    return b > 0 ? Math.min(1, Math.max(0.04, -v / b)) : 0.04
  })
  const progress = useSpring(progressRaw, { stiffness: 200, damping: 34 })

  return (
    <section id="work" className="relative overflow-hidden bg-void py-24 md:py-36">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">{t.work.eyebrow}</span>
          <h2 className="display-h mt-5 text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.12]">
            <RevealText text={t.work.titleA} />{' '}
            <span className="grad-chars">
              <RevealText text={t.work.titleB} delay={0.15} />
            </span>
          </h2>
        </div>
        <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.2em] text-fog md:block">
          {t.work.drag} →
        </span>
      </div>

      <div ref={wrapRef} data-cursor={t.work.drag} className="mt-14 px-5 sm:px-6 md:px-10">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -bound, right: 0 }}
          dragElastic={0.06}
          dragTransition={{ power: 0.3, timeConstant: 240 }}
          style={{ x, skewX: skew, touchAction: 'pan-y' }}
          className="flex cursor-grab gap-5 will-change-transform active:cursor-grabbing md:gap-6"
        >
          {t.work.items.map((s, i) => (
            <motion.article
              key={s.client}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: BEZIER }}
              className="group relative aspect-[3/4] w-[80vw] shrink-0 select-none overflow-hidden rounded-2xl sm:w-[46vw] lg:w-[31vw] xl:w-[26vw]"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: `linear-gradient(150deg, ${CARD_BG[i][0]}, ${CARD_BG[i][1]})` }}
              />
              <div className="grain absolute inset-0" />
              <div
                className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70"
                style={{ background: `radial-gradient(90% 60% at 80% 0%, ${CARD_ACCENT[i]}33, transparent 65%)` }}
              />

              {/* giant ghost index */}
              <span
                className="absolute -right-3 top-1/2 -translate-y-1/2 font-display text-[9rem] font-bold leading-none opacity-[0.08]"
                style={{ color: CARD_ACCENT[i] }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="absolute left-4 top-4 z-10 flex gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-snow/85 backdrop-blur-sm">
                  {s.tag}
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5 z-10">
                <div className="display-h text-[1.6rem] leading-tight md:text-[1.8rem]" style={{ color: CARD_ACCENT[i] }}>
                  {s.result}
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold tracking-tight text-snow">{s.client}</div>
                <p className="mt-2 max-w-[92%] text-[0.8rem] leading-snug text-snow/60 opacity-0 transition-all duration-500 [transform:translateY(8px)] group-hover:opacity-100 group-hover:[transform:translateY(0)]">
                  {s.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="container-x mt-10 flex items-center gap-6">
        <div className="h-px flex-1 bg-line">
          <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-gradient-to-r from-violet via-cyan to-mint" />
        </div>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog">05</span>
      </div>
    </section>
  )
}
