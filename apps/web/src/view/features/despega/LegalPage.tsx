import { Heading, Mono } from "@ryzon/ui";
import type { LegalDocument } from "@/data/types";
import s from "./LegalPage.module.css";

/** Un documento legal completo, en HTML plano y legible sin JavaScript. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className={s.section} aria-labelledby="h-legal">
      <div className={s.wrap}>
        <Mono marker className={s.label}>Despega · Legal</Mono>
        <Heading as="h1" id="h-legal" text={doc.title} reveal={false} className={s.title} />
        <Mono className={s.updated}>Última actualización: {doc.updated}</Mono>
        <div className={s.body}>
          {doc.sections.map((sec) => (
            <section key={sec.title} className={s.item}>
              <h2 className={s.h}>{sec.title}</h2>
              <p className={s.p}>{sec.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
