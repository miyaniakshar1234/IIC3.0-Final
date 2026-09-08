import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ── CSS-variable-driven tokens ── */
        canvas:          "var(--canvas)",
        surface:         "var(--surface)",
        "surface-raised":"var(--surface-raised)",
        "surface-hover": "var(--surface-hover)",

        "text-primary":  "var(--text-primary)",
        "text-secondary":"var(--text-secondary)",
        "text-muted":    "var(--text-muted)",

        accent: {
          DEFAULT: "var(--accent)",
          soft:    "var(--accent-soft)",
          hover:   "var(--accent-hover)",
          glow:    "var(--accent-glow)",
          dim:     "var(--accent-dim)",
        },

        success: { DEFAULT: "var(--success)", soft: "var(--success-soft)" },
        warning: { DEFAULT: "var(--warning)", soft: "var(--warning-soft)" },
        danger:  { DEFAULT: "var(--danger)",  soft: "var(--danger-soft)"  },
        info:    { DEFAULT: "var(--info)",    soft: "var(--info-soft)"    },

        border: {
          DEFAULT: "var(--border)",
          soft:    "var(--border-soft)",
          bright:  "var(--border-bright)",
          accent:  "var(--border-accent)",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "Cascadia Code", "Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        md:  "12px",
        lg:  "16px",
        xl:  "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        sm:     "var(--shadow-sm)",
        md:     "var(--shadow-md)",
        lg:     "var(--shadow-lg)",
        accent: "var(--glow-accent)",
      },
      animation: {
        "pulse-slow":  "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in":     "fadeIn 0.4s ease forwards",
        "slide-up":    "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-amber": "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
