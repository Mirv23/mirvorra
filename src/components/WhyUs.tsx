import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { gsap, BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { RevealText } from './ui/Text'
import { VideoBg } from './ui/VideoBg'

/** 3D tilt + cursor spotlight card. */
function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    gsap.to(el, {
      rotateY: (px - 0.5) * 7,
      rotateX: (0.5 - py) * 7,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' })

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spot relative overflow-hidden rounded-2xl border border-line bg-panel ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

export function WhyUs() {
  const { t } = useI18n()
  const c = t.why.cards

  const content = (i: number) => (
    <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
      <h3 className="display-h text-lg leading-snug md:text-xl">{c[i].title}</h3>
      <p className="mt-2 max-w-sm text-[0.85rem] leading-relaxed text-mist">{c[i].desc}</p>
    </div>
  )

  return (
    <section id="why" className="relative bg-void py-24 md:py-36">
      <div className="container-x">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <span className="eyebrow">{t.why.eyebrow}</span>
          <h2 className="display-h mt-5 text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.12]">
            <RevealText text={t.why.titleA} />{' '}
            <span className="grad-chars">
              <RevealText text={t.why.titleB} delay={0.15} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* 1 — senior team, aurora backdrop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: BEZIER }}
            className="md:col-span-2"
          >
            <TiltCard className="h-72">
              {/* rising embers, hue-shifted from orange to violet */}
              <VideoBg
                src="/videos/embers.mp4"
                poster="/videos/embers.jpg"
                className="absolute inset-0 h-full w-full opacity-90"
                style={{ filter: 'hue-rotate(235deg) saturate(1.15)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent" />
              {content(0)}
            </TiltCard>
          </motion.div>

          {/* 2 — A to Z */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: BEZIER }}
          >
            <TiltCard className="h-72">
              <span className="stroke-text absolute right-4 top-3 font-display text-7xl font-bold">A→Z</span>
              {content(1)}
            </TiltCard>
          </motion.div>

          {/* 3 — transparent process */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.05, ease: BEZIER }}
          >
            <TiltCard className="h-72">
              <div className="absolute left-6 top-6 flex gap-1.5 md:left-8 md:top-8">
                {[0, 1, 2, 3].map((n) => (
                  <motion.span
                    key={n}
                    initial={{ scaleY: 0.2, opacity: 0.3 }}
                    whileInView={{ scaleY: [0.2, 1, 0.4, 1][n], opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + n * 0.1, ease: BEZIER }}
                    className="h-10 w-1.5 origin-bottom rounded-full bg-gradient-to-t from-violet to-cyan"
                  />
                ))}
              </div>
              {content(2)}
            </TiltCard>
          </motion.div>

          {/* 4 — global delivery, dotted field with pulsing nodes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: BEZIER }}
            className="md:col-span-2"
          >
            <TiltCard className="h-72">
              <div className="dots absolute inset-0 opacity-70" />
              <span className="absolute left-[30%] top-[32%] h-2 w-2 rounded-full bg-mint">
                <span className="absolute inset-0 animate-ping rounded-full bg-mint/60" />
              </span>
              <span className="absolute left-[62%] top-[22%] h-2 w-2 rounded-full bg-cyan">
                <span className="absolute inset-0 animate-ping rounded-full bg-cyan/60 [animation-delay:0.6s]" />
              </span>
              <span className="absolute left-[78%] top-[48%] h-2 w-2 rounded-full bg-violet">
                <span className="absolute inset-0 animate-ping rounded-full bg-violet/60 [animation-delay:1.2s]" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
              {content(3)}
            </TiltCard>
          </motion.div>

          {/* 5 — proven results, self-drawing chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: BEZIER }}
            className="md:col-span-3"
          >
            <TiltCard className="h-64">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="chartG" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8b7cff" />
                    <stop offset="0.55" stopColor="#35d6f0" />
                    <stop offset="1" stopColor="#3ef0c0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,170 L90,150 L180,158 L270,120 L360,128 L450,70 L540,80 L600,34"
                  fill="none"
                  stroke="url(#chartG)"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-panel via-transparent to-transparent" />
              {content(4)}
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
