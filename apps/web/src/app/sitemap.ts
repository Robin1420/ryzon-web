import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/logic/seo/siteUrl";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return site ? [{ url: site, changeFrequency: "monthly", priority: 1 }] : [];
}
