import type { ReactNode } from "react";
import s from "./Control.module.css";

export function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return <label htmlFor={htmlFor} className={s.label}>{children}</label>;
}
