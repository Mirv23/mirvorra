import { SectionHeading } from './ui/Reveal'

const TESTIMONIALS = [
  {
    name: 'Marie-Lourdes Pierre',
    company: 'Lakay Resto',
    quote: 'Notre site a doublé les réservations en un mois. Mirvorra a tout compris à notre marché.',
  },
  {
    name: 'Dr. Jean Baptiste',
    company: 'Clinique Soleil',
    quote: 'Le chatbot WhatsApp gère nos rendez-vous 24/7. On a gagné un temps fou.',
  },
  {
    name: 'Nadège Étienne',
    company: 'École Avenir',
    quote: 'Un branding moderne qui parle enfin à la jeunesse. Les inscriptions ont explosé.',
  },
  {
    name: 'Patrick Joseph',
    company: 'Boutique Kreyòl',
    quote: 'Site livré en 48h, et il vend tout seul. Exactement ce qu’on cherchait.',
  },
  {
    name: 'Sophia Laurent',
    company: 'Agence Voyage Caraïbe',
    quote: 'Professionnels, rapides, créatifs. Le meilleur investissement de l’année.',
  },
]

function Card({ name, company, quote }: (typeof TESTIMONIALS)[number]) {
  return (
    <figure className="mx-3 flex w-[340px] flex-none flex-col justify-between rounded-3xl border border-white/10 bg-dark-surface p-7">
      <div className="mb-4 flex gap-1 text-lg text-primary" aria-hidden="true">
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} className="animate-pulse-glow" style={{ animationDelay: `${i * 0.15}s` }}>
            {s}
          </span>
        ))}
      </div>
      <blockquote className="text-light-text">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display font-bold text-dark-bg">
          {name.charAt(0)}
        </span>
        <span>
          <span className="block font-medium">{name}</span>
          <span className="block text-sm text-muted-text">{company}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section id="testimonials" className="relative py-32">
      <SectionHeading
        eyebrow="Ils nous font confiance"
        title={<>Des clients qui <span className="text-gradient">recommandent</span></>}
      />

      <div className="marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max">
          {loop.map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 opacity-60">
        {['ONG Espwa', 'Chambre de Commerce', 'TechHaïti', 'Caraïbes Digital', 'PME Network'].map(
          (logo) => (
            <span key={logo} className="font-display text-lg font-medium tracking-tight">
              {logo}
            </span>
          ),
        )}
      </div>
    </section>
  )
}
