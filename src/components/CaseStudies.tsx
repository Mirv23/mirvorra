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
}

const PROJECTS: Project[] = [
  {
    client: 'Lakay Resto',
    sector: 'Restaurant · Pétion-Ville',
    stat: { value: 320, suffix: '%', label: 'de leads en plus' },
    gradient: 'from-primary to-secondary',
  },
  {
    client: 'Clinique Soleil',
    sector: 'Santé · Cap-Haïtien',
    stat: { value: 60, suffix: '%', label: 'de temps gagné' },
    gradient: 'from-secondary to-accent',
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
              className="flex w-full flex-none flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-dark-surface p-8 lg:w-[34vw]"
            >
              <div className={`mb-8 h-44 rounded-2xl bg-gradient-to-br ${p.gradient} opacity-90`}>
                <div className="flex h-full items-center justify-center font-display text-2xl font-bold text-white/90">
                  {p.client}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-text">{p.sector}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{p.client}</h3>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text font-display text-5xl font-bold text-transparent">
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
