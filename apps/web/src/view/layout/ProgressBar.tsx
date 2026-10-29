"use client";
import { useRef } from "react";
import { useScrollProgress } from "@/logic/hooks/useScrollProgress";
import s from "./ProgressBar.module.css";

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref);
  return <div ref={ref} className={s.bar} aria-hidden="true" />;
}
