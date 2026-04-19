import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Oryzon – Constructeur de maisons individuelles sur mesure à Caen, Calvados",
  description:
    "Oryzon construit votre maison sur mesure en Calvados depuis 1994. Construction neuve, rénovation, agrandissement à Caen et dans toute la Normandie. Devis gratuit, prix fixe garanti, visualisation en réalité virtuelle.",
  alternates: { canonical: "https://oryzon.fr" },
  openGraph: {
    title: "Oryzon – Constructeur de maisons sur mesure à Caen, Calvados",
    description:
      "30 ans d'expertise en construction sur mesure en Normandie. Prix fixe garanti, interlocuteur unique, réalité virtuelle avant le premier coup de pelle.",
    type: "website",
    url: "https://oryzon.fr",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};
import ServicesSection from "@/components/sections/ServicesSection";
import VRSection from "@/components/sections/VRSection";
import ProcessSection from "@/components/sections/ProcessSection";
import RealisationsSection from "@/components/sections/RealisationsSection";
import WhySection from "@/components/sections/WhySection";
import FounderSection from "@/components/sections/FounderSection";
import FAQSection from "@/components/sections/FAQSection";
import CTAFinalSection from "@/components/sections/CTAFinalSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <VRSection />
      <ProcessSection />
      <RealisationsSection />
      <WhySection />
      <FounderSection />
      <FAQSection />
      <CTAFinalSection />
    </>
  );
}
