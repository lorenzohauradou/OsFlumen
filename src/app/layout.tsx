import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const ui = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ui",
  display: "swap",
})

const SITE_URL = "https://www.osflumen.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Òs Flumen — Olio extravergine di oliva biologico | Bocca di Fiume, Latina",
    template: "%s | Òs Flumen",
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
  authors: [{ name: "Òs Flumen" }],
  creator: "Òs Flumen",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Òs Flumen",
    title: "Òs Flumen — Olio extravergine di oliva biologico",
    description:
      "Dalle campagne pontine al tuo tavolo: olio EVO biologico Leccino e Frantoio, raccolto e molito nella stessa giornata.",
    images: [{ url: "/images/bottles.png", width: 1032, height: 1396, alt: "Le bottiglie di olio extravergine di oliva Òs Flumen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Òs Flumen — Olio extravergine di oliva biologico",
    description: "Olio EVO biologico da Bocca di Fiume, Latina. Leccino e Frantoio, molitura a freddo.",
    images: ["/images/bottles.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.ico" },
}

export const viewport: Viewport = {
  themeColor: "#F6F0E3",
  colorScheme: "light",
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Òs Flumen",
  description: "Produttore di olio extravergine di oliva biologico a Bocca di Fiume, Latina.",
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
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  sameAs: ["https://www.instagram.com/osflumen", "https://www.facebook.com/osflumen"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${ui.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Analytics />
      </body>
    </html>
  )
}
