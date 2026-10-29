"use client";
import { useRef } from "react";
import { Mono } from "@ryzon/ui";
import { condense } from "@/data/site";
import { useReducedMotion } from "@/logic/hooks/useMediaQuery";
import { useCondense } from "@/logic/hooks/useCondense";
import s from "./CondenseStage.module.css";

/** Escena fija: la red se condensa en un solo punto rojo mientras se hace scroll. */
export function CondenseStage() {
  const stage = useRef<HTMLElement>(null), canvas = useRef<HTMLCanvasElement>(null);
  const text = useRef<HTMLParagraphElement>(null), count = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useCondense({ stage, canvas, text, count }, reduced);

  return (
    <section ref={stage} id="contacto" className={s.stage} aria-label="Contacto">
      <div className={s.in}>
        <canvas ref={canvas} className={s.canvas} aria-hidden="true" />
        <Mono marker className={s.label}>{condense.label}</Mono>
        <p ref={text} className={s.text} style={reduced ? { opacity: 1 } : undefined}>{condense.text}</p>
        <Mono className={s.count}><span aria-hidden="true">{condense.countLabel} <b ref={count}>000</b></span></Mono>
      </div>
    </section>
  );
}
