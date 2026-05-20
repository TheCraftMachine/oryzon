import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oryzon – Constructeur de maisons sur mesure à Caen, Calvados",
    template: "%s | Oryzon",
  },
  description:
    "Oryzon conçoit et construit votre maison sur mesure en Calvados. Construction, rénovation, agrandissement. Visualisez votre projet en réalité virtuelle avant le premier coup de pelle.",
  keywords: [
    "constructeur maison Caen",
    "construction sur mesure Calvados",
    "constructeur maison individuelle Normandie",
    "rénovation maison Caen",
    "agrandissement maison Calvados",
  ],
  authors: [{ name: "Oryzon" }],
  creator: "Oryzon",
  metadataBase: new URL("https://oryzon.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Oryzon",
    title: "Oryzon – Constructeur de maisons sur mesure à Caen",
    description:
      "Construisez la maison de vos rêves avec Oryzon. 30 ans de métier, un interlocuteur unique, et la réalité virtuelle pour visualiser votre projet.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": "https://oryzon.fr/#organization",
      name: "Oryzon",
      url: "https://oryzon.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://oryzon.fr/images/logo_oryzon.webp",
        width: 1071,
        height: 208,
      },
      image: "https://oryzon.fr/images/hero.jpg",
      description:
        "Constructeur de maisons individuelles sur mesure à Caen depuis 1994. Construction neuve, rénovation et agrandissement en Calvados et Normandie. Prix fixe garanti, interlocuteur unique, visualisation VR.",
      slogan: "Votre maison, telle que vous l'imaginez.",
      foundingDate: "1994",
      email: "contact@maison-oryzon.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Caen",
        addressLocality: "Caen",
        addressRegion: "Calvados",
        postalCode: "14000",
        addressCountry: "FR",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Calvados" },
        { "@type": "AdministrativeArea", name: "Normandie" },
        { "@type": "City", name: "Caen" },
        { "@type": "City", name: "Bayeux" },
        { "@type": "City", name: "Lisieux" },
        { "@type": "City", name: "Hérouville-Saint-Clair" },
        { "@type": "City", name: "Falaise" },
        { "@type": "City", name: "Vire" },
        { "@type": "City", name: "Honfleur" },
        { "@type": "City", name: "Deauville" },
        { "@type": "City", name: "Cabourg" },
        { "@type": "City", name: "Courseulles-sur-Mer" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de construction et rénovation",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Construction de maison individuelle sur mesure",
              url: "https://oryzon.fr/construire",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rénovation de maison",
              url: "https://oryzon.fr/renover",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Extension et agrandissement de maison",
              url: "https://oryzon.fr/agrandir",
            },
          },
        ],
      },
      knowsAbout: [
        "Construction maison individuelle",
        "Maison sur mesure",
        "Rénovation thermique",
        "Extension maison",
        "Surélévation",
        "Permis de construire",
        "RT2020",
        "Réalité virtuelle architecture",
        "Maison BBC",
        "Ossature bois",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
        bestRating: "5",
      },
      priceRange: "€€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Virement, Chèque",
      sameAs: [
        "https://www.houzz.fr/pro/oryzon",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://oryzon.fr/#website",
      url: "https://oryzon.fr",
      name: "Oryzon",
      description: "Constructeur de maisons sur mesure en Calvados",
      publisher: { "@id": "https://oryzon.fr/#organization" },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://oryzon.fr/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[--color-bg] text-[--color-text]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
