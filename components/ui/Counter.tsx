"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  singularSuffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  startValue?: number;
}

export function Counter({
  value,
  suffix = "+",
  singularSuffix,
  prefix = "",
  duration = 1.8,
  className,
  startValue = 1,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    // Cubic ease-out for natural, responsive deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(startValue + eased * (value - startValue));

      setCount(Math.min(value, Math.max(startValue, current)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration, startValue]);

  const activeSuffix =
    count === 1 && singularSuffix ? singularSuffix : suffix;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {activeSuffix}
    </span>
  );
}
