import Image from "next/image"
import { History, Award, Leaf, MapPin } from "lucide-react"

import { ButtonLink } from "../ui/Button"
import { Reveal } from "../ui/Reveal"

const pillars = [
  {
    icon: History,
    title: "Una storia lunga",
    description:
      "Nasciamo nel borgo di Bocca di Fiume, dove la molitura delle olive si tramanda di generazione in generazione.",
  },
  {
    icon: Award,
    title: "Qualità costante",
    description:
      "Ogni lotto viene analizzato e assaggiato prima dell'imbottigliamento: quello che leggi in etichetta è quello che trovi nel piatto.",
  },
  {
    icon: Leaf,
    title: "Coltivazione biologica",
    description:
      "Nessun trattamento di sintesi, lavorazione del suolo minima e biodiversità dell'uliveto tutelata, come si è sempre fatto qui.",
  },
  {
    icon: MapPin,
    title: "Origine tracciata",
    description:
      "Le olive provengono esclusivamente dai nostri uliveti nell'agro pontino: una sola origine, nessuna miscelazione.",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 text-bone-100 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0
                   bg-[radial-gradient(900px_500px_at_85%_0%,rgba(184,148,95,.16),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ---- Label artwork ---------------------------------------- */}
          <Reveal className="relative">
            <div className="relative mx-auto max-w-[480px]">
              <div
                aria-hidden
                className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-2xl border border-brass/40 sm:block"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/images/OsFlumen_etichetta.png"
                  alt="L'etichetta storica dell'olio extravergine OsFlumen"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* ---- Narrative -------------------------------------------- */}
          <div>
            <Reveal>
              <span className="eyebrow text-bone-100/60 before:bg-brass">
                Chi siamo
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-5 text-[2.15rem] leading-[1.06] tracking-tightest text-bone-50 sm:text-5xl lg:text-[3.4rem]">
                Dalla terra pontina
                <br />
                <span className="italic text-brass-light">al tuo tavolo</span>
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone-100/75">
                OsFlumen prende il nome dalla foce del fiume che attraversa le
                nostre campagne. Portiamo avanti un patrimonio di famiglia fatto
                di uliveti curati a mano, raccolta nel momento esatto di
                maturazione e una molitura che non ha fretta.
              </p>
            </Reveal>

            <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, description }, i) => (
                <Reveal as="li" key={title} delay={200 + i * 90}>
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full
                               border border-bone-100/20 text-brass-light"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-bone-50">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone-100/65">
                    {description}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={560}>
              <ButtonLink href="#contacts" variant="light" size="lg" className="mt-12">
                Vieni a trovarci in azienda
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
