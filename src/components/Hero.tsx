import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { Aurora } from './ui/Aurora'
import { RevealText } from './ui/Text'
import { Magnetic } from './ui/Magnetic'

export function Hero({ playing }: { playing: boolean }) {
  const { t } = useI18n()
  const secRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // parallax exit: content drifts up and fades as you scroll away
  useLayoutEffect(() => {
    const tween = gsap.to(innerRef.current, {
      yPercent: -24,
      opacity: 0,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: { trigger: secRef.current, start: 'top top', end: '80% top', scrub: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: playing ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: BEZIER },
  })

  return (
    <section id="hero" ref={secRef} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-void">
      <Aurora className="absolute inset-0 h-full w-full" />
      <div className="grain absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-void" />

      <div ref={innerRef} className="container-x relative z-10 flex flex-1 flex-col justify-center pb-28 pt-32">
        <motion.span {...fade(0.15)} className="eyebrow">
          {t.hero.badge}
        </motion.span>

        <h1 className="display-h mt-6 max-w-6xl text-[clamp(2.9rem,9.5vw,8.5rem)] leading-[1.08]">
          <RevealText text={t.hero.l1} play={playing} delay={0.25} stagger={0.035} />
          <br />
          <span className="grad-chars">
            <RevealText text={t.hero.l2} play={playing} delay={0.45} stagger={0.035} />
          </span>
        </h1>

        <motion.p {...fade(1.0)} className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-mist md:text-base">
          {t.hero.sub}
        </motion.p>

        <motion.div {...fade(1.15)} className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6">
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-snow px-7 py-4 text-[0.92rem] font-semibold text-void transition-colors duration-300 hover:bg-white"
            >
              {t.hero.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </a>
          </Magnetic>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-mist transition-colors hover:text-snow"
          >
            {t.hero.cta2}
            <span className="transition-transform duration-500 group-hover:translate-y-1">↓</span>
          </a>
        </motion.div>
      </div>

      {/* bottom meta row */}
      <motion.div
        {...fade(1.4)}
        className="container-x relative z-10 flex items-center justify-between pb-8 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog"
      >
        <span>{t.hero.left}</span>
        <span className="hidden flex-col items-center gap-2 md:flex">
          <span>{t.hero.scroll}</span>
          <motion.span
            animate={{ scaleY: [0, 1, 0], originY: ['0%', '0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-8 w-px bg-gradient-to-b from-fog to-transparent"
          />
        </span>
        <span>{t.hero.right}</span>
      </motion.div>
    </section>
  )
}
