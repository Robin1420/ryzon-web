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

export const motion = {
  reducedQuery: "(prefers-reduced-motion: reduce)",
  noPreferenceQuery: "(prefers-reduced-motion: no-preference)",
  fullQuery: `(min-width: ${breakpoints.desktop}px) and (prefers-reduced-motion: no-preference)`,
  liteQuery: `(max-width: ${breakpoints.desktop - 1}px) and (prefers-reduced-motion: no-preference)`,
  finePointerQuery: "(hover: hover) and (pointer: fine)",
} as const;


