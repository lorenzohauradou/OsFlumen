import type { Metadata } from "next"

import { Experience } from "@/components/experience/Experience"

export const metadata: Metadata = {
  title: "Esperienza 3D",
  description:
    "Un viaggio interattivo in 3D tra uliveti, molitura e degustazione: scopri l'olio extravergine biologico Òs Flumen capitolo dopo capitolo.",
  alternates: { canonical: "/esperienza" },
}

export default function EsperienzaPage() {
  return <Experience />
}
