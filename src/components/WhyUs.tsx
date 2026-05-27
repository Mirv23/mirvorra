import { motion } from 'framer-motion'
import { Reveal, WordReveal } from './ui/Reveal'

type Card = {
  title: string
  desc: string
  span?: string
  bg: 'dark' | 'lav' | 'map' | 'chart' | 'soft' | 'paper'
  icon: string
}

const CARDS: Card[] = [
  { title: 'Spécialistes IA', desc: 'Experts en IA, données et transformation digitale, au service de votre croissance.', bg: 'dark', icon: '◐', span: 'md:col-span-2' },
  { title: 'Livraison de bout en bout', desc: 'De la stratégie au déploiement : un seul partenaire, zéro friction.', bg: 'lav', icon: '◇' },
  { title: 'Équipe locale', desc: 'À Haïti, dans votre langue, sur votre marché. On comprend vos clients.', bg: 'soft', icon: '⌂' },
  { title: 'Couverture caraïbe', desc: 'Des PME servies à travers les Caraïbes — à distance et sur le terrain.', bg: 'map', icon: '◉', span: 'md:col-span-2' },
  { title: 'Résultats prouvés', desc: 'On vise des indicateurs concrets : ventes, conversion, temps gagné.', bg: 'chart', icon: '◔' },
]

export function WhyUs() {
  return (
    <section id="why" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal><span className="eyebrow">Pourquoi Mirvorra</span></Reveal>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.08]">
            <WordReveal text="Pourquoi les PME caraïbes" />{' '}
            <WordReveal text="choisissent Mirvorra" className="dim" delay={0.35} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft">
              On donne accès à une ingénierie de premier plan, on livre vite, et on délivre des
              résultats réels guidés par l'expérience du terrain.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative h-64 overflow-hidden rounded-2xl ${c.span ?? ''}`}
            >
              <CardBg bg={c.bg} />
              <span
                className={`absolute left-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                  c.bg === 'dark' ? 'bg-white/10 text-white' : 'bg-ink/5 text-ink'
                }`}
              >
                {c.icon}
              </span>
              <div className="absolute inset-x-5 bottom-5 z-10">
                <h3 className={`text-lg font-medium tracking-tight ${c.bg === 'dark' ? 'text-white' : 'text-ink'}`}>
                  {c.title}
                </h3>
                <p
                  className={`mt-1.5 max-w-xs text-[0.85rem] leading-snug opacity-0 transition-all duration-500 group-hover:opacity-100 ${
                    c.bg === 'dark' ? 'text-white/70' : 'text-ink-soft'
                  } translate-y-2 group-hover:translate-y-0`}
                >
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-center text-[0.95rem] text-ink-soft">
            <span>Prêt à mobiliser une ingénierie de classe mondiale ?</span>
            <a href="#contact" className="link-arrow">Réserver mon audit IA <span className="arrow">→</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CardBg({ bg }: { bg: Card['bg'] }) {
  if (bg === 'dark')
    return (
      <div className="absolute inset-0 bg-night">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(176,159,214,0.22),transparent_60%)]" />
        <div className="absolute inset-0 dotgrid-light opacity-40" />
      </div>
    )
  if (bg === 'lav') return <div className="absolute inset-0 bg-gradient-to-br from-[#e9e3f7] to-[#cfc2ec]" />
  if (bg === 'soft') return <div className="absolute inset-0 lav-gradient-soft grain" />
  if (bg === 'map')
    return (
      <div className="absolute inset-0 bg-surface">
        <div className="absolute inset-0 dotgrid opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(176,159,214,0.18),transparent_70%)]" />
      </div>
    )
  // chart
  return (
    <div className="absolute inset-0 bg-paper">
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g stroke="rgba(11,11,13,0.08)" strokeWidth="1">
          <line x1="20" y1="20" x2="20" y2="120" />
          <line x1="20" y1="120" x2="190" y2="120" />
        </g>
        <polyline points="20,110 60,90 100,95 140,55 180,40" fill="none" stroke="#8f7bc4" strokeWidth="2" />
        <circle cx="140" cy="55" r="3" fill="#8f7bc4" />
        <circle cx="180" cy="40" r="3" fill="#0b0b0d" />
      </svg>
    </div>
  )
}
