"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/site-content";

export function Benefits() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-heading">
        <p>04 / BENEFICIOS REALES, DRAMA IRREAL</p>
        <h2 id="benefits-title">
          Menos búsqueda.
          <br />
          Más <span>pares.</span>
        </h2>
      </div>
      <div className="benefit-list">
        {siteContent.benefits.map((benefit, index) => (
          <motion.div
            className="benefit-row"
            initial={{ opacity: 0.42, x: 20 }}
            key={benefit}
            transition={{ duration: 0.35 }}
            viewport={{ amount: 0.6 }}
            whileHover={{ x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span>0{index + 1}</span>
            <p>{benefit}</p>
            <i aria-hidden="true">{index % 2 === 0 ? "N" : "S"}</i>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
