/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "24rem",
      md: "31rem",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
