"use client";
import { useRef } from "react";
import { Button, Heading, Mono, Text } from "@ryzon/ui";
import { hero } from "@/data/site";
import { services } from "@/data/services";
import { useHeroNetwork } from "@/logic/hooks/useHeroNetwork";
import { useFinePointer, useReducedMotion } from "@/logic/hooks/useMediaQuery";
import { scrollToService } from "@/logic/services/servicesScroller";
import s from "./HeroSection.module.css";

export function HeroSection() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  useHeroNetwork(canvas, reduced);

  return (
    <section className={s.hero} id="inicio" aria-labelledby="h-hero">
      <canvas ref={canvas} className={s.canvas} data-hero-canvas aria-hidden="true" />
      <div className={s.top} aria-hidden="true">
        <Mono>{hero.networkLabel}</Mono>
        <Mono>{fine ? hero.hintDesktop : hero.hintTouch}</Mono>
      </div>
      <div className={s.in} data-hero-content>
        <Heading as="h1" size="hero" id="h-hero" text={hero.title} accent={hero.accent} className={s.title} />
        <div className={s.row}>
          <div>
            <Text variant="lead" className={s.sub} data-hero-fade>{hero.subtitle}</Text>
            <span data-hero-fade><Button href="#formulario" magnetic>{hero.cta}</Button></span>
          </div>
          <div className={s.areas} data-hero-fade>
            <Mono className={s.areasLabel}>{hero.areasLabel}</Mono>
            {services.map((sv, i) => (
              <button key={sv.id} type="button" onClick={() => scrollToService(i)}>
                <span>{sv.index}</span><span>{sv.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={s.hint} aria-hidden="true" />
    </section>
  );
}
