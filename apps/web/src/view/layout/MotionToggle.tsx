"use client";
import { motionToggle } from "@/data/site";
import { useMotionOverride } from "@/logic/hooks/useMotionOverride";
import s from "./MotionToggle.module.css";

/** Va en el encabezado. Solo aparece si el sistema pide reducir el movimiento (o si ya se activó el override). */
export function MotionToggle() {
  const { visible, forced, toggle } = useMotionOverride();
  if (!visible) return null;
  const label = forced ? motionToggle.off : motionToggle.on;
  return (
    <button type="button" className={s.btn} onClick={toggle} aria-pressed={forced} aria-label={label.long}>
      <span className={s.long} aria-hidden="true">{label.long}</span>
      <span className={s.short} aria-hidden="true">{label.short}</span>
    </button>
  );
}
