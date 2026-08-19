import { useI18n } from '../lib/i18n'
import { RevealText } from './ui/Text'
import { Magnetic } from './ui/Magnetic'

export function Contact() {
  const { t } = useI18n()

  return (
    <>
      <section id="contact" className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden bg-void px-5 py-28 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.15),rgba(53,214,240,0.06)_45%,transparent_70%)] blur-2xl" />

        <span className="eyebrow relative">{t.contact.eyebrow}</span>
        <h2 className="display-h relative mt-6 text-[clamp(2.4rem,8vw,7rem)] leading-[1.1]">
          <RevealText text={t.contact.titleA} />
          <br />
          <span className="grad-chars">
            <RevealText text={t.contact.titleB} delay={0.15} />
          </span>
        </h2>
        <p className="relative mt-6 max-w-md text-[0.92rem] leading-relaxed text-mist">{t.contact.sub}</p>

        <Magnetic strength={0.25} className="relative mt-12">
          <a
            href={`mailto:${t.nav.email}`}
            data-cursor="✦"
            className="group relative flex h-48 w-48 items-center justify-center rounded-full border border-line2 bg-panel/50 backdrop-blur-sm transition-colors duration-500 hover:border-violet md:h-60 md:w-60"
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] opacity-60" aria-hidden="true">
              <defs>
                <path id="ctring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" fill="none" />
              </defs>
              <text fill="rgba(240,240,250,0.55)" style={{ fontSize: 9.5, letterSpacing: '0.22em', fontFamily: "'JetBrains Mono','Noto Sans Devanagari',monospace" }}>
                <textPath href="#ctring">{t.contact.ring}</textPath>
              </text>
            </svg>
            <span className="flex flex-col items-center gap-1.5 px-6">
              <span className="text-base font-semibold tracking-tight md:text-lg">{t.contact.btn}</span>
              <span className="grad-text text-2xl transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </a>
        </Magnetic>
      </section>

      <footer className="relative overflow-hidden border-t border-line bg-void">
        <div className="container-x grid grid-cols-2 gap-10 py-14 md:grid-cols-4 md:py-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-[1.02rem] font-bold tracking-tight">
              NIRMAAN<span className="grad-text">.</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">{t.footer.blurb}</p>
          </div>

          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">{t.footer.colNav}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-mist">
              {t.nav.links.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-snow">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">{t.footer.colServices}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-mist">
              {t.footer.servicesLinks.map((l) => (
                <li key={l}>
                  <a href="#services" className="transition-colors hover:text-snow">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">{t.footer.colContact}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-mist">
              <li>
                <a href={`mailto:${t.nav.email}`} className="transition-colors hover:text-snow">
                  {t.nav.email}
                </a>
              </li>
              <li>{t.nav.location}</li>
              <li className="flex gap-4 pt-1 text-fog">
                <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-snow">in</a>
                <a href="#" aria-label="GitHub" className="transition-colors hover:text-snow">GH</a>
                <a href="#" aria-label="X" className="transition-colors hover:text-snow">X</a>
              </li>
            </ul>
          </div>
        </div>

        {/* giant outlined wordmark — chars rise on scroll, fill on hover */}
        <div className="container-x">
          <div className="wordmark select-none overflow-hidden whitespace-nowrap text-center font-display text-[clamp(3.2rem,13.5vw,13rem)] font-bold leading-[0.95] tracking-[-0.02em]">
            <RevealText text="NIRMAAN" by="chars" stagger={0.05} />
          </div>
        </div>

        <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fog md:flex-row">
          <span>© {new Date().getFullYear()} {t.footer.brand} — {t.footer.rights}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </footer>
    </>
  )
}
