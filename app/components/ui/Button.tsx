import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "dark" | "secondary" | "ghost";
}

export function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  // Classi base per tutti i bottoni
  const baseClasses =
    "inline-flex items-center px-4 py-2 rounded text-white font-medium transition-colors";

  // Varianti possibili
  const variantClasses =
    variant === "dark"
      ? "bg-[#2C2C2C] hover:bg-[#404040]"
      : "bg-[#C4A484] hover:bg-[#B39476]";

  // Combino le classi in una sola stringa
  const finalClasses = `${baseClasses} ${variantClasses} ${className}`;

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
}