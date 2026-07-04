"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { Magnetic } from "@/components/Magnetic";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

const line = {
  hidden: { y: "112%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const py = useSpring(pointerY, { stiffness: 60, damping: 18 });

  const photoX = useTransform(px, (value) => value * 16);
  const photoY = useTransform(py, (value) => value * 12);
  const badgeX = useTransform(px, (value) => value * -30);
  const badgeY = useTransform(py, (value) => value * -22);
  const wordX = useTransform(px, (value) => value * -46);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window;
    pointerX.set(event.clientX / innerWidth - 0.5);
    pointerY.set(event.clientY / innerHeight - 0.5);
  };

  return (
    <section className="hero" id="inicio" onMouseMove={onMove}>
      <motion.span aria-hidden="true" className="hero__ghost" style={{ x: wordX }}>
        CLAC
      </motion.span>

      <div className="hero__grid">
        <div className="hero__copy">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Image
              alt="Sockets"
              height={40}
              priority
              src={assets.wordmark}
              width={94}
            />
            <span>MEDIAS IMANTADAS · BUENOS AIRES</span>
          </motion.p>

          <h1 className="hero__title">
            <span className="hero__line">
              <motion.span
                animate="visible"
                custom={0.2}
                initial="hidden"
                variants={line}
              >
                BASTA DE
              </motion.span>
            </span>
            <span className="hero__line hero__line--serif">
              <motion.span
                animate="visible"
                custom={0.32}
                initial="hidden"
                variants={line}
              >
                <em>medias</em>
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span
                animate="visible"
                custom={0.44}
                initial="hidden"
                variants={line}
              >
                MEDIAS<i className="hero__dot">.</i>
              </motion.span>
            </span>
          </h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="hero__lead"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.62, duration: 0.55 }}
          >
            Medias que se atraen entre sí y quedan juntas: lavarropas, secado,
            cajón, valija. <strong>Chau medias viudas.</strong>
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="hero__actions"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.74, duration: 0.55 }}
          >
            <MagneticButton
              external
              href={siteContent.contact.purchaseUrl}
              variant="ink"
            >
              QUIERO UN PAR
            </MagneticButton>
            <MagneticButton href="#como-funciona" variant="outline">
              VER EL TRUCO ↓
            </MagneticButton>
          </motion.div>

          <motion.ul
            animate={{ opacity: 1 }}
            className="hero__meta"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.95 }}
          >
            <li>SE ATRAEN ENTRE SÍ</li>
            <li>APTAS LAVARROPAS</li>
            <li>HECHAS EN ARGENTINA</li>
          </motion.ul>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-pos">
            <motion.figure
              animate={{ opacity: 1, rotate: 3, y: 0 }}
              className="hero__photo"
              initial={{ opacity: 0, rotate: 9, y: 46 }}
              style={{ x: photoX, y: photoY }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.35 }}
            >
              <span aria-hidden="true" className="tape tape--tl" />
              <span aria-hidden="true" className="tape tape--br" />
              <Image
                alt="Par de medias Sockets blancas, juntas como corresponde"
                height={2400}
                priority
                sizes="(max-width: 900px) 82vw, 38vw"
                src={assets.pairStudio}
                width={1600}
              />
              <figcaption>PAR N°001 — INSEPARABLES DESDE 2024</figcaption>
            </motion.figure>
          </div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.4 }}
            style={{ x: badgeX, y: badgeY }}
            transition={{ delay: 0.9, type: "spring", bounce: 0.5 }}
          >
            <Magnetic strength={0.35}>
              <div className="hero__badge-inner">
                <svg aria-hidden="true" viewBox="0 0 120 120">
                  <defs>
                    <path
                      d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                      id="hero-badge-circle"
                    />
                  </defs>
                  <text>
                    <textPath href="#hero-badge-circle">
                      NUNCA MÁS PIERDAS UNA MEDIA · NUNCA MÁS ·
                    </textPath>
                  </text>
                </svg>
                <Image
                  alt=""
                  aria-hidden="true"
                  height={56}
                  src={assets.diamond}
                  width={56}
                />
              </div>
            </Magnetic>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            className="hero__sticker"
            initial={{ opacity: 0, rotate: 14, scale: 0.3 }}
            transition={{ delay: 1.1, type: "spring", bounce: 0.6 }}
          >
            <Magnetic strength={0.4}>
              <span>¡CLAC!</span>
            </Magnetic>
          </motion.div>

          <motion.span
            animate={{ opacity: 1, rotate: 5 }}
            className="hero__tag"
            initial={{ opacity: 0, rotate: -4 }}
            transition={{ delay: 1.2 }}
          >
            INSEPARABLES DE FÁBRICA
          </motion.span>
        </div>
      </div>

      <motion.p
        animate={{ opacity: 1 }}
        className="hero__scrollhint"
        initial={{ opacity: 0 }}
        transition={{ delay: 1.4 }}
      >
        BAJÁ ↓ <em>(las medias no se juntan solas… bueno, sí)</em>
      </motion.p>
    </section>
  );
}
