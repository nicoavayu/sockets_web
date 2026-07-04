import Image from "next/image";
import { siteContent } from "@/data/site-content";
import { assets } from "@/lib/assets";

export function Footer() {
  const { brand, contact } = siteContent;

  return (
    <footer className="site-footer">
      <div aria-hidden="true" className="brand-divider brand-divider--dark" />

      <a aria-label="Sockets, volver arriba" className="site-footer__giant" href="#inicio">
        <Image
          alt="Sockets"
          height={304}
          src={assets.wordmark}
          width={712}
        />
      </a>

      <div className="site-footer__links">
        <a href="https://www.sockets.com.ar">{brand.domain}</a>
        <a href={contact.instagramUrl} rel="noreferrer" target="_blank">
          {contact.instagramHandle}
        </a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} SOCKETS®</span>
        <span>
          HECHO EN ARGENTINA — NINGUNA MEDIA FUE ABANDONADA HACIENDO ESTE SITIO
        </span>
        <a href="#inicio">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
  );
}
