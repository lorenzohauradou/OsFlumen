"use client"

import { CHAPTERS, type ChapterId } from "@/lib/scrollState"
import { scrollTo } from "@/lib/smoothScroll"

interface Props {
  active: ChapterId
}

/** Vertical chapter index, docked to the right edge on larger screens. */
export function ChapterDots({ active }: Props) {
  return (
    <nav aria-label="Avanzamento" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 md:block lg:right-8">
      <ol className="flex flex-col items-end gap-3">
        {CHAPTERS.map((c) => {
          const isActive = c.id === active
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(`#${c.id}`)
                }}
                aria-current={isActive ? "step" : undefined}
                className="group flex items-center gap-3"
                style={{ color: "var(--fg)" }}
              >
                <span
                  className="ui-strong translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ opacity: isActive ? 0.9 : undefined, transform: isActive ? "none" : undefined }}
                >
                  {c.label}
                </span>
                <span
                  className="block h-px rounded-full bg-current transition-all duration-500"
                  style={{ width: isActive ? 28 : 12, opacity: isActive ? 1 : 0.35 }}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
