import { ImageResponse } from "next/og";
import { hero } from "@/data/site";

export const dynamic = "force-static";
export const alt = "Ryzon — Servicios de TI en Perú: redes, monitoreo, software a medida y soporte";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen al compartir el enlace (WhatsApp, LinkedIn, Facebook, X). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#050505", color: "#f4f4f4", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="46" height="60" viewBox="42 0 291 375">
            <g fill="#F20611">
              <polygon points="42.61,102.58 96.75,70.52 96.75,308.26 42.61,276.2" />
              <polygon points="136.67,31.61 136.67,209.94 192.27,178.32 192.27,0" />
              <polygon points="181.43,186.64 181.43,375 237.03,343.38 237.03,155.03" />
              <polygon points="332.38,102.59 332.38,276.21 278.24,308.27 278.24,70.53" />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: 6 }}>RYZON</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>{`${hero.title}.`}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#a8a8a8" }}>Redes, monitoreo, software a medida y soporte · Perú</div>
        </div>
        <div style={{ width: 120, height: 8, background: "#F40612" }} />
      </div>
    ),
    size,
  );
}
