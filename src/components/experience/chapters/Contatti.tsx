import { Chapter } from "../Chapter"
import Image from "next/image"
import { SITE } from "@/content/site"

export function Contatti() {
  const year = new Date().getFullYear()
  return (
    <Chapter
      id="contatti"
      side="spread"
      label="Dove siamo"
      className="overflow-hidden"
      backdrop={
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 z-0 h-[28rem] w-[28rem] opacity-[0.08] invert lg:h-[40rem] lg:w-[40rem]">
          <Image src="/images/rametto.png" alt="" fill className="scale-x-[-1] object-contain" />
        </div>
      }
    >

      <div className="grid gap-12 lg:grid-cols-[minmax(0,30rem)_1fr]">
        <div>
          <p data-reveal className="ui mb-6">Dove siamo</p>
          <h2 data-reveal className="display">Vieni a vedere l&apos;uliveto.</h2>
          <p data-reveal className="lede mt-7">
            Siamo a Bocca di Fiume, in provincia di Latina. Passa per una degustazione o per ritirare
            il tuo ordine direttamente in azienda.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="pill">
              Scrivici su WhatsApp
            </a>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">
              Apri in Google Maps
            </a>
          </div>
        </div>

        <dl className="grid content-end gap-x-10 gap-y-7 sm:grid-cols-2 lg:max-w-[26rem]">
          <div data-reveal>
            <dt className="ui">Indirizzo</dt>
            <dd className="mt-2 leading-relaxed">
              {SITE.address[0]}
              <br />
              {SITE.address[1]}
            </dd>
          </div>
          <div data-reveal>
            <dt className="ui">Orari</dt>
            <dd className="mt-2 leading-relaxed">
              {SITE.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.hours}
                </span>
              ))}
            </dd>
          </div>
          <div data-reveal>
            <dt className="ui">Telefono</dt>
            <dd className="mt-2">
              <a href={SITE.phoneHref} className="link-underline">{SITE.phone}</a>
            </dd>
          </div>
          <div data-reveal>
            <dt className="ui">Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${SITE.email}`} className="link-underline">{SITE.email}</a>
            </dd>
          </div>
        </dl>
      </div>

      {/* The engraving reproduced on every label, framed like the print it is. */}
      <figure data-reveal className="flex items-center gap-6">
        <div
          className="relative aspect-[720/900] w-[7.5rem] shrink-0 overflow-hidden sm:w-[9.5rem]"
          style={{ boxShadow: "0 0 0 1px var(--line), 0 18px 40px -24px rgba(0,0,0,.8)" }}
        >
          <Image
            src="/images/OsFlumen_etichetta.png"
            alt="Maison de Poste de Bocca di Fiume, incisione ottocentesca riprodotta sull'etichetta"
            fill
            sizes="152px"
            className="object-cover"
          />
        </div>
        <figcaption className="max-w-[19rem]">
          <p className="font-display text-[1.15rem] leading-snug italic">
            Maison de Poste de Bocca di Fiume
          </p>
          <p className="ui mt-2 leading-snug">
            L&apos;incisione ottocentesca che ogni bottiglia porta in etichetta.
          </p>
        </figcaption>
      </figure>

      <footer className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="ui">© {year} {SITE.producer}, Bocca di Fiume (LT)</p>
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="ui link-underline">
          Instagram
        </a>
      </footer>
    </Chapter>
  )
}
