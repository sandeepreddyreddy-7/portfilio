export const designTokens = {
  colors: {
    primary: {
      DEFAULT: "#3B82F6", // Blue
      hover: "#2563EB",
      light: "rgba(59, 130, 246, 0.1)",
    },
    secondary: {
      DEFAULT: "#8B5CF6", // Purple
      hover: "#7C3AED",
      light: "rgba(139, 92, 246, 0.1)",
    },
    accent: {
      DEFAULT: "#14B8A6", // Teal
      hover: "#0D9488",
      light: "rgba(20, 184, 166, 0.1)",
    },
    background: {
      default: "#0B0F19",
      surface: "rgba(15, 20, 36, 0.8)",
      glass: "rgba(30, 42, 69, 0.4)",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
      muted: "#475569",
    },
    semantic: {
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
  },
  typography: {
    display: "clamp(36px, 5.5vw, 72px)",
    h1: "40px",
    h2: "28px",
    h3: "20px",
    body: "16px",
    small: "14px",
    label: "12px",
  },
  spacing: {
    containerMaxWidth: "1200px",
    sectionPadding: "6rem 0", // py-24 equivalent
  },
};

export const animationPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  slideFromLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
