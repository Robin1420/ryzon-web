import type { ElementType, ReactNode } from "react";
import { cx } from "../cx";
import s from "./Mono.module.css";

type Props = { as?: ElementType; marker?: boolean; className?: string; children: ReactNode };

/** Etiqueta pequeña en monoespaciada. `marker` añade el cuadro rojo de acento. */
export function Mono({ as: Tag = "p", marker, className, children }: Props) {
  return <Tag className={cx(s.mono, marker && s.marker, className)}>{children}</Tag>;
}
