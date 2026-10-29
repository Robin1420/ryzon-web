import { ChannelList, Heading, Mono, Text } from "@ryzon/ui";
import { contact } from "@/data/site";
import { ContactForm } from "./ContactForm";
import s from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="formulario" className={s.section} aria-labelledby="h-contact">
      <div className={s.grid}>
        <div className={s.copy}>
          <Mono marker>{contact.label}</Mono>
          <Heading id="h-contact" text={contact.title} accent={contact.accent} className={s.title} />
          <Text data-reveal>{contact.text}</Text>
          <div className={s.channels} data-reveal><ChannelList channels={contact.channels} /></div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
