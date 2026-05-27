import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Approche', href: '#approche' },
  { label: 'Études de cas', href: '#cases' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 3C8.5 6 7 9 7 12c0 3.5 2.2 6 5 6s5-2.5 5-6c0-3-1.5-6-5-9Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 3v15" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function Nav({ show }: { show: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true) // dark hero → light text
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setDark(y < window.innerHeight * 0.82)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open)
  }, [open])

  const textCls = dark && !open ? 'text-white' : 'text-ink'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled && !dark
              ? 'border-b border-line bg-paper/80 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        />
        <nav className={`relative mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10 ${textCls} transition-colors duration-500`}>
          <a href="#hero" className="flex items-center gap-2.5 font-medium tracking-tight">
            <Mark className="h-5 w-5" />
            <span className="text-[0.95rem]">Mirvorra</span>
          </a>

          <span className="absolute left-1/2 hidden -translate-x-1/2 text-[0.8rem] font-medium tracking-tight opacity-70 md:block">
            Agence IA &amp; Données
          </span>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 origin-center bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 origin-center bg-current"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night px-6 md:px-10"
          >
            <div className="mx-auto w-full max-w-[1500px]">
              <ul className="flex flex-col gap-2">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-medium tracking-tight text-white/90 transition-colors hover:text-white text-[clamp(2.2rem,8vw,5.5rem)] leading-[1.05]"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-2 text-sm text-white/50"
              >
                <span>Les Cayes · Haïti</span>
                <a href="mailto:bonjour@mirvorra.com" className="hover:text-white">bonjour@mirvorra.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
