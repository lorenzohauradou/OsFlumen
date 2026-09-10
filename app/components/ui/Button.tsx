import React from "react"

type Variant = "primary" | "olive" | "outline" | "light" | "ghost"
type Size = "sm" | "md" | "lg"

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium rounded-full " +
  "whitespace-nowrap select-none transition-all duration-300 ease-smooth " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bone-50 hover:bg-olive shadow-soft hover:shadow-lift",
  olive: "bg-olive text-bone-50 hover:bg-olive-dark shadow-soft hover:shadow-lift",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone-50",
  // For dark surfaces.
  light: "bg-bone-50 text-ink hover:bg-brass-light",
  ghost: "text-ink hover:bg-ink/[.06]",
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-[15px]",
}

/** Shared class string, for the rare case an element can't be one of the two components. */
export function buttonStyles(
  variant: Variant = "primary",
  size: Size = "md",
  className = ""
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

type Shared = { variant?: Variant; size?: Size; className?: string }

export type ButtonProps = Shared & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles(variant, size, className)} {...props} />
  )
}

export type ButtonLinkProps = Shared &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** Adds the rel/target pair every external link here needs. */
    external?: boolean
  }

export function ButtonLink({
  variant,
  size,
  className,
  external,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={buttonStyles(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...props}
    />
  )
}
