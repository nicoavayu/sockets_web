import { SectionTitle } from "@/components/SectionTitle";
import { SockIllustration } from "@/components/SockIllustration";
import { siteContent } from "@/data/site-content";

export function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona">
      <SectionTitle
        index="03"
        label="Cómo funciona"
        title="Tres pasos. Cero búsquedas arqueológicas."
      />

      <div className="steps-grid">
        {siteContent.steps.map((step, index) => (
          <article className="step-card" key={step.number}>
            <div className="step-card__top">
              <span>{step.number}</span>
              <i aria-hidden="true">{index === 2 ? "✓" : "↘"}</i>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="magnet-explainer">
        <div className="magnet-explainer__visual">
          <SockIllustration color="cyan" revealMagnet />
          <div className="magnet-callout">
            <span />
            <p>
              <strong>Acá.</strong>
              Debajo del logo. Discreto a la vista, obsesivo con no separarse.
            </p>
          </div>
        </div>
        <div className="magnet-explainer__copy">
          <span className="eyebrow">Radiografía del asunto</span>
          <h3>El secreto no se ve. Se siente.</h3>
          <p>
            El imán vive integrado debajo del logo. Cuando acercás un par, se
            reconocen, se atraen y quedan unidos para el lavado, el secado, el
            cajón y la valija.
          </p>
          <div>
            <span>Lavá</span>
            <i>→</i>
            <span>Secá</span>
            <i>→</i>
            <span>Guardá</span>
            <i>→</i>
            <strong>Juntas</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
