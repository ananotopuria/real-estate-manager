/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: ["FiraGo", "sans-serif"],
      },
      fontFamily: {
        sans: ["FiraGo", "sans-serif"],
      },
      colors: {
        "custom-orange": "#F93B1D",
        "custom-blue": "#021526",
        'custom-border': '#808A93',
      },
    },
  },
  plugins: [],
};
