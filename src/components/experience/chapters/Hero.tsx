"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const WORD = "Òs Flumen"

const MARKS = [
  { value: "100%", label: "biologico certificato" },
  { value: "24 h", label: "dalla raccolta alla molitura" },
  { value: "< 0,3%", label: "di acidità" },
]

/**
 * Opening scene: the name of the oil set very large behind the bottle,
 * framed by olive branches and the facts that matter. On load the letters
 * rise into place; on scroll they scatter upward and the bottle takes over.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]")
      const side = gsap.utils.toArray<HTMLElement>("[data-side]")
      const branches = gsap.utils.toArray<HTMLElement>("[data-branch]")

      gsap.from(letters, {
        yPercent: 60,
        autoAlpha: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: { each: 0.05, from: "center" },
        delay: 0.25,
      })
      gsap.from(side, { autoAlpha: 0, y: 14, duration: 1, ease: "power3.out", delay: 1.0, stagger: 0.08 })
      gsap.from(branches, { autoAlpha: 0, scale: 0.94, duration: 1.8, ease: "power2.out", delay: 0.6 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.5 },
      })
      tl.to(
        letters,
        {
          y: (i) => -(180 + ((i * 97) % 240)),
          x: (i) => (i % 2 ? 1 : -1) * (30 + ((i * 53) % 90)),
          rotation: (i) => (i % 2 ? 1 : -1) * (6 + ((i * 31) % 14)),
          autoAlpha: 0,
          ease: "power2.in",
          stagger: { each: 0.03, from: "random" },
        },
        0
      )
        .to(side, { autoAlpha: 0, y: -20, ease: "none" }, 0)
        .to(branches, { y: -120, autoAlpha: 0, ease: "none" }, 0)
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      id="hero"
      data-chapter="hero"
      aria-label="Òs Flumen"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-[calc(var(--header-h)+1rem)] sm:px-8 lg:px-[5.5rem]"
    >
      {/* Olive branches, drawn, framing the stage. */}
      <div data-branch aria-hidden className="pointer-events-none absolute -right-14 -top-6 z-10 h-64 w-64 opacity-[0.16] sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]">
        <Image src="/images/rametto.png" alt="" fill className="scale-x-[-1] object-contain" priority />
      </div>
      <div data-branch aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 z-10 h-64 w-64 opacity-[0.13] sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]">
        <Image src="/images/rametto.png" alt="" fill className="object-contain" />
      </div>

      <h1
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none text-center font-display font-semibold leading-none tracking-[-0.03em]"
        style={{ fontSize: "clamp(5.2rem, 19vw, 19rem)", color: "var(--fg)" }}
        aria-label={WORD}
      >
        {[...WORD].map((ch, i) => (
          <span key={i} data-letter className="inline-block will-change-transform" aria-hidden>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>

      {/* Top row: who and where. */}
      <div className="relative z-10 flex items-start justify-between gap-6">
        <p data-side className="ui-strong leading-snug">
          Azienda agricola
          <br />
          Massimo Orsini
        </p>
        <p data-side className="ui-strong text-right leading-snug">
          Bocca di Fiume, Latina
          <br />
          Raccolto 2025
        </p>
      </div>

      {/* Bottom row: the claim, the facts, the invitation. */}
      <div className="relative z-10 grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p data-side className="font-display text-[1.6rem] font-medium italic leading-tight sm:text-[2.1rem]" style={{ color: "var(--fg)" }}>
            Olio extravergine di oliva biologico, estratto a freddo.
          </p>
          <p data-side className="ui mt-3 max-w-[26rem] text-[.92rem] leading-snug">
            Leccino e Frantoio raccolte a mano e molite nella stessa giornata, nelle campagne pontine.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <dl data-side className="grid grid-cols-3 gap-5 lg:max-w-[26rem]">
            {MARKS.map((m) => (
              <div key={m.label} className="border-t pt-3" style={{ borderColor: "var(--line)" }}>
                <dt className="font-display text-[1.7rem] font-medium leading-none sm:text-[2rem]" style={{ color: "var(--fg)" }}>
                  {m.value}
                </dt>
                <dd className="ui mt-2 leading-snug">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <style>{`@keyframes scrollcue { 0% { transform: translateY(-100%);} 100% { transform: translateY(200%);} }`}</style>
    </section>
  )
}
