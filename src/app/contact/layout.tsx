import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & devis gratuit – Oryzon, constructeur à Caen",
  description:
    "Prenez rendez-vous avec Oryzon pour votre projet de construction, rénovation ou agrandissement en Calvados. Premier entretien gratuit et sans engagement.",
  alternates: { canonical: "https://oryzon.fr/contact" },
  keywords: [
    "contact constructeur maison Caen",
    "devis construction maison Calvados",
    "rendez-vous constructeur Normandie",
    "devis rénovation maison Caen",
    "devis extension maison Calvados",
    "constructeur maison Caen contact",
  ],
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

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://oryzon.fr/contact#page",
  name: "Contact Oryzon – Devis gratuit",
  url: "https://oryzon.fr/contact",
  description:
    "Prenez rendez-vous avec Oryzon pour votre projet de construction, rénovation ou agrandissement en Calvados. Premier RDV gratuit et sans engagement.",
  provider: { "@id": "https://oryzon.fr/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://oryzon.fr" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://oryzon.fr/contact" },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {children}
    </>
  );
}
