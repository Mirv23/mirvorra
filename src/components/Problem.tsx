import { motion } from 'framer-motion'
import { Reveal } from './ui/Reveal'

const PROBLEMS = [
  {
    icon: '⚠',
    title: 'Site web obsolète qui ne convertit pas',
    desc: 'Lent, pas mobile, sans appel à l’action clair — vos visiteurs partent en quelques secondes.',
  },
  {
    icon: '✦',
    title: 'Branding qui ne parle pas à la jeunesse caraïbéenne',
    desc: 'Une identité générique qui ne crée aucune connexion émotionnelle avec votre marché local.',
  },
  {
    icon: '✉',
    title: 'Copywriting qui ne vend pas',
    desc: 'Des textes plats qui décrivent au lieu de convaincre, et qui ne déclenchent jamais l’achat.',
  },
]

export function Problem() {
  return (
    <section id="problem" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Le constat
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Les PME haïtiennes perdent <span className="text-gradient-accent">70 % de clients</span>{' '}
              à cause de…
            </h2>
          </Reveal>

          <ul className="mt-10 space-y-5">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={0.15 + i * 0.12}>
                <li className="glass flex gap-4 rounded-2xl p-5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-lg text-white">
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-text">{p.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Visual: frustrated -> confident morph, expressed with motion */}
        <Reveal delay={0.2}>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-dark-surface">
            <div className="bg-grid absolute inset-0 opacity-30" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.04, 1], rotate: [0, 1.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-center">
                <motion.div
                  className="mx-auto mb-6 text-8xl"
                  initial={{ filter: 'grayscale(1)' }}
                  whileInView={{ filter: 'grayscale(0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  😟→😎
                </motion.div>
                <p className="font-display text-xl text-muted-text">
                  De <span className="text-light-text">dépassé</span> à{' '}
                  <span className="text-gradient">leader</span>
                </p>
              </div>
            </motion.div>
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
