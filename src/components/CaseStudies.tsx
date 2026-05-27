import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  client: string
  sector: string
  stat: { value: number; suffix: string; label: string }
  gradient: string
  image?: string
}

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DVGvsuhUBCqdq2LgAfQjiKbvtX'

const PROJECTS: Project[] = [
  {
    client: 'Lakay Resto',
    sector: 'Restaurant · Pétion-Ville',
    stat: { value: 320, suffix: '%', label: 'de leads en plus' },
    gradient: 'from-primary to-secondary',
    image: `${CDN}/hf_20260527_201747_5751f9bb-56d6-4a58-b184-52fa1f4fbc2b.png`,
  },
  {
    client: 'Clinique Soleil',
    sector: 'Santé · Cap-Haïtien',
    stat: { value: 60, suffix: '%', label: 'de temps gagné' },
    gradient: 'from-secondary to-accent',
    image: `${CDN}/hf_20260527_201749_f1a7a325-ef7f-47df-980b-da058d8ed09b.png`,
  },
  {
    client: 'École Avenir',
    sector: 'Éducation · Port-au-Prince',
    stat: { value: 45, suffix: '%', label: 'de conversion' },
    gradient: 'from-accent to-accent-2',
  },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref} className="tabular-nums">
      +{val}
      {suffix}
    </span>
  )
}

export function CaseStudies() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          if (reduce || !track.current) return
          const distance = track.current.scrollWidth - window.innerWidth
          gsap.to(track.current, {
            x: -distance,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${distance}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          })
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cases" ref={root} className="relative overflow-hidden py-32 lg:py-0">
      <div className="lg:flex lg:h-screen lg:items-center">
        <div
          ref={track}
          className="flex flex-col gap-8 px-6 lg:flex-row lg:gap-12 lg:px-[8vw] lg:will-change-transform"
        >
          {/* Intro panel */}
          <div className="flex w-full flex-none flex-col justify-center lg:w-[36vw]">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Études de cas
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Des résultats <span className="text-gradient">mesurables</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted-text">
              Trois PME haïtiennes, trois transformations. Faites défiler pour explorer.
            </p>
          </div>

          {PROJECTS.map((p) => (
            <article
              key={p.client}
              className="group flex w-full flex-none flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-dark-surface p-6 transition-colors duration-500 hover:border-primary/30 lg:w-[34vw] lg:p-8"
            >
              {/* Visual: real generated mockup, else gradient placeholder */}
              <div className="relative mb-8 h-52 overflow-hidden rounded-2xl border border-white/5">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`Aperçu du site ${p.client}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`flex h-full items-center justify-center bg-gradient-to-br ${p.gradient}`}>
                    <span className="font-display text-2xl font-bold text-white/90">{p.client}</span>
                  </div>
                )}
                {/* gradient veil for legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-surface/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-dark-bg/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {p.sector}
                </span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight">{p.client}</h3>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-gradient font-display text-5xl font-extrabold">
                    <Counter to={p.stat.value} suffix={p.stat.suffix} />
                  </span>
                  <span className="text-sm text-muted-text">{p.stat.label}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
