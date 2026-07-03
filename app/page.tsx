import { Benefits } from "@/components/Benefits";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { IntroMagnetLoader } from "@/components/IntroMagnetLoader";
import { MagneticSockScene } from "@/components/MagneticSockScene";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductGallery } from "@/components/ProductGallery";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <IntroMagnetLoader />
      <Header />
      <main id="contenido">
        <Hero />
        <div aria-hidden="true" className="brand-ticker">
          <div>
            NUNCA MÁS PIERDAS UNA MEDIA · DOS POLOS · CERO DRAMA · NUNCA MÁS
            PIERDAS UNA MEDIA · DOS POLOS · CERO DRAMA ·
          </div>
        </div>
        <ProblemSection />
        <MagneticSockScene />
        <HowItWorks />
        <Benefits />
        <ProductGallery />
        <ManifestoSection />
        <ContactSection />
      </main>
      <Footer />
      <div aria-hidden="true" className="site-grain" />
    </>
  );
}
