import type Lenis from "lenis"

/** The active Lenis instance, set by <Experience /> on mount. */
let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

/** Scroll to a selector / element, through Lenis when available. */
export function scrollTo(target: string | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 })
    return
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target
  el?.scrollIntoView({ behavior: "smooth", block: "start" })
}
