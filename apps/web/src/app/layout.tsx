import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { meta } from "@/data/site";
import { getSiteUrl } from "@/logic/seo/siteUrl";
import { ColumnLines } from "@/view/layout/ColumnLines";
import { Cursor } from "@/view/layout/Cursor";
import { ProgressBar } from "@/view/layout/ProgressBar";
import { SkipLink } from "@/view/layout/SkipLink";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl) }),
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  applicationName: meta.brand,
  authors: [{ name: meta.brand }],
  creator: meta.brand,
  alternates: { canonical: "/", languages: { "es-PE": "/" } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  openGraph: { title: meta.title, description: meta.description, type: "website", locale: meta.locale, siteName: meta.brand, url: "/" },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  other: { "geo.region": "PE", "geo.placename": "Perú" },
};

export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-PE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Inter+Tight:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SkipLink />
        <ProgressBar />
        <Cursor />
        <ColumnLines />
        {children}
      </body>
    </html>
  );
}
