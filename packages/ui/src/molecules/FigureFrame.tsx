import type { ReactNode } from "react";
import { cx } from "../cx";
import s from "./FigureFrame.module.css";

type Props = { figure: string; caption: [string, string]; className?: string; children: ReactNode };

/** Marco para composiciones geométricas: contenido SVG + pie con número y nombre de figura. */
export function FigureFrame({ figure, caption, className, children }: Props) {
  return (
    <figure className={cx(s.fig, className)} data-figure={figure}>
      {children}
      <figcaption className={s.cap}><span>{caption[0]}</span><span>{caption[1]}</span></figcaption>
    </figure>
  );
}
