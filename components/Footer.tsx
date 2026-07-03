import Image from "next/image";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function Footer() {
  const { brand, contact } = siteContent;

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <a href="#inicio">
          <Image
            alt="Sockets"
            height={243}
            src={assets.logo}
            width={339}
          />
        </a>
        <p>
          Que se pierda todo.
          <br />
          <strong>Menos la otra media.</strong>
        </p>
      </div>

      <div className="site-footer__links">
        <a href="https://www.sockets.com.ar">{brand.domain}</a>
        <a href={contact.instagramUrl} rel="noreferrer" target="_blank">
          {contact.instagramHandle}
        </a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={`mailto:${contact.suggestionsEmail}`}>
          {contact.suggestionsEmail}
        </a>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} SOCKETS®</span>
        <span>MEDIAS IMANTADAS / HECHO EN ARGENTINA</span>
        <a href="#inicio">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
  );
}
