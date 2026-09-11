import Image from "next/image"
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Instagram,
  MessageCircle,
} from "lucide-react"

import { ButtonLink } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { SectionHeading } from "../ui/SectionHeading"

const MAPS_URL = "https://www.google.com/maps?q=41.456444,13.034333"

const openingHours = [
  { days: "Lunedì — Venerdì", hours: "9:00 – 18:00" },
  { days: "Sabato", hours: "10:00 – 16:00" },
  { days: "Domenica", hours: "Chiuso", closed: true },
]

export default function Where() {
  return (
    <section id="contacts" className="relative overflow-hidden border-t border-ink-line bg-bone-50 py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-8 h-80 w-80 opacity-[0.09]">
        <Image src="/images/rametto.png" alt="" fill className="scale-x-[-1] object-contain" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-24 hidden h-80 w-80 opacity-[0.08] md:block">
        <Image src="/images/rametto.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dove trovarci"
          title={
            <>
              Vieni a vedere <span className="italic text-olive">l&apos;uliveto</span>
            </>
          }
          description="Siamo nella provincia di Latina, a Bocca di Fiume. Passa a trovarci per una degustazione o per ritirare il tuo ordine direttamente in azienda."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* ---- Map ---------------------------------------------------- */}
          <Reveal className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-ink-line lg:min-h-full">
            <iframe
              title="Mappa della sede OsFlumen a Bocca di Fiume, Latina"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.019447161387!2d13.032666715770046!3d41.45644597925789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI3JzIzLjIiTiAxM8KwMDInMDMuNiJF!5e0!3m2!1sit!2sit!4v1625147200000!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale transition-[filter] duration-500
                         ease-smooth group-hover:grayscale-0 group-focus-within:grayscale-0"
            />

            <ButtonLink
              href={MAPS_URL}
              external
              className="absolute bottom-5 left-5 z-10 shadow-lift"
            >
              Apri in Google Maps
              <Navigation className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </Reveal>

          {/* ---- Contact details ---------------------------------------- */}
          <div className="grid gap-6">
            {/* Address */}
            <Reveal delay={90}>
              <div className="rounded-2xl border border-ink-line bg-bone-100 p-7">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                                   border border-ink-line bg-bone-50 text-olive">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">Indirizzo</h3>
                    <address className="mt-2 not-italic leading-relaxed text-ink-soft">
                      Via Migliara 45, Bocca di Fiume
                      <br />
                      04100 Latina (LT), Italia
                    </address>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Opening hours */}
            <Reveal delay={180}>
              <div className="rounded-2xl border border-ink-line bg-bone-100 p-7">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                                   border border-ink-line bg-bone-50 text-olive">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-ink">Orari di apertura</h3>
                    <dl className="mt-3 space-y-2 text-sm">
                      {openingHours.map(({ days, hours, closed }) => (
                        <div
                          key={days}
                          className="flex items-baseline justify-between gap-4 border-b
                                     border-ink-line/70 pb-2 last:border-0 last:pb-0"
                        >
                          <dt className="text-ink-soft">{days}</dt>
                          <dd
                            className={
                              closed ? "text-ink-muted/70" : "font-medium text-ink"
                            }
                          >
                            {hours}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contacts */}
            <Reveal delay={270}>
              <div className="rounded-2xl border border-ink-line bg-bone-100 p-7">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                                   border border-ink-line bg-bone-50 text-olive">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-ink">Contatti</h3>
                    <p className="mt-2 text-sm text-ink-muted">Massimo Orsini</p>

                    <div className="mt-3 space-y-2">
                      <a
                        href="tel:+393319656784"
                        className="flex items-center gap-2.5 text-ink-soft transition-colors hover:text-olive"
                      >
                        <Phone className="h-4 w-4 text-brass" aria-hidden />
                        +39 331 965 6784
                      </a>
                      <a
                        href="mailto:info@osflumen.com"
                        className="flex items-center gap-2.5 text-ink-soft transition-colors hover:text-olive"
                      >
                        <Mail className="h-4 w-4 text-brass" aria-hidden />
                        info@osflumen.com
                      </a>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <ButtonLink href="https://wa.me/393319656784" external>
                        <MessageCircle className="h-4 w-4" aria-hidden />
                        WhatsApp
                      </ButtonLink>
                      <a
                        href="https://www.instagram.com/osflumen"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Seguici su Instagram"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full
                                   border border-ink/20 text-ink transition-all duration-300
                                   ease-smooth hover:border-ink hover:bg-ink hover:text-bone-50"
                      >
                        <Instagram className="h-4 w-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
