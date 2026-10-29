"use client";
import { useEffect, type RefObject } from "react";

/** Escribe el avance total de lectura (0–1) como escala horizontal de la barra. */
export function useScrollProgress(barRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [barRef]);
}
