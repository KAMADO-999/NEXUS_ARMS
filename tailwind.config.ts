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
        orbitron: ["var(--font-orbitron)"],
        rajdhani: ["var(--font-rajdhani)"],
        techmono: ["var(--font-share-tech-mono)"],
      },
      colors: {
        background: "#050505",
        foreground: "#E8E8E8",
        nexus: {
          green: "#00FFAA",
          danger: "#FF3C3C",
          muted: "rgba(255,255,255,0.4)"
        }
      },
    },
  },
  plugins: [],
};
export default config;
