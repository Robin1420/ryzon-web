import { ApproachSection } from "@/view/features/approach/ApproachSection";
import { CondenseStage } from "@/view/features/contact/CondenseStage";
import { ContactSection } from "@/view/features/contact/ContactSection";
import { HeroSection } from "@/view/features/hero/HeroSection";
import { ServicesSection } from "@/view/features/services/ServicesSection";
import { Footer } from "@/view/layout/Footer";
import { Nav } from "@/view/layout/Nav";
import { PageMotion } from "@/view/layout/PageMotion";

/** Plantilla de la página: solo ordena las secciones. El contenido vive en `data/` y el comportamiento en `logic/`. */
export default function Page() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <CondenseStage />
        <ContactSection />
      </main>
      <Footer />
      <PageMotion />
    </>
  );
}
