import Image from "next/image"
import { Star } from "lucide-react"

interface Review {
  id: number
  author: string
  role: string
  rating: number
  comment: string
  date: string
  image: string
  location?: string
}

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-[#FDF8F4] rounded-lg p-6 shadow-md">
      <div className="relative aspect-[4/3] mb-6">
        <Image
          src={review.image || "/placeholder.svg"}
          alt={`Review by ${review.author}`}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < review.rating ? "text-[#C4A484] fill-[#C4A484]" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">&quot;{review.comment}&quot;</p>
      <div className="border-t pt-4">
        <p className="font-serif text-lg text-charcoal-light">{review.author}</p>
        <p className="text-sm text-charcoal-light">{review.role}</p>
        {review.location && <p className="text-sm text-charcoal-light">{review.location}</p>}
        <p className="text-sm text-gray-600 mt-2">{review.date}</p>
      </div>
    </div>
  )
}

export default function Recensioni() {
  const reviews: Review[] = [
    {
      id: 1,
      author: "Chef Marco Rossi",
      role: "Executive Chef",
      rating: 5,
      comment:
        "L&apos;olio extravergine d&apos;oliva Os Flumen è diventato un ingrediente essenziale in nostra cucina. Il suo sapore autentico migliora ogni piatto che creiamo.",
      date: "Gennaio 2025",
      image:
        "/images/recensioni/recensione1.jpeg",
      location: "Ristorante Luna, Milano",
    },
    {
      id: 2,
      author: "Sofia Bianchi",
      role: "Food Critic",
      rating: 5,
      comment: "Un olio extravergine d&apos;oliva veramente eccezionale che coglie l&apos;essenza della tradizione italiana.",
      date: "Dicembre 2024",
      image: "/images/recensioni/recensione2.jpeg",
      location: "Gourmet Magazine",
    },
    {
      id: 3,
      author: "Giuseppe Conti",
      role: "Sommelier",
      rating: 4,
      comment: "Il perfetto compagno per esperienze di alta cucina. La qualità è subito evidente.",
      date: "Febbraio 2025",
      image: "/images/recensioni/recensione3.jpeg",
      location: "Enoteca Toscana",
    },
  ]

  return (
    <section className="bg-cream-light py-20">
      <div className="absolute left-[-3%] w-96 h-96 opacity-20 mt-[-150px]">
        <Image src="/images/rametto.png" alt="" fill className="object-contain" aria-hidden="true" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal-light">WHAT PEOPLE SAY</h2>
          <p className="text-charcoal-light max-w-2xl mx-auto text-lg font-medium">
            Scopri cosa dicono i professionisti della cucina e gli appassionati di cibo riguardo l&apos;olio extravergine d&apos;oliva Os Flumen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

