import { siteContent } from "@/data/site-content";

export function ManifestoSection() {
  return (
    <section className="manifesto-section" aria-labelledby="manifesto-title">
      <div className="manifesto-kicker">
        <span>06 / COSAS QUE PENSAMOS MUY FUERTE</span>
        <span>SOCKETS ORIGINAL®</span>
      </div>

      <h2 className="sr-only" id="manifesto-title">
        Manifiesto Sockets
      </h2>

      <div className="manifesto-posters">
        {siteContent.manifesto.map((line, index) => (
          <article
            className={`manifesto-poster manifesto-poster--${(index % 3) + 1}`}
            key={line}
          >
            <span>0{index + 1}</span>
            <p>{line}</p>
            <i aria-hidden="true">{index % 2 === 0 ? "+" : "×"}</i>
          </article>
        ))}
      </div>

      <div aria-hidden="true" className="manifesto-marquee">
        <div>
          BASTA DE MEDIAS MEDIAS · BASTA DE MEDIAS MEDIAS · BASTA DE MEDIAS
          MEDIAS ·
        </div>
        <div>
          BASTA DE MEDIAS MEDIAS · BASTA DE MEDIAS MEDIAS · BASTA DE MEDIAS
          MEDIAS ·
        </div>
      </div>
    </section>
  );
}
