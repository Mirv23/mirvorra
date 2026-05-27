import { Suspense, lazy, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from './ui/MagneticButton'

const HeroParticles = lazy(() => import('./HeroParticles'))

const LOGO = 'MIRVORRA'

export function Hero({ playing }: { playing: boolean }) {
  const root = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playing) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(['.hero-letter', '.hero-sub > *', '.hero-glow', '.scroll-cue'], {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // 1 — Glow ignites behind the wordmark
      tl.fromTo(
        '.hero-glow',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
      )

      // 2 — THE logo entrance: each letter flips up in 3D, blurred -> sharp
      tl.fromTo(
        '.hero-letter',
        { yPercent: 140, opacity: 0, rotateX: -95, filter: 'blur(14px)', scale: 1.4 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.3,
          stagger: 0.07,
        },
        '-=0.9',
      )

      // 3 — Glare sweep across the freshly-revealed letters
      tl.fromTo(
        '.hero-glare',
        { xPercent: -130 },
        { xPercent: 130, duration: 1.1, ease: 'power2.inOut' },
        '-=0.5',
      )

      // 4 — Supporting headline + subtitle + CTAs rise in
      tl.from(
        '.hero-sub > *',
        { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 },
        '-=0.7',
      )

      tl.from('.scroll-cue', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')

      // 5 — Logo keeps a slow living float after it lands
      tl.to(logoRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, root)

    return () => ctx.revert()
  }, [playing])

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* 3D particle field */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0F_85%)]" />
      </div>

      {/* Glow behind the wordmark */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-[42%] -z-[5] h-[40vh] w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,240,255,0.45) 0%, rgba(112,0,255,0.35) 45%, transparent 70%)',
        }}
      />

      {/* THE LOGO */}
      <div ref={logoRef} className="relative" style={{ perspective: 900 }}>
        <h1 className="sr-only">Mirvorra — Agence IA de branding et sites web pour les Caraïbes</h1>
        <div
          aria-hidden="true"
          className="logo-glare relative flex font-display font-bold leading-none tracking-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {LOGO.split('').map((ch, i) => (
            <span
              key={i}
              className="hero-letter text-gradient inline-block text-[clamp(3.5rem,16vw,13rem)]"
              style={{ transformOrigin: 'bottom center', willChange: 'transform' }}
            >
              {ch}
            </span>
          ))}
          {/* sweeping glare overlay */}
          <span
            className="hero-glare pointer-events-none absolute inset-y-0 -left-1/4 w-1/2"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 50%, rgba(0,240,255,0.4) 54%, transparent 72%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

      {/* Supporting copy + CTAs */}
      <div className="hero-sub mt-8 flex max-w-3xl flex-col items-center gap-6">
        <p className="font-display text-2xl font-medium tracking-tight text-light-text md:text-4xl">
          L'agence IA qui transforme les <span className="text-gradient">PME caraïbes</span>
        </p>
        <p className="max-w-xl text-base text-muted-text md:text-lg">
          Branding + Copywriting + Sites web qui vendent automatiquement.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="#contact" variant="primary">
            Obtenir mon audit gratuit
          </MagneticButton>
          <MagneticButton href="#cases" variant="outline">
            Voir nos travaux
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#problem"
        className="scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-text"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </span>
      </a>
    </section>
  )
}
