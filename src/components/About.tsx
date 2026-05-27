import { ParticleField } from './ui/ParticleField'
import { Reveal, WordReveal } from './ui/Reveal'
import { Marquee } from './ui/Marquee'

const CLIENTS = [
  'Lakay Resto',
  'Clinique Soleil',
  'École Avenir',
  'Boutik Kreyòl',
  'Caribbean Foods',
  'Auto Plus',
  'Hôtel Lumière',
  'Agro Nord',
]

export function About() {
  return (
    <section id="about" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* particle clarity card */}
        <Reveal>
          <div className="relative aspect-square w-full overflow-hidden rounded-[28px] lav-gradient-soft grain">
            <ParticleField variant="orbit" tone="lav" className="absolute inset-0 h-full w-full" />
            <span className="absolute bottom-6 left-6 text-sm font-medium tracking-tight text-lav-3">
              Clarté IA
            </span>
          </div>
        </Reveal>

        {/* copy */}
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow">À propos</span>
          </Reveal>
          <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.08]">
            <WordReveal text="Mirvorra aide les PME caraïbes à transformer leur potentiel IA en" />{' '}
            <WordReveal text="impact mesurable." className="dim" delay={0.5} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
              On combine vision stratégique et exécution technique concrète pour transformer
              le potentiel de l'IA en résultats durables : plus de ventes, moins de friction,
              une marque qui inspire confiance.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a href="#contact" className="link-arrow mt-8">
              Réserver mon audit IA <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 border-y border-line py-7 md:mt-28">
        <Marquee items={CLIENTS} />
      </div>
    </section>
  )
}
