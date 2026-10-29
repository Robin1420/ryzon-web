import { Fragment } from "react";
import s from "./SplitText.module.css";

type Props = { text: string; accent?: string };

/**
 * Divide un titular en palabras con máscara (overflow oculto).
 * Cada palabra lleva `data-word` para que la capa de animación las revele.
 * `accent` es el cierre en rojo (por ejemplo el punto final).
 */
export function SplitText({ text, accent }: Props) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className={s.w}>
            <i data-word>
              {word}
              {accent && i === words.length - 1 ? <span className={s.accent}>{accent}</span> : null}
            </i>
          </span>
        </Fragment>
      ))}
    </>
  );
}
