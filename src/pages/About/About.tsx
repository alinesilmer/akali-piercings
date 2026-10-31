import { ClosingCta } from "../../components/layout/ClosingCta";
import { PageShell } from "../../components/layout/PageShell";
import { AboutIntro, Care, Luz, Promises, Work } from "../../sections/about";

export default function About() {
  return (
    <PageShell>
      <AboutIntro />
      <Luz />
      <Promises />
      <Care />
      <Work />
      <ClosingCta
        showPromo={false}
        title={
          <>
            Tu turno, <em>con calma.</em>
          </>
        }
      />
    </PageShell>
  );
}
