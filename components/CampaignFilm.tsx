"use client";

import { motion } from "framer-motion";
import { assets } from "@/lib/assets";

export function CampaignFilm() {
  return (
    <section aria-labelledby="film-title" className="campaign-film" id="film">
      <div aria-hidden="true" className="campaign-film__watermark">
        BASTA
      </div>

      <div className="campaign-film__meta">
        <span>00 / EL SPOT</span>
        <span>00:40 · VERTICAL · SONIDO ON</span>
      </div>

      <div className="campaign-film__grid">
        <motion.div
          className="campaign-film__copy"
          initial={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.45 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="campaign-film__eyebrow">SOCKETS PRESENTA</p>
          <h2 id="film-title">
            BASTA<em>.</em>
          </h2>
          <p className="campaign-film__lead">
            Cuarenta segundos sobre un drama que dura toda la vida: la media
            que entra al lavarropas y nunca vuelve.
          </p>
          <p className="campaign-film__play-note">
            <span aria-hidden="true">▶</span>
            DALE PLAY. SUBÍ EL VOLUMEN. ABRAZÁ A TU OTRA MEDIA.
          </p>
        </motion.div>

        <motion.figure
          className="campaign-film__frame"
          initial={{ opacity: 0, rotate: 5, y: 54 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.28 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, rotate: 1.2, y: 0 }}
        >
          <span aria-hidden="true" className="tape tape--film" />
          <div className="campaign-film__screen">
            <video
              aria-label="Spot Basta de Sockets"
              controls
              playsInline
              preload="metadata"
            >
              <source src={assets.campaignFilm} type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>
          <figcaption>
            <span>SOCKETS® — CAMPAÑA BASTA</span>
            <span>PLAY CON SONIDO ↗</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
