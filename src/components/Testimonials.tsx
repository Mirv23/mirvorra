import { SectionHeading } from './ui/Reveal'

const TESTIMONIALS = [
  {
    name: 'Marie-Lourdes Pierre',
    company: 'Lakay Resto',
    role: 'Fondatrice',
    quote: 'Notre site a doublé les réservations en un mois. Mirvorra a tout compris à notre marché.',
    avatar: 'ML',
    color: '#3d9fff',
  },
  {
    name: 'Dr. Jean Baptiste',
    company: 'Clinique Soleil',
    role: 'Directeur',
    quote: 'Le chatbot WhatsApp gère nos rendez-vous 24/7. On a gagné un temps fou.',
    avatar: 'JB',
    color: '#2563eb',
  },
  {
    name: 'Nadège Étienne',
    company: 'École Avenir',
    role: 'Directrice pédagogique',
    quote: 'Un branding moderne qui parle enfin à la jeunesse. Les inscriptions ont explosé.',
    avatar: 'NÉ',
    color: '#f5c518',
  },
  {
    name: 'Patrick Joseph',
    company: 'Boutique Kreyòl',
    role: 'CEO',
    quote: "Site livré en 48h, et il vend tout seul. Exactement ce qu'on cherchait.",
    avatar: 'PJ',
    color: '#f5c518',
  },
  {
    name: 'Sophia Laurent',
    company: 'Agence Voyage Caraïbe',
    role: 'Présidente',
    quote: "Professionnels, rapides, créatifs. Le meilleur investissement de l'année.",
    avatar: 'SL',
    color: '#3d9fff',
  },
]

function Card({ name, company, role, quote, avatar, color }: (typeof TESTIMONIALS)[number]) {
  return (
    <figure
      className="group mx-2.5 flex w-[340px] flex-none flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300"
      style={{
        background: 'rgba(14,14,26,0.8)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Stars */}
      <div className="mb-4 flex gap-1" aria-label="5 étoiles">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="h-4 w-4" fill={color} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 text-sm leading-relaxed text-light-text/90">
        "{quote}"
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-sm font-bold text-dark-bg"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}90)` }}
        >
          {avatar}
        </span>
        <div>
          <span className="block text-sm font-semibold text-light-text">{name}</span>
          <span className="block text-xs text-muted-text">{role} · {company}</span>
        </div>
        <div className="ml-auto">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
          >
            ★★★★★
          </span>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS]
  const row2 = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()]

  return (
    <section id="testimonials" className="relative overflow-hidden py-32">
      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(61, 159, 255,0.5), transparent 60%)', filter: 'blur(100px)' }}
      />

      <SectionHeading
        eyebrow="Ils nous font confiance"
        title={<>Des clients qui <span className="text-gradient">recommandent</span></>}
        subtitle="Ils ont transformé leur business avec Mirvorra."
      />

      {/* Row 1 — gauche → droite */}
      <div className="marquee relative mb-4 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee-track flex w-max">
          {row1.map((t, i) => <Card key={i} {...t} />)}
        </div>
      </div>

      {/* Row 2 — droite → gauche */}
      <div className="marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee-track flex w-max" style={{ animationDirection: 'reverse', animationDuration: '60s' }}>
          {row2.map((t, i) => <Card key={i} {...t} />)}
        </div>
      </div>

      {/* Partner logos */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 opacity-40">
        {['ONG Espwa', 'Chambre de Commerce', 'TechHaïti', 'Caraïbes Digital', 'PME Network'].map((logo) => (
          <span key={logo} className="font-display text-base font-semibold tracking-tight text-muted-text">
            {logo}
          </span>
        ))}
      </div>
    </section>
  )
}
