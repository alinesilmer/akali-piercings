import { PageIntro } from "../../components/layout/PageIntro";
import { PageShell } from "../../components/layout/PageShell";
import { Section } from "../../components/ui/Section";
import { CONTACT_INTRO } from "../../data/contact";
import { ContactChannels, ContactForm, ContactMap } from "../../sections/contact";

export default function Contact() {
  return (
    <PageShell>
      <PageIntro {...CONTACT_INTRO} />
      <Section flush="top">
        <div className="contact-body">
          <ContactChannels />
          <ContactForm />
        </div>
      </Section>
      <ContactMap />
    </PageShell>
  );
}
