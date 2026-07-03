"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Clac = { id: number; x: number; y: number };

export function CursorClac() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [clacs, setClacs] = useState<Clac[]>([]);
  const clacId = useRef(0);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const ringX = useSpring(rawX, { stiffness: 420, damping: 34, mass: 0.7 });
  const ringY = useSpring(rawY, { stiffness: 420, damping: 34, mass: 0.7 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-clac-cursor");

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-magnet], [data-cursor]",
      );
      setHovering(Boolean(interactive));
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
    };

    const onDown = (event: PointerEvent) => {
      const id = clacId.current++;
      setClacs((current) => [
        ...current,
        { id, x: event.clientX, y: event.clientY },
      ]);
      window.setTimeout(() => {
        setClacs((current) => current.filter((clac) => clac.id !== id));
      }, 620);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-clac-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="clac-cursor">
      <motion.div
        className="clac-cursor__dot"
        style={{ x: rawX, y: rawY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        animate={{ scale: hovering ? 2.1 : 1 }}
        className={`clac-cursor__ring ${label ? "clac-cursor__ring--label" : ""}`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        {label ? <span>{label}</span> : null}
      </motion.div>

      <AnimatePresence>
        {clacs.map((clac) => (
          <motion.span
            animate={{ opacity: 1, scale: 1.06, rotate: -8 }}
            className="clac-cursor__burst"
            exit={{ opacity: 0, scale: 1.28 }}
            initial={{ opacity: 0, scale: 0.4, rotate: 8 }}
            key={clac.id}
            style={{ left: clac.x, top: clac.y }}
            transition={{ duration: 0.22 }}
          >
            ¡CLAC!
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
