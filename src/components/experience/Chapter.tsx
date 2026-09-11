"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import type { ChapterId } from "@/lib/scrollState"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Props {
  id: ChapterId
  side?: "left" | "right" | "center" | "spread"
  label: string
  children: ReactNode
  className?: string
  /** Full-bleed atmosphere (photo, drawing) placed behind the copy and the bottle. */
  backdrop?: ReactNode
}

/**
 * One full-height stop in the scroll story. Elements marked `data-reveal`
 * rise in as the chapter reaches the middle of the screen and fade out as
 * it leaves, both tied to the scrollbar so the motion is always reversible.
 */
export function Chapter({ id, side = "left", label, children, className = "", backdrop }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]")
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, y: 36 })

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "top 30%", scrub: 0.4 },
      })

      gsap.to(items, {
        autoAlpha: 0,
        y: -28,
        ease: "none",
        stagger: 0.06,
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: "bottom 48%", end: "bottom 12%", scrub: 0.4 },
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id={id} data-chapter={id} aria-label={label} className={`chapter ${className}`}>
      {backdrop}
      <div className={`chapter-inner ${side}`}>{children}</div>
    </section>
  )
}
