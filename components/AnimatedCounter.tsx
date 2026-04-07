"use client";

import { useEffect, useRef, useState, useMemo } from "react";

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

  const { numericValue, suffix } = useMemo(() => {
    const num = parseInt(value.replace(/\D/g, ""), 10);
    const suf = value.replace(/\d/g, "");
    return { numericValue: num, suffix: suf };
  }, [value]);

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

    // If value is not numeric, display as-is
    if (!numericValue || isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

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
  }, [isVisible, value, duration, onComplete, numericValue, suffix]);

  return <div ref={elementRef}>{displayValue}</div>;
}
