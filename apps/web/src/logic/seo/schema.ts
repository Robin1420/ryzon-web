import { faqs } from "@/data/faq";
import { meta } from "@/data/site";
import { services } from "@/data/services";

type Json = Record<string, unknown>;

/**
 * Datos estructurados (JSON-LD) para buscadores. Solo usa información confirmada:
 * no incluye dirección, teléfono, reseñas ni clientes. Las URLs absolutas aparecen cuando hay dominio.
 */
export function buildSchemas(siteUrl?: string): Json[] {
  const id = siteUrl ? `${siteUrl}/#organizacion` : undefined;
  const area = { "@type": "Country", name: "Perú" };

  const organization: Json = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    ...(id && { "@id": id }),
    name: meta.brand,
    description: meta.description,
    ...(siteUrl && { url: siteUrl, logo: `${siteUrl}/icon.svg`, image: `${siteUrl}/opengraph-image` }),
    areaServed: area,
    knowsAbout: meta.keywords,
    serviceType: services.map((s) => s.label),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de TI",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.label, description: s.description, serviceType: s.topics.join(", "), areaServed: area, ...(id && { provider: { "@id": id } }) },
      })),
    },
  };

  const website: Json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: meta.brand,
    inLanguage: "es-PE",
    ...(siteUrl && { url: siteUrl }),
    ...(id && { publisher: { "@id": id } }),
  };

  const faq: Json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es-PE",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return [organization, website, faq];
}

/** Serializa para `<script type="application/ld+json">` evitando cerrar la etiqueta por accidente. */
export const toJsonLd = (data: Json) => JSON.stringify(data).replace(/</g, "\\u003c");
