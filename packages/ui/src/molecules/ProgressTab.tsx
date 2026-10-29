import type { CSSProperties, ReactNode } from "react";
import { cx } from "../cx";
import s from "./ProgressTab.module.css";

type Props = { index: string; label: ReactNode; active: boolean; onSelect: () => void; "data-tab"?: number };

/** Pestaña con barra de avance. El avance (0–1) se escribe en la variable CSS `--p`. */
export function ProgressTab({ index, label, active, onSelect, ...rest }: Props) {
  return (
    <button type="button" className={cx(s.tab, active && s.on)} onClick={onSelect} aria-current={active ? "true" : undefined} {...rest}>
      <i className={s.bar} style={{ "--p": 0 } as CSSProperties} data-bar />
      <span>{index}</span>
      <span className={s.label}>{label}</span>
    </button>
  );
}
