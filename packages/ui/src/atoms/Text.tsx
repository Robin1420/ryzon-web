import type { ElementType, ReactNode } from "react";
import { cx } from "../cx";
import s from "./Text.module.css";

type Props = { as?: ElementType; variant?: "body" | "lead" | "muted"; className?: string; children: ReactNode } & Record<string, unknown>;

export function Text({ as: Tag = "p", variant = "body", className, children, ...rest }: Props) {
  return <Tag className={cx(s.text, s[variant], className)} {...rest}>{children}</Tag>;
}
