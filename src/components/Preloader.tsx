import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/anim'
import { lenisStore } from '../lib/useLenis'
import { useI18n } from '../lib/i18n'

const WORD = 'NIRMAAN'

/** Boot sequence: wordmark chars rise in, counter runs 000→100, curtain lifts. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  const { t } = useI18n()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const chars = root.querySelectorAll<HTMLElement>('[data-l]')
    const num = root.querySelector<HTMLElement>('[data-num]')
    const bar = root.querySelector<HTMLElement>('[data-bar]')
    if (!num || !bar) return

    lenisStore.i?.stop()
    const obj = { v: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true)
        lenisStore.i?.start()
      },
    })

    tl.fromTo(chars, { yPercent: 120 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.055 }, 0.15)
      .to(
        obj,
        {
          v: 100,
          duration: 1.9,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(obj.v)).padStart(3, '0')
          },
        },
        0.1,
      )
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0.1)
      .to(chars, { yPercent: -130, duration: 0.7, ease: 'expo.in', stagger: 0.04 }, '+=0.15')
      .to([num, bar], { opacity: 0, duration: 0.4 }, '<')
      .add(() => onDone(), '-=0.1')
      .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' })

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      aria-hidden="true"
    >
      <div className="font-display text-[clamp(2.6rem,10vw,7.5rem)] font-bold tracking-[-0.02em]">
        {WORD.split('').map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-top">
            <span data-l className="inline-block will-change-transform">
              {c}
            </span>
          </span>
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-10 sm:inset-x-6 md:inset-x-10">
        <div className="flex items-end justify-between font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fog">
          <span>{t.preloader.tag}</span>
          <span data-num className="text-2xl normal-case tracking-normal text-snow">
            000
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-line">
          <div data-bar className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-silver via-steel to-chrome" />
        </div>
      </div>
    </div>
  )
}
