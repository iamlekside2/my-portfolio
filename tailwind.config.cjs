/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        accent: "var(--color-accent)",
        "accent-secondary": "var(--color-accent-secondary)",
        "black-100": "var(--color-black-100)",
        "black-200": "var(--color-black-200)",
        "white-100": "var(--color-white-100)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        muted: "var(--color-muted)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        "royal-blue": "var(--royal-blue)",
        navy: "var(--navy)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px var(--shadow-card)",
        glow: "0 0 20px var(--color-accent), 0 0 40px rgba(212, 175, 55, 0.15)",
        "glow-lg": "0 0 40px var(--color-accent), 0 0 80px var(--color-accent-secondary)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
        neon: "0 0 5px var(--color-accent), 0 0 20px var(--color-accent), 0 0 40px var(--color-accent)",
        gold: "0 0 15px rgba(212, 175, 55, 0.3), 0 0 45px rgba(212, 175, 55, 0.1)",
      },
      screens: {
        xs: "450px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "spin-slow": "spin 12s linear infinite",
        "bounce-gentle": "bounce-gentle 3s ease-in-out infinite",
        morph: "morph 8s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px var(--color-accent)" },
          "50%": { boxShadow: "0 0 40px var(--color-accent), 0 0 60px var(--color-accent-secondary)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
