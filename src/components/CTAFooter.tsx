import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './ui/Reveal'

type Status = 'idle' | 'loading' | 'done'

function Field({
  id,
  label,
  type = 'text',
}: {
  id: string
  label: string
  type?: string
}) {
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
        className="peer w-full rounded-xl border border-white/15 bg-dark-elevated px-4 pb-2 pt-6 text-light-text outline-none transition-shadow duration-300 focus:border-primary/70 focus:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 text-muted-text transition-all duration-200 ${
          active ? 'top-2 text-xs text-primary' : 'top-4 text-base'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

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
      <section id="contact" className="relative overflow-hidden px-6 py-32">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(112,0,255,0.35),transparent_70%)] blur-[120px]" />
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Prêt à transformer <span className="text-gradient">ton business ?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted-text">
              Reçois ton audit gratuit en 24h. Aucune carte requise.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4 text-left">
              <Field id="name" label="Ton nom" />
              <Field id="email" label="Ton email" type="email" />
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="relative mt-2 flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary font-semibold text-dark-bg shadow-[0_0_40px_rgba(0,240,255,0.35)] transition-shadow hover:shadow-[0_0_60px_rgba(0,240,255,0.55)] disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" exit={{ opacity: 0, y: -20 }}>
                      Obtenir mon audit gratuit
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
                      className="flex items-center gap-2"
                    >
                      ✓ Merci ! On te contacte vite
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-gradient">MIRVORRA</span>
            <p className="mt-3 max-w-xs text-sm text-muted-text">
              Agence IA de branding, copywriting et sites web pour les PME des Caraïbes.
            </p>
          </div>
          {[
            { title: 'Services', links: ['Sites web', 'Branding', 'Copywriting', 'Chatbot'] },
            { title: 'Agence', links: ['À propos', 'Études de cas', 'Tarifs', 'Contact'] },
            { title: 'Suivez-nous', links: ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-medium uppercase tracking-[0.15em] text-light-text">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-text transition-colors hover:text-primary">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-6 text-sm text-muted-text">
          © {new Date().getFullYear()} Mirvorra. Fait avec ◆ en Haïti & dans les Caraïbes.
        </div>
      </footer>
    </>
  )
}
