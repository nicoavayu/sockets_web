"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/site-content";

const rotations = [-3, 2.5, -1.5, 3, -2.5, 1.8];

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="benefits" id="beneficios">
      <div className="benefits__heading">
        <p>04 / BENEFICIOS REALES, DRAMA IRREAL</p>
        <h2 id="benefits-title">
          Menos búsqueda.
          <br />
          Más <em>pares.</em>
        </h2>
      </div>

      <ul className="benefits__stickers">
        {siteContent.benefits.map((benefit, index) => (
          <motion.li
            className={`benefits__sticker ${
              index === siteContent.benefits.length - 1
                ? "benefits__sticker--joke"
                : ""
            }`}
            initial={{ opacity: 0, scale: 0.35, rotate: rotations[index] * 4 }}
            key={benefit}
            style={{ rotate: rotations[index] }}
            transition={{
              type: "spring",
              bounce: 0.55,
              duration: 0.7,
              delay: index * 0.07,
            }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ rotate: rotations[index] * -1.6, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotations[index] }}
          >
            <span aria-hidden="true">{index === 5 ? "❋" : "✓"}</span>
            {benefit}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
