import type { NextConfig } from "next";

const config: NextConfig = {
  // Los paquetes del monorepo se publican como código fuente TS + CSS Modules.
  transpilePackages: ["@ryzon/ui", "@ryzon/tokens"],
  reactStrictMode: true,
  // Exportación estática: se publica la carpeta `out` (Cloudflare Pages).
  output: "export",
  images: { unoptimized: true },
};

export default config;
