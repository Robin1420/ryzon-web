"use client";
import { motionToggle } from "@/data/site";
import { useMotionOverride } from "@/logic/hooks/useMotionOverride";
import s from "./MotionToggle.module.css";

/** Solo aparece si el sistema pide reducir el movimiento (o si ya se activó el override). */
export function MotionToggle() {
  const { visible, forced, toggle } = useMotionOverride();
  if (!visible) return null;
  return (
    <button type="button" className={s.btn} onClick={toggle} aria-pressed={forced}>
      {forced ? motionToggle.off : motionToggle.on}
    </button>
  );
}
