import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import s from "./Control.module.css";

export function Select(props: ComponentPropsWithoutRef<"select">) {
  return <select className={cx(s.control, s.select)} {...props} />;
}
