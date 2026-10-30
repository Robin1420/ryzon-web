/** Tokens para código (canvas, SVG, animaciones). Deben coincidir con tokens.css. */
export const colors = {
  bg: "#050505",
  fg: "#f4f4f4",
  mut: "#a8a8a8",
  dim: "#6e6e6e",
  red: "#F40612",
  white: "#ffffff",
} as const;

export const breakpoints = {
  /** A partir de aquí se usa el diseño de escritorio con escenas fijas largas. */
  desktop: 900,
  /** Por debajo de este ancho se reduce el número de nodos y la complejidad. */
  small: 760,
} as const;

/** El visitante puede activar las animaciones aunque su sistema pida reducirlas (`data-motion="on"` en <html>). */
export const MOTION_KEY = "ryzon-motion";
const forced = () => typeof document !== "undefined" && document.documentElement.dataset.motion === "on";

/** Se evalúan al usarse (dentro de efectos), por eso son getters y no constantes. */
export const motion = {
  /** Preferencia real del sistema, sin override. */
  systemReducedQuery: "(prefers-reduced-motion: reduce)",
  get reducedQuery() { return forced() ? "not all" : "(prefers-reduced-motion: reduce)"; },
  get noPreferenceQuery() { return forced() ? "all" : "(prefers-reduced-motion: no-preference)"; },
  get fullQuery() { return `(min-width: ${breakpoints.desktop}px)${forced() ? "" : " and (prefers-reduced-motion: no-preference)"}`; },
  get liteQuery() { return `(max-width: ${breakpoints.desktop - 1}px)${forced() ? "" : " and (prefers-reduced-motion: no-preference)"}`; },
  finePointerQuery: "(hover: hover) and (pointer: fine)",
};


