import Image from "next/image"
import { Star, Quote } from "lucide-react"

import { Reveal } from "../ui/Reveal"
import { SectionHeading } from "../ui/SectionHeading"

interface Review {
  id: number
  /** Optional: when empty the role and place carry the attribution. */
  author?: string
  role: string
  rating: number
  comment: string
  date: string
  image: string
  location?: string
}

const reviews: Review[] = [
  {
    id: 1,
    author: "",
    role: "Executive Chef",
    rating: 5,
    comment:
      "L'olio extravergine OsFlumen è diventato un ingrediente essenziale nella nostra cucina. Il suo sapore autentico migliora ogni piatto che portiamo in sala.",
    date: "Gennaio 2025",
    image: "/images/recensioni/recensione1.jpeg",
    location: "Ristorante Luna, Milano",
  },
  {
    id: 2,
    author: "",
    role: "Food Critic",
    rating: 5,
    comment:
      "Un olio extravergine davvero eccezionale, che coglie l'essenza della migliore tradizione italiana.",
    date: "Dicembre 2024",
    image: "/images/recensioni/recensione2.jpeg",
    location: "Gourmet Magazine",
  },
  {
    id: 3,
    author: "",
    role: "Sommelier",
    rating: 4,
    comment:
      "Il compagno perfetto per un'esperienza di alta cucina. La qualità è evidente fin dal primo assaggio.",
    date: "Febbraio 2025",
    image: "/images/recensioni/recensione3.jpeg",
    location: "Enoteca Toscana",
  },
]

function Rating({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Valutazione ${value} su 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`h-4 w-4 ${
            i < value ? "fill-brass text-brass" : "text-ink-line"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  // Fall back to role + place when no name has been supplied.
  const name = review.author?.trim()

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line
                 bg-bone-50 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bone-200">
        <Image
          src={review.image}
          alt={`Il nostro olio nella cucina di ${review.location ?? review.role}`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 400px"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <span
          aria-hidden
          className="absolute -top-[22px] left-6 flex h-11 w-11 items-center
                     justify-center rounded-full bg-bone-50 text-brass shadow-soft"
        >
          <Quote className="h-4 w-4 fill-current" />
        </span>

        <div className="mt-6">
          <Rating value={review.rating} />
        </div>

        <blockquote className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-ink-soft">
          &laquo;{review.comment}&raquo;
        </blockquote>

        <footer className="mt-6 border-t border-ink-line pt-4">
          <p className="font-serif text-base text-ink">
            {name || review.role}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-widest text-ink-muted">
            {name ? review.role : null}
            {name && review.location ? " · " : null}
            {review.location}
          </p>
          <p className="mt-2 text-xs text-ink-muted/80">{review.date}</p>
        </footer>
      </div>
    </article>
  )
}

export default function Recensioni() {
  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <section className="relative overflow-hidden bg-bone-100 py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-12 h-80 w-80 opacity-[0.09]">
        <Image src="/images/rametto.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dicono di noi"
          title={
            <>
              Chi lo porta <span className="italic text-olive">in tavola</span>
            </>
          }
          description="Chef, critici e appassionati raccontano il nostro olio extravergine di oliva."
        />

        <Reveal delay={200}>
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-ink-line
                          bg-bone-50 px-5 py-2.5">
            <Rating value={Math.round(average)} />
            <span className="text-sm text-ink-soft">
              {average.toFixed(1)} su 5 · {reviews.length} recensioni
            </span>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal as="li" key={review.id} delay={i * 110} className="h-full">
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
