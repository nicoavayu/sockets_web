"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

// Las líneas del manifiesto marcan el énfasis entre *asteriscos*.
function renderLine(line: string) {
  return line.split(/(\*[^*]+\*)/).map((part, index) =>
    part.startsWith("*") ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

export function ManifestoSection() {
  return (
    <section aria-labelledby="manifesto-title" className="manifesto">
      <div aria-hidden="true" className="manifesto__watermark">
        <Image alt="" height={520} src={assets.diamond} width={520} />
      </div>

      <div className="manifesto__kicker">
        <span>06 / COSAS QUE PENSAMOS MUY FUERTE</span>
        <span>SOCKETS ORIGINAL®</span>
      </div>

      <h2 className="sr-only" id="manifesto-title">
        Manifiesto Sockets
      </h2>

      <div className="manifesto__lines">
        {siteContent.manifesto.map((line, index) => (
          <motion.p
            className="manifesto__line"
            initial={{ opacity: 0, y: 44 }}
            key={line}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {renderLine(line)}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
