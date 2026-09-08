import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#09090B",
        surface: "#121215",
        "surface-raised": "#18181B",
        "text-primary": "#F4F4F5",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
        accent: {
          DEFAULT: "#3B82F6",
          soft: "rgba(59, 130, 246, 0.12)",
          hover: "#2563EB",
          glow: "rgba(59, 130, 246, 0.35)",
        },
        success: {
          DEFAULT: "#10B981",
          soft: "rgba(16, 185, 129, 0.12)",
        },
        warning: {
          DEFAULT: "#F59E0B",
          soft: "rgba(245, 158, 11, 0.12)",
        },
        danger: {
          DEFAULT: "#EF4444",
          soft: "rgba(239, 68, 68, 0.12)",
        },
        border: "rgba(255, 255, 255, 0.08)",
        "border-bright": "rgba(255, 255, 255, 0.16)",
      },
      borderRadius: {
        DEFAULT: "10px",
        md: "14px",
        lg: "18px",
        xl: "22px",
        "2xl": "26px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
