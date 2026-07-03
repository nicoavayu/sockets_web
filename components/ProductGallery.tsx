"use client";

import { motion } from "framer-motion";
import { AssetImage } from "@/components/AssetImage";
import { SectionTitle } from "@/components/SectionTitle";
import { assets } from "@/lib/assets";

const galleryItems = [
  {
    className: "gallery-card--front",
    label: "Frente / El flechazo",
    src: assets.packagingFront,
    alt: "Frente del packaging Sockets",
  },
  {
    className: "gallery-card--art",
    label: "Gráfica / Polos opuestos",
    src: assets.packagingArt,
    alt: "Gráfica de packaging con media roja y media cyan",
  },
  {
    className: "gallery-card--back",
    label: "Dorso / La letra chica",
    src: assets.packagingBack,
    alt: "Dorso del packaging Sockets",
  },
] as const;

export function ProductGallery() {
  return (
    <section className="product-section" id="producto">
      <SectionTitle
        index="05"
        label="El producto"
        light
        title="Parece packaging. Se siente como un manifiesto."
      />

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <motion.figure
            className={`gallery-card ${item.className}`}
            initial={{ opacity: 0, y: 42, rotate: index === 1 ? 2 : -2 }}
            key={item.src}
            transition={{ duration: 0.62, type: "spring" }}
            viewport={{ amount: 0.2, once: true }}
            whileHover={{ rotate: index === 1 ? -1 : 1, scale: 1.012 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          >
            <AssetImage alt={item.alt} src={item.src} />
            <figcaption>
              <span>0{index + 1}</span>
              {item.label}
            </figcaption>
          </motion.figure>
        ))}

        <motion.div
          className="gallery-brand-card"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <AssetImage alt="Logo de Sockets" src={assets.logo} />
          <p>
            Dos polos.
            <br />
            Una obsesión:
            <br />
            <strong>no separarse.</strong>
          </p>
        </motion.div>
      </div>

      <div className="product-note">
        <span>OBJETO COTIDIANO / IDEA POCO COTIDIANA</span>
        <p>
          Medias que hacen exactamente lo que esperás de una buena media:
          comodidad, actitud y no desaparecer en circunstancias sospechosas.
        </p>
      </div>
    </section>
  );
}
