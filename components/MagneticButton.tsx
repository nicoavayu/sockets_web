"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "ink" | "paper" | "outline";
  external?: boolean;
  ariaLabel?: string;
};

export function MagneticButton({
  href,
  children,
  className = "",
  variant = "ink",
  external = false,
  ariaLabel,
}: MagneticButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.45 });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.24);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      aria-label={ariaLabel}
      className={`btn btn--${variant} ${className}`}
      data-magnet
      href={href}
      onMouseLeave={reset}
      onMouseMove={onMove}
      rel={external ? "noreferrer" : undefined}
      style={{ x, y }}
      target={external ? "_blank" : undefined}
      whileTap={{ scale: 0.95 }}
    >
      <span className="btn__label">{children}</span>
      <span aria-hidden="true" className="btn__poles">
        <i>N</i>
        <i>S</i>
      </span>
    </motion.a>
  );
}
