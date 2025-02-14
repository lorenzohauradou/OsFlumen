import Image from "next/image"
import { Button } from "../../components/ui/Button";

interface Product {
  id: number
  name: string
  price: number
  image: string
  buttonColor?: "gold" | "black"
}

const products: Product[] = [
  {
    id: 1,
    name: "Bottiglia Olio EVO",
    price: 14,
    image:
      "/images/product_bottle.png",
    buttonColor: "gold",
  },
  {
    id: 2,
    name: "6x Bottiglie Olio EVO",
    price: 75,
    image:
      "/images/bottles_product.png",
    buttonColor: "black",
  },
  {
    id: 3,
    name: "Latta Olio EVO",
    price: 149,
    image:
      "/images/latta3L.png",
    buttonColor: "black",
  },
]

export default function ProductsShowcase() {
  return (
    <section className="relative py-28 bg-cream-light">
      {/* Background decoration */}
      <div className="absolute top-0 right-[-2%] w-64 h-64 lg:w-72 lg:h-72 md:w-64 md:h-64 opacity-20">
        <Image 
          src="/images/rametto.png" 
          alt="" 
          fill 
          className="object-contain scale-x-[-1]" 
          aria-hidden="true" 
        />
      </div>
      <div className="absolute bottom-[-60px] lg:bottom-[-100px] left-[-20%] lg:left-[-5%] w-80 h-80 lg:w-80 lg:h-80 md:w-60 md:h-60 opacity-20">
        <Image 
          src="/images/rametto.png" 
          alt="" 
          fill 
          className="object-contain" 
          aria-hidden="true" 
        />
      </div>


      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 text-charcoal-light">OUR MAIN PRODUCTS</h2>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group p-8 flex flex-col border border-charcoal-light/20 rounded-lg items-center relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-cream-light via-cream-dark to-cream-light"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cream-dark to-transparent"></div>
              <div className="absolute top-4 right-4">
                <Image 
                  src="/images/osflumen_logo.png" 
                  alt="" 
                  width={40} 
                  height={40} 
                  className="opacity-30 transition-opacity duration-300 group-hover:opacity-100" 
                />
              </div>

              {/* Product Image Container */}
              <div className="relative w-48 h-60 mb-8 transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream-light/20 rounded-full"></div>
                <Image 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name} 
                  fill 
                  className="object-contain" 
                />
              </div>

              {/* Product Info Container */}
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between border-b border-cream-dark/30 pb-4">
                  <h3 className="text-lg font-bold font-serif text-charcoal-light">
                    {product.name}
                  </h3>
                  <p className="text-lg font-medium text-charcoal-light">
                    €{product.price}
                  </p>
                </div>

                <div className="border-b border-dashed border-charcoal-light/20 my-2" />

                <div className="flex items-center justify-between font-bold">
                  <span className="text-sm text-charcoal-light/60">
                    {product.id === 3 ? "3L" : "500ml"}
                    {product.id === 2 ? " x6" : ""}
                  </span>
                  <Button
                    variant="dark"
                    className={`
                      ${
                        product.buttonColor === "gold"
                          ? "bg-gold-DEFAULT hover:bg-gold-dark"
                          : "bg-charcoal-DEFAULT hover:bg-charcoal-light"
                      }
                      text-white px-6 rounded-full text-center transition-all duration-300
                    `}
                  >
                    Add +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Open Store button */}
        <div className="flex justify-end mt-16">
          <Button 
            variant="ghost" 
            className="bg-charcoal-DEFAULT text-white hover:bg-charcoal-light px-8 rounded-full text-lg"
          >
            Open Store
          </Button>
        </div>
      </div>
    </section>
  )
}

