import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { RevealText } from './ui/Text'
import { Magnetic } from './ui/Magnetic'

export function Approach() {
  const { t } = useI18n()
  const railRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // vertical progress line draws itself as you scroll through the phases
  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      progressRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: railRef.current, start: 'top 72%', end: 'bottom 55%', scrub: 0.4 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="process" className="relative overflow-hidden bg-night py-24 md:py-36">
      <div className="pointer-events-none absolute left-[-15%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(53,214,240,0.08),transparent_65%)] blur-2xl" />
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <span className="eyebrow">{t.process.eyebrow}</span>
          <h2 className="display-h mt-5 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.14]">
            <RevealText text={t.process.titleA} />
            <br />
            <span className="grad-chars">
              <RevealText text={t.process.titleB} delay={0.15} />
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-mist">{t.process.sub}</p>
          <Magnetic className="mt-9">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-line2 px-6 py-3.5 text-[0.88rem] font-medium transition-colors duration-300 hover:bg-snow hover:text-void"
            >
              {t.process.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </a>
          </Magnetic>
        </div>

        {/* phases rail */}
        <div ref={railRef} className="relative pl-8 md:pl-14">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[11px]">
            <div ref={progressRef} className="h-full w-px origin-top bg-gradient-to-b from-violet via-cyan to-mint" />
          </div>

          {t.process.phases.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: BEZIER }}
              className="relative pb-16 last:pb-0 md:pb-20"
            >
              <span className="absolute -left-8 top-3 flex h-[15px] w-[15px] items-center justify-center md:-left-14">
                <span className="absolute h-full w-full rounded-full border border-violet/60" />
                <span className="h-[5px] w-[5px] rounded-full bg-violet" />
              </span>

              <div className="stroke-text font-display text-[clamp(3.2rem,8vw,6.5rem)] font-bold leading-none">{p.n}</div>
              <h3 className="display-h mt-4 text-xl leading-snug md:text-2xl">{p.title}</h3>
              <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-mist">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
