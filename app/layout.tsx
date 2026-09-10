import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { Header } from "./components/common/Header"
import Footer from "./components/common/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const SITE_URL = "https://www.osflumen.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OsFlumen — Olio extravergine di oliva biologico | Bocca di Fiume, Latina",
    template: "%s | OsFlumen",
  },
  description:
    "Olio extravergine di oliva biologico da cultivar Leccino e Frantoio, molito a freddo a ciclo continuo nelle campagne pontine di Bocca di Fiume, Latina.",
  keywords: [
    "olio extravergine di oliva",
    "olio biologico",
    "Leccino",
    "Frantoio",
    "Latina",
    "Bocca di Fiume",
    "olio EVO",
    "agricoltura biologica",
  ],
  authors: [{ name: "OsFlumen" }],
  creator: "OsFlumen",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "OsFlumen",
    title: "OsFlumen — Olio extravergine di oliva biologico",
    description:
      "Dalle campagne pontine al tuo tavolo: olio EVO biologico Leccino e Frantoio, raccolto e molito nella stessa giornata.",
    images: [
      {
        url: "/images/bottles.png",
        width: 1032,
        height: 1396,
        alt: "Le bottiglie di olio extravergine di oliva OsFlumen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OsFlumen — Olio extravergine di oliva biologico",
    description:
      "Olio EVO biologico da Bocca di Fiume, Latina. Leccino e Frantoio, molitura a freddo.",
    images: ["/images/bottles.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
}

export const viewport: Viewport = {
  themeColor: "#F9F4EA",
  colorScheme: "light",
}

/** Structured data so search engines read the producer as a real local business. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "OsFlumen",
  description:
    "Produttore di olio extravergine di oliva biologico a Bocca di Fiume, Latina.",
  url: SITE_URL,
  telephone: "+39 331 965 6784",
  email: "info@osflumen.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Migliara 45, Bocca di Fiume",
    addressLocality: "Latina",
    postalCode: "04100",
    addressRegion: "LT",
    addressCountry: "IT",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.456444, longitude: 13.034333 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/osflumen",
    "https://www.facebook.com/osflumen",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100]
                     focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone-50"
        >
          Vai al contenuto
        </a>

        <Header />

        <main id="main" className="flex-grow">
          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
