import { motion } from 'framer-motion'
import { SectionHeading } from './ui/Reveal'

const CARDS = [
  {
    title: 'Site web en 48h',
    desc: 'Un site rapide, mobile-first et optimisé conversion, livré en deux jours.',
    icon: '⚡',
    span: 'md:col-span-2',
    accent: 'from-primary/20 to-transparent',
  },
  {
    title: 'Branding complet',
    desc: 'Logo, palette, typographie et guidelines — une identité qui marque les esprits.',
    icon: '◈',
    span: '',
    accent: 'from-secondary/20 to-transparent',
  },
  {
    title: 'Copywriting qui vend',
    desc: 'Des mots calibrés par l’IA et l’humain pour transformer le visiteur en client.',
    icon: '✍',
    span: '',
    accent: 'from-accent/20 to-transparent',
  },
  {
    title: 'Chatbot WhatsApp',
    desc: 'Répond, qualifie et prend des rendez-vous 24/7 à votre place.',
    icon: '💬',
    span: '',
    accent: 'from-primary/20 to-transparent',
  },
  {
    title: 'Panel admin SaaS',
    desc: 'Pilotez contenu, leads et statistiques depuis un tableau de bord clair.',
    icon: '▦',
    span: 'md:col-span-2',
    accent: 'from-secondary/20 to-transparent',
  },
  {
    title: 'Garantie 30 jours',
    desc: 'Satisfait ou remboursé. Le risque est pour nous, pas pour vous.',
    icon: '✓',
    span: '',
    accent: 'from-accent-2/20 to-transparent',
  },
]

export function Solution() {
  return (
    <section id="solution" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="La solution"
        title={<>Tout ce qu’il faut pour <span className="text-gradient">vendre en ligne</span></>}
        subtitle="Une offre complète, pensée pour le marché caraïbéen, propulsée par l’IA."
      />

      <div className="grid auto-rows-[200px] grid-cols-1 gap-5 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.title}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-dark-surface p-7 ${c.span}`}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />
            <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_50px_rgba(0,240,255,0.25)]" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {c.icon}
              </span>
              <div>
                <h3 className="font-display text-xl font-medium tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-text">{c.desc}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
