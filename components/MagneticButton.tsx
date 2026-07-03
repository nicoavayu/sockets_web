"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "ink" | "light" | "cyan";
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
  const x = useSpring(rawX, { stiffness: 280, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 280, damping: 20, mass: 0.4 });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.16);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      aria-label={ariaLabel}
      className={`magnetic-button magnetic-button--${variant} ${className}`}
      href={href}
      onMouseLeave={reset}
      onMouseMove={onMove}
      rel={external ? "noreferrer" : undefined}
      style={{ x, y }}
      target={external ? "_blank" : undefined}
      whileTap={{ scale: 0.96 }}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="magnetic-button__pole">
        N
      </span>
      <span aria-hidden="true" className="magnetic-button__pole">
        S
      </span>
    </motion.a>
  );
}
