import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <Reveal>
        <span className={`eyebrow ${centered ? "justify-center" : ""}`}>
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="mt-5 text-[1.95rem] leading-[1.14] tracking-tightest sm:text-[2.5rem] lg:text-[2.9rem]">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={160}>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
