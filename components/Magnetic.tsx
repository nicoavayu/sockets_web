"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className = "",
  strength = 0.22,
}: MagneticProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.5 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * strength);
    rawY.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className={className}
      data-magnet
      onMouseLeave={reset}
      onMouseMove={onMove}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
