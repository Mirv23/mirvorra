import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BEZIER } from '../lib/anim'
import { lenisStore } from '../lib/useLenis'
import { useI18n, type Lang } from '../lib/i18n'
import { Magnetic } from './ui/Magnetic'

function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  return (
    <div className={`flex items-center rounded-full border border-line2 p-1 font-mono text-[0.62rem] ${className}`}>
      {(['hi', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${
            lang === l ? 'bg-snow text-void' : 'text-fog hover:text-snow'
          }`}
        >
          {l === 'hi' ? 'हिं' : 'EN'}
        </button>
      ))}
    </div>
  )
}

export function Nav({ show }: { show: boolean }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('--:--')
  const lastY = useRef(0)

  // hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (Math.abs(y - lastY.current) > 3) {
        setHidden(y > 180 && y > lastY.current)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mumbai clock
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  // freeze page scroll while the menu is open + Esc to close
  useEffect(() => {
    if (open) lenisStore.i?.stop()
    else lenisStore.i?.start()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -110 }}
        animate={{ y: show && (!hidden || open) ? 0 : -110 }}
        transition={{ duration: 0.7, ease: BEZIER }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled && !open ? 'border-b border-line bg-void/70 backdrop-blur-xl' : 'border-b border-transparent'
          }`}
        />
        <nav className="container-x relative flex items-center justify-between py-4 md:py-5">
          <a href="#hero" className="font-display text-[1.02rem] font-bold tracking-tight">
            NIRMAAN<span className="grad-text">.</span>
          </a>

          <div className="hidden items-center gap-2.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-fog lg:flex">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
            {t.nav.location} — {time} IST
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <LangToggle />
            <Magnetic>
              <a
                href={`mailto:${t.nav.email}`}
                className="hidden rounded-full border border-line2 px-5 py-2.5 text-[0.8rem] font-medium transition-colors duration-300 hover:bg-snow hover:text-void sm:inline-flex"
              >
                {t.nav.cta}
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line2 transition-colors duration-300 hover:border-snow/50"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                  transition={{ duration: 0.4, ease: BEZIER }}
                  className="absolute block h-[1.5px] w-[18px] bg-snow"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                  transition={{ duration: 0.4, ease: BEZIER }}
                  className="absolute block h-[1.5px] w-[18px] bg-snow"
                />
              </button>
            </Magnetic>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: BEZIER }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-night"
          >
            <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.14),transparent_65%)] blur-2xl" />
            <div className="container-x grid min-h-full grid-cols-1 gap-10 pb-12 pt-28 md:pt-32 lg:grid-cols-[1.5fr_1fr]">
              <ul>
                {t.nav.links.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      initial={{ y: '115%' }}
                      animate={{ y: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.8, ease: BEZIER } }}
                      exit={{ y: '115%', transition: { duration: 0.35, ease: BEZIER } }}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-1.5 font-display text-[clamp(2rem,6.5vw,4.4rem)] font-bold leading-[1.15] tracking-tight md:gap-6"
                    >
                      <span className="font-mono text-xs font-normal text-fog">0{i + 1}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-3">{l.label}</span>
                      <span className="grad-text text-[0.5em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">✦</span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.7, ease: BEZIER } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="flex flex-col justify-end gap-8 pb-4"
              >
                <div>
                  <div className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-fog">{t.footer.colContact}</div>
                  <a
                    href={`mailto:${t.nav.email}`}
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-block text-xl font-medium tracking-tight transition-colors hover:text-cyan md:text-2xl"
                  >
                    {t.nav.email}
                  </a>
                  <p className="mt-2 text-sm text-mist">{t.nav.location}</p>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-5">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog">{t.nav.menuTagline}</span>
                  <LangToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
