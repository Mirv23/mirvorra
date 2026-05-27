import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from './ui/Reveal'
import { MagneticButton } from './ui/MagneticButton'

type Plan = {
  name: string
  monthly: number
  features: string[]
  popular?: boolean
  accent: string
  desc: string
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    monthly: 499,
    desc: 'Pour lancer votre présence digitale rapidement.',
    accent: '#3d9fff',
    features: ['Site web 1 page', 'Branding express', 'Hébergement 1 an', 'Support email'],
  },
  {
    name: 'Pro',
    monthly: 1299,
    popular: true,
    desc: 'La formule complète pour vraiment vendre en ligne.',
    accent: '#2563eb',
    features: [
      'Site web 5 pages',
      'Branding complet',
      'Copywriting IA + humain',
      'Chatbot WhatsApp',
      'Panel admin',
      'Support prioritaire',
    ],
  },
  {
    name: 'Enterprise',
    monthly: 2999,
    desc: 'Sur-mesure pour les grandes ambitions.',
    accent: '#f5c518',
    features: [
      'Site illimité sur-mesure',
      'Stratégie de marque 360°',
      'Automatisations avancées',
      'SaaS dédié',
      'Account manager',
    ],
  },
]

function PricingCard({ plan, i, annual }: { plan: Plan; i: number; annual: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const price = annual ? Math.round(plan.monthly * 12 * 0.8) : plan.monthly
  const unit = annual ? '/an' : '/mois'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current!.style.setProperty('--x', `${x}%`)
    cardRef.current!.style.setProperty('--y', `${y}%`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group spotlight relative flex flex-col overflow-hidden rounded-3xl p-8 ${
        plan.popular
          ? 'bg-dark-elevated shadow-[0_0_70px_rgba(37, 99, 235,0.25)]'
          : 'bg-dark-surface'
      }`}
      style={{
        border: plan.popular
          ? `1px solid ${plan.accent}50`
          : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), ${plan.accent}12, transparent 60%)`,
        }}
      />

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-px inset-x-0 flex justify-center">
          <span
            className="rounded-b-xl px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-dark-bg"
            style={{ background: `linear-gradient(90deg, #3d9fff, #2563eb)` }}
          >
            Le plus populaire
          </span>
        </div>
      )}

      {/* Top glow line */}
      {plan.popular && (
        <div className="absolute inset-x-0 top-0 h-px opacity-80"
          style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)` }}
        />
      )}

      <div className="relative mt-2 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-text">{plan.desc}</p>
          </div>
          <span
            className="mt-1 rounded-xl p-2 text-xl"
            style={{ background: `${plan.accent}15`, border: `1px solid ${plan.accent}25` }}
          >
            {plan.name === 'Starter' ? '🚀' : plan.name === 'Pro' ? '⚡' : '🔥'}
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-1">
          <motion.span
            key={price}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-display text-5xl font-bold"
            style={{ color: plan.popular ? plan.accent : 'white' }}
          >
            ${price}
          </motion.span>
          <span className="text-muted-text">{unit}</span>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full"
          style={{ background: `linear-gradient(90deg, ${plan.accent}30, transparent)` }}
        />

        {/* Features */}
        <ul className="flex-1 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <span
                className="flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs font-bold"
                style={{ background: `${plan.accent}20`, color: plan.accent }}
              >
                ✓
              </span>
              <span className="text-muted-text group-hover:text-light-text/80 transition-colors duration-300">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          <MagneticButton
            href="#contact"
            variant={plan.popular ? 'primary' : 'outline'}
            className="w-full"
          >
            Commencer maintenant
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  )
}

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative overflow-hidden px-6 py-32">
      {/* Background orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(37, 99, 235,0.5), transparent 60%)', filter: 'blur(80px)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tarifs"
          title={<>Un investissement, <span className="text-gradient">pas une dépense</span></>}
          subtitle="Choisissez la formule qui propulse votre croissance. -20 % en annuel."
        />

        {/* Toggle */}
        <div className="mb-14 flex items-center justify-center gap-4">
          <span className={`text-sm transition-colors ${annual ? 'text-muted-text' : 'text-light-text font-medium'}`}>
            Mensuel
          </span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Basculer entre tarif mensuel et annuel"
            onClick={() => setAnnual((v) => !v)}
            className="relative h-8 w-14 rounded-full border border-white/15 bg-dark-elevated transition-colors"
          >
            <motion.span
              className="absolute top-1 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_12px_rgba(61, 159, 255,0.5)]"
              animate={{ left: annual ? 'calc(100% - 1.75rem)' : '0.25rem' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm transition-colors ${annual ? 'text-light-text font-medium' : 'text-muted-text'}`}>
            Annuel <span className="text-primary font-bold">-20%</span>
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} i={i} annual={annual} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-text">
          {['✓ Garantie 30 jours', '✓ Sans engagement', '✓ Livraison 48h', '✓ Support inclus'].map((item) => (
            <span key={item} className="flex items-center gap-2">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
