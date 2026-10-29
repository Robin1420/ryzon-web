import type { ReactNode } from "react";
import { cx } from "../cx";
import { Label } from "../atoms/Label";
import s from "./Field.module.css";

type ControlProps = { id: string; "aria-describedby"?: string; invalid: boolean };
type Props = { id: string; label: ReactNode; error?: string; children: (control: ControlProps) => ReactNode };

/** Etiqueta + control + mensaje de error, con los atributos de accesibilidad ya enlazados. */
export function Field({ id, label, error, children }: Props) {
  const errId = `${id}-err`;
  return (
    <div className={cx(s.field, error && s.bad)}>
      <Label htmlFor={id}>{label}</Label>
      {children({ id, "aria-describedby": error ? errId : undefined, invalid: !!error })}
      {error && <p className={s.err} id={errId}>{error}</p>}
    </div>
  );
}
