import type { Metadata } from "next"

import { Galleria } from "@/components/cover/Galleria"
import { Stage } from "@/components/cover/Stage"
import { SITE } from "@/content/site"

export const metadata: Metadata = {
  title: "Òs Flumen — Azienda agricola a Bocca di Fiume, Latina",
  description:
    "L'azienda agricola Òs Flumen coltiva olive Leccino e Frantoio nella piana pontina, a Bocca di Fiume. Olio extravergine biologico, molito a freddo entro ventiquattro ore.",
  alternates: { canonical: "/" },
}

export default function CoverPage() {
  return (
    <div className="cover">
      <h1 className="sr-only">
        Òs Flumen, azienda agricola a Bocca di Fiume, Latina
      </h1>

      <Stage />
      <Galleria />

      <footer className="border-t border-[var(--rigo)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span className="dato opacity-60">
            {SITE.address[0]}, {SITE.address[1]}
          </span>
          <span className="dato flex gap-6 opacity-60">
            <a href={SITE.phoneHref} className="link-underline">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="link-underline">
              {SITE.email}
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
