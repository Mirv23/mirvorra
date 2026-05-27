import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './ui/Reveal'

type Cat = 'demarrer' | 'mise' | 'resultats'

const FILTERS: { id: 'all' | Cat; label: string }[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'demarrer', label: 'Démarrer' },
  { id: 'mise', label: 'Mise en œuvre' },
  { id: 'resultats', label: 'Résultats' },
]

const QA: { q: string; a: string; cat: Cat }[] = [
  {
    q: "Qu'est-ce qui rend l'approche IA de Mirvorra différente ?",
    a: "On part du résultat business, pas de la technologie. Chaque projet est lié à un indicateur concret — ventes, conversion, temps gagné — et validé avant tout investissement lourd.",
    cat: 'demarrer',
  },
  {
    q: 'En combien de temps voit-on des résultats ?',
    a: "Un premier site ou prototype peut être livré en 48h à quelques semaines. Les automatisations montrent un impact mesurable dès le premier mois.",
    cat: 'resultats',
  },
  {
    q: 'Comment savoir si l\'IA convient à mon entreprise ?',
    a: "On commence par un audit gratuit : on étudie vos process, vos données et vos objectifs pour dire honnêtement où l'IA crée de la valeur — et où elle n'en crée pas.",
    cat: 'demarrer',
  },
  {
    q: 'Que comprend le sprint des 3 premières semaines ?',
    a: "Entretiens, revue des données, évaluation de faisabilité et modélisation du ROI. Le résultat : un portefeuille de cas d'usage validés et une feuille de route claire.",
    cat: 'mise',
  },
  {
    q: 'Avez-vous besoin d\'accéder à nos données avant de commencer ?',
    a: "Pas forcément. On peut démarrer sur la base d'entretiens et d'exemples. L'accès aux données accélère et affine, mais n'est pas un prérequis.",
    cat: 'mise',
  },
  {
    q: 'Comment priorisez-vous les cas d\'usage ?',
    a: "Selon l'impact attendu et l'effort requis. On attaque d'abord ce qui rapporte vite et coûte peu, pour financer les chantiers plus ambitieux.",
    cat: 'resultats',
  },
]

export function Faq() {
  const [filter, setFilter] = useState<'all' | Cat>('all')
  const [open, setOpen] = useState<number | null>(0)

  const list = QA.map((item, idx) => ({ ...item, idx })).filter((i) => filter === 'all' || i.cat === filter)

  return (
    <section id="faq" className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal><span className="eyebrow">FAQ</span></Reveal>
          <h2 className="mt-4 text-[clamp(2.4rem,5vw,4rem)]">FAQ</h2>
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-xs rounded-2xl bg-surface p-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                D'autres questions ? Notre équipe est disponible — on répond 24/7.
              </p>
              <a href="#contact" className="pill-btn mt-5">Nous contacter</a>
            </div>
          </Reveal>
        </div>

        <div>
          {/* filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); setOpen(null) }}
                className={`rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors ${
                  filter === f.id ? 'bg-ink text-white' : 'bg-surface text-ink-soft hover:bg-surface-2'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* accordion */}
          <ul className="mt-8">
            {list.map((item) => {
              const isOpen = open === item.idx
              return (
                <li key={item.idx} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : item.idx)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={`text-[1.02rem] font-medium tracking-tight transition-colors ${isOpen ? 'text-ink' : 'text-ink-soft'}`}>
                      {item.q}
                    </span>
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <span className="block h-[1.5px] w-3 bg-white" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        className="absolute block h-[1.5px] w-3 bg-white"
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-[0.93rem] leading-relaxed text-ink-soft">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
