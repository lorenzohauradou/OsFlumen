import Image from "next/image"
import { Droplets, Leaf, Beaker, Apple, UtensilsCrossed } from "lucide-react"

import { Reveal } from "../ui/Reveal"
import { SectionHeading } from "../ui/SectionHeading"

const features = [
  {
    icon: Beaker,
    title: "Metodo di produzione",
    description:
      "Estrazione a ciclo continuo e a temperatura controllata, entro poche ore dalla raccolta: la tecnologia serve a non perdere nulla di ciò che l'oliva porta con sé.",
  },
  {
    icon: Leaf,
    title: "Varietà cultivar",
    description:
      "Leccino al 90% e Frantoio al 10%, entrambe da agricoltura biologica certificata e da alberi che crescono su questo territorio da generazioni.",
  },
  {
    icon: Droplets,
    title: "Fragranza",
    description:
      "Un bouquet vegetale di lattuga e carciofo, che vira sulla mandorla dolce e si chiude su sfumature di erbe officinali.",
  },
  {
    icon: Apple,
    title: "Gusto",
    description:
      "Amaro e piccante di intensità media, in equilibrio fra loro: presenti al palato senza mai coprire il piatto.",
  },
  {
    icon: UtensilsCrossed,
    title: "Abbinamenti",
    description:
      "Carpacci, pesce, vellutate di verdura e carni bianche. Sorprendente a crudo sui dolci al cucchiaio e sul gelato alla crema.",
  },
]

export default function Features() {
  return (
    <section id="caratteristiche" className="relative overflow-hidden border-y border-ink-line bg-bone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          {/* ---- Editorial list -------------------------------------- */}
          <div>
            <SectionHeading
              eyebrow="Scheda tecnica"
              title={
                <>
                  Caratteristiche <span className="italic text-olive">organolettiche</span>
                </>
              }
              description="Ogni goccia racconta una storia di qualità e di tradizione. Qui trovi i dati che stanno dietro a quella storia."
            />

            <ul className="mt-14">
              {features.map(({ icon: Icon, title, description }, i) => (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 90}
                  className="group border-t border-ink-line py-7 last:border-b"
                >
                  <div className="flex items-start gap-5 sm:gap-7">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                                 border border-ink-line bg-bone-100 text-olive
                                 transition-all duration-500 ease-smooth
                                 group-hover:border-olive group-hover:bg-olive group-hover:text-bone-50"
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>

                    <div>
                      <h3 className="font-serif text-xl text-ink">{title}</h3>
                      <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                        {description}
                      </p>
                    </div>

                    <span
                      aria-hidden
                      className="ml-auto hidden shrink-0 pt-1 font-serif text-sm text-brass sm:block"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* ---- Sticky bottle ---------------------------------------- */}
          <Reveal delay={150} className="relative">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/images/bottle.png"
                  alt="Dettaglio della bottiglia di olio extravergine OsFlumen"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-bone-50">
                  <p className="font-serif text-2xl">Leccino 90% · Frantoio 10%</p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-bone-50/75">
                    Acidità &lt; 0,3% · Estratto a freddo
                  </p>
                </figcaption>
              </div>

              <div
                aria-hidden
                className="absolute -bottom-5 -left-5 -z-10 h-40 w-40 rounded-full bg-brass/15 blur-2xl"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
