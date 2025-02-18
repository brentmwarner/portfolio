import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "25": {
          DEFAULT: "#FFFFFF",
          dark: "#121212",
        },
        "50": {
          DEFAULT: "#FCFCFC",
          dark: "#1A1A1A",
        },
        "100": {
          DEFAULT: "#FAF9F9",
          dark: "#242424",
        },
        "200": {
          DEFAULT: "#F7F7F7",
          dark: "#2E2E2E",
        },
        "300": {
          DEFAULT: "#F5F4F4",
          dark: "#424242",
        },
        "400": {
          DEFAULT: "#F2F1F1",
          dark: "#555555",
        },
        "500": {
          DEFAULT: "#E6E5E5",
          dark: "#6E6E6E",
        },
        "600": {
          DEFAULT: "#CAC9C9",
          dark: "#8A8A8A",
        },
        "700": {
          DEFAULT: "#A1A1A1",
          dark: "#A3A3A3",
        },
        "800": {
          DEFAULT: "#797878",
          dark: "#BDBDBD",
        },
        "900": {
          DEFAULT: "#515050",
          dark: "#D5D5D5",
        },
        "950": {
          DEFAULT: "#282828",
          dark: "#ECECEC",
        },
        text: {
          DEFAULT: "#0E0E0E",
          dark: "#FCFCFC",
        },
        accent: "#F45A1A",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "inter-tight": ["var(--font-inter-tight)"],
      },
      fontSize: {
        display: ["128px", "auto"],
        h1: ["48px", "auto"],
        h2: ["64px", "auto"],
        h3: ["40px", "auto"],
        h4: ["32px", "auto"],
        h5: ["28px", "auto"],
        h6: ["24px", "auto"],
        "body-large": ["20px", "auto"],
        body: ["16px", "auto"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

