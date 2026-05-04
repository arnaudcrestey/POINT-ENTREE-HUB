import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1014",
        shell: "#F4F2EE",
        systia: "#2F5FFF",
        astrae: "#C06A87",
        qlyk: "#7F8BFF"
      },
      boxShadow: {
        premium: "0 12px 40px rgba(16, 20, 30, 0.14)",
        innerSoft: "inset 0 1px 0 rgba(255,255,255,0.5)"
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
