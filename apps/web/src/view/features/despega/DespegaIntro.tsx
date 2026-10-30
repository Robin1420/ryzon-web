import { Button, Heading, Mono, Text } from "@ryzon/ui";
import { despegaApp, despegaDocuments } from "@/data/despega";
import s from "./DespegaIntro.module.css";

/** Presentación de la app y enlaces a sus documentos legales. */
export function DespegaIntro() {
  return (
    <section className={s.section} aria-labelledby="h-despega">
      <div className={s.wrap}>
        <Mono marker className={s.label}>{despegaApp.label}</Mono>
        <Heading as="h1" id="h-despega" text={despegaApp.title} reveal={false} className={s.title} />
        <Text variant="lead" className={s.text}>{despegaApp.text}</Text>
        <Text variant="muted" className={s.note}>{despegaApp.independent}</Text>
        <div className={s.docs}>
          <Mono className={s.docsLabel}>{despegaApp.linksLabel}</Mono>
          <div className={s.buttons}>
            {despegaDocuments.map((d) => (
              <Button key={d.slug} variant="solid" href={`/despega/${d.slug}`}>{d.title}</Button>
            ))}
          </div>
        </div>
        <Mono className={s.credit}>{despegaApp.developer}</Mono>
      </div>
    </section>
  );
}
