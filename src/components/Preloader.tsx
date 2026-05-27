import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onComplete, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-night text-white"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
          <motion.path
            d="M12 3C8.5 6 7 9 7 12c0 3.5 2.2 6 5 6s5-2.5 5-6c0-3-1.5-6-5-9Z"
            stroke="currentColor" strokeWidth="1.2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }}
          />
          <motion.path
            d="M12 3v15" stroke="currentColor" strokeWidth="1.2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.2 }}
          />
        </svg>
        <span className="text-lg font-medium tracking-tight">Mirvorra</span>
      </motion.div>

      <div className="absolute bottom-10 right-10 text-sm tabular-nums text-white/40">
        {String(count).padStart(3, '0')}
      </div>
    </motion.div>
  )
}
