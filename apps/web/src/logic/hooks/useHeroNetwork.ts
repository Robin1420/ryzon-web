"use client";
import { useEffect, useMemo, type RefObject } from "react";
import { breakpoints } from "@ryzon/tokens";
import { createHeroNetwork } from "../engines/heroNetwork";
import { useCanvasLoop } from "./useCanvasLoop";

/** Conecta el motor de la red del inicio con su canvas y con el puntero. */
export function useHeroNetwork(canvasRef: RefObject<HTMLCanvasElement | null>, reduced: boolean) {
  const net = useMemo(() => createHeroNetwork(), []);

  useCanvasLoop(canvasRef, {
    animate: !reduced,
    onResize: (_c, w, h) => net.resize(w, h, window.innerWidth < breakpoints.small),
    onFrame: (ctx, t, dt) => { if (!reduced) net.update(t, dt); net.draw(ctx); },
  });

  useEffect(() => {
    if (reduced) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const move = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); net.setMouse(e.clientX - b.left, e.clientY - b.top); };
    const leave = () => net.clearMouse();
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, [canvasRef, net, reduced]);
}
