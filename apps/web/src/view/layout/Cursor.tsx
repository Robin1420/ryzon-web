"use client";
import { useRef } from "react";
import { useCursor } from "@/logic/hooks/useCursor";
import s from "./Cursor.module.css";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null);
  useCursor(dot, ring);
  return (
    <>
      <div ref={dot} className={s.dot} aria-hidden="true" />
      <div ref={ring} className={`${s.ring} cursor-ring`} aria-hidden="true" />
    </>
  );
}
