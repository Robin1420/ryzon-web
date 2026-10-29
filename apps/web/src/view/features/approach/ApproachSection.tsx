"use client";
import { useRef, type ReactNode } from "react";
import { FigureFrame, Heading, Mono, Text } from "@ryzon/ui";
import { principles } from "@/data/approach";
import { approachIntro } from "@/data/site";
import type { FigureId } from "@/data/types";
import { useApproachFigures } from "@/logic/hooks/useApproachFigures";
import { FitScene, GrowthScene, PrecisionScene } from "../../scenes/FigureScenes";
import s from "./ApproachSection.module.css";

const figures: Record<FigureId, ReactNode> = {
  fit: <FitScene />,
  precision: <PrecisionScene />,
  growth: <GrowthScene />,
};

export function ApproachSection() {
  const section = useRef<HTMLElement>(null);
  useApproachFigures(section);

  return (
    <section ref={section} id="enfoque" className={s.section} aria-labelledby="h-appr">
      <div className={s.wrap}>
        <div className={s.head}>
          <Mono marker className={s.headLabel}>{approachIntro.label}</Mono>
          <Heading id="h-appr" text={approachIntro.title} className={s.headTitle} />
        </div>
        {principles.map((p) => (
          <article key={p.id} className={`${s.row} ${p.reversed ? s.rev : ""}`}>
            <div className={s.text}>
              <Mono>{p.kicker}</Mono>
              <h3 className={s.title} data-reveal>{p.title}</h3>
              <Text data-reveal>{p.text}</Text>
            </div>
            <FigureFrame className={s.fig} figure={p.figure} caption={p.figureCaption}>{figures[p.figure]}</FigureFrame>
          </article>
        ))}
      </div>
    </section>
  );
}
