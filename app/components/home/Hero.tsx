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
            <div className="space-y-8 mb-8 lg:mb-16 text-center lg:text-left md:text-left">
              <div className="space-y-4">
                <p className="font-serif font-bold text-xl text-charcoal-light">Bocca di Fiume, Latina, Italy</p>
                <h1 className="font-serif text-5xl md:text-7xl text-charcoal-light">PRODOTTO BIOLOGICO</h1>
                <p className="max-w-md mx-auto lg:mx-0 text-charcoal-light font-serif text-xl md:text-left">
                  Il nostro olio extravergine di oliva è stato selezionato con cura dai nostri esperti di gusto.
                </p>
              </div>
              <Button variant="dark" className="bg-charcoal-DEFAULT hover:bg-charcoal-light text-white rounded-full px-8">
                Scopri di più
              </Button>
            </div>

            {/* Right Content - Images Grid */}
            <div className="relative lg:mt-[70px] -mt-8">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Prima immagine - Olive */}
                <div className="relative aspect-square col-span-2 md:col-span-1 w-full max-w-[280px] md:max-w-full mx-auto">
                  <div className="absolute rounded-3xl z-10" />
                  <Image 
                    src="/images/olive.png" 
                    alt="Olive fresche del nostro uliveto"
                    width={450}
                    height={450}
                    className="object-cover rounded-3xl shadow-xl shadow-charcoal-dark/50 relative z-0"
                    priority
                  />
                  
                  <div className="absolute inset-0 rounded-3xl border-1 border-gold-light" />
                </div>

                {/* Seconda immagine - Bottiglie */}
                <div className="relative aspect-square col-span-2 md:col-span-1 mt-4 md:mt-12 w-full max-w-[280px] md:max-w-full mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-cream-light/20 via-transparent to-cream-dark/20 rounded-3xl z-10" />
                  <div className="absolute -inset-1 bg-gold-DEFAULT/30 blur-3xl rounded-3xl opacity-40" />
                  
                  <Image 
                    src="/images/bottles.png" 
                    alt="Le nostre bottiglie di olio"
                    width={450}
                    height={450}
                    className="object-cover rounded-3xl shadow-xl shadow-charcoal-dark/50 hidden md:block relative z-0"
                    priority
                  />
                  
                  <div className="absolute inset-0 rounded-3xl border-1 border-gold-light" />
                </div>

                {/* Elementi decorativi */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cream-light/40 rounded-full blur-md hidden md:block" />
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-gold-light/20 rounded-full blur-md hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}