type Props = {
  items: string[]
  className?: string
}

export function Marquee({ items, className = '' }: Props) {
  return (
    <div className={`marquee-pause relative w-full overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it) => (
              <li
                key={it}
                className="flex shrink-0 items-center px-9 text-[0.95rem] font-medium tracking-tight text-ink-faint transition-colors hover:text-ink-soft"
              >
                {it}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
    </div>
  )
}
