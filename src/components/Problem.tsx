import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Reveal, RevealWords } from './ui/Reveal'

const PROBLEMS = [
  {
    num: '01',
    title: 'Site web obsolète qui ne convertit pas',
    desc: "Lent, pas mobile, sans appel à l’action clair — vos visiteurs partent en quelques secondes.",
    icon: '⚠',
    color: 'from-accent/30 to-accent-2/10',
    border: 'rgba(255,0,85,0.3)',
    glow: 'rgba(255,0,85,0.15)',
  },
  {
    num: '02',
    title: 'Branding qui ne parle pas à la jeunesse caraïbéenne',
    desc: 'Une identité générique qui ne crée aucune connexion émotionnelle avec votre marché local.',
    icon: '◈',
    color: 'from-secondary/30 to-primary/10',
    border: 'rgba(112,0,255,0.3)',
    glow: 'rgba(112,0,255,0.15)',
  },
  {
    num: '03',
    title: 'Copywriting qui ne vend pas',
    desc: "Des textes plats qui décrivent au lieu de convaincre, et qui ne déclenchent jamais l'achat.",
    icon: '✍',
    color: 'from-primary/30 to-secondary/10',
    border: 'rgba(0,240,255,0.3)',
    glow: 'rgba(0,240,255,0.15)',
  },
]

function SpotlightCard({
  p,
  i,
}: {
  p: (typeof PROBLEMS)[number]
  i: number
}) {
  const cardRef = useRef<HTMLLIElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current!.style.setProperty('--x', `${x}%`)
    cardRef.current!.style.setProperty('--y', `${y}%`)
  }

  return (
    <motion.li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="spotlight group relative overflow-hidden rounded-2xl p-6"
      style={{
        background: `linear-gradient(135deg, rgba(14,14,26,0.95), rgba(14,14,26,0.8))`,
        border: `1px solid ${p.border}`,
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
      }}
      whileHover={{ boxShadow: `0 0 40px ${p.glow}` }}
    >
      {/* Spotlight hover effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), ${p.glow}, transparent 60%)`,
        }}
      />

      <div className="relative flex gap-5">
        {/* Number + icon */}
        <div className="flex flex-col items-center gap-2">
          <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-xl font-bold text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            {p.icon}
          </span>
          <span className="font-display text-xs font-bold tabular-nums text-muted-text/50">{p.num}</span>
        </div>

        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold leading-tight text-light-text transition-colors group-hover:text-white">
            {p.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-text">{p.desc}</p>
        </div>
      </div>
    </motion.li>
  )
}

export function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden px-6 py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,0,85,0.5), transparent 60%)', filter: 'blur(80px)' }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — text */}
          <div>
            <Reveal>
              <span className="pill">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Le constat
              </span>
            </Reveal>

            <div className="mt-6">
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                <RevealWords
                  text="Les PME haïtiennes perdent"
                  delay={0.05}
                />
                {' '}
                <span className="text-gradient-accent">
                  <RevealWords text="70 % de clients" delay={0.25} />
                </span>
                {' '}
                <RevealWords text="à cause de…" delay={0.45} />
              </h2>
            </div>

            <ul className="mt-10 space-y-4">
              {PROBLEMS.map((p, i) => (
                <SpotlightCard key={p.title} p={p} i={i} />
              ))}
            </ul>
          </div>

          {/* Right — visual stat card */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-dark-surface p-1">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl opacity-60 animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(0,240,255,0.4), rgba(112,0,255,0.4), rgba(255,0,85,0.3), rgba(0,240,255,0.4))',
                  filter: 'blur(2px)',
                }}
              />
              <div className="relative overflow-hidden rounded-[20px] bg-dark-surface p-8">
                <div className="bg-grid-fine absolute inset-0 opacity-40" />

                {/* Central visual */}
                <div className="relative flex flex-col items-center gap-8 py-4">
                  {/* Before / after row */}
                  <div className="flex w-full items-stretch gap-4">
                    {/* Before */}
                    <div className="flex-1 rounded-2xl border border-accent/20 bg-accent/5 p-5 text-center">
                      <div className="mb-3 text-4xl grayscale">😟</div>
                      <p className="font-display text-sm font-semibold text-accent/80">Avant</p>
                      <p className="mt-1 text-xs text-muted-text">Site obsolète · 0 leads</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                      <motion.div
                        animate={{ x: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-2xl text-primary"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* After */}
                    <div className="flex-1 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center">
                      <div className="mb-3 text-4xl">😎</div>
                      <p className="font-display text-sm font-semibold text-primary">Après</p>
                      <p className="mt-1 text-xs text-muted-text">Site IA · +320% leads</p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid w-full grid-cols-3 gap-3">
                    {[
                      { val: '48h', label: 'Livraison' },
                      { val: '5★', label: 'Satisfaction' },
                      { val: '30j', label: 'Garantie' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                        <span className="font-display text-xl font-bold text-gradient">{s.val}</span>
                        <p className="mt-0.5 text-xs text-muted-text">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="w-full rounded-2xl border border-white/8 bg-white/3 p-4">
                    <p className="text-sm leading-relaxed text-muted-text italic">
                      "Notre site a doublé les réservations en un mois. Mirvorra a tout compris."
                    </p>
                    <p className="mt-3 text-xs font-semibold text-primary">— Marie-Lourdes · Lakay Resto</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
