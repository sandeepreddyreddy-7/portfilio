"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  onComplete?: () => void;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  onComplete,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric value from string (e.g., "8+" -> 8)
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/\d/g, ""); // Get non-numeric characters

    if (!numericValue || isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(numericValue * easeOut);

      setDisplayValue(currentValue + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration, onComplete]);

  return <div ref={elementRef}>{displayValue}</div>;
}
