import type { ReactNode } from "react";
import { cx } from "../cx";
import s from "./NavLink.module.css";

type Props = { href: string; active?: boolean; children: ReactNode; onClick?: () => void };

export function NavLink({ href, active, children, onClick }: Props) {
  return (
    <a href={href} onClick={onClick} className={cx(s.link, active && s.active)} aria-current={active ? "true" : undefined}>
      {children}
    </a>
  );
}
