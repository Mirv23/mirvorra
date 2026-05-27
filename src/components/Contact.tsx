import { WordReveal } from './ui/Reveal'

export function Contact() {
  return (
    <>
      <section id="contact" className="relative flex min-h-[88vh] items-end overflow-hidden">
        {/* dusk gradient backdrop (cool → warm), evoking the reference photo */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,#8fa0b8_0%,#b6a9bd_42%,#d9b79b_72%,#e6c4a6_100%)]" />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />

        <span className="pill-ghost pill-ghost-dark absolute left-6 top-28 md:left-10">
          ✦ Contact
        </span>

        <div className="relative z-10 w-full px-6 pb-16 md:px-10">
          <h2 className="max-w-4xl text-[clamp(2rem,5.5vw,4.6rem)] font-medium leading-[1.04] text-white">
            <WordReveal text="Transformer l'incertitude en structure," />{' '}
            <WordReveal text="et la structure en croissance." className="dim-dark" delay={0.4} />
          </h2>
          <a href="mailto:bonjour@mirvorra.com" className="pill-btn mt-9">
            Nous contacter <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <footer className="bg-night text-white">
        <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-10">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 font-medium tracking-tight">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M12 3C8.5 6 7 9 7 12c0 3.5 2.2 6 5 6s5-2.5 5-6c0-3-1.5-6-5-9Z" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M12 3v15" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Mirvorra
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
                Agence IA &amp; Données pour les PME des Caraïbes.
              </p>
            </div>

            <FooterCol title="Services" links={['Stratégie IA', 'Sites web', 'Branding', 'Automatisation']} />
            <FooterCol title="Société" links={['À propos', 'Approche', 'Études de cas', 'FAQ']} />
            <div>
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/40">Contact</div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                <li><a href="mailto:bonjour@mirvorra.com" className="transition-colors hover:text-white">bonjour@mirvorra.com</a></li>
                <li>Les Cayes · Haïti</li>
                <li className="flex gap-4 pt-1 text-white/45">
                  <a href="#" className="transition-colors hover:text-white">IG</a>
                  <a href="#" className="transition-colors hover:text-white">in</a>
                  <a href="#" className="transition-colors hover:text-white">WA</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Mirvorra. Tous droits réservés.</span>
            <span>Conçu pour la valeur, bâti pour l'impact.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/40">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm text-white/65">
        {links.map((l) => (
          <li key={l}><a href="#" className="transition-colors hover:text-white">{l}</a></li>
        ))}
      </ul>
    </div>
  )
}
