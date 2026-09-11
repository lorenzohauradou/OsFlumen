"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { Button, buttonStyles } from "../ui/Button"

const NAV = [
  { id: "hero", label: "Home" },
  { id: "products", label: "Prodotti" },
  { id: "caratteristiche", label: "Caratteristiche" },
  { id: "about", label: "Storia" },
  { id: "reviews", label: "Recensioni" },
  { id: "contacts", label: "Contatti" },
]

const EXPERIENCE_HREF = "/esperienza"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("hero")

  // Condense the bar once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scrollspy: the section occupying the upper third of the viewport wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
    )

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const goTo = useCallback((id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ block: "start" })
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth
        ${scrolled || open
          ? "border-b border-ink-line/70 bg-bone-50/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href="/"
          aria-label="OsFlumen — torna all'inizio"
          className="shrink-0"
          onClick={(e) => {
            e.preventDefault()
            goTo("hero")
          }}
        >
          <Image
            src="/images/brandOSFLUMENmarroneRGB.png"
            alt="OsFlumen"
            width={4724}
            height={1520}
            priority
            className={`w-auto transition-all duration-500 ease-smooth ${scrolled ? "h-6" : "h-7 sm:h-8"}`}
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Navigazione principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => goTo(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative py-1 text-[13px] uppercase tracking-[0.14em] transition-colors duration-300
                    after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left
                    after:scale-x-0 after:bg-brass after:transition-transform after:duration-300 after:ease-smooth
                    hover:after:scale-x-100
                    ${active === id
                      ? "text-ink after:scale-x-100"
                      : "text-ink-muted hover:text-ink"}`}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <Link
                href={EXPERIENCE_HREF}
                className="relative py-1 text-[13px] uppercase tracking-[0.14em] text-brass transition-colors duration-300 hover:text-ink"
              >
                Esperienza 3D
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => goTo("products")}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Acquista
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full
                       border border-ink/15 text-ink transition-colors hover:bg-ink/[.06] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-ink-line/70 bg-bone-50 transition-[max-height,opacity]
                    duration-500 ease-smooth lg:hidden
                    ${open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav aria-label="Navigazione mobile" className="px-6 py-6">
          <ul className="flex flex-col">
            {NAV.map(({ id, label }, i) => (
              <li key={id} className={i > 0 ? "border-t border-ink-line/60" : ""}>
                <button
                  onClick={() => goTo(id)}
                  className="flex w-full items-baseline gap-4 py-4 text-left font-serif text-2xl text-ink"
                >
                  <span className="font-sans text-[11px] tracking-widest text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </button>
              </li>
            ))}
            <li className="border-t border-ink-line/60">
              <Link
                href={EXPERIENCE_HREF}
                onClick={() => setOpen(false)}
                className="flex w-full items-baseline gap-4 py-4 text-left font-serif text-2xl text-brass"
              >
                <span className="font-sans text-[11px] tracking-widest text-brass">
                  {String(NAV.length + 1).padStart(2, "0")}
                </span>
                Esperienza 3D
              </Link>
            </li>
          </ul>

          <a
            href="tel:+393319656784"
            className={buttonStyles("primary", "md", "mt-6 w-full")}
          >
            Chiama +39 331 965 6784
          </a>
        </nav>
      </div>
    </header>
  )
}
