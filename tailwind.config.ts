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
        canvas: "#F7F8FA",
        surface: "#FFFFFF",
        "text-primary": "#17212F",
        "text-secondary": "#526071",
        accent: {
          DEFAULT: "#185ADB",
          soft: "#EDF3FF",
          hover: "#1449B2",
        },
        success: {
          DEFAULT: "#166534",
          soft: "#DCFCE7",
        },
        warning: {
          DEFAULT: "#854D0E",
          soft: "#FEF9C3",
        },
        danger: {
          DEFAULT: "#B91C1C",
          soft: "#FEE2E2",
        },
        border: "#D9DFE7",
      },
      borderRadius: {
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
