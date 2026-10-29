"use client";
import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import s from "./lazy.module.css";

/**
 * Carga la escena 3D (three.js y el modelo) solo cuando su zona se acerca a la pantalla.
 * Hasta entonces deja un hueco del mismo tamaño, así la página no se mueve al cargar.
 */
function lazyScene(loader: () => Promise<{ default: ComponentType }>) {
  const Scene = lazy(loader);
  return function LazyScene() {
    const box = useRef<HTMLDivElement>(null);
    const [near, setNear] = useState(false);
    useEffect(() => {
      const el = box.current;
      if (!el) return;
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "700px" });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return (
      <div ref={box} className={s.slot}>
        {near && <Suspense fallback={null}><Scene /></Suspense>}
      </div>
    );
  };
}

export const ServicesScene3D = lazyScene(() => import("./ServicesScene").then((m) => ({ default: m.ServicesScene })));
export const FitScene3D = lazyScene(() => import("./FigureScenes").then((m) => ({ default: m.FitScene })));
export const PrecisionScene3D = lazyScene(() => import("./FigureScenes").then((m) => ({ default: m.PrecisionScene })));
export const GrowthScene3D = lazyScene(() => import("./FigureScenes").then((m) => ({ default: m.GrowthScene })));
