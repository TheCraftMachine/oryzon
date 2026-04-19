import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réalisations – Maisons construites & rénovées en Calvados",
  description:
    "Découvrez nos réalisations : constructions, rénovations et agrandissements en Calvados. Plus de 30 ans d'expertise au service de votre projet immobilier à Caen et en Normandie.",
  alternates: { canonical: "https://oryzon.fr/realisations" },
  openGraph: {
    title: "Réalisations Oryzon – Constructions & rénovations en Calvados",
    description:
      "Galeries photos de nos chantiers terminés : maisons contemporaines, longères rénovées, extensions vitrées… Toute notre expertise en un coup d'œil.",
    type: "website",
    url: "https://oryzon.fr/realisations",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};

export default function RealisationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
