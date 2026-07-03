"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "sockets-intro-v5";
const SNAP_SPRING = { type: "spring", stiffness: 460, damping: 15 } as const;

// sessionStorage puede estar bloqueado (iframes, modo incógnito estricto).
function readSeen() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // sin storage, la intro simplemente se repite
  }
}

type IntroState = "checking" | "visible" | "snapped" | "closing" | "hidden";

export function IntroClac() {
  const [state, setState] = useState<IntroState>("checking");
  const [gapHalf, setGapHalf] = useState(140);
  const completedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const leftX = useMotionValue(0);
  const rightX = useMotionValue(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const seen = readSeen();
      if (seen) {
        setState("hidden");
        return;
      }
      const half = Math.min(window.innerWidth * 0.17, 150);
      setGapHalf(half);
      leftX.set(-half);
      rightX.set(half);
      setState("visible");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [leftX, rightX]);

  useEffect(() => {
    if (state !== "visible" && state !== "snapped") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [state]);

  const dismiss = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    writeSeen();
    setState("closing");
    window.setTimeout(() => setState("hidden"), 780);
  }, []);

  const snap = useCallback(() => {
    if (completedRef.current || reducedMotion) {
      dismiss();
      return;
    }
    completedRef.current = true;
    writeSeen();

    animate(leftX, 0, SNAP_SPRING);
    animate(rightX, 0, SNAP_SPRING);
    setState("snapped");

    window.setTimeout(() => setState("closing"), 1150);
    window.setTimeout(() => setState("hidden"), 1950);
  }, [dismiss, leftX, rightX, reducedMotion]);

  // La intro nunca bloquea: si nadie junta las mitades, se juntan solas.
  useEffect(() => {
    if (state !== "visible") return;
    const timer = window.setTimeout(snap, 3800);
    return () => window.clearTimeout(timer);
  }, [snap, state]);

  const onDrag = useCallback(() => {
    if (rightX.get() < gapHalf * 0.42) snap();
  }, [gapHalf, rightX, snap]);

  if (state === "checking" || state === "hidden") return null;

  const active = state === "visible";

  return (
    <motion.div
      animate={
        state === "closing"
          ? { clipPath: "inset(0 0 100% 0)" }
          : { clipPath: "inset(0 0 0% 0)" }
      }
      className={`intro-clac ${state === "snapped" ? "is-snapped" : ""}`}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      role="dialog"
      aria-label="Intro de Sockets"
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      <div aria-hidden="true" className="intro-clac__grain" />

      <header className="intro-clac__top">
        <span>SOCKETS® — SISTEMA MAGNÉTICO ANTI MEDIA VIUDA</span>
        <button onClick={dismiss} type="button">
          SALTAR →
        </button>
      </header>

      <p className="intro-clac__hint">
        A esta palabra le falta la mitad.
        <em>A tus medias también.</em>
      </p>

      <div className="intro-clac__stage" onClick={active ? snap : undefined}>
        <div aria-hidden="true" className="intro-clac__field">
          <i />
          <i />
          <i />
        </div>

        <div className="intro-clac__word">
          <motion.span className="intro-clac__half" style={{ x: leftX }}>
            SOCK
          </motion.span>
          <motion.button
            aria-label="Juntar las dos mitades de la palabra Sockets"
            className="intro-clac__half intro-clac__half--drag"
            drag={active ? "x" : false}
            dragConstraints={{ left: -gapHalf * 0.2, right: gapHalf * 1.3 }}
            dragElastic={0.14}
            onClick={(event) => {
              event.stopPropagation();
              snap();
            }}
            onDrag={onDrag}
            style={{ x: rightX }}
            type="button"
            whileDrag={{ scale: 1.03 }}
          >
            ETS
          </motion.button>
        </div>

        <div aria-hidden="true" className="intro-clac__stamp">
          <span>¡CLAC!</span>
        </div>

        <div aria-hidden="true" className="intro-clac__sparks">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <footer aria-live="polite" className="intro-clac__status">
        {state === "visible" ? (
          <>
            <span className="intro-clac__pulse" /> ARRASTRÁ LA MITAD · O HACÉ
            CLICK · NO JUZGAMOS
          </>
        ) : (
          "PAR COMPLETO. AHORA SÍ, PASÁ."
        )}
      </footer>
    </motion.div>
  );
}
