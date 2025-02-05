"use client"

import { useState } from "react"
import { MapPin, Clock, Phone, Navigation, Instagram, MessageCircle } from "lucide-react"
import { Button } from "../../components/ui/Button"
import Image from "next/image"
export default function Where() {
  const [isHovered, setIsHovered] = useState(false)

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Indirizzo",
      details: ["Via Migliara 45", "Bocca di Fiume", "Latina, LT 04100", "Italia"],
      action: {
        text: "Vai",
        icon: <Navigation className="h-4 w-4 ml-2" />,
        href: "https://www.google.com/maps?q=41.456444,13.034333",
      },
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Orari di apertura",
      details: ["Lunedì - Venerdì: 9:00 - 18:00", "Sabato: 10:00 - 16:00", "Domenica: Chiuso"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contatti",
      details: ["Massimo Orsini - 331 965 6784", "info@osflumen.com"],
      actions: [
        {
          text: "Chiama",
          href: "tel:+(39) 331 965 6784",
        },
        {
          text: "",
          icon: <Instagram className="h-4 w-4" />,
          href: "https://www.instagram.com/osflumen",
        },
        {
          text: "",
          icon: <MessageCircle className="h-4 w-4" />,
          href: "https://wa.me/+393319656784",
        }
      ],
    },
  ]

  return (
    <section className="relative bg-cream-light py-20">
        {/* Background decoration */}
      <div className="absolute bottom-500 right-[-2%] w-80 h-80 opacity-20 mt-[-100px]">
        <Image src="/images/rametto.png" alt="" fill className="object-contain scale-x-[-1]" aria-hidden="true" />
      </div>
      <div className="absolute bottom-0 left-[-2%] w-80 h-80 opacity-20 mb-[-50px] hidden md:block">
        <Image src="/images/rametto.png" alt="" fill className="object-contain" aria-hidden="true" />
      </div>
        
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal-light">WHERE TO FIND US?</h2>
          <p className="text-charcoal-light max-w-2xl mx-auto text-lg font-medium">
            Visita il nostro oliveto storico nella provincia di Latina, dove la tradizione si unisce all&apos;eccellenza in ogni goccia di olio extravergine d&apos;oliva che produciamo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Container */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div
              className="absolute inset-0 bg-[#4A5724]/10 transition-opacity duration-300 z-10"
              style={{ opacity: isHovered ? 0 : 1 }}
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.019447161387!2d13.032666715770046!3d41.45644597925789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI3JzIzLjIiTiAxM8KwMDInMDMuNiJF!5e0!3m2!1sit!2sit!4v1625147200000!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Contact Information */}
          <div className="grid gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-[#FDF8F4] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cream-light text-charcoal-light rounded-full">{info.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-xl mb-3 text-charcoal-light">{info.title}</h3>
                    <div className="space-y-1 text-charcoal-light">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-charcoal-light">{detail}</p>
                      ))}
                    </div>
                    {info.actions ? (
                      <div className="flex gap-3 mt-4">
                        {info.actions.map((action, actionIdx) => (
                          <Button
                            key={actionIdx}
                            variant="dark"
                            className="text-white p-0 h-auto font-medium"
                            onClick={() => window.open(action.href, "_blank")}
                          >
                            {action.text}
                            {action.icon}
                          </Button>
                        ))}
                      </div>
                    ) : info.action && (
                      <Button
                        variant="dark"
                        className="mt-4 text-white p-0 h-auto font-medium"
                        onClick={() => window.open(info.action.href, "_blank")}
                      >
                        {info.action.text}
                        {info.action.icon}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
        <div className="w-full h-full bg-[url('/olive-branch.svg')] bg-contain bg-no-repeat opacity-50" />
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10 rotate-180">
        <div className="w-full h-full bg-[url('/olive-branch.svg')] bg-contain bg-no-repeat opacity-50" />
      </div>
    </section>
  )
}

