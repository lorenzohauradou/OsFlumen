"use client"

import Link from "next/link"

import { CHAPTERS, type ChapterId } from "@/lib/scrollState"
import { scrollTo } from "@/lib/smoothScroll"

interface Props {
  active: ChapterId
}

export function Nav({ active }: Props) {
  const links = CHAPTERS.filter((c) => c.id !== "hero")

  return (
    <header className="fixed inset-x-0 top-0 z-30 transition-colors duration-700" style={{ color: "var(--fg)" }}>
      <div className="flex h-[var(--header-h)] items-center justify-between px-5 sm:px-8 lg:px-[5.5rem]">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="ui-strong opacity-70 transition-opacity duration-300 hover:opacity-100"
            aria-label="Torna alla home"
          >
            ← Home
          </Link>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo("#hero")
            }}
            className="font-display text-[1.65rem] font-semibold leading-none tracking-tight"
            aria-label="Òs Flumen, torna all'inizio del capitolo"
          >
            Òs Flumen
          </a>
        </div>

        <nav aria-label="Capitoli" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(`#${c.id}`)
                  }}
                  aria-current={active === c.id ? "true" : undefined}
                  className="ui-strong relative py-1 transition-opacity duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:opacity-100 hover:after:scale-x-100 aria-[current=true]:after:scale-x-100"
                  style={{ opacity: active === c.id ? 1 : 0.62 }}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="https://wa.me/393319656784"
          target="_blank"
          rel="noopener noreferrer"
          className="pill"
        >
          Ordina
        </a>
      </div>
    </header>
  )
}
