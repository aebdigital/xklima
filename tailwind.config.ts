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
        ink: "#102033",
        graphite: "#53606f",
        line: "#dce5ec",
        mist: "#eef5f8",
        frost: "#f7fbfd",
        hvac: {
          blue: "#0b5c7a",
          navy: "#07354b",
          aqua: "#2aa7a3",
          green: "#5d7d45",
          lime: "#c7d86d",
          amber: "#d58a2a"
        }
      },
      boxShadow: {
        soft: "0 16px 42px rgba(16, 32, 51, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
