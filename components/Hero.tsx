"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { SockIllustration } from "@/components/SockIllustration";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div aria-hidden="true" className="hero__stamp">
        <span>SISTEMA</span>
        <strong>ANTI-PÉRDIDA</strong>
        <span>MAGNÉTICO</span>
      </div>

      <motion.div
        animate="visible"
        className="hero__content"
        initial="hidden"
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.p className="eyebrow hero__eyebrow" variants={reveal}>
          Medias imantadas · Hechas para quedarse
        </motion.p>
        <motion.h1 variants={reveal}>
          <span>Basta de</span>
          <span>medias</span>
          <span>
            medias<i aria-hidden="true">.</i>
          </span>
        </motion.h1>
        <motion.div className="hero__bottom" variants={reveal}>
          <p>
            Sockets son medias imantadas que se mantienen juntas incluso durante
            el lavado.
          </p>
          <div className="hero__actions">
            <MagneticButton href="#como-funciona" variant="light">
              Ver cómo funciona
            </MagneticButton>
            <MagneticButton
              external
              href={siteContent.contact.purchaseUrl}
              variant="ink"
            >
              Quiero unas
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, rotate: 3, scale: 1 }}
        className="hero__packaging"
        initial={{ opacity: 0, rotate: 10, scale: 0.84 }}
        transition={{ delay: 0.42, duration: 0.75, type: "spring" }}
      >
        <div className="hero__packaging-card">
          <Image
            alt="Frente del packaging Sockets con medias roja y cyan"
            fill
            priority
            sizes="(max-width: 768px) 64vw, 29vw"
            src={assets.packagingFront}
          />
        </div>
        <span className="hero__packaging-label">2 pares / 0 dramas</span>
      </motion.div>

      <motion.div
        animate={{ x: 0, rotate: -13 }}
        aria-hidden="true"
        className="hero__sock hero__sock--cyan"
        initial={{ x: -80, rotate: -25 }}
        transition={{ delay: 0.55, type: "spring" }}
      >
        <SockIllustration color="cyan" />
      </motion.div>
      <motion.div
        animate={{ x: 0, rotate: 14 }}
        aria-hidden="true"
        className="hero__sock hero__sock--red"
        initial={{ x: 80, rotate: 24 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        <SockIllustration color="red" flip />
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className="hero__promise"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span aria-hidden="true">↳</span>
        {siteContent.brand.promise}
      </motion.div>
    </section>
  );
}
