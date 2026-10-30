import type { MetadataRoute } from "next";
import { despegaDocuments } from "@/data/despega";
import { getSiteUrl } from "@/logic/seo/siteUrl";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  if (!site) return [];
  return [
    { url: site, changeFrequency: "monthly", priority: 1 },
    { url: `${site}/despega`, changeFrequency: "monthly", priority: 0.6 },
    ...despegaDocuments.map((d) => ({ url: `${site}/despega/${d.slug}`, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
