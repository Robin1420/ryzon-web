import type { Metadata } from "next";
import { despegaPrivacy } from "@/data/despega";
import { DespegaLayout } from "@/view/features/despega/DespegaLayout";
import { LegalPage } from "@/view/features/despega/LegalPage";

export const metadata: Metadata = {
  title: `${despegaPrivacy.title} de Despega | Ryzon`,
  description: despegaPrivacy.description,
  alternates: { canonical: "/despega/privacidad" },
  openGraph: { title: `${despegaPrivacy.title} de Despega`, description: despegaPrivacy.description, type: "article", url: "/despega/privacidad" },
};

export default function Page() {
  return (
    <DespegaLayout>
      <LegalPage doc={despegaPrivacy} />
    </DespegaLayout>
  );
}
