import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full
          bg-transparent
          border-b
          border-white/20
          py-2
          text-white
          placeholder:text-gray-400
          focus:outline-none
          focus:border-white/40
          transition-colors
          text-lg
          ${className}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"