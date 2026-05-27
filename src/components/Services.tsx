import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ParticleField } from './ui/ParticleField'
import { Reveal } from './ui/Reveal'

const SERVICES = [
  {
    title: 'Stratégie IA & ROI',
    desc: "Une vision claire et commercialement ancrée de là où l'IA crée de la valeur. On identifie les opportunités, on évalue la faisabilité et on bâtit une feuille de route qui convertit l'ambition en retours mesurables.",
  },
  {
    title: 'Prototypage rapide',
    desc: '4 à 6 semaines pour transformer une stratégie en produit réel. On construit un MVP fonctionnel, on le teste avec de vrais utilisateurs et on valide le ROI avant d\'investir à grande échelle.',
  },
  {
    title: 'Sites web & E-commerce',
    desc: "Des sites rapides, élégants et pensés pour vendre. Conçus en 48h, optimisés mobile, et dopés à l'IA pour convertir vos visiteurs en clients — automatiquement.",
  },
  {
    title: 'Branding & Identité',
    desc: 'Une marque qui inspire confiance dès le premier regard. Logo, palette, ton de voix et système visuel cohérent, taillés pour le marché caraïbe.',
  },
  {
    title: 'Copywriting IA',
    desc: 'Des messages qui vendent, générés et affinés par IA puis polis à la main. Pages, pubs et séquences qui parlent à vos clients en français et en créole.',
  },
  {
    title: 'Chatbot WhatsApp',
    desc: 'Un assistant qui répond, qualifie et vend 24/7 sur le canal préféré de vos clients. Intégré à votre catalogue et à votre agenda.',
  },
  {
    title: 'Automatisation & Données',
    desc: 'On connecte vos outils, on supprime les tâches répétitives et on transforme vos données en décisions. Moins de temps perdu, plus de croissance.',
  },
]

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="flex items-baseline justify-between border-b border-line pb-6">
          <span className="eyebrow">Nos services</span>
          <span className="eyebrow">Comment on aide</span>
        </div>

        <div className="grid grid-cols-1 gap-12 pt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* list */}
          <ul className="flex flex-col">
            {SERVICES.map((s, i) => {
              const on = active === i
              return (
                <li key={s.title}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-center gap-3 border-b border-line/70 py-5 text-left"
                  >
                    <motion.span
                      animate={{ width: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                      className="overflow-hidden text-sm tabular-nums text-ink-faint"
                    >
                      {String(i + 1).padStart(2, '0')}.
                    </motion.span>
                    <span
                      className={`flex-1 text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium tracking-tight transition-colors duration-300 ${
                        on ? 'text-ink' : 'text-ink-faint'
                      }`}
                    >
                      {s.title}
                    </span>
                    <motion.span
                      animate={{ x: on ? 0 : -6, opacity: on ? 1 : 0 }}
                      className="text-ink"
                    >
                      →
                    </motion.span>
                  </button>
                </li>
              )
            })}
            <Reveal delay={0.1}>
              <div className="mt-8 flex items-center gap-8">
                <a href="#approche" className="link-arrow">Voir notre méthode <span className="arrow">→</span></a>
                <a href="#cases" className="link-arrow text-ink-soft">Études de cas <span className="arrow">→</span></a>
              </div>
            </Reveal>
          </ul>

          {/* visual + description */}
          <div className="relative hidden flex-col lg:flex">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper">
              <ParticleField variant="orbit" tone="lav" density={0.85} className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative mt-8 min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-md text-[0.95rem] leading-relaxed text-ink-soft"
                >
                  {SERVICES[active].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
