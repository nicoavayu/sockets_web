"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function ContactSection() {
  const { contact } = siteContent;

  return (
    <section className="contact" id="contacto">
      <div className="contact__copy">
        <motion.p
          className="contact__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          07 / EL INICIO DE UNA RELACIÓN ESTABLE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 34 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Tus medias ya hicieron <em>match.</em>
        </motion.h2>
        <motion.p
          className="contact__lead"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Comprá, consultá o proponé una colaboración. Para terapia de parejas
          humanas todavía no estamos tomando turnos.
        </motion.p>
        <motion.div
          className="contact__actions"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          viewport={{ once: true, amount: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <MagneticButton external href={contact.purchaseUrl} variant="paper">
            QUIERO MIS SOCKETS
          </MagneticButton>
          <MagneticButton href={`mailto:${contact.email}`} variant="outline">
            ESCRIBIRNOS
          </MagneticButton>
        </motion.div>
      </div>

      <div className="contact__aside">
        <motion.div
          className="contact__qr"
          initial={{ opacity: 0, rotate: 6, y: 30 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={{ opacity: 1, rotate: 2.5, y: 0 }}
        >
          <span aria-hidden="true" className="tape tape--top" />
          <Image
            alt="Código QR que lleva al Instagram de Sockets"
            height={220}
            src={assets.qr}
            width={220}
          />
          <p>
            Escaneá. Mirá. <em>Enamorate.</em>
          </p>
        </motion.div>

        <div className="contact__links">
          <a href={`mailto:${contact.email}`}>
            <span>CONSULTAS</span>
            {contact.email}
            <i aria-hidden="true">→</i>
          </a>
          <a href={`mailto:${contact.suggestionsEmail}`}>
            <span>SUGERENCIAS Y MEDIAS ENCONTRADAS</span>
            {contact.suggestionsEmail}
            <i aria-hidden="true">→</i>
          </a>
          <a href={contact.instagramUrl} rel="noreferrer" target="_blank">
            <span>INSTAGRAM / TIKTOK</span>
            {contact.instagramHandle}
            <i aria-hidden="true">↗</i>
          </a>
          <a
            href={`mailto:${contact.email}?subject=Mayoristas%20%2F%20Colaboraci%C3%B3n`}
          >
            <span>MAYORISTAS Y COLABORACIONES</span>
            Hagamos algo juntos
            <i aria-hidden="true">→</i>
          </a>
        </div>
      </div>
    </section>
  );
}
