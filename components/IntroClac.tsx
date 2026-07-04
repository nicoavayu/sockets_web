"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";

const STORAGE_KEY = "sockets-intro-v6";
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

  const cX = useMotionValue(0);
  const cY = useMotionValue(0);
  const cRotate = useMotionValue(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const seen = readSeen();
      if (seen) {
        setState("hidden");
        return;
      }
      const half = Math.min(window.innerWidth * 0.24, 210);
      setGapHalf(half);
      // La C arranca suelta: corrida a la derecha, caída y torcida.
      cX.set(half);
      cY.set(half * 0.62);
      cRotate.set(14);
      setState("visible");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [cRotate, cX, cY]);

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

    animate(cX, 0, SNAP_SPRING);
    animate(cY, 0, SNAP_SPRING);
    animate(cRotate, 0, SNAP_SPRING);
    setState("snapped");

    window.setTimeout(() => setState("closing"), 1150);
    window.setTimeout(() => setState("hidden"), 1950);
  }, [cRotate, cX, cY, dismiss, reducedMotion]);

  // La intro nunca bloquea: si nadie encaja la C, se encaja sola.
  useEffect(() => {
    if (state !== "visible") return;
    const timer = window.setTimeout(snap, 3800);
    return () => window.clearTimeout(timer);
  }, [snap, state]);

  const onDrag = useCallback(() => {
    if (cX.get() < gapHalf * 0.38) snap();
  }, [cX, gapHalf, snap]);

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
        A esta palabra le falta algo.
        <em>A tus medias también.</em>
      </p>

      <div className="intro-clac__stage" onClick={active ? snap : undefined}>
        <div aria-hidden="true" className="intro-clac__field">
          <i />
          <i />
          <i />
        </div>

        {/* Wordmark real: la palabra con el hueco + la C magnética que encaja.
            La C ocupa el rect (220,35)-(309,224) del canvas 712×304 → % fijos. */}
        <div className="intro-clac__word">
          <Image
            alt="Sockets"
            className="intro-clac__wordmark"
            draggable={false}
            height={304}
            priority
            sizes="(max-width: 560px) 84vw, 440px"
            src={assets.wordmarkGapCrema}
            width={712}
          />
          <span aria-hidden="true" className="intro-clac__slot" />
          <motion.button
            aria-label="Encajar la C de Sockets en su lugar"
            className="intro-clac__c"
            drag={active ? "x" : false}
            dragConstraints={{ left: -gapHalf * 0.2, right: gapHalf * 1.3 }}
            dragElastic={0.14}
            onClick={(event) => {
              event.stopPropagation();
              snap();
            }}
            onDrag={onDrag}
            style={{ rotate: cRotate, x: cX, y: cY }}
            type="button"
            whileDrag={{ scale: 1.06 }}
          >
            <Image
              alt=""
              draggable={false}
              height={189}
              priority
              sizes="56px"
              src={assets.wordmarkC}
              width={89}
            />
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
            <span className="intro-clac__pulse" /> ARRASTRÁ LA C · O HACÉ CLICK
            · NO JUZGAMOS
          </>
        ) : (
          "PAR COMPLETO. AHORA SÍ, PASÁ."
        )}
      </footer>
    </motion.div>
  );
}
