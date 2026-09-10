"use client"

import { useEffect, useRef, useState } from "react"
import type { ElementType, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger, in ms, applied to this item's transition. */
  delay?: number
  as?: ElementType
}

/**
 * Reveals its children once when they scroll into view. Replaces the old
 * approach of toggling utility classes on nodes found via querySelector:
 * state stays in React, and the element is never re-hidden on scroll back.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Honour reduced-motion by showing content immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  )
}
