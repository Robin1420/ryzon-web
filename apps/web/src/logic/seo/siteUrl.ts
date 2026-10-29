/**
 * Dirección pública del sitio. El dominio aún no está confirmado: se toma de NEXT_PUBLIC_SITE_URL
 * (o del dominio de producción de Vercel). Sin dominio no se emiten URLs absolutas.
 */
export function getSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : undefined);
  return raw ? raw.replace(/\/+$/, "") : undefined;
}
