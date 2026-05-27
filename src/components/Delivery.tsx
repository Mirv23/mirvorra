import { motion } from 'framer-motion'
import { ParticleField } from './ui/ParticleField'
import { Reveal, WordReveal } from './ui/Reveal'

const PHASES = [
  {
    n: '01',
    title: 'Découverte & Stratégie',
    desc: "On cartographie votre activité, vos données et vos objectifs. On identifie où l'IA crée une vraie valeur — pas du buzz — et on construit une feuille de route claire.",
    tone: 'soft',
  },
  {
    n: '02',
    title: 'Prototype & Validation',
    desc: "4 à 6 semaines pour transformer la stratégie en produit concret. On teste avec de vrais utilisateurs et on valide le ROI avant d'investir davantage.",
    tone: 'dark',
  },
  {
    n: '03',
    title: 'Mise à l\'échelle',
    desc: 'On industrialise ce qui marche : automatisation, supervision continue et amélioration. Vous gardez la main, on assure la performance.',
    tone: 'grid',
  },
]

export function Delivery() {
  return (
    <section id="approche" className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
          <Reveal>
            <span className="eyebrow">Notre approche en 3 phases</span>
          </Reveal>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.06]">
            <WordReveal text="Une livraison structurée en 3 phases" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
              L'IA ne fonctionne que lorsqu'elle est liée à des résultats — pas au battage médiatique.
              On vous aide à identifier la valeur, à la valider vite, et à passer à l'échelle ce
              qui fonctionne. Simple et sans détour : prouver la valeur, puis industrialiser.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a href="#contact" className="link-arrow mt-8">Démarrer un sprint <span className="arrow">→</span></a>
          </Reveal>
        </div>

        {/* scrolling cards */}
        <div className="flex flex-col gap-6">
          {PHASES.map((p) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* visual */}
              <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-2xl">
                {p.tone === 'dark' ? (
                  <div className="relative h-full w-full bg-night dotgrid-light">
                    <ParticleField variant="orbit" tone="light" density={0.7} className="absolute inset-0 h-full w-full opacity-70" />
                  </div>
                ) : p.tone === 'grid' ? (
                  <div className="relative h-full w-full bg-surface dotgrid">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(176,159,214,0.25),transparent_60%)]" />
                  </div>
                ) : (
                  <div className="relative h-full w-full lav-gradient-soft grain">
                    <ParticleField variant="orbit" tone="lav" density={0.7} className="absolute inset-0 h-full w-full" />
                  </div>
                )}
                <span className="absolute left-5 top-5 text-xs font-medium tracking-[0.16em] text-ink-soft mix-blend-difference">
                  PHASE {p.n}
                </span>
              </div>
              {/* info */}
              <div className="rounded-2xl border border-line bg-paper p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium tracking-tight md:text-2xl">{p.title}</h3>
                  <span className="text-ink-faint">↗</span>
                </div>
                <p className="mt-3 max-w-md text-[0.93rem] leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
