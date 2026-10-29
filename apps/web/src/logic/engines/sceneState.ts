import { clamp } from "../utils/math";

/**
 * Estado de avance de las escenas 3D. GSAP lo escribe con el scroll y las escenas lo leen
 * en cada fotograma (sin pasar por React, para no re-renderizar).
 */
export const servicesScene = { t: 0 }; // 0–4: una unidad por escena
export const figureScene = { fit: { p: 0 }, precision: { p: 0 }, growth: { p: 0 } }; // 0–1

/** Fracción (0–1) de `v` dentro del tramo [a, b]. */
export const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1);
export const smooth = (x: number) => x * x * (3 - 2 * x);
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
