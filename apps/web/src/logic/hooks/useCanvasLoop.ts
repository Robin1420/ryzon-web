"use client";
import { useEffect, useRef, type RefObject } from "react";

type Options = {
  /** Se llama al montar y al cambiar el tamaño. Recibe el tamaño CSS en píxeles. */
  onResize: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  /** Se llama en cada fotograma mientras el canvas está visible. `dt` en ms. */
  onFrame: (ctx: CanvasRenderingContext2D, t: number, dt: number) => void;
  /** Si es false, solo se dibuja al montar y al cambiar el tamaño. */
  animate: boolean;
};

/** Bucle de canvas con DPR limitado, redimensionado y pausa automática fuera de pantalla. */
export function useCanvasLoop(canvasRef: RefObject<HTMLCanvasElement | null>, options: Options) {
  const opts = useRef(options);
  opts.current = options;

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    let visible = false, raf = 0, last = 0;

    const resize = () => {
      const b = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = b.width * dpr; cv.height = b.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      opts.current.onResize(ctx, b.width, b.height);
      opts.current.onFrame(ctx, performance.now(), 0);
    };
    const loop = (t: number) => {
      if (!visible) return;
      opts.current.onFrame(ctx, t, t - last); last = t;
      if (opts.current.animate) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    resize();
    io.observe(cv);
    window.addEventListener("resize", resize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}
