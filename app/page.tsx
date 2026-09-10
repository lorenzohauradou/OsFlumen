import Hero from "./components/home/Hero"
import ProductsShowcase from "./components/home/ProductsShowcase"
import Features from "./components/home/Features"
import WhyChooseUsSection from "./components/home/WhyChooseUsSection"
import Recensioni from "./components/home/Recensioni"
import Where from "./components/home/Where"

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <section id="hero" aria-label="Introduzione">
        <Hero />
      </section>

      <section id="products" aria-label="I nostri prodotti">
        <ProductsShowcase />
      </section>

      <section id="caratteristiche" aria-label="Caratteristiche organolettiche">
        <Features />
      </section>

      <section id="about" aria-label="La nostra storia">
        <WhyChooseUsSection />
      </section>

      <section id="reviews" aria-label="Recensioni">
        <Recensioni />
      </section>

      <section id="contacts" aria-label="Dove trovarci">
        <Where />
      </section>
    </div>
  )
}
