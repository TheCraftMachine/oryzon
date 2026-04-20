import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réalisations – Maisons construites & rénovées en Calvados",
  description:
    "Portfolio de 800+ réalisations : maisons individuelles sur mesure, rénovations complètes et extensions à Caen et en Calvados. Photos, surfaces et détails de chaque projet.",
  alternates: { canonical: "https://oryzon.fr/realisations" },
  keywords: [
    "réalisations constructeur maison Caen",
    "maisons construites Calvados",
    "portfolio construction sur mesure Normandie",
    "exemples maisons individuelles Calvados",
    "maison contemporaine Caen",
    "rénovation maison Normandie photos",
    "extension maison Calvados",
  ],
  openGraph: {
    title: "Réalisations Oryzon – 800+ constructions & rénovations en Calvados",
    description:
      "Maisons contemporaines, longères rénovées, extensions vitrées… Découvrez 800+ projets réalisés en Calvados par Oryzon depuis 1994.",
    type: "website",
    url: "https://oryzon.fr/realisations",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://oryzon.fr/realisations#page",
  name: "Réalisations Oryzon – Maisons construites et rénovées en Calvados",
  url: "https://oryzon.fr/realisations",
  description:
    "Portfolio de plus de 800 maisons individuelles construites, rénovées et agrandies en Calvados et Normandie par Oryzon depuis 1994.",
  about: {
    "@type": "Thing",
    name: "Construction de maisons sur mesure en Calvados",
  },
  provider: { "@id": "https://oryzon.fr/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://oryzon.fr" },
      { "@type": "ListItem", position: 2, name: "Réalisations", item: "https://oryzon.fr/realisations" },
    ],
  },
};

export default function RealisationsLayout({ children }: { children: React.ReactNode }) {
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
