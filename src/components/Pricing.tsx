import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from './ui/Reveal'
import { MagneticButton } from './ui/MagneticButton'

type Plan = {
  name: string
  monthly: number
  features: string[]
  popular?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    monthly: 499,
    features: ['Site web 1 page', 'Branding express', 'Hébergement 1 an', 'Support email'],
  },
  {
    name: 'Pro',
    monthly: 1299,
    popular: true,
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
    features: [
      'Site sur-mesure illimité',
      'Stratégie de marque 360°',
      'Automatisations avancées',
      'SaaS dédié',
      'Account manager',
    ],
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  const price = (m: number) => (annual ? Math.round(m * 12 * 0.8) : m)
  const unit = annual ? '/an' : '/mois'

  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="Tarifs"
        title={<>Un investissement, <span className="text-gradient">pas une dépense</span></>}
        subtitle="Choisissez la formule qui propulse votre croissance. -20 % en annuel."
      />

      {/* Toggle */}
      <div className="mb-14 flex items-center justify-center gap-4">
        <span className={annual ? 'text-muted-text' : 'text-light-text'}>Mensuel</span>
        <button
          role="switch"
          aria-checked={annual}
          aria-label="Basculer entre tarif mensuel et annuel"
          onClick={() => setAnnual((v) => !v)}
          className="relative h-8 w-16 rounded-full border border-white/15 bg-dark-elevated"
        >
          <motion.span
            className="absolute top-1 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary"
            animate={{ left: annual ? 'calc(100% - 1.75rem)' : '0.25rem' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={annual ? 'text-light-text' : 'text-muted-text'}>
          Annuel <span className="text-primary">-20%</span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            className={`relative flex flex-col rounded-3xl p-8 ${
              plan.popular
                ? 'border-gradient shadow-[0_0_60px_rgba(112,0,255,0.3)]'
                : 'border border-white/10 bg-dark-surface'
            }`}
          >
            {plan.popular && (
              <span className="animate-pulse-glow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-semibold text-dark-bg">
                Le plus populaire
              </span>
            )}
            <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold">${price(plan.monthly)}</span>
              <span className="text-muted-text">{unit}</span>
            </div>
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-text">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MagneticButton
                href="#contact"
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
              >
                Commencer maintenant
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
