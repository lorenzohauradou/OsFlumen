"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const TAVOLE = [
  {
    src: "/images/sezione-new/azienda2.jpg",
    alt: "I filari dell'azienda visti dall'alto, con le serre e la piana sullo sfondo",
    didascalia: "I filari corrono verso i Monti Lepini.",
  },
  {
    src: "/images/olive2.jpg",
    alt: "Olive verdi mature su un ramo, poco prima della raccolta",
    didascalia: "Leccino, pochi giorni prima della raccolta.",
  },
  {
    src: "/images/olive.jpg",
    alt: "La chioma di un ulivo carica di olive",
    didascalia: "Una pianta in piena carica, a fine estate.",
  },
  {
    src: "/images/sezione-new/azienda.jpg",
    alt: "L'azienda vista dall'alto, fra serre, uliveti e la piana pontina",
    didascalia: "Bocca di Fiume, dove il terreno finisce nella piana.",
  },
  {
    src: "/images/bottles.png",
    alt: "Due bottiglie di olio extravergine Òs Flumen da mezzo litro",
    didascalia: "Mezzo litro, vetro scuro, estratto a freddo.",
  },
]

/**
 * A dragged strip of photographs. It scrolls natively — trackpad, touch,
 * scrollbar, keyboard — and the two controls simply push it one plate along,
 * so nothing moves that the reader did not ask to move.
 */
export function Galleria() {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  // The plate nearest the left edge of the strip is the current one.
  const onScroll = useCallback(() => {
    const el = track.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    if (!first) return
    const step = first.offsetWidth + 24
    setIndex(Math.min(TAVOLE.length - 1, Math.round(el.scrollLeft / step)))
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [onScroll])

  const go = (direction: -1 | 1) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    el.scrollBy({ left: direction * (first.offsetWidth + 24), behavior: "smooth" })
  }

  return (
    <section
      aria-label="Fotografie dell'azienda"
      className="border-t border-[var(--rigo)] py-16 lg:py-20"
    >
      <div className="mb-8 flex items-end justify-between gap-6 px-6 lg:px-10">
        <h2 className="max-w-[18ch] text-[1.7rem] leading-[1.2] text-[var(--bruno)] sm:text-[2.1rem]">
          Il campo, la pianta, la bottiglia
        </h2>

        <div className="flex shrink-0 items-center gap-3">
          <span className="dato tabular-nums opacity-60">
            {index + 1} / {TAVOLE.length}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Foto precedente"
            className="cover-nav"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === TAVOLE.length - 1}
            aria-label="Foto successiva"
            className="cover-nav"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        tabIndex={0}
        className="cover-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scroll-px-6 px-6 pb-2 lg:scroll-px-10 lg:px-10"
      >
        {TAVOLE.map((tavola, i) => (
          <li
            key={tavola.src}
            aria-label={`${i + 1} di ${TAVOLE.length}`}
            className="w-[80vw] shrink-0 snap-start sm:w-[52vw] lg:w-[36rem]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--paper-deep)]">
              <Image
                src={tavola.src}
                alt={tavola.alt}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 52vw, 36rem"
                className="object-cover"
              />
            </div>
            <p className="dato mt-3.5 max-w-[36ch] leading-[1.7] opacity-70">
              {tavola.didascalia}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
