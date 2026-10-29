import type { NextConfig } from "next";

const config: NextConfig = {
  // Los paquetes del monorepo se publican como código fuente TS + CSS Modules.
  transpilePackages: ["@ryzon/ui", "@ryzon/tokens"],
  reactStrictMode: true,
};

export default config;
