import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { meta } from "@/data/site";
import { ColumnLines } from "@/view/layout/ColumnLines";
import { Cursor } from "@/view/layout/Cursor";
import { ProgressBar } from "@/view/layout/ProgressBar";
import { SkipLink } from "@/view/layout/SkipLink";
import "./globals.css";

export const metadata: Metadata = { title: meta.title, description: meta.description };
export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
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
