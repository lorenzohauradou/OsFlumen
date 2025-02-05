"use client"

import Image from "next/image"
import { 
  Droplets, 
  Leaf, 
  Beaker,
  Apple, 
  UtensilsCrossed 
} from "lucide-react"
import { useEffect } from "react"

export default function Features() {
  const features = [
    {
      icon: <Beaker className="w-6 h-6" />,
      title: "Metodo di produzione",
      description:
        "Utilizziamo una tecnologia moderna a ciclo continuo che preserva le qualità organolettiche dell'olio, garantendo un prodotto di eccellenza costante.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Varietà cultivar",
      description:
        "Una sapiente miscela biologica di Leccino (90%) e Frantoio (10%), cultivar selezionate per la loro eccellenza e tradizione nel territorio laziale.",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Fragranza",
      description:
        "Un bouquet aromatico che spazia dai sentori vegetali di lattuga e carciofo, alle note di mandorla, arricchito da delicate sfumature di erbe officinali.",
    },
    {
      icon: <Apple className="w-6 h-6" />,
      title: "Gusto",
      description:
        "Un perfetto equilibrio tra note amare e piccanti di leggera intensità, che si fondono in un'armonia di sapori caratteristica.",
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6" />,
      title: "Abbinamenti consigliati",
      description:
        "Ideale per esaltare carpacci, pesce di ogni varietà, vellutate di verdure e carni bianche. Sorprendente anche nelle preparazioni dolciarie.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const iconContainer = target.querySelector('.inline-flex') as HTMLElement;
          const heading = target.querySelector('h3') as HTMLElement;
          
          target.classList.add('!opacity-100', '!translate-y-0', 'bg-white/50', 'shadow-md');
          iconContainer?.classList.add('!bg-cream-light', '!text-charcoal-light');
          heading?.classList.add('!text-charcoal-light');
        } else {
          const target = entry.target as HTMLElement;
          const iconContainer = target.querySelector('.inline-flex') as HTMLElement;
          const heading = target.querySelector('h3') as HTMLElement;
          
          target.classList.remove('!opacity-100', '!translate-y-0', 'bg-white/50', 'shadow-md');
          iconContainer?.classList.remove('!bg-cream-dark', '!text-charcoal-light');
          heading?.classList.remove('!text-charcoal-light');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-10% 0px'
    });

    const cards = document.querySelectorAll('[data-feature-card]');
    cards.forEach(card => observer.observe(card));

    // Cleanup
    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []); // Empty dependency array since we only want to run this once

  return (
    <section className="relative bg-cream-light py-24 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal-light lg:text-left md:text-center text-center">CARATTERISTICHE</h2>
              <div className="w-20 h-1 bg-gold-DEFAULT"></div>
              <p className="text-charcoal-light/80 text-lg max-w-xl lg:text-left md:text-left text-center">
                Ogni goccia del nostro olio racconta una storia di qualità, tradizione e ricerca dell&apos;eccellenza.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-4 rounded-xl transition-all duration-300 opacity-0 translate-y-4"
                  data-feature-card
                >
                  <div className="flex items-start gap-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cream-dark text-charcoal-light transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-charcoal-light transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-charcoal-light/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/bottle.png"
                alt="Dettaglio del nostro olio extravergine d'oliva"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-cream-DEFAULT rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-gold-DEFAULT/10 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}