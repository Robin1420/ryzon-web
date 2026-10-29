"use client";
import { useRef } from "react";
import { Heading, Mono, ProgressTab, Text } from "@ryzon/ui";
import { services } from "@/data/services";
import { servicesIntro } from "@/data/site";
import { useReducedMotion } from "@/logic/hooks/useMediaQuery";
import { useServicesScene } from "@/logic/hooks/useServicesScene";
import { scrollToService } from "@/logic/services/servicesScroller";
import { ModelCredit } from "../../layout/ModelCredit";
import { ServicesScene3D } from "../../scenes/lazy";
import s from "./ServicesSection.module.css";

export function ServicesSection() {
  const stage = useRef<HTMLDivElement>(null);
  const scene = useServicesScene(stage);
  const reduced = useReducedMotion();

  return (
    <section id="servicios" aria-labelledby="h-svc">
      <div className={s.intro}>
        <Mono marker className={s.introLabel}>{servicesIntro.label}</Mono>
        <Heading id="h-svc" text={servicesIntro.title} className={s.introTitle} />
        <Text variant="muted" className={s.introText} data-reveal>{servicesIntro.text}</Text>
      </div>

      <div ref={stage} className={s.stage} data-static={reduced || undefined}>
        <div className={s.frame}>
          <div className={s.copy}>
            <div className={s.count}><b>{"0" + (scene + 1)}</b><Mono as="span">/ 04</Mono></div>
            <div className={s.panels}>
              {services.map((sv) => (
                <article key={sv.id} className={s.panel} data-panel>
                  <Mono>{sv.label}</Mono>
                  <h3 className={s.panelTitle}>{sv.title}</h3>
                  <Text>{sv.description}</Text>
                  <p className={s.benefit}><Mono as="span" className={s.benefitLabel}>{servicesIntro.benefitLabel}</Mono>{sv.benefit}</p>
                  {sv.note && <Mono className={s.note}>{sv.note}</Mono>}
                </article>
              ))}
            </div>
            <div className={s.tabs} role="group" aria-label="Ir a un servicio">
              {services.map((sv, i) => (
                <ProgressTab key={sv.id} data-tab={i} index={sv.index} label={sv.short} active={i === scene} onSelect={() => scrollToService(i)} />
              ))}
            </div>
          </div>

          <div className={s.diagram}>
            <div className={s.diagramTop} aria-hidden="true"><Mono>Diagrama de sistema</Mono><Mono>Escena 0{scene + 1} / 04</Mono></div>
            <ServicesScene3D />
            <ModelCredit className={s.credit} />
            <div className={s.caps} aria-hidden="true">
              {services.map((sv) => (
                <span key={sv.id} className={`${s.cap} ${sv.scene.tone === "alert" ? s.alert : sv.scene.tone === "ok" ? s.ok : ""}`} data-cap>
                  <i />{sv.scene.caption}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
