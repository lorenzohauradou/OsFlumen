import Image from "next/image"
import { Button } from "../../components/ui/Button"
import { History, Award, Leaf, MapPin } from "lucide-react"

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: <History className="w-6 h-6" />,
      title: "Storia ricca",
      description:
        "La nostra storia inizia nel borgo storico di Bocca di Fiume, dove la produzione di olio extravergine d'oliva è stata perfezionata su generazioni.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Qualità premium",
      description:
        "Ogni bottiglia porta la legge di una produzione di lunga tradizione e standard di qualità inconfondibili.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Coltivazione biologica",
      description:
        "Conserviamo lo stesso rispetto per la natura che avevano i nostri antenati, garantendo una produzione biologica e sostenibile.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Origine protetta",
      description: "Le nostre olive sono esclusivamente provenienti dalle regioni pure e significative.",
    },
  ]

  return (
    <section className="relative bg-cream-light py-20">
      <div className="absolute lg:right-[-2.5%] md:right-[-2.5%] right-[-10%] w-72 h-72 opacity-20 lg:mt-[-150px] md:mt-[-150px] mt-[-220px] md:block">
        <Image src="/images/rametto.png" alt="" fill className="object-contain scale-x-[-1]" aria-hidden="true" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/OsFlumen_etichetta.png"
                alt="Historical illustration of Maison de Poste de Bocca di Fiume"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-[#4A5724]/10 rounded-lg" />
          </div>
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal-light">WHY CHOOSE US?</h2>
              <p className="text-charcoal-light max-w-xl mx-auto lg:mx-0">
                Dalla storia delle campagne pontine al tuo tavolo, portiamo avanti un patrimonio di qualità nella produzione di olio extravergine d&apos;oliva che si estende da generazioni.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-light text-olive-light mx-auto lg:mx-0">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-light">{feature.title}</h3>
                  <p className="text-charcoal-light text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:justify-start">
              <Button className="bg-charcoal-DEFAULT text-white rounded-full px-8 mt-8" variant="dark">
                Scopri la nostra storia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

