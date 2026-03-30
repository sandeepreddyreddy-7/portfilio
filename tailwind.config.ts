import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#0B0F19",
          secondary: "#0F1424",
          card: "#131929",
          border: "#1E2A45",
        },
        accent: {
          blue: "#3B82F6",
          purple: "#8B5CF6",
          teal: "#14B8A6",
          cyan: "#06B6D4",
        },
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#475569",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "radial-gradient(ellipse at top, #1E2A4A 0%, #0B0F19 60%)",
        "gradient-card": "linear-gradient(135deg, #131929 0%, #0F1424 100%)",
        "gradient-accent": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        "gradient-accent-2": "linear-gradient(135deg, #06B6D4, #3B82F6)",
        "gradient-teal": "linear-gradient(135deg, #14B8A6, #06B6D4)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "grid-fade": "gridFade 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        gridFade: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
          to: { boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" },
        },
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.25)",
        "glow-purple": "0 0 30px rgba(139, 92, 246, 0.25)",
        "glow-teal": "0 0 30px rgba(20, 184, 166, 0.25)",
        "card": "0 4px 32px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 48px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
