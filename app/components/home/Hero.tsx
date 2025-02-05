import Image from "next/image"
import { Header } from "../common/Header"
import { Button } from "../ui/Button"


export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream-light">
      {/* Pattern decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-2%] w-72 h-72 opacity-20">
          <Image src="/images/rametto.png" alt="" fill className="object-contain scale-x-[-1]" aria-hidden="true" />
        </div>
        <div className="absolute bottom-[-5%] left-[-2%] w-72 h-72 opacity-20">
          <Image src="/images/rametto.png" alt="" fill className="object-contain" aria-hidden="true" />
        </div>
      </div>
      
      <div className="relative">
        <Header />
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 mb-16 text-center lg:text-left md:text-left">
              <div className="space-y-4">
                <p className="font-serif font-bold text-xl text-charcoal-light">Bocca di Fiume, Latina, Italy</p>
                <h1 className="font-serif text-5xl md:text-7xl text-charcoal-light">PRODOTTO BIOLOGICO</h1>
                <p className="max-w-md mx-auto lg:mx-0 text-charcoal-light font-sans text-lg md:text-left">
                  Il nostro olio extravergine di oliva è stato selezionato con cura dai nostri esperti di gusto.
                </p>
              </div>
              <Button variant="dark" className="bg-charcoal-DEFAULT hover:bg-charcoal-light text-white rounded-full px-8">
                Scopri di più
              </Button>
            </div>

            {/* Right Content */}
            <div className="relative lg:mt-0 -mt-20">
              {/* Immagine principale */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-cream-light/50 to-transparent rounded-3xl" />
                <Image 
                  src="/images/olive.png" 
                  alt="Olio extravergine di oliva, Os Flumen"
                  fill
                  className="object-cover rounded-full shadow-lg shadow-charcoal-dark/55 backdrop-blur-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}