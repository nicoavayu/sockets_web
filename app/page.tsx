import { Benefits } from "@/components/Benefits";
import { CampaignFilm } from "@/components/CampaignFilm";
import { ClacScene } from "@/components/ClacScene";
import { ContactSection } from "@/components/ContactSection";
import { CursorClac } from "@/components/CursorClac";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { IntroClac } from "@/components/IntroClac";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductGallery } from "@/components/ProductGallery";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Ticker } from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SmoothScroll />
      <CursorClac />
      <IntroClac />
      <Header />
      <main id="contenido">
        <Hero />
        <Ticker />
        <CampaignFilm />
        <ProblemSection />
        <ClacScene />
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
