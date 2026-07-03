import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function ContactSection() {
  const { contact } = siteContent;

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-section__copy">
        <p className="eyebrow">07 / EL INICIO DE UNA RELACIÓN ESTABLE</p>
        <h2>
          Tus medias
          <br />
          ya hicieron <span>match.</span>
        </h2>
        <p className="contact-section__lead">
          Comprá, consultá o proponé una colaboración. Para terapia de parejas
          humanas todavía no estamos tomando turnos.
        </p>
        <div className="contact-actions">
          <MagneticButton external href={contact.purchaseUrl} variant="light">
            Quiero mis Sockets
          </MagneticButton>
          <MagneticButton href={`mailto:${contact.email}`} variant="cyan">
            Escribirnos
          </MagneticButton>
        </div>
      </div>

      <div className="contact-section__aside">
        <div className="contact-qr">
          <div>
            <Image
              alt="Código QR de Sockets"
              height={1200}
              sizes="(max-width: 768px) 48vw, 16vw"
              src={assets.qr}
              width={1200}
            />
          </div>
          <p>
            Escaneá.
            <br />
            Mirá.
            <br />
            <strong>Enamorate.</strong>
          </p>
        </div>

        <div className="contact-links">
          <a href={`mailto:${contact.email}`}>
            <span>Consultas</span>
            {contact.email}
          </a>
          <a href={`mailto:${contact.suggestionsEmail}`}>
            <span>Sugerencias, ideas y medias encontradas</span>
            {contact.suggestionsEmail}
          </a>
          <a href={contact.instagramUrl} rel="noreferrer" target="_blank">
            <span>Instagram / TikTok</span>
            {contact.instagramHandle} ↗
          </a>
          <a href={`mailto:${contact.email}?subject=Mayoristas%20%2F%20Colaboración`}>
            <span>Mayoristas y colaboraciones</span>
            Hagamos algo juntos →
          </a>
        </div>
      </div>
    </section>
  );
}
