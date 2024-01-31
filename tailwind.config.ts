import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', "sans-serif"],
        kolker: ['"Kolker Brush"', "sans-serif"],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#333333",
        secondary: "#e62117",
        accent: {
          yellow: "#f5ec42",
          red: "#e62117",
          green: "#b5e745",
          brown: "#8a6d3b",
          darkRed: "#702526",
          pink: "#e87d7f",
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        fadeOut: "fadeOut 1s ease-in-out",
        slideDown: "slideDown 1s ease-in-out",
        slideUp: "slideUp 1s ease-in-out",
        funnyText: "funnyText 4s ease-in-out infinite",
        scanLine: "scanLine 8s linear infinite",
        flicker: "flicker 1s linear infinite",
        flickerLamp: "flickerLamp 2s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        fadeOut: {
          "0%": { opacity: "100" },
          "100%": { opacity: "0" },
        },
        slideDown: {
          from: {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideUp: {
          from: {
            transform: "translateY(0)",
            opacity: "1",
          },
          to: {
            transform: "translateY(-100%)",
            opacity: "0",
          },
        },
        funnyText: {
          "0%": {
            color: "rgba(0, 0, 0, 0.3)",
            filter: " blur(3px)",
          },
          "30%": {
            color: "rgba(0, 0, 0, 0.5)",
            filter: "blur(1px)",
          },
          "65%": {
            color: "rgba(0, 0, 0, 0.2)",
            filter: "blur(5px)",
          },
          "100%": {
            color: "rgba(0, 0, 0, 0.3)",
            filter: "blur(3px)",
          },
        },
        scanLine: {
          "0%": {
            top: "-5px",
          },
          "100%": {
            top: "100%",
          },
        },
        flicker: {
          "0%": { background: "rgba(255, 255, 255, 1)" },
          "100%": { background: "transparent" },
        },
        flickerLamp: {
          "0%": {
            background: "rgba(255, 255, 255, 1)",
            boxShadow:
              "0px 2px 10px rgba(255, 255, 255, 0.8), 0px 5px 50px rgba(255, 255, 255, 0.8), 0px 8px 80px rgba(255, 255, 255, 0.6), 0px 8px 120px rgba(255, 255, 255, 0.6)",
          },
          "50%": { background: "rgba(255, 255, 255, 0.5)", boxShadow: "none" },
          "70%": {
            background: "rgba(255, 255, 255, 1)",
            boxShadow:
              "0px 2px 10px rgba(255, 255, 255, 0.8), 0px 5px 50px rgba(255, 255, 255, 0.8), 0px 8px 80px rgba(255, 255, 255, 0.6), 0px 8px 120px rgba(255, 255, 255, 0.6)",
          },
          "80%": { background: "rgba(255, 255, 255, 0.5)", boxShadow: "none" },
          "90%": {
            background: "rgba(255, 255, 255, 1)",
            boxShadow:
              "0px 2px 10px rgba(255, 255, 255, 0.8), 0px 5px 50px rgba(255, 255, 255, 0.8), 0px 8px 80px rgba(255, 255, 255, 0.6), 0px 8px 120px rgba(255, 255, 255, 0.6)",
          },
          "100%": { background: "rgba(255, 255, 255, 0.5)", boxShadow: "none" },
        },
      },

      screens: {
        xs: "576px",
        lg: "992px",
      },
    },
  },
  plugins: [],
};
export default config;
