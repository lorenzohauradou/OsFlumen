"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Lenis from "lenis"

import { CHAPTERS, pose, sceneState, type ChapterId } from "@/lib/scrollState"
import { setLenis } from "@/lib/smoothScroll"
import { Nav } from "./Nav"
import { ChapterDots } from "./ChapterDots"
import { Hero } from "./chapters/Hero"
import { Etichetta } from "./chapters/Etichetta"
import { Olive } from "./chapters/Olive"
import { Molitura } from "./chapters/Molitura"
import { Gusto } from "./chapters/Gusto"
import { Formati } from "./chapters/Formati"
import { Contatti } from "./chapters/Contatti"

gsap.registerPlugin(ScrollTrigger, useGSAP)

// WebGL only exists in the browser; skip it during server rendering.
const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), { ssr: false })

/**
 * The page: a fixed WebGL bottle behind a normal, scrollable column of
 * chapters. Each chapter, as it scrolls in, tweens the bottle's pose and
 * the page palette; the scene itself never knows about the DOM.
 */
export function Experience() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<ChapterId>("hero")

  // Smooth scrolling, kept in step with ScrollTrigger.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    setLenis(lenis)
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const html = document.documentElement

      mm.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (ctx) => {
          const { mobile } = ctx.conditions as { mobile: boolean }
          const key = mobile ? "mobile" : "desktop"

          gsap.set(pose, { ...CHAPTERS[0][key] })

          CHAPTERS.forEach((chapter, i) => {
            const el = document.getElementById(chapter.id)
            if (!el) return

            // Bottle pose: interpolated while the chapter travels from the
            // bottom of the viewport to the top.
            if (i > 0) {
              gsap.to(pose, {
                ...chapter[key],
                ease: "none",
                immediateRender: false,
                scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: 0.6 },
              })
            }

            // Palette + active chapter, once it owns the middle of the screen.
            ScrollTrigger.create({
              trigger: el,
              start: "top 50%",
              end: "bottom 50%",
              onToggle: (self) => {
                if (!self.isActive) return
                setActive(chapter.id)
                gsap.to(sceneState, { bg: chapter.theme.bg, duration: 0.9, ease: "power2.inOut", overwrite: "auto" })
                gsap.to(html, {
                  "--bg": chapter.theme.bg,
                  "--fg": chapter.theme.fg,
                  "--muted": chapter.theme.muted,
                  "--line": chapter.theme.line,
                  "--accent": chapter.theme.accent,
                  duration: 0.9,
                  ease: "power2.inOut",
                  overwrite: "auto",
                })
              },
            })
          })
        }
      )

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <div ref={root} className="relative">
      <Nav active={active} />
      <ChapterDots active={active} />
      <Scene />
      <div className="grain" aria-hidden />

      <main className="relative">
        <Hero />
        <div className="relative">
          <Etichetta />
          <Olive />
          <Molitura />
          <Gusto />
          <Formati />
          <Contatti />
        </div>
      </main>
    </div>
  )
}
