import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Solution', href: '#solution', id: 'solution' },
  { label: 'Travaux', href: '#cases', id: 'cases' },
  { label: 'Tarifs', href: '#pricing', id: 'pricing' },
  { label: 'Avis', href: '#testimonials', id: 'testimonials' },
]

export function Navbar({ show }: { show: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      initial={{ y: -90, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className={`relative flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-lg font-bold tracking-tight text-gradient"
          aria-label="Mirvorra — accueil"
        >
          MIRVORRA
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active === l.id ? 'text-light-text' : 'text-muted-text hover:text-light-text'
                }`}
              >
                {/* Hover background pill */}
                <AnimatePresence>
                  {hoveredIdx === i && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>
                {/* Active underline dot */}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active-dot"
                    ref={indicatorRef}
                    className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-dark-bg transition-all duration-300 hover:shadow-[0_0_30px_rgba(61, 159, 255,0.5)] md:flex items-center gap-2"
        >
          <span className="relative z-10">Audit gratuit</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          <span className="absolute inset-0 bg-white/20 translate-x-[-110%] skew-x-12 transition-transform duration-500 group-hover:translate-x-[110%]" />
        </a>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-light-text origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block h-0.5 w-6 bg-light-text"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-light-text origin-center"
          />
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-4 top-[4.5rem] rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted-text transition-colors hover:bg-white/5 hover:text-light-text"
              >
                {l.label}
                <span className="text-primary opacity-50">→</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary px-5 py-3 text-sm font-semibold text-dark-bg"
            >
              Audit gratuit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
