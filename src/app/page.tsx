import { Header } from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import Hero from "@/components/home/Hero"
import ProductsShowcase from "@/components/home/ProductsShowcase"
import Features from "@/components/home/Features"
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection"
import Recensioni from "@/components/home/Recensioni"
import Where from "@/components/home/Where"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductsShowcase />
        <Features />
        <WhyChooseUsSection />
        <Recensioni />
        <Where />
      </main>
      <Footer />
    </>
  )
}
