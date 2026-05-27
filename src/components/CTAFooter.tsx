import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, RevealWords } from './ui/Reveal'

type Status = 'idle' | 'loading' | 'done'

function FloatingField({ id, label, type = 'text' }: { id: string; label: string; type?: string }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-white/12 bg-dark-elevated px-4 pb-2.5 pt-7 text-light-text outline-none transition-all duration-300 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(61, 159, 255,0.1)]"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 text-muted-text transition-all duration-200 ${
          active ? 'top-2.5 text-[10px] font-semibold uppercase tracking-wider text-primary' : 'top-5 text-sm'
        }`}
      >
        {label}
      </label>
      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px scale-x-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-transform duration-300"
        style={{ transform: focused ? 'scaleX(1)' : 'scaleX(0)' }}
      />
    </div>
  )
}

const FOOTER_LINKS = [
  { title: 'Services', links: ['Sites web', 'Branding', 'Copywriting', 'Chatbot WhatsApp'] },
  { title: 'Agence', links: ['À propos', 'Études de cas', 'Tarifs', 'Contact'] },
  { title: 'Suivez-nous', links: ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'] },
]

export function CTAFooter() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    setTimeout(() => setStatus('done'), 1400)
  }

  return (
    <>
      <section id="contact" className="relative overflow-hidden px-6 py-36">
        {/* Multi-layer background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(37, 99, 235,0.3) 0%, rgba(61, 159, 255,0.1) 40%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          <div className="bg-grid-fine absolute inset-0 opacity-30" />
          <div className="noise absolute inset-0" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="pill">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Audit gratuit · 24h
            </span>
          </Reveal>

          <div className="mt-6">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              <RevealWords text="Prêt à transformer" delay={0.05} />
              {' '}
              <span className="text-gradient">
                <RevealWords text="ton business ?" delay={0.3} />
              </span>
            </h2>
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted-text">
              Reçois ton audit gratuit en 24h.<br />
              <span className="text-light-text/60">Aucune carte requise. Zéro engagement.</span>
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-3 text-left">
              <FloatingField id="name" label="Ton nom complet" />
              <FloatingField id="email" label="Ton adresse email" type="email" />
              <FloatingField id="company" label="Ton entreprise (optionnel)" />

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                className="group relative mt-2 flex h-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary font-semibold text-dark-bg shadow-[0_0_40px_rgba(61, 159, 255,0.3)] transition-shadow hover:shadow-[0_0_60px_rgba(61, 159, 255,0.5)] disabled:cursor-not-allowed"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 translate-x-[-110%] skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-[110%]" />
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" className="relative flex items-center gap-2" exit={{ opacity: 0, y: -16 }}>
                      Obtenir mon audit gratuit
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-6 w-6 animate-spin rounded-full border-2 border-dark-bg/30 border-t-dark-bg"
                    />
                  )}
                  {status === 'done' && (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="relative flex items-center gap-2"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-dark-bg/20 text-sm">✓</span>
                      Merci ! On te contacte dans 24h
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={0.38}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-text">
              {['🔒 Données sécurisées', '⚡ Réponse en 24h', '✓ Sans engagement'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/7 px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-dark-surface opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-gradient">MIRVORRA</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-text">
              Agence IA de branding, copywriting et sites web pour les PME des Caraïbes.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {['IG', 'FB', 'LI', 'WA'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-muted-text transition-all duration-200 hover:border-primary/40 hover:text-primary hover:bg-primary/10"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-light-text/60">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group flex items-center gap-1.5 text-sm text-muted-text transition-colors hover:text-primary"
                    >
                      <span className="h-px w-0 bg-primary transition-all duration-200 group-hover:w-3" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-14 max-w-7xl">
          <div className="divider-glow mb-6" />
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-text">
            <span>© {new Date().getFullYear()} Mirvorra. Fait avec ◆ en Haïti & dans les Caraïbes.</span>
            <div className="flex gap-6">
              {['Mentions légales', 'Confidentialité', 'CGU'].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-primary">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
