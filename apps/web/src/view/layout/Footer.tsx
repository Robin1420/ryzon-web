import { BrandMark, Mono } from "@ryzon/ui";
import { footer, nav } from "@/data/site";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.row}>
          <BrandMark />
          <nav className={s.links} aria-label="Pie de página">
            {nav.map((n) => <a key={n.id} href={n.href}>{n.label}</a>)}
          </nav>
        </div>
        <div className={s.big} aria-hidden="true">RYZON</div>
        <div className={s.row}><Mono>{footer.legal}</Mono><Mono>{footer.tagline}</Mono></div>
      </div>
    </footer>
  );
}
