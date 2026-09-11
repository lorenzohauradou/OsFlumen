import Image from "next/image"

import { Chapter } from "../Chapter"
import { PRODUCTS, SITE, orderLink } from "@/content/site"

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", minimumFractionDigits: 0 })

/** The listing: a plain, readable page section. The 3D bottle steps aside here. */
export function Formati() {
  return (
    <Chapter id="formati" side="spread" label="I formati" className="chapter-plain">
      <div className="max-w-[30rem]">
        <p data-reveal className="ui mb-6">I formati</p>
        <h2 data-reveal className="display">Un solo olio, tre formati.</h2>
        <p data-reveal className="lede mt-6">
          Stessa raccolta, stessa molitura. Cambia soltanto quanto ne vuoi in dispensa.
        </p>
        <a data-reveal href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="pill pill-ghost mt-8">
          Chiedi il listino completo
        </a>
      </div>

      <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
        {PRODUCTS.map((p, i) => (
          <li key={p.id} data-reveal className="flex flex-col">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] backdrop-blur-md"
              style={{ background: "rgba(255,252,244,.72)", boxShadow: "inset 0 0 0 1px var(--line)" }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,.7), transparent 65%)" }}
              />
              <Image
                src={p.image}
                alt={`${p.name}, ${p.format}`}
                fill
                sizes="(max-width: 768px) 90vw, 30vw"
                className={`object-contain p-8 ${i === 1 ? "scale-110" : i === 2 ? "scale-[1.15]" : ""}`}
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-[1.5rem] font-medium leading-tight">{p.name}</h3>
              <span className="text-[1.35rem]">{euro.format(p.price)}</span>
            </div>
            <p className="ui mt-1">{p.format}</p>
            <p className="mt-3 text-[1rem] leading-relaxed" style={{ color: "var(--muted)" }}>
              {p.note}
            </p>
            <a href={orderLink(p.name, p.format)} target="_blank" rel="noopener noreferrer" className="pill mt-5 self-start">
              Ordina su WhatsApp
            </a>
          </li>
        ))}
      </ul>

      <p data-reveal className="ui">Ritiro in azienda su appuntamento</p>
    </Chapter>
  )
}
