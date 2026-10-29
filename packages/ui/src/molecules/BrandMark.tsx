import { Logo } from "../atoms/Logo";
import s from "./BrandMark.module.css";

export function BrandMark() {
  return (
    <span className={s.brand}>
      <Logo />
      <b className={s.word}>RYZON</b>
    </span>
  );
}
