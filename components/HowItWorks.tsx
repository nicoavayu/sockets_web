"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function HowItWorks() {
  return (
    <section className="how" id="como-funciona">
      <SectionTitle
        index="03"
        label="EL TRUCO"
        title={
          <>
            Tres pasos. Cero ciencia. <em>Bueno, un poco de física.</em>
          </>
        }
      />

      <div className="how__steps">
        {siteContent.steps.map((step, index) => (
          <motion.article
            className="how__step"
            initial={{ opacity: 0, y: 40 }}
            key={step.number}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="how__step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <i aria-hidden="true" className="how__step-mark">
              {index === 2 ? "✓" : "→"}
            </i>
          </motion.article>
        ))}
      </div>

      <div className="how__xray">
        <motion.figure
          className="how__xray-photo"
          initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
        >
          <Image
            alt="Par de medias Sockets: el imán vive debajo del escudo bordado"
            height={2400}
            sizes="(max-width: 900px) 88vw, 40vw"
            src={assets.pairStudio}
            width={1600}
          />
          <span aria-hidden="true" className="how__ping how__ping--a" />
          <span aria-hidden="true" className="how__ping how__ping--b" />
          <span className="how__callout">← EL IMÁN VIVE ACÁ, BAJO EL ESCUDO</span>
        </motion.figure>

        <motion.div
          className="how__xray-copy"
          initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="how__xray-eyebrow">RADIOGRAFÍA DEL ASUNTO</p>
          <h3>
            El secreto no se ve. <em>Se siente.</em>
          </h3>
          <p>
            El imán vive integrado debajo del escudo bordado. Cuando acercás un
            par, se reconocen, se atraen y quedan unidos. Discreto a la vista,
            obsesivo con no separarse.
          </p>
          <div className="how__flow">
            <span>LAVÁ</span>
            <i aria-hidden="true">→</i>
            <span>SECÁ</span>
            <i aria-hidden="true">→</i>
            <span>GUARDÁ</span>
            <i aria-hidden="true">→</i>
            <strong>SIGUEN JUNTAS</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
