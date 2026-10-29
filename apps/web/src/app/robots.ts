import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/logic/seo/siteUrl";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return { rules: { userAgent: "*", allow: "/" }, ...(site && { sitemap: `${site}/sitemap.xml`, host: site }) };
}
