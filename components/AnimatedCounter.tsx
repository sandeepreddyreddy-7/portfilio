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
  const [displayValue, setDisplayValue] = useState(() => value);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const { numericValue, suffix, isNumeric } = useMemo(() => {
    const num = parseInt(value.replace(/\D/g, ""), 10);
    const suf = value.replace(/\d/g, "");
    const isNum = !Number.isNaN(num) && num !== 0;
    return { numericValue: num, suffix: suf, isNumeric: isNum };
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

    // If value is not numeric, no animation needed
    if (!isNumeric) {
      return;
    }

    const startTime = Date.now();
    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(numericValue * easeOut);

      setDisplayValue(currentValue + suffix);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        onComplete?.();
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, value, duration, onComplete, numericValue, suffix, isNumeric]);

  return <div ref={elementRef}>{displayValue}</div>;
}
