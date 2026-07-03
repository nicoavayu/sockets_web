"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionTitleProps = {
  index: string;
  label: string;
  title: ReactNode;
  light?: boolean;
};

export function SectionTitle({
  index,
  label,
  title,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`section-title ${light ? "section-title--light" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true, amount: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span>{index}</span>
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
