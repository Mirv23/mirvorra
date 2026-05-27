import { useRef, useState } from 'react'
import { Reveal, WordReveal } from './ui/Reveal'

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DVGvsuhUBCqdq2LgAfQjiKbvtX'

type Study = {
  tag: string
  client: string
  result: string
  desc: string
  image?: string
  bg: 'dark' | 'lav' | 'soft'
}

const STUDIES: Study[] = [
  {
    tag: 'Restauration',
    client: 'Lakay Resto',
    result: '+320% de leads',
    desc: 'Site de commande en ligne et chatbot WhatsApp générant des réservations en continu.',
    image: `${CDN}/hf_20260527_201747_5751f9bb-56d6-4a58-b184-52fa1f4fbc2b.png`,
    bg: 'dark',
  },
  {
    tag: 'Santé',
    client: 'Clinique Soleil',
    result: '60% de temps gagné',
    desc: 'Prise de rendez-vous automatisée et tri intelligent des demandes patients.',
    image: `${CDN}/hf_20260527_201749_f1a7a325-ef7f-47df-980b-da058d8ed09b.png`,
    bg: 'soft',
  },
  {
    tag: 'Éducation',
    client: 'École Avenir',
    result: '+45% de conversion',
    desc: 'Refonte de marque et tunnel d\'inscription optimisé pour le mobile.',
    bg: 'lav',
  },
  {
    tag: 'E-commerce',
    client: 'Boutik Kreyòl',
    result: '×2,5 ventes en ligne',
    desc: 'Boutique rapide, copywriting IA bilingue et relances automatiques.',
    bg: 'dark',
  },
  {
    tag: 'Services',
    client: 'Auto Plus',
    result: '−40% appels manqués',
    desc: 'Assistant WhatsApp qui qualifie et prend les rendez-vous 24/7.',
    bg: 'soft',
  },
]

export function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' })
  }

  return (
    <section id="cases" className="overflow-hidden bg-paper py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] items-end justify-between px-6 md:px-10">
        <div>
          <Reveal><span className="eyebrow">Études de cas</span></Reveal>
          <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08]">
            <WordReveal text="Des résultats concrets" /><br />
            <WordReveal text="sur de vrais projets" className="dim" delay={0.3} />
          </h2>
        </div>
        <Reveal className="hidden md:block">
          <a href="#contact" className="pill-ghost">
            Toutes les études <span>→</span>
          </a>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 md:px-10"
      >
        {STUDIES.map((s) => (
          <article
            key={s.client}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[46vw] lg:w-[27vw] xl:w-[23vw]"
          >
            <CardBg study={s} />
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-medium ${s.bg === 'soft' ? 'bg-ink/8 text-ink' : 'bg-white/12 text-white backdrop-blur'}`}>
                IA
              </span>
              <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-medium ${s.bg === 'soft' ? 'bg-ink/8 text-ink' : 'bg-white/12 text-white backdrop-blur'}`}>
                {s.tag}
              </span>
            </div>
            <div className={`absolute inset-x-4 bottom-4 z-10 ${s.bg === 'soft' ? 'text-ink' : 'text-white'}`}>
              <div className="text-[1.35rem] font-medium tracking-tight">{s.result}</div>
              <div className={`mt-0.5 text-sm font-medium ${s.bg === 'soft' ? 'text-ink-soft' : 'text-white/70'}`}>{s.client}</div>
              <p className={`mt-2 max-w-[90%] text-[0.8rem] leading-snug opacity-0 transition-all duration-500 group-hover:opacity-100 ${s.bg === 'soft' ? 'text-ink-soft' : 'text-white/65'} translate-y-2 group-hover:translate-y-0`}>
                {s.desc}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* controls */}
      <div className="mx-auto mt-8 flex max-w-[1500px] items-center justify-between px-6 md:px-10">
        <div className="h-px w-full max-w-md bg-line">
          <div className="h-px bg-ink transition-[width] duration-150" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-1)} aria-label="Précédent" className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-surface">←</button>
          <button onClick={() => scrollBy(1)} aria-label="Suivant" className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-surface">→</button>
        </div>
      </div>
    </section>
  )
}

function CardBg({ study }: { study: Study }) {
  if (study.image)
    return (
      <>
        <img src={study.image} alt={study.client} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-night/30" />
      </>
    )
  if (study.bg === 'lav') return <div className="absolute inset-0 bg-gradient-to-br from-[#b9a8dd] to-[#8f7bc4]" />
  if (study.bg === 'soft') return <div className="absolute inset-0 lav-gradient-soft grain" />
  return (
    <div className="absolute inset-0 bg-night dotgrid-light">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(176,159,214,0.22),transparent_60%)]" />
    </div>
  )
}
