"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SockIllustration } from "@/components/SockIllustration";

const STORAGE_KEY = "sockets-intro-seen-v4";

type IntroState = "checking" | "visible" | "snapped" | "closing" | "hidden";

export function IntroMagnetLoader() {
  const [state, setState] = useState<IntroState>("checking");
  const stageRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef<HTMLButtonElement>(null);
  const completedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      setState(seen ? "hidden" : "visible");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (state !== "visible" && state !== "snapped") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [state]);

  const finish = useCallback(
    (snapped: boolean) => {
      if (completedRef.current) return;
      completedRef.current = true;
      window.localStorage.setItem(STORAGE_KEY, "true");

      if (!snapped || reducedMotion) {
        setState("closing");
        window.setTimeout(() => setState("hidden"), 420);
        return;
      }

      setState("snapped");
      window.setTimeout(() => setState("closing"), 680);
      window.setTimeout(() => setState("hidden"), 1180);
    },
    [reducedMotion],
  );

  const snapToTarget = useCallback(() => {
    if (!targetRef.current || !movingRef.current || state !== "visible") return;

    const target = targetRef.current.getBoundingClientRect();
    const moving = movingRef.current.getBoundingClientRect();
    const targetX = target.left + target.width / 2;
    const targetY = target.top + target.height / 2;
    const movingX = moving.left + moving.width / 2;
    const movingY = moving.top + moving.height / 2;

    animate(x, x.get() + targetX - movingX - 26, {
      type: "spring",
      stiffness: 520,
      damping: 28,
    });
    animate(y, y.get() + targetY - movingY, {
      type: "spring",
      stiffness: 520,
      damping: 28,
    });
    finish(true);
  }, [finish, state, x, y]);

  const trySnap = useCallback(
    (pointer?: { x: number; y: number }) => {
      if (!targetRef.current || !movingRef.current || state !== "visible") return;

      const target = targetRef.current.getBoundingClientRect();
      const moving = movingRef.current.getBoundingClientRect();
      const targetX = target.left + target.width / 2;
      const targetY = target.top + target.height / 2;
      const movingX = moving.left + moving.width / 2;
      const movingY = moving.top + moving.height / 2;
      const distance = Math.hypot(
        targetX - (pointer?.x ?? movingX),
        targetY - (pointer?.y ?? movingY),
      );

      if (distance < Math.min(210, window.innerWidth * 0.42)) {
        snapToTarget();
      }
    },
    [snapToTarget, state],
  );

  if (state === "checking" || state === "hidden") return null;

  return (
    <motion.div
      animate={
        state === "closing"
          ? { clipPath: "circle(0% at 50% 50%)", opacity: 0 }
          : { clipPath: "circle(150% at 50% 50%)", opacity: 1 }
      }
      aria-label="Intro interactiva de Sockets"
      className={`intro-loader ${state === "snapped" ? "is-snapped" : ""}`}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      role="dialog"
      transition={{ duration: state === "closing" ? 0.46 : 0.2 }}
    >
      <div aria-hidden="true" className="intro-loader__grain" />
      <div className="intro-loader__topline">
        <span>SOCKETS® / SISTEMA ANTI-MEDIA-VIUDA</span>
        <button onClick={() => finish(false)} type="button">
          Saltar intro
        </button>
      </div>

      <div className="intro-loader__copy">
        <p>Una está perdida.</p>
        <h2>Juntalas.</h2>
        <span>Arrastrá o tocá la media para juntarlas</span>
      </div>

      <div className="intro-loader__stage" ref={stageRef}>
        <motion.button
          aria-label="Juntar la media cyan con su pareja"
          className="intro-sock intro-sock--drag"
          drag
          dragConstraints={stageRef}
          dragElastic={0.12}
          dragMomentum
          onClick={snapToTarget}
          onDrag={(_, info) => trySnap(info.point)}
          onDragEnd={(_, info) => {
            if (info.offset.x > Math.min(260, window.innerWidth * 0.3)) {
              snapToTarget();
              return;
            }
            trySnap(info.point);
          }}
          ref={movingRef}
          style={{ x, y }}
          type="button"
          whileDrag={{ cursor: "grabbing", scale: 1.04 }}
        >
          <SockIllustration color="cyan" />
        </motion.button>

        <div aria-hidden="true" className="intro-field-lines">
          <i />
          <i />
          <i />
        </div>

        <div
          aria-label="Media roja esperando a su pareja"
          className="intro-sock intro-sock--target"
          ref={targetRef}
          role="img"
        >
          <SockIllustration color="red" flip />
        </div>
      </div>

      <p aria-live="polite" className="intro-loader__status">
        {state === "snapped" ? "CLAC. PAREJA RECUPERADA." : "ACERCÁ · SENTÍ · CLAC"}
      </p>
    </motion.div>
  );
}
