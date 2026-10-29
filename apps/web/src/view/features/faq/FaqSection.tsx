import { Heading, Mono } from "@ryzon/ui";
import { faqIntro, faqs } from "@/data/faq";
import s from "./FaqSection.module.css";

/** Preguntas con respuesta visible en el HTML (sin JavaScript), usando <details> nativo. */
export function FaqSection() {
  return (
    <section id="preguntas" className={s.section} aria-labelledby="h-faq">
      <div className={s.wrap}>
        <Mono marker className={s.label}>{faqIntro.label}</Mono>
        <Heading id="h-faq" text={faqIntro.title} className={s.title} />
        <div className={s.list}>
          {faqs.map((f) => (
            <details key={f.q} className={s.item}>
              <summary className={s.q}><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p className={s.a}>{f.a}</p>
            </details>
          ))}
        </div>
        <p className={s.cta}>¿Tienes otra duda? <a href="#formulario">Escríbenos</a> y te respondemos.</p>
      </div>
    </section>
  );
}
