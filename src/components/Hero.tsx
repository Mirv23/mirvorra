import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ParticleField } from './ui/ParticleField'
import { BrandReel } from './BrandReel'

export function Hero({ playing }: { playing: boolean }) {
  const [reel, setReel] = useState(false)

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-white"
    >
      {/* rising particle field */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]">
        <ParticleField variant="rising" tone="light" className="h-full w-full" />
      </div>

      {/* faint side light streaks */}
      <div className="pointer-events-none absolute left-[14%] top-1/2 h-[34vh] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute right-[14%] top-1/2 h-[34vh] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_42%,rgba(176,159,214,0.1),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={playing ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-4xl flex-col items-center"
      >
        <h1 className="font-medium tracking-[-0.03em] text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[1.03]">
          {playing && <WordLine text="Conçu pour la valeur," delay={0.35} />}
          <br />
          {playing && <WordLine text="bâti pour l'impact." delay={0.62} dimAfter={1} />}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={playing ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-white/55"
        >
          L'IA peut transformer votre PME — à condition de commencer au bon endroit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={playing ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <a href="#contact" className="pill-btn-light">
            Réserver mon audit IA
            <span className="arrow">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Play reel button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={playing ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 1.5 }}
        onClick={() => setReel(true)}
        className="group absolute bottom-10 right-8 z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm transition-colors hover:bg-white/10 md:right-14"
        aria-label="Voir la démo"
      >
        <span className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-white/80">
          <span className="block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white transition-transform group-hover:scale-110" />
          Démo
        </span>
      </motion.button>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={playing ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.2em]">Défiler</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>

      <AnimatePresence>{reel && <BrandReel onClose={() => setReel(false)} />}</AnimatePresence>
    </section>
  )
}

/* One animated headline line, with optional dimmed trailing words. */
function WordLine({ text, delay, dimAfter }: { text: string; delay: number; dimAfter?: number }) {
  const words = text.split(' ')
  return (
    <motion.span
      className="inline-block"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const dim = dimAfter !== undefined && i >= dimAfter && i < words.length - 1
        return (
          <span key={i} className="inline-block whitespace-nowrap" aria-hidden="true">
            <motion.span
              className={`inline-block ${dim ? 'dim-dark' : ''}`}
              variants={{
                hidden: { opacity: 0, y: '0.4em', filter: 'blur(12px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </motion.span>
  )
}
