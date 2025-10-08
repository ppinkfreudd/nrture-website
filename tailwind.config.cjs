/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Space Grotesk'", "'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#ebf8ff",
          100: "#cde9ff",
          200: "#a1d7ff",
          300: "#6cc0ff",
          400: "#3ea7ff",
          500: "#1c90f2",
          600: "#0d72c7",
          700: "#0b5da0",
          800: "#094b80",
          900: "#083f6b",
        },
        ink: "#0b0b0f",
      },
      boxShadow: {
        glow: "0 0 40px rgba(111, 207, 255, 0.45)",
      },
    },
  },
  plugins: [],
};
