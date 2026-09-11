import type { Metadata } from "next"

import { Header } from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import Hero from "@/components/home/Hero"
import ProductsShowcase from "@/components/home/ProductsShowcase"
import Features from "@/components/home/Features"
import Terra from "@/components/home/Terra"
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection"
import Recensioni from "@/components/home/Recensioni"
import Where from "@/components/home/Where"

export const metadata: Metadata = {
  title: "L'olio — formati, prezzi e come ordinare",
  description:
    "Olio extravergine di oliva biologico Leccino e Frantoio: bottiglia da 500 ml, confezione da sei e latta da 3 litri. Molitura a freddo a Bocca di Fiume, Latina.",
  alternates: { canonical: "/olio" },
}

export default function OlioPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductsShowcase />
        <Features />
        <Terra />
        <WhyChooseUsSection />
        <Recensioni />
        <Where />
      </main>
      <Footer />
    </>
  )
}
