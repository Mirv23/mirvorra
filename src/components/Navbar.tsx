import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Solution', href: '#solution' },
  { label: 'Travaux', href: '#cases' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Avis', href: '#testimonials' },
]

export function Navbar({ show }: { show: boolean }) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-5"
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3">
        <a href="#hero" className="font-display text-lg font-bold tracking-tight text-gradient">
          MIRVORRA
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-text transition-colors hover:text-light-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-br from-primary to-secondary px-5 py-2 text-sm font-semibold text-dark-bg transition-shadow hover:shadow-[0_0_30px_rgba(0,240,255,0.45)]"
        >
          Audit gratuit
        </a>
      </nav>
    </motion.header>
  )
}
