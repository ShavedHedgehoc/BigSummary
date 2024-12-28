/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide1: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
          // "100%": { transform: "translateY(0)" },
          // "0%": { transform: "translateY(0%)" },
          // "100%": { transform: "translateY(-100%)" },
        },
        slide2: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        slide1: "slide1",
        slide2: "slide2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements", nocompatible: true })],
};
