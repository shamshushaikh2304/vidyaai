/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "#ffffff",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground, 215 13% 45%))",
        },
        border: "hsl(var(--border, 33 20% 88%))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        xl: "calc(var(--radius) + 0.25rem)",
        "2xl": "calc(var(--radius) + 0.5rem)",
        "3xl": "calc(var(--radius) + 0.75rem)",
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
    },
  },
  plugins: [],
};
