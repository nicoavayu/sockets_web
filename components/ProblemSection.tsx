"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { SockIllustration } from "@/components/SockIllustration";
import { siteContent } from "@/data/site-content";

export function ProblemSection() {
  return (
    <section className="problem-section" id="problema">
      <SectionTitle
        index="01"
        label="El problema"
        light
        title="Una media sola es una tragedia textil."
      />

      <div className="problem-grid">
        {siteContent.problemLines.map((line, index) => (
          <motion.article
            className={`problem-card problem-card--${index + 1}`}
            initial={{ opacity: 0, y: 36 }}
            key={line.number}
            transition={{ duration: 0.55 }}
            viewport={{ amount: 0.35, once: true }}
            whileHover={{ rotate: index === 1 ? 1 : -1, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span>{line.number}</span>
            <p>{line.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="orphan-sock" aria-hidden="true">
        <SockIllustration color="white" />
        <p>
          Busco pareja.
          <br />
          Última vez vista: centrifugado.
        </p>
      </div>

      <div className="problem-punchline">
        <p>Diagnóstico:</p>
        <strong>El drama doméstico más boludo.</strong>
        <span>Hasta ahora.</span>
      </div>
    </section>
  );
}
