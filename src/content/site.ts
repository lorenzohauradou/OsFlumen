/** Contact details and commerce links used across the experience. */
export const SITE = {
  name: "Òs Flumen",
  producer: "Azienda agricola Massimo Orsini",
  phone: "+39 331 965 6784",
  phoneHref: "tel:+393319656784",
  email: "info@osflumen.com",
  whatsapp: "https://wa.me/393319656784",
  instagram: "https://www.instagram.com/osflumen",
  mapsUrl: "https://www.google.com/maps?q=41.456444,13.034333",
  address: ["Via Migliara 45, Bocca di Fiume", "04100 Latina (LT), Italia"],
  hours: [
    { days: "Lunedì – Venerdì", hours: "9:00 – 18:00" },
    { days: "Sabato", hours: "10:00 – 16:00" },
    { days: "Domenica", hours: "Chiuso" },
  ],
}

export const PRODUCTS = [
  {
    id: "bottiglia",
    name: "Bottiglia",
    format: "500 ml",
    price: 14,
    image: "/images/product_bottle.png",
    note: "Il formato da tavola, per l'uso quotidiano a crudo.",
  },
  {
    id: "sei",
    name: "Confezione da sei",
    format: "6 × 500 ml",
    price: 75,
    image: "/images/bottles_product.png",
    note: "La scorta di famiglia, con un risparmio sul singolo pezzo.",
  },
  {
    id: "latta",
    name: "Latta",
    format: "3 litri",
    price: 69,
    image: "/images/latta3L.png",
    note: "Schermata dalla luce, pensata per la conservazione lunga.",
  },
]

export function orderLink(productName: string, format: string) {
  return `${SITE.whatsapp}?text=${encodeURIComponent(
    `Ciao Òs Flumen, vorrei ordinare: ${productName} (${format}).`
  )}`
}
