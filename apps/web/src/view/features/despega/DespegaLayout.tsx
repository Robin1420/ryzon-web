import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark, Mono } from "@ryzon/ui";
import { footer } from "@/data/site";
import s from "./DespegaLayout.module.css";

/** Marco de las páginas de Despega: barra mínima con regreso a Ryzon y un pie sencillo. */
export function DespegaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={s.bar}>
        <Link href="/" aria-label="Ryzon, ir al inicio"><BrandMark /></Link>
        <Link className={s.back} href="/despega">Despega</Link>
      </header>
      <main id="contenido" className={s.main}>{children}</main>
      <footer className={s.footer}>
        <div className={s.footRow}>
          <Link href="/" aria-label="Ryzon, ir al inicio"><BrandMark /></Link>
          <Mono>{footer.legal}</Mono>
        </div>
      </footer>
    </>
  );
}
