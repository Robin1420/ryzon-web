import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import s from "./Button.module.css";

type Base = { variant?: "outline" | "solid"; arrow?: boolean; magnetic?: boolean; children: ReactNode };
type AsLink = Base & Omit<ComponentPropsWithoutRef<"a">, keyof Base> & { href: string };
type AsButton = Base & Omit<ComponentPropsWithoutRef<"button">, keyof Base> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const { variant = "outline", arrow = true, magnetic, children, className, ...rest } = props as Base & { className?: string } & Record<string, unknown>;
  const cls = cx(s.btn, variant === "solid" && s.solid, className);
  const inner = (
    <>
      <span className={s.sq} />
      {children}
      {arrow && <span className={s.ar} />}
    </>
  );
  const mag = magnetic ? { "data-mag": "" } : {};
  if ("href" in props && props.href !== undefined) {
    return <a className={cls} {...mag} {...(rest as object)}>{inner}</a>;
  }
  return <button className={cls} {...mag} {...(rest as object)}>{inner}</button>;
}
