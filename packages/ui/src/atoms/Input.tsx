import type { ComponentPropsWithoutRef } from "react";
import s from "./Control.module.css";

export function Input({ invalid, ...props }: ComponentPropsWithoutRef<"input"> & { invalid?: boolean }) {
  return <input className={s.control} aria-invalid={invalid || undefined} {...props} />;
}
