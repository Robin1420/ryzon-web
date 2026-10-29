"use client";
import { usePageMotion } from "@/logic/hooks/usePageMotion";

/** No dibuja nada: activa el movimiento transversal de la página. Va después de todas las secciones. */
export function PageMotion() { usePageMotion(); return null; }
