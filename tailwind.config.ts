// tailwind.config.ts
import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
        sans: ["var(--font-ui)", "system-ui", "sans-serif"],
      },

      colors: {
        /* ---- Brand palette ------------------------------------------- */
        // Warm off-whites, from lightest to deepest.
        bone: {
          50: "#FDFBF7",
          100: "#F9F4EA",
          200: "#F3EADA",
          300: "#EADCC4",
          400: "#DFCBAB",
        },
        // Warm near-black used for text and dark surfaces.
        ink: {
          DEFAULT: "#1F1B16",
          soft: "#3A342C",
          muted: "#6B6157",
          line: "#DED5C6",
        },
        olive: {
          light: "#84995A",
          DEFAULT: "#5F7137",
          dark: "#47552A",
        },
        // Brass accent — hairlines, small marks, price tags.
        brass: {
          light: "#D9BC94",
          DEFAULT: "#B8945F",
          dark: "#96774A",
        },

        /* ---- Legacy aliases (kept so older markup keeps compiling) ---- */
        cream: { light: "#F9F4EA", DEFAULT: "#F3EADA", dark: "#EADCC4" },
        charcoal: { light: "#3A342C", DEFAULT: "#1F1B16", dark: "#12100D" },
        gold: { light: "#D9BC94", DEFAULT: "#B8945F", dark: "#96774A" },
      },

      // Source Serif is wide and sturdy: only a hair of negative tracking.
      letterSpacing: {
        tightest: "-0.012em",
        widest: "0.22em",
      },

      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 1px 2px rgba(31,27,22,.04), 0 8px 24px -12px rgba(31,27,22,.12)",
        lift: "0 2px 4px rgba(31,27,22,.04), 0 24px 48px -20px rgba(31,27,22,.22)",
        inset: "inset 0 1px 0 rgba(255,255,255,.6)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,.61,.36,1)",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.22,.61,.36,1) both",
        "fade-in": "fade-in .6s ease both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [animate],
}

export default config
