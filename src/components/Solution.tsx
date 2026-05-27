import { useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from './ui/Reveal'

const CARDS = [
  {
    title: 'Site web en 48h',
    desc: 'Rapide, mobile-first, optimisé conversion. Livré en deux jours, opérationnel dès le premier jour.',
    icon: '⚡',
    span: 'md:col-span-2',
    rows: 'row-span-1',
    gradient: 'from-primary/20 via-transparent to-transparent',
    accent: '#3d9fff',
    tag: 'Flagship',
  },
  {
    title: 'Branding complet',
    desc: 'Logo, palette, typo, guidelines — une identité mémorable.',
    icon: '◈',
    span: '',
    rows: '',
    gradient: 'from-secondary/20 via-transparent to-transparent',
    accent: '#2563eb',
    tag: 'Identité',
  },
  {
    title: 'Copywriting IA + humain',
    desc: 'Des mots qui transforment les visiteurs en clients.',
    icon: '✍',
    span: '',
    rows: '',
    gradient: 'from-accent/20 via-transparent to-transparent',
    accent: '#f5c518',
    tag: 'Conversion',
  },
  {
    title: 'Chatbot WhatsApp',
    desc: 'Répond, qualifie et prend des RDV 24/7 à votre place.',
    icon: '💬',
    span: '',
    rows: '',
    gradient: 'from-primary/20 via-transparent to-transparent',
    accent: '#3d9fff',
    tag: 'IA',
  },
  {
    title: 'Panel admin SaaS',
    desc: 'Pilotez contenu, leads et statistiques depuis un dashboard épuré.',
    icon: '▦',
    span: 'md:col-span-2',
    rows: '',
    gradient: 'from-secondary/20 via-transparent to-transparent',
    accent: '#2563eb',
    tag: 'Dashboard',
  },
  {
    title: 'Garantie 30 jours',
    desc: 'Satisfait ou remboursé. Zéro risque.',
    icon: '✓',
    span: '',
    rows: '',
    gradient: 'from-accent-2/20 via-transparent to-transparent',
    accent: '#f5c518',
    tag: 'Sécurité',
  },
]

function BentoCard({ c, i }: { c: (typeof CARDS)[number]; i: number }) {
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current!.style.setProperty('--x', `${x}%`)
    cardRef.current!.style.setProperty('--y', `${y}%`)
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group spotlight relative flex min-h-[180px] flex-col overflow-hidden rounded-3xl border border-white/7 bg-dark-surface p-7 ${c.span} ${c.rows}`}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Gradient background */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      {/* Spotlight hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), ${c.accent}18, transparent 60%)`,
        }}
      />

      {/* Animated border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${c.accent}40, 0 0 30px ${c.accent}15` }}
      />

      <div className="relative flex h-full flex-col justify-between gap-4">
        {/* Top row: icon + tag */}
        <div className="flex items-start justify-between">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}30` }}
          >
            {c.icon}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
            style={{ background: `${c.accent}15`, color: c.accent, border: `1px solid ${c.accent}25` }}
          >
            {c.tag}
          </span>
        </div>

        {/* Text */}
        <div>
          <h3 className="font-display text-xl font-semibold leading-tight tracking-tight">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-text">{c.desc}</p>
        </div>
      </div>
    </motion.article>
  )
}

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden px-6 py-32">
      {/* Ambient orb */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(37, 99, 235,0.6), transparent 60%)', filter: 'blur(100px)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="La solution"
          title={<>Tout ce qu'il faut pour <span className="text-gradient">vendre en ligne</span></>}
          subtitle="Une offre complète, pensée pour le marché caraïbéen, propulsée par l'IA."
        />

        <div className="grid auto-rows-[190px] grid-cols-1 gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <BentoCard key={c.title} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
