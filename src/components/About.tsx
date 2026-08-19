import { motion } from 'framer-motion'
import { BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { ScrubText, Counter } from './ui/Text'
import { Marquee } from './ui/Marquee'

const CLIENTS = ['FinPay', 'LogiTrack', 'MediCare+', 'StreamBox', 'KartHub', 'EduSpark', 'AeroFleet', 'ZenPay']

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="relative bg-void">
      {/* keyword strip */}
      <div className="border-y border-line py-5">
        <Marquee speed={60}>
          {t.strip.map((k) => (
            <span key={k} className="mx-5 flex items-center gap-10 font-display text-lg font-semibold tracking-tight text-mist md:text-xl">
              <span className="grad-text text-sm">✦</span>
              {k}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x py-24 md:py-36">
        <span className="eyebrow">{t.about.eyebrow}</span>
        <h2 className="display-h mt-8 max-w-5xl text-[clamp(1.7rem,4.4vw,3.6rem)] leading-[1.28]">
          <ScrubText text={t.about.scrub} />
        </h2>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 border-l border-t border-line md:mt-24 lg:grid-cols-4">
          {t.about.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: BEZIER }}
              className="border-b border-r border-line p-6 md:p-9"
            >
              <div className="display-h text-[clamp(2.4rem,5vw,4.2rem)] leading-none">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-3 max-w-[16ch] text-[0.82rem] leading-snug text-fog">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ghost client marquee */}
      <div className="border-y border-line py-7">
        <Marquee speed={45}>
          {CLIENTS.map((c) => (
            <span key={c} className="stroke-text mx-8 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
