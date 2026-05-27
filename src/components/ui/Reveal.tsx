import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, y = 28, className = '', once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Signature headline animation: each word fades up from blurred → sharp,
 * staggered left-to-right. Pass words as plain text; wrap a trailing phrase in
 * <span className="dim"> for the dimmed-tail effect seen in the reference.
 */
export function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: '0.42em', filter: 'blur(10px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
