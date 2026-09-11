import Image from "next/image"
import { ArrowDown } from "lucide-react"

import { ButtonLink } from "../ui/Button"
import { Reveal } from "../ui/Reveal"

const MARKS = [
  { value: "100%", label: "Biologico certificato" },
  { value: "24h", label: "Dalla raccolta alla molitura" },
  { value: "90/10", label: "Leccino e Frantoio" },
]

export default function Hero() {
  return (
    <section id="hero" className="paper relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20 lg:pb-28">
      {/* Decorative foliage — purely ornamental, hidden from assistive tech. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-16 -top-10 h-72 w-72 opacity-[0.13] lg:h-96 lg:w-96">
          <Image src="/images/rametto.png" alt="" fill className="scale-x-[-1] object-contain" />
        </div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 opacity-[0.10] lg:h-96 lg:w-96">
          <Image src="/images/rametto.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* ---- Copy ------------------------------------------------- */}
          <div>
            <Reveal>
              <span className="eyebrow">Bocca di Fiume · Latina · Italia</span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 max-w-[15ch] text-[2.6rem] leading-[1.02] tracking-tightest sm:text-[3.5rem] lg:text-[3.9rem] xl:text-[4.3rem]">
                Olio extravergine
                <br />
                <span className="italic text-olive">biologico</span>, dalle
                <br className="hidden sm:block" /> campagne pontine.
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink-soft">
                Olive raccolte a mano e molite a freddo nella stessa giornata.
                Una cultivar Leccino e Frantoio che conserva intatto il suo
                profilo aromatico, dal campo alla bottiglia
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#products" size="lg">
                  Scopri i prodotti
                </ButtonLink>
                <ButtonLink href="#about" variant="outline" size="lg">
                  La nostra storia
                  <ArrowDown className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </Reveal>

            {/* Trust marks */}
            <Reveal delay={330}>
              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-line pt-8">
                {MARKS.map(({ value, label }) => (
                  <div key={label}>
                    <dt className="font-serif text-2xl text-ink sm:text-3xl">{value}</dt>
                    <dd className="mt-1.5 text-[11px] uppercase leading-snug tracking-wider text-ink-muted">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ---- Imagery ---------------------------------------------- */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto w-full max-w-[520px]">
              {/* Brass frame offset behind the main image. */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 hidden h-full w-full rounded-2xl border border-brass/45 sm:block"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/images/olive.png"
                  alt="Olive appena raccolte nell'uliveto OsFlumen"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
                />
              </div>

              {/* Overlapping product card */}
              <div className="absolute -bottom-10 -left-4 hidden w-44 rounded-xl border border-ink-line
                              bg-bone-50/95 p-3 shadow-lift backdrop-blur sm:block lg:-left-12 lg:w-52">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bone-200">
                  <Image
                    src="/images/bottles.png"
                    alt="Le bottiglie di olio extravergine OsFlumen"
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-serif text-sm text-ink">Raccolto 2025</p>
                <p className="text-[11px] uppercase tracking-wider text-ink-muted">
                  Estratto a freddo
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
