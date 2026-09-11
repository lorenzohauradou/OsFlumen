import { forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  /** "light" sits on cream surfaces, "dark" on the ink footer. */
  tone?: "light" | "dark"
}

const tones = {
  light:
    "border-ink/20 text-ink placeholder:text-ink-muted/70 focus:border-ink",
  dark:
    "border-bone-50/25 text-bone-50 placeholder:text-bone-50/45 focus:border-bone-50",
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", tone = "light", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full bg-transparent border-b py-3 text-base
        transition-colors duration-300 ease-smooth
        focus:outline-none focus-visible:ring-0
        ${tones[tone]} ${className}`}
      {...props}
    />
  )
)

Input.displayName = "Input"
