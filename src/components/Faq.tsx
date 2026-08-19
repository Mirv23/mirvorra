import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BEZIER } from '../lib/anim'
import { useI18n } from '../lib/i18n'
import { RevealText } from './ui/Text'
import { VideoBg } from './ui/VideoBg'

export function Faq() {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState<number | null>(0)

  const list = t.faq.items.map((item, idx) => ({ ...item, idx })).filter((i) => filter === 'all' || i.cat === filter)

  return (
    <section id="faq" className="relative overflow-hidden bg-night py-24 md:py-36">
      {/* soft blue light drift */}
      <VideoBg src="/videos/bluewave.mp4" poster="/videos/bluewave.jpg" className="absolute inset-0 h-full w-full opacity-[0.14]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-night/60 to-night" />
      <div className="container-x relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="display-h mt-4 max-w-md text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.15]">
            <RevealText text={t.faq.title} />
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: BEZIER }}
            className="mt-10 max-w-xs rounded-2xl border border-line bg-panel p-6"
          >
            <p className="text-sm leading-relaxed text-mist">{t.faq.box}</p>
            <a
              href="#contact"
              className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-snow px-5 py-3 text-[0.82rem] font-semibold text-void transition-colors hover:bg-white"
            >
              {t.faq.boxCta}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {t.faq.filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id)
                  setOpen(null)
                }}
                className={`rounded-full px-4 py-2 text-[0.78rem] font-medium transition-colors duration-300 ${
                  filter === f.id ? 'bg-snow text-void' : 'border border-line2 text-mist hover:border-snow/40 hover:text-snow'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="mt-8">
            {list.map((item) => {
              const isOpen = open === item.idx
              return (
                <li key={item.idx} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : item.idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`text-[1rem] font-medium leading-snug tracking-tight transition-colors duration-300 md:text-[1.05rem] ${
                        isOpen ? 'text-snow' : 'text-mist'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line2">
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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: BEZIER }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-[0.9rem] leading-relaxed text-mist">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
