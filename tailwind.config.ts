import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#B8391B",
          dark: "#8E2A12",
        },
        ink: "#2A1B16",
        maroon: {
          DEFAULT: "#5C1A1B",
          dark: "#451213",
          deep: "#2E0A0B",
        },
        paper: "#FFFFFF",
        peach: "#FDEFE7",
        cream: "#FFF8EF",
        night: "#1B1210",
        leaf: "#2F6B3C",
        turmeric: "#E8B004",
        saffron: {
          DEFAULT: "#F29A1F",
          hover: "#DE8813",
        },
        ivory: "#FFFDF7",
        charcoal: "#2A1B16",
      },
      fontFamily: {
        heading: ["HeadingAmpersand", "var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        merriweather: ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        accent: ["var(--font-caveat)", "cursive"],
        lora: ["var(--font-lora)", "serif"],
        sfPro: [
          '"SF Pro Display"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro"',
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 6px 24px -10px rgba(60, 20, 10, 0.18)",
        card: "0 4px 20px -2px rgba(42, 27, 22, 0.06)",
        warm: "0 10px 40px -12px rgba(184, 57, 27, 0.2)",
        "warm-lg": "0 16px 50px -10px rgba(184, 57, 27, 0.3)",
      },
      borderRadius: {
        "2xl": "18px",
      },
    },
  },
  plugins: [],
};

export default config;
