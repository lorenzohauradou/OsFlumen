"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Props {
  /** Poster image, also the fallback when no video is given. */
  image?: string
  /** Optional looping clip (mp4/webm) under /public. */
  video?: string
  alt?: string
  /** 0 … 1, how dark the wash over the media is. */
  wash?: number
  position?: string
  className?: string
}

/**
 * Full-bleed atmosphere behind a chapter: a photo or a silent loop,
 * slightly parallaxed against the scroll and washed with the chapter colour.
 */
export function ChapterMedia({ image, video, alt = "", wash = 0.55, position = "center", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-media]",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ref.current?.parentElement ?? ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <div data-media className="absolute inset-[-10%_0]">
        {video ? (
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: position }}
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={alt} className="h-full w-full object-cover" style={{ objectPosition: position }} />
        ) : null}
      </div>
      <div className="absolute inset-0" style={{ background: "var(--bg)", opacity: wash }} />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--bg) 0%, transparent 28%, transparent 72%, var(--bg) 100%)" }}
      />
    </div>
  )
}
