import type { ElementType } from "react";
import { cx } from "../cx";
import { SplitText } from "./SplitText";
import s from "./Heading.module.css";

type Props = {
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "panel";
  text: string;
  accent?: string;
  /** Si es true, las palabras se revelan con máscara al entrar en pantalla. */
  reveal?: boolean;
  id?: string;
  className?: string;
};

export function Heading({ as = "h2", size = "section", text, accent, reveal = true, id, className }: Props) {
  const Tag: ElementType = as;
  return (
    <Tag id={id} className={cx(s.heading, s[size], className)} {...(reveal ? { "data-split": "" } : {})}>
      {reveal ? <SplitText text={text} accent={accent} /> : <>{text}{accent}</>}
    </Tag>
  );
}
