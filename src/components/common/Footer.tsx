"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Instagram, Facebook, MessageCircle } from "lucide-react"
import { useState, type FormEvent } from "react"

import { Input } from "../ui/Input"

const SECTIONS = [
  { href: "#products", label: "Prodotti" },
  { href: "#caratteristiche", label: "Caratteristiche" },
  { href: "#about", label: "Storia" },
  { href: "#reviews", label: "Recensioni" },
  { href: "#contacts", label: "Contatti" },
]

const SOCIALS = [
  { href: "https://www.instagram.com/osflumen", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/osflumen", label: "Facebook", Icon: Facebook },
  { href: "https://wa.me/393319656784", label: "WhatsApp", Icon: MessageCircle },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  // No newsletter backend is wired up yet — this only acknowledges the input.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail("")
  }

  return (
    <footer className="bg-ink text-bone-100">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* ---- Newsletter --------------------------------------------- */}
        <div className="grid gap-10 py-16 lg:grid-cols-2 lg:items-end lg:gap-20 lg:py-20">
          <div>
            <span className="eyebrow text-bone-100/55 before:bg-brass">Newsletter</span>
            <h2 className="mt-5 text-[1.8rem] leading-[1.15] tracking-tightest text-bone-50 sm:text-[2.2rem] lg:text-[2.6rem]">
              Raccolto, novità
              <br />
              e <span className="italic text-brass-light">degustazioni</span>
            </h2>
          </div>

          <div>
            <p className="text-bone-100/70">
              Poche email all&apos;anno, solo quando c&apos;è qualcosa da
              raccontare: l&apos;apertura del nuovo raccolto e le giornate aperte
              in frantoio.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Il tuo indirizzo email
                </label>
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  tone="dark"
                  autoComplete="email"
                  placeholder="Il tuo indirizzo email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                aria-label="Iscriviti alla newsletter"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                           bg-bone-50 text-ink transition-colors duration-300 ease-smooth
                           hover:bg-brass-light"
              >
                {sent ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <ArrowRight className="h-4 w-4" aria-hidden />
                )}
              </button>
            </form>

            <p
              role="status"
              aria-live="polite"
              className={`mt-3 text-sm text-brass-light transition-opacity duration-300 ${
                sent ? "opacity-100" : "opacity-0"
              }`}
            >
              Grazie! Ti abbiamo aggiunto alla lista.
            </p>
          </div>
        </div>

        {/* ---- Main columns -------------------------------------------- */}
        <div className="grid gap-12 border-t border-bone-100/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" aria-label="OsFlumen">
              <Image
                src="/images/brandOSFLUMENmarroneRGB.png"
                alt="OsFlumen"
                width={4724}
                height={1380}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone-100/60">
              Olio extravergine di oliva biologico prodotto a Bocca di Fiume,
              nell&apos;agro pontino.
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h3 id="footer-nav" className="font-serif text-lg text-bone-50">
              Naviga
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SECTIONS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-bone-100/65 transition-colors hover:text-bone-50"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-serif text-lg text-bone-50">Contatti</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-bone-100/65">
              <li>
                <a href="tel:+393319656784" className="transition-colors hover:text-bone-50">
                  +39 331 965 6784
                </a>
              </li>
              <li>
                <a href="mailto:info@osflumen.com" className="transition-colors hover:text-bone-50">
                  info@osflumen.com
                </a>
              </li>
              <li>
                <address className="not-italic leading-relaxed">
                  Via Migliara 45, Bocca di Fiume
                  <br />
                  04100 Latina (LT), Italia
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-bone-50">Seguici</h3>
            <ul className="mt-4 flex gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full
                               border border-bone-100/20 text-bone-100/80 transition-all
                               duration-300 ease-smooth hover:border-bone-50 hover:bg-bone-50 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Legal ---------------------------------------------------- */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-bone-100/10
                        py-7 text-sm text-bone-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} OsFlumen. Tutti i diritti riservati.</p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-bone-50">
              Privacy Policy
            </Link>
            <span aria-hidden className="text-bone-100/25">·</span>
            <span>Design by Lorenzo Hauradou</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
