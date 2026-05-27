import { motion } from 'framer-motion'
import { ParticleField } from './ui/ParticleField'

const NAME = 'MIRVORRA'

export function BrandReel({ onClose }: { onClose: () => void }) {
  const letters = NAME.split('')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-night"
    >
      <ParticleField variant="orbit" tone="lav" density={1.2} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,159,214,0.18),transparent_55%)]" />

      {/* central mark */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <svg viewBox="0 0 24 24" className="h-14 w-14 text-white" fill="none" aria-hidden="true">
          <path d="M12 3C8.5 6 7 9 7 12c0 3.5 2.2 6 5 6s5-2.5 5-6c0-3-1.5-6-5-9Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 3v15" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </motion.div>

      {/* brand name arranged on a circle */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[1px] w-[1px]">
          {letters.map((ch, i) => {
            const angle = (i / letters.length) * Math.PI * 2 - Math.PI / 2
            const r = 168
            const x = Math.cos(angle) * r
            const y = Math.sin(angle) * r
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-sm font-medium tracking-[0.2em] text-white"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {ch}
              </motion.span>
            )
          })}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute bottom-[16%] left-1/2 -translate-x-1/2 text-center text-sm tracking-tight text-white/55"
      >
        L'intelligence au service des PME caraïbes.
      </motion.p>

      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute bottom-8 right-8 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105 md:right-14"
      >
        <span className="flex gap-[3px]">
          <span className="block h-3 w-[3px] bg-ink" />
          <span className="block h-3 w-[3px] bg-ink" />
        </span>
      </button>
    </motion.div>
  )
}
