"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function ProblemSection() {
  const { wanted } = siteContent;

  return (
    <section className="problem" id="problema">
      <SectionTitle
        index="01"
        label="EL PROBLEMA"
        light
        title={
          <>
            Una media sola es una <em>tragedia</em> textil.
          </>
        }
      />

      <div className="problem__grid">
        <motion.aside
          className="wanted"
          initial={{ opacity: 0, y: 60, rotate: -5 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ rotate: 0, scale: 1.015 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2.5 }}
        >
          <span aria-hidden="true" className="tape tape--top" />
          <p className="wanted__kicker">DEPARTAMENTO DE MEDIAS PERDIDAS</p>
          <h3 className="wanted__title">{wanted.title}</h3>
          <div className="wanted__photo">
            <Image
              alt="Foto de archivo: medias Sockets negras en la calle, la última vez que se las vio juntas"
              height={1066}
              sizes="(max-width: 900px) 78vw, 30vw"
              src={assets.streetMockup}
              width={1600}
            />
            <span>FOTO DE ARCHIVO — AÚN JUNTAS</span>
          </div>
          <p className="wanted__subject">{wanted.subject}</p>
          <p className="wanted__alias">{wanted.alias}</p>
          <p className="wanted__lastseen">{wanted.lastSeen}</p>
          <p className="wanted__reward">{wanted.reward}</p>
          <div aria-hidden="true" className="wanted__tabs">
            {Array.from({ length: 7 }).map((_, index) => (
              <i className={index === 2 ? "is-torn" : ""} key={index}>
                CLAC
              </i>
            ))}
          </div>
        </motion.aside>

        <div className="problem__list">
          {siteContent.problemLines.map((item, index) => (
            <motion.article
              className="problem__row"
              initial={{ opacity: 0, x: 46 }}
              key={item.number}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.5 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span>{item.number}</span>
              <p>{item.text}</p>
            </motion.article>
          ))}

          <motion.div
            className="problem__punchline"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p>DIAGNÓSTICO:</p>
            <strong>
              El drama doméstico más boludo. <em>Hasta ahora.</em>
            </strong>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
