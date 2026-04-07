"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  count?: number;
  height?: number;
  width?: string;
  className?: string;
  variant?: "card" | "text" | "circle";
  animated?: boolean;
}

const shimmerVariants = {
  animate: {
    backgroundPosition: ["200% 0%", "-200% 0%"],
  },
};

export default function Skeleton({
  count = 1,
  height = 16,
  width = "100%",
  className = "",
  variant = "text",
  animated = true,
}: SkeletonProps) {
  const baseClasses = "rounded-lg bg-gradient-to-r from-[#1E2A45]/40 via-[#1E2A45]/20 to-[#1E2A45]/40";
  const animationClasses = animated ? "animate-pulse" : "";

  const getVariantClasses = () => {
    switch (variant) {
      case "card":
        return "rounded-2xl";
      case "circle":
        return "rounded-full";
      default:
        return "rounded-lg";
    }
  };

  const skeletons = Array.from({ length: count }).map((_, i) => (
    <motion.div
      key={i}
      animate={animated ? shimmerVariants.animate : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.1,
      }}
      className={`${baseClasses} ${getVariantClasses()} ${animationClasses} ${className}`}
      style={{
        height: `${height}px`,
        width,
        backgroundSize: "200% 100%",
      }}
    />
  ));

  if (count === 1) return skeletons[0];

  return (
    <div className="space-y-3">
      {skeletons}
    </div>
  );
}
