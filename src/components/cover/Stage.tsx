"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

import type { MarkBox } from "./LandPlate"

const LandPlate = dynamic(() => import("./LandPlate"), { ssr: false })

const PHOTO = "/images/sezione-new/azienda.jpg"
const MARK = "/images/brandOSFLUMENmarroneRGB.png"

/**
 * The opening screen. Everything is painted twice: a plain photograph and a
 * plain wordmark in the DOM — which is what a blocked WebGL context, a slow
 * decode and anyone who asked for reduced motion get — and, over them, the
 * three-dimensional scene, which takes over the moment it can draw.
 *
 * The DOM wordmark keeps doing one job after it turns invisible: it holds the
 * space, and its measured box is what the extruded mark is positioned from, so
 * the two agree at every window size.
 */
export function Stage() {
  const column = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLImageElement>(null)
  const [box, setBox] = useState<MarkBox | null>(null)
  const [animate, setAnimate] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  const measure = useCallback(() => {
    const el = markRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setBox({ x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height })
  }, [])

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(true)
    }
    measure()

    /* The mark moves, not just resizes: the centred column reflows when the
       webfont swaps in under it. Watch the column as well as the image, and
       take one more reading once the fonts have settled. */
    const observer = new ResizeObserver(measure)
    if (markRef.current) observer.observe(markRef.current)
    if (column.current) observer.observe(column.current)
    window.addEventListener("resize", measure)
    document.fonts?.ready.then(measure)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--paper)]">
        <Image
          src={PHOTO}
          alt="Gli uliveti e le serre dell'azienda a Bocca di Fiume, visti dall'alto, con i Monti Lepini all'orizzonte"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${sceneReady ? "opacity-0" : "opacity-100"
            }`}
        />
        {animate && (
          <LandPlate
            photo={PHOTO}
            mark={MARK}
            box={box}
            onReady={() => setSceneReady(true)}
          />
        )}
      </div>

      <div aria-hidden className="cover-stage-scrim -z-10" />
      <div aria-hidden className="cover-rule -z-10 hidden lg:block" />
      <div aria-hidden className="grain-plate -z-10" />

      <header className="cover-rise cover-su-foto relative z-10 flex items-baseline justify-between gap-6 px-6 pt-7 text-[var(--paper)] lg:px-10">
        <span className="dato opacity-80">Azienda agricola Massimo Orsini</span>
        <span className="dato opacity-80">Bocca di Fiume, Latina</span>
      </header>

      <div
        ref={column}
        className="relative mb-52 z-10 flex flex-1 flex-col items-center justify-center px-6 pb-[10svh] text-center lg:pb-[13svh]"
      >
        <Image
          ref={markRef}
          src={MARK}
          alt="Òs Flumen"
          width={4724}
          height={1380}
          priority
          onLoad={measure}
          className="cover-mark cover-rise h-auto w-[min(78vw,760px)]"
          style={
            {
              "--d": "260ms",
              visibility: sceneReady ? "hidden" : "visible",
            } as React.CSSProperties
          }
        />


        <Link
          href="/olio"
          className="cover-cta cover-rise mt-10"
          style={{ "--d": "620ms" } as React.CSSProperties}
        >
          Scopri l&apos;olio
        </Link>
      </div>

      <footer
        className="cover-rise relative z-10 grid gap-2 px-6 pb-8 text-[var(--scuro)] sm:grid-cols-3 sm:items-end lg:px-10"
        style={{ "--d": "780ms" } as React.CSSProperties}
      >
        <span className="dato opacity-70">41.4564° N &nbsp; 13.0343° E</span>
      </footer>
    </section>
  )
}
