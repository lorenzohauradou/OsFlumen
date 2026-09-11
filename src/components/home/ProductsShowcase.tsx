import Image from "next/image"

import { ButtonLink } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { SectionHeading } from "../ui/SectionHeading"

interface Product {
  id: number
  name: string
  format: string
  price: number
  image: string
  note: string
  featured?: boolean
  /** Extra scaling so each pack photograph fills its frame consistently. */
  imageClass?: string
}

const WHATSAPP = "https://wa.me/393319656784"

const products: Product[] = [
  {
    id: 1,
    name: "Bottiglia",
    format: "500 ml",
    price: 14,
    image: "/images/product_bottle.png",
    note: "Il formato da tavola, per l'uso quotidiano a crudo.",
    featured: true,
  },
  {
    id: 2,
    name: "Confezione da sei",
    format: "6 × 500 ml",
    price: 75,
    image: "/images/bottles_product.png",
    note: "La scorta di famiglia, con un risparmio sul singolo pezzo.",
    imageClass: "scale-110",
  },
  {
    id: 3,
    name: "Latta",
    format: "3 L",
    price: 69,
    image: "/images/latta3L.png",
    note: "Latta schermata dalla luce, ideale per la conservazione lunga.",
    imageClass: "scale-[1.18]",
  },
]

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
})

export default function ProductsShowcase() {
  return (
    <section id="products" className="relative overflow-hidden bg-bone-100 py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 -z-0 h-80 w-80 opacity-[0.09]">
        <Image src="/images/rametto.png" alt="" fill className="scale-x-[-1] object-contain" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="La selezione"
            title={
              <>
                I nostri <span className="italic text-olive">formati</span>
              </>
            }
            description="Un solo olio, tre formati. Stessa raccolta, stessa molitura: cambia soltanto quanto ne vuoi in dispensa."
          />

          <Reveal delay={120}>
            <ButtonLink href={WHATSAPP} external variant="outline" className="shrink-0">
              Richiedi il listino completo
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal as="li" key={product.id} delay={i * 110} className="h-full">
              <article
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line
                           bg-bone-50 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Photograph */}
                <div className="relative aspect-[4/5] overflow-hidden bg-bone-200/60">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,.9),transparent_65%)]"
                  />
                  <Image
                    src="/images/osflumen_logo.png"
                    alt=""
                    aria-hidden
                    width={40}
                    height={40}
                    className="absolute right-4 top-4 z-10 opacity-25 transition-opacity duration-500 group-hover:opacity-70"
                  />
                  <Image
                    src={product.image}
                    alt={`OsFlumen ${product.name} — ${product.format}`}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 400px"
                    className={`object-contain p-8 transition-transform duration-700 ease-smooth
                                group-hover:scale-[1.06] ${product.imageClass ?? ""}`}
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col border-t border-ink-line p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl text-ink">{product.name}</h3>
                    <span className="font-serif text-xl text-ink">
                      {euro.format(product.price)}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] uppercase tracking-widest text-brass-dark">
                    {product.format}
                  </p>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                    {product.note}
                  </p>

                  <ButtonLink
                    href={`${WHATSAPP}?text=${encodeURIComponent(
                      `Ciao OsFlumen, vorrei ordinare: ${product.name} (${product.format}).`
                    )}`}
                    external
                    className="mt-6 w-full"
                  >
                    Ordina
                    <span className="sr-only"> {product.name}</span>
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
