"use client";
import { useMemo, type RefObject } from "react";
import { breakpoints } from "@ryzon/tokens";
import { createCondenseScene } from "../engines/condense";
import { clamp } from "../utils/math";
import { useCanvasLoop } from "./useCanvasLoop";

type Refs = {
  stage: RefObject<HTMLElement | null>;
  canvas: RefObject<HTMLCanvasElement | null>;
  text: RefObject<HTMLElement | null>;
  count: RefObject<HTMLElement | null>;
};

/** El avance del scroll dentro de la escena (0–1) condensa la red en un punto rojo. */
export function useCondense({ stage, canvas, text, count }: Refs, reduced: boolean) {
  const scene = useMemo(() => createCondenseScene(), []);

  useCanvasLoop(canvas, {
    animate: !reduced,
    onResize: (_c, w, h) => scene.resize(w, h, window.innerWidth < breakpoints.small),
    onFrame: (ctx, t) => {
      let p = 1;
      const el = stage.current;
      if (!reduced && el) { const b = el.getBoundingClientRect(); p = clamp(-b.top / (b.height - window.innerHeight), 0, 1); }
      const out = scene.draw(ctx, p, t, !reduced);
      if (text.current && !reduced) {
        text.current.style.opacity = String(out.textProgress);
        text.current.style.transform = `translateY(${(1 - out.textProgress) * 26}px)`;
      }
      if (count.current) count.current.textContent = String(out.nodeCount).padStart(3, "0");
    },
  });
}
