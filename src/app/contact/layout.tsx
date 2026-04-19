import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & devis gratuit – Oryzon, constructeur à Caen",
  description:
    "Prenez rendez-vous avec Oryzon pour votre projet de construction, rénovation ou agrandissement en Calvados. Premier entretien gratuit et sans engagement à Caen.",
  alternates: { canonical: "https://oryzon.fr/contact" },
  openGraph: {
    title: "Contactez Oryzon – Devis gratuit, constructeur à Caen",
    description:
      "30 minutes avec notre équipe pour définir votre projet. Gratuit, sans engagement. Constructeur de maisons individuelles à Caen depuis 1994.",
    type: "website",
    url: "https://oryzon.fr/contact",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
