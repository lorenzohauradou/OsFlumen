/**
 * Shared, mutable state that links the DOM scroll (GSAP / ScrollTrigger)
 * to the WebGL scene (React Three Fiber). GSAP tweens the numbers in
 * `pose`; the bottle reads them every frame and eases toward them.
 *
 * `x` and `y` are fractions of the viewport (−0.5 … 0.5), so the same
 * keyframes work at any screen size. Rotations are radians.
 */
export interface Pose {
  x: number
  y: number
  rx: number
  ry: number
  rz: number
  scale: number
  /** 0 … 1 — strength of the contact shadow under the bottle. */
  shadow: number
  /** 0 … 1 — how much continuous idle rotation is added on top of `ry`. */
  spin: number
}

export const pose: Pose = {
  x: 0,
  y: -0.03,
  rx: 0,
  ry: 0.25,
  rz: 0,
  scale: 1,
  shadow: 1,
  spin: 0,
}

/** Colour painted by the WebGL canvas behind the bottle; tweened with the palette. */
export const sceneState = { bg: "#F6F0E3" }

export type ChapterId =
  | "hero"
  | "etichetta"
  | "olive"
  | "molitura"
  | "gusto"
  | "formati"
  | "contatti"

export interface Theme {
  bg: string
  fg: string
  muted: string
  line: string
  accent: string
}

export interface ChapterDef {
  id: ChapterId
  label: string
  theme: Theme
  desktop: Partial<Pose>
  mobile: Partial<Pose>
}

const parchment: Theme = {
  bg: "#EFE6D2",
  fg: "#1E1A12",
  muted: "#6C5F4C",
  line: "rgba(30,26,18,.16)",
  accent: "#7A2E1E",
}

const bone: Theme = {
  bg: "#F6F0E3",
  fg: "#1E1A12",
  muted: "#6C5F4C",
  line: "rgba(30,26,18,.14)",
  accent: "#7A2E1E",
}

const grove: Theme = {
  bg: "#1B2414",
  fg: "#F2EAD6",
  muted: "rgba(242,234,214,.62)",
  line: "rgba(242,234,214,.16)",
  accent: "#D9B26A",
}

const night: Theme = {
  bg: "#15130E",
  fg: "#F2EAD6",
  muted: "rgba(242,234,214,.58)",
  line: "rgba(242,234,214,.14)",
  accent: "#D9B26A",
}

export const CHAPTERS: ChapterDef[] = [
  {
    id: "hero",
    label: "Òs Flumen",
    theme: bone,
    desktop: { x: 0, y: 0.04, rx: 0, ry: 0.12, rz: 0, scale: 0.94, shadow: 1, spin: 0 },
    mobile: { x: 0, y: 0.12, rx: 0, ry: 0.12, rz: 0, scale: 0.7, shadow: 1, spin: 0 },
  },
  {
    id: "etichetta",
    label: "L'etichetta",
    theme: parchment,
    desktop: { x: 0.21, y: 0.12, rx: 0.02, ry: 0, rz: 0, scale: 1.26, shadow: 0.35, spin: 0 },
    mobile: { x: 0, y: 0.17, rx: 0.02, ry: -0.04, rz: 0, scale: 0.78, shadow: 0, spin: 0 },
  },
  {
    id: "olive",
    label: "Le olive",
    theme: grove,
    desktop: { x: -0.25, y: -0.02, rx: 0.05, ry: 0.9, rz: 0.16, scale: 0.98, shadow: 0.9, spin: 0 },
    mobile: { x: 0, y: 0.22, rx: 0.05, ry: 0.9, rz: 0.16, scale: 0.62, shadow: 0.6, spin: 0 },
  },
  {
    id: "molitura",
    label: "La molitura",
    theme: night,
    desktop: { x: 0.02, y: 0.09, rx: 0.12, ry: 2.2, rz: -0.55, scale: 0.86, shadow: 0.2, spin: 1 },
    mobile: { x: 0, y: 0.2, rx: 0.12, ry: 2.2, rz: -0.55, scale: 0.68, shadow: 0.1, spin: 1 },
  },
  {
    id: "gusto",
    label: "Il gusto",
    theme: parchment,
    desktop: { x: 0.26, y: -0.02, rx: 0, ry: -0.45, rz: 0, scale: 1, shadow: 1, spin: 0 },
    mobile: { x: 0, y: 0.22, rx: 0, ry: -0.45, rz: 0, scale: 0.6, shadow: 0.8, spin: 0 },
  },
  {
    id: "formati",
    label: "I formati",
    theme: bone,
    // The bottle leaves the stage to the right so the listing reads on its own.
    desktop: { x: 0.82, y: 0.04, rx: 0, ry: 0.35, rz: 0.14, scale: 0.9, shadow: 0, spin: 0 },
    mobile: { x: 0.85, y: 0.06, rx: 0, ry: 0.35, rz: 0.14, scale: 0.6, shadow: 0, spin: 0 },
  },
  {
    id: "contatti",
    label: "Dove siamo",
    theme: night,
    desktop: { x: 0.24, y: -0.04, rx: 0, ry: 0.35, rz: 0, scale: 0.72, shadow: 0.7, spin: 0 },
    mobile: { x: 0, y: 0.24, rx: 0, ry: 0.35, rz: 0, scale: 0.45, shadow: 0.5, spin: 0 },
  },
]
