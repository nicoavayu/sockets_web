import { siteContent } from "@/data/site-content";

const LETTERS = ["S", "O", "C", "K", "E", "T", "S"];

export function Footer() {
  const { brand, contact } = siteContent;

  return (
    <footer className="site-footer">
      <div aria-hidden="true" className="site-footer__stripes" />

      <a aria-label="Sockets, volver arriba" className="site-footer__giant" href="#inicio">
        {LETTERS.map((letter, index) => (
          <span
            className={index === 2 ? "site-footer__letter site-footer__letter--split" : "site-footer__letter"}
            key={`${letter}-${index}`}
          >
            {letter}
          </span>
        ))}
      </a>

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
        <span>
          HECHO EN ARGENTINA — NINGUNA MEDIA FUE ABANDONADA HACIENDO ESTE SITIO
        </span>
        <a href="#inicio">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
  );
}
