import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { RevealText } from './ui/Text'

const HUES: [string, string][] = [
  ['#f2f3f6', '#a8abb6'],
  ['#d6d8e0', '#8f929e'],
  ['#c3c5cf', '#74767f'],
  ['#e6e7ec', '#9d9fab'],
  ['#cfd1da', '#83858f'],
  ['#dfe1e8', '#9698a4'],
  ['#b9bcc7', '#6b6d76'],
]

export function Services() {
  const { t } = useI18n()
  const [active, setActive] = useState(-1)
  const [open, setOpen] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const quick = useRef<{ x: ((v: number) => void) | null; y: ((v: number) => void) | null }>({ x: null, y: null })

  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    quick.current.x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    quick.current.y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
  }, [])

  // floating preview shows/hides with the hovered row
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    gsap.to(el, {
      autoAlpha: active >= 0 ? 1 : 0,
      scale: active >= 0 ? 1 : 0.85,
      rotate: active >= 0 ? -4 : 0,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [active])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const list = listRef.current
    if (!list) return
    const r = list.getBoundingClientRect()
    quick.current.x?.(e.clientX - r.left)
    quick.current.y?.(e.clientY - r.top)
  }

  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="container-x relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h2 className="display-h mt-5 text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.12]">
              <RevealText text={t.services.titleA} />{' '}
              <span className="grad-chars">
                <RevealText text={t.services.titleB} delay={0.15} />
              </span>
            </h2>
          </div>
          <span className="stroke-text hidden font-display text-6xl font-bold md:block">07</span>
        </div>

        <div ref={listRef} onMouseMove={onMove} onMouseLeave={() => setActive(-1)} className="relative mt-14">
          {/* cursor-chasing preview card (desktop only) */}
          <div ref={previewRef} className="pointer-events-none absolute left-0 top-0 z-20 hidden opacity-0 lg:block">
            <div className="grain h-56 w-44 -translate-x-1/2 -translate-y-[55%] overflow-hidden rounded-2xl">
              <div
                className="flex h-full w-full flex-col justify-between p-4 transition-[background] duration-300"
                style={{
                  background: `linear-gradient(135deg, ${HUES[Math.max(active, 0)][0]}, ${HUES[Math.max(active, 0)][1]})`,
                }}
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-void/70">
                  {active >= 0 ? t.services.items[active].tag : ''}
                </span>
                <span className="font-display text-6xl font-bold text-void/85">
                  {String(Math.max(active, 0) + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {t.services.items.map((s, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.05, ease: BEZIER }}
                onMouseEnter={() => setActive(i)}
                className="group relative overflow-hidden border-t border-line last:border-b"
              >
                {/* hover fill */}
                <div className="absolute inset-0 origin-bottom scale-y-0 bg-panel transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="relative z-10 grid w-full grid-cols-[2.6rem_1fr_2.4rem] items-center gap-3 py-6 text-left md:grid-cols-[3.5rem_1fr_auto_2.6rem] md:gap-8 md:py-8"
                >
                  <span className="font-mono text-[0.7rem] text-fog">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display-h min-w-0 text-[clamp(1.35rem,3.4vw,2.7rem)] leading-[1.2] transition-transform duration-500 group-hover:translate-x-3">
                    {s.title}
                  </span>
                  <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fog md:block">
                    {s.tag}
                  </span>
                  <span className="relative flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-line2 transition-colors duration-300 group-hover:border-snow/50">
                    <span className="block h-[1.5px] w-3 bg-snow" />
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : 90 }}
                      transition={{ duration: 0.4, ease: BEZIER }}
                      className="absolute block h-[1.5px] w-3 bg-snow"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: BEZIER }}
                      className="relative z-10 overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-[3.35rem] text-[0.92rem] leading-relaxed text-mist md:pb-9 md:pl-[5.5rem]">
                        {s.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
