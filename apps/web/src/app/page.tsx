import { ApproachSection } from "@/view/features/approach/ApproachSection";
import { CondenseStage } from "@/view/features/contact/CondenseStage";
import { ContactSection } from "@/view/features/contact/ContactSection";
import { FaqSection } from "@/view/features/faq/FaqSection";
import { HeroSection } from "@/view/features/hero/HeroSection";
import { ServicesSection } from "@/view/features/services/ServicesSection";
import { buildSchemas, toJsonLd } from "@/logic/seo/schema";
import { getSiteUrl } from "@/logic/seo/siteUrl";
import { Footer } from "@/view/layout/Footer";
import { Nav } from "@/view/layout/Nav";
import { PageMotion } from "@/view/layout/PageMotion";

/** Plantilla de la página: solo ordena las secciones. El contenido vive en `data/` y el comportamiento en `logic/`. */
export default function Page() {
  const schemas = buildSchemas(getSiteUrl());
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }} />
      ))}
      <Nav />
      <main id="contenido">
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <FaqSection />
        <CondenseStage />
        <ContactSection />
      </main>
      <Footer />
      <PageMotion />
    </>
  );
}
