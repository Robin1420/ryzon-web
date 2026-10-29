"use client";
import { useEffect, type RefObject } from "react";
import { gsap } from "../engines/gsapSetup";
import { useFinePointer, useReducedMotion } from "./useMediaQuery";

const INTERACTIVE = "a,button,input,select,textarea,label";

/** Cursor sutil: punto exacto + anillo con inercia que crece sobre elementos interactivos. */
export function useCursor(dotRef: RefObject<HTMLElement | null>, ringRef: RefObject<HTMLElement | null>) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!enabled || !dot || !ring) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot, "x", { duration: 0.08 }), dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" }), ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: PointerEvent) => ring.classList.toggle("on", !!(e.target as Element).closest(INTERACTIVE));
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over);
    };
  }, [enabled, dotRef, ringRef]);

  return enabled;
}
