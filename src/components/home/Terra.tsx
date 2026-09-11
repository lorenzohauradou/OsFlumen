"use client"

import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Terra() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)

  // One slow aerial drift: the land settles as the band crosses the viewport.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.fromTo(
        frame.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      aria-labelledby="terra-title"
      className="relative isolate h-[clamp(23rem,64svh,38rem)] overflow-hidden"
    >
      <div ref={frame} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/sezione-new/azienda.jpg"
          alt="L'uliveto Òs Flumen di Bocca di Fiume visto dall'alto al tramonto"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>

      {/* The sky is bright: a soft gradient, not a slab, carries the type. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-ink/60 via-ink/25 to-transparent"
      />
      <div aria-hidden className="grain-plate" />

      <div className="relative flex h-full flex-col justify-between px-6 py-10 lg:px-8 lg:py-14">

        <div className="mx-auto w-full max-w-[1280px] text-right">
          <p className="font-sans text-[11px] uppercase tracking-widest text-bone-50/80">
            41°27′23″N 13°02′04″E
          </p>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-widest text-bone-50/55">
            Agro pontino, Latina
          </p>
        </div>
      </div>
    </section>
  )
}
