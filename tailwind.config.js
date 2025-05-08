// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        segoe: ["Segoe UI", "sans-serif"],
        adlam: ["ADLaM Display", "sans-serif"],
      },
      screens: {
        sm: "24rem",
        md: "31rem",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
