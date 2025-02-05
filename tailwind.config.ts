// tailwind.config.ts
import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-italiana)'],
        sans: ['var(--font-inter)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        backgroundBase: "#F3E4C8",
        cardBase: "#f2ebdb",
        gold: "#C4A484",
        "gold-hover": "#B39476",

        cream: {
          light: '#f5f0e2',    // Sfondo più chiaro
          DEFAULT: '#F3E4C8',  // Colore crema principale
          dark: '#eae2d9',     // Sfondo cards
        },
        olive: {
          light: '#4A5724',    // Testo verde oliva chiaro
          DEFAULT: '#3A4419',  // Verde oliva principale
          dark: '#2C3312',     // Verde oliva scuro
        },
        Gold: {
          light: '#D4B494',    // Oro chiaro
          DEFAULT: '#C4A484',  // Oro principale
          dark: '#B39476',     // Oro scuro
        },
        charcoal: {
          light: '#404040',    // Grigio scuro chiaro
          DEFAULT: '#303030',  // Grigio scuro principale
          dark: '#1A1A1A',     // Grigio scuro più scuro
        }
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
}

export default config