import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import s from "./Control.module.css";

export function Textarea({ invalid, ...props }: ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean }) {
  return <textarea className={cx(s.control, s.area)} aria-invalid={invalid || undefined} {...props} />;
}
