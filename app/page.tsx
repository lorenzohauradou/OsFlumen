import Hero from './components/home/Hero';
import ProductsShowcase from './components/home/ProductsShowcase';
import Footer from './components/common/Footer';
import WhyChooseUsSection from './components/home/WhyChooseUsSection';
import Recensioni from './components/home/Recensioni';
import Where from './components/home/Where';
import Features from './components/home/Features';

import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <>
      <section className='overflow-x-hidden'>
        <div id="hero">
          <Hero />
        </div>
        <div id="products">
          <ProductsShowcase />
        </div>
        <div id="caratteristiche">
          <Features />
        </div>
        <div id="about">
          <WhyChooseUsSection />
        </div>
        <div id="reviews">
          <Recensioni />
        </div>
        <div id="contacts">
          <Where />
        </div>
        <Footer />
      </section>
      <Analytics />
    </>
  );
}