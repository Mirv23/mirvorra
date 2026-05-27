import { Suspense, lazy, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from './ui/MagneticButton'

const HeroParticles = lazy(() => import('./HeroParticles'))

const LOGO = 'MIRVORRA'
const STATS = [
  { value: '+320%', label: 'leads générés' },
  { value: '48h', label: 'délai de livraison' },
  { value: '100%', label: 'satisfait ou remboursé' },
]

export function Hero({ playing }: { playing: boolean }) {
  const root = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playing) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(['.hero-letter', '.hero-sub > *', '.hero-glow', '.scroll-cue', '.hero-stat'], {
          opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Orbs appear
      tl.fromTo('.hero-orb',
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, duration: 1.8, stagger: 0.2, ease: 'power2.out' },
      )

      // Glow ignites
      tl.fromTo('.hero-glow',
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
        '-=1.6',
      )

      // Letters flip up 3D
      tl.fromTo('.hero-letter',
        { yPercent: 140, opacity: 0, rotateX: -95, filter: 'blur(14px)', scale: 1.4 },
        { yPercent: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', scale: 1, duration: 1.3, stagger: 0.07 },
        '-=1.0',
      )

      // Glare sweep
      tl.fromTo('.hero-glare',
        { xPercent: -130 },
        { xPercent: 130, duration: 1.1, ease: 'power2.inOut' },
        '-=0.5',
      )

      // Sub content rises
      tl.from('.hero-sub > *',
        { y: 48, opacity: 0, duration: 0.9, stagger: 0.1 },
        '-=0.7',
      )

      // Stats slide in from bottom
      tl.from('.hero-stat',
        { y: 30, opacity: 0, duration: 0.7, stagger: 0.08 },
        '-=0.5',
      )

      tl.from('.scroll-cue', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')

      // Continuous float
      tl.to(logoRef.current, {
        y: -10, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
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
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#06060e_80%)]" />
      </div>

      {/* Noise overlay */}
      <div className="noise pointer-events-none absolute inset-0 -z-10" />

      {/* Drifting orbs */}
      <div
        className="hero-orb orb animate-orb-drift left-[8%] top-[18%] h-[35vw] w-[35vw] max-h-[500px] max-w-[500px] opacity-0"
        style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.5) 0%, transparent 65%)' }}
      />
      <div
        className="hero-orb orb animate-orb-drift right-[6%] top-[28%] h-[28vw] w-[28vw] max-h-[400px] max-w-[400px] opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.35) 0%, transparent 65%)',
          animationDelay: '3s',
        }}
      />
      <div
        className="hero-orb orb animate-orb-drift bottom-[10%] left-[25%] h-[22vw] w-[22vw] max-h-[320px] max-w-[320px] opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,85,0.25) 0%, transparent 65%)',
          animationDelay: '6s',
        }}
      />

      {/* Main glow */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-[42%] -z-[5] h-[50vh] w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.3) 0%, rgba(112,0,255,0.25) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Eyebrow tag */}
      <div className="hero-sub mb-6">
        <span className="pill animate-border-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Agence IA · Caraïbes
        </span>
      </div>

      {/* THE LOGO */}
      <div ref={logoRef} className="relative" style={{ perspective: 1000 }}>
        <h1 className="sr-only">Mirvorra — Agence IA de branding et sites web pour les Caraïbes</h1>
        <div
          aria-hidden="true"
          className="logo-glare relative flex font-display font-bold leading-none tracking-[-0.02em]"
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
          <span
            className="hero-glare pointer-events-none absolute inset-y-0 -left-1/4 w-1/2"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 50%, rgba(0,240,255,0.4) 54%, transparent 72%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

      {/* Supporting copy + CTAs */}
      <div className="hero-sub mt-6 flex max-w-3xl flex-col items-center gap-5">
        <p className="font-display text-2xl font-medium tracking-tight text-light-text md:text-4xl">
          On transforme les <span className="text-gradient">PME caraïbes</span> en machines à vendre
        </p>
        <p className="max-w-xl text-base text-muted-text md:text-lg leading-relaxed">
          Branding · Copywriting · Sites web dopés à l'IA · Chatbot WhatsApp
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="#contact" variant="primary">
            Obtenir mon audit gratuit
          </MagneticButton>
          <MagneticButton href="#cases" variant="outline">
            Voir nos travaux →
          </MagneticButton>
        </div>
      </div>

      {/* Social proof stats */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-px">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`hero-stat flex flex-col items-center px-8 py-4 opacity-0 ${
              i < STATS.length - 1 ? 'border-r border-white/10' : ''
            }`}
          >
            <span className="font-display text-2xl font-bold text-gradient md:text-3xl">{s.value}</span>
            <span className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-text">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#problem"
        className="scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-text group"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs uppercase tracking-[0.2em] transition-colors group-hover:text-primary">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 p-1 transition-colors group-hover:border-primary/50">
          <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </span>
      </a>
    </section>
  )
}
