import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Construction maison individuelle sur mesure – Caen, Calvados (14)",
  description:
    "Oryzon conçoit et construit votre maison individuelle sur mesure à Caen et dans tout le Calvados. Prix fixe garanti, délais contractuels, visualisation VR avant le chantier. Devis gratuit.",
  alternates: { canonical: "https://oryzon.fr/construire" },
  keywords: [
    "construction maison individuelle Caen",
    "constructeur maison sur mesure Calvados",
    "construction maison Normandie",
    "constructeur maison Caen",
    "maison sur mesure Calvados 14",
    "constructeur maison individuelle Normandie",
  ],
  openGraph: {
    title: "Construction maison sur mesure à Caen – Oryzon Calvados",
    description:
      "Construisez votre maison sur mesure avec Oryzon, constructeur indépendant en Calvados depuis 1994. Aucun plan catalogue, prix fixe, interlocuteur unique.",
    type: "website",
    url: "https://oryzon.fr/construire",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};

const data: ServiceData = {
  tag: "Construction sur mesure",
  hero: {
    headline: "Votre maison,\nconstruite depuis\nzéro.",
    goldWord: "zéro.",
    subtitle:
      "Pas de plans standard. Pas de catalogue. Votre terrain, votre exposition, votre vie — traduits en architecture.",
    image: "/images/service-construction.jpg",
    imageAlt: "Maison individuelle construite sur mesure par Oryzon en Calvados",
  },
  promise: {
    eyebrow: "Notre engagement",
    headline: "Un prix fixe. Des délais tenus. Une maison qui vous ressemble.",
    goldPart: "qui vous ressemble.",
    body: "Construire une maison est le projet d'une vie. Nous le traitons comme tel — avec une transparence totale sur les coûts, un calendrier contractuel et un interlocuteur unique du premier coup de crayon à la remise des clés.",
    cards: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        title: "Prix fixe garanti",
        body: "Le devis signé est le prix final. Aucune révision en cours de chantier, aucune mauvaise surprise à la livraison.",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#C49A5A" strokeWidth="1.5" />
            <path d="M12 7v5l3 3" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        title: "Délais contractuels",
        body: "Votre date de livraison est inscrite au contrat. Des rapports hebdomadaires vous tiennent informé à chaque étape.",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M2 12h20M12 2l10 10-10 10" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "100 % sur mesure",
        body: "Chaque plan est conçu pour votre terrain, votre orientation et votre façon de vivre. Aucun plan catalogue.",
      },
    ],
  },
  forWho: {
    headline: "Vous reconnaissez-vous dans l'une de ces situations ?",
    goldPart: "l'une de ces situations ?",
    situations: [
      {
        title: "Vous avez un terrain et une vision",
        body: "Vous savez ce que vous voulez mais pas encore comment le traduire en plans. On s'en charge.",
      },
      {
        title: "Vous voulez du sur-mesure, pas du catalogue",
        body: "Les constructeurs de maisons de série ne correspondent pas à votre projet. Vous cherchez quelqu'un qui part de zéro.",
      },
      {
        title: "Vous avez peur des dérapages de coûts",
        body: "Vous avez entendu des histoires de chantiers qui explosent le budget. Notre contrat à prix fixe vous protège.",
      },
      {
        title: "Vous ne voulez pas gérer dix interlocuteurs",
        body: "Architecte, maçon, électricien, plombier... Chez Oryzon, un seul chef de projet coordonne tout.",
      },
      {
        title: "Vous voulez voir avant de construire",
        body: "Grâce à notre technologie VR, vous visitez votre maison en 3D immersive avant le premier coup de pelle.",
      },
      {
        title: "Vous visez le long terme",
        body: "Matériaux durables, isolation performante, architecture intemporelle. Votre maison dans 30 ans.",
      },
    ],
  },
  process: {
    headline: "De l'esquisse aux clés, en toute transparence.",
    goldPart: "en toute transparence.",
    steps: [
      {
        number: "01",
        title: "Rendez-vous découverte",
        body: "On écoute votre projet, votre terrain, vos envies. Pas de devis forcé — juste une conversation pour comprendre ce que vous voulez construire.",
        duration: "30 min",
      },
      {
        number: "02",
        title: "Conception des plans",
        body: "Votre maison prend forme. Plans d'architecte sur mesure, façades, coupes, notice descriptive — tout est adapté à votre terrain et à votre mode de vie.",
        duration: "4–6 semaines",
      },
      {
        number: "03",
        title: "Visite en réalité virtuelle",
        body: "Vous enfilez le casque et vous visitez votre future maison pièce par pièce, à l'échelle réelle. Vous ajustez, vous validez, puis vous signez.",
        duration: "1 séance",
      },
      {
        number: "04",
        title: "Permis & démarches",
        body: "Nous gérons le dépôt du permis de construire, les relations avec les administrations et les déclarations préalables.",
        duration: "2–4 mois",
      },
      {
        number: "05",
        title: "Chantier & suivi",
        body: "Un seul interlocuteur suit votre chantier du premier coup de pelle à la réception. Rapports hebdomadaires, accès au suivi en temps réel.",
        duration: "10–14 mois",
      },
      {
        number: "06",
        title: "Remise des clés",
        body: "Votre maison est livrée conforme aux plans, aux délais et au budget. Garanties décennale, biennale et parfait achèvement incluses.",
        duration: "Jour J",
      },
    ],
  },
  faq: [
    {
      question: "Combien coûte la construction d'une maison individuelle ?",
      answer:
        "Le coût varie selon la superficie, les matériaux et les finitions. En Calvados, comptez entre 1 800 et 2 800 €/m² pour une construction sur mesure de qualité. Nous établissons un devis détaillé après le premier rendez-vous.",
    },
    {
      question: "Faut-il déjà avoir un terrain ?",
      answer:
        "Non. Nous pouvons vous accompagner dans la recherche de terrain. Nous connaissons bien le marché du Calvados et pouvons vous orienter vers des zones adaptées à votre projet et votre budget.",
    },
    {
      question: "Combien de temps prend la construction ?",
      answer:
        "De la signature du contrat à la remise des clés, comptez 12 à 18 mois selon la complexité du projet, incluant le dépôt du permis de construire (2 à 4 mois) et le chantier (10 à 14 mois).",
    },
    {
      question: "Proposez-vous des maisons bioclimatiques ou à faible consommation ?",
      answer:
        "Oui. Tous nos projets intègrent les standards RT2020. Nous proposons également des options plus poussées : ossature bois, isolation renforcée, panneaux solaires, récupération d'eaux pluviales.",
    },
    {
      question: "Que couvre la garantie décennale ?",
      answer:
        "La garantie décennale couvre pendant 10 ans tous les désordres affectant la solidité de l'ouvrage ou le rendant impropre à sa destination : fondations, murs porteurs, charpente, toiture, étanchéité.",
    },
  ],
  others: [
    { label: "Agrandissement & extension", href: "/agrandir", tag: "Extension" },
    { label: "Rénovation & transformation", href: "/renover", tag: "Rénovation" },
  ],
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://oryzon.fr/construire#service",
      name: "Construction de maison individuelle sur mesure en Calvados",
      serviceType: "Construction de maison individuelle",
      provider: { "@id": "https://oryzon.fr/#organization" },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Calvados" },
        { "@type": "City", name: "Caen" },
      ],
      description:
        "Construction de maisons individuelles entièrement sur mesure en Calvados. Plans personnalisés pour chaque terrain, prix fixe garanti, interlocuteur unique, visualisation en réalité virtuelle avant le chantier.",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 1800,
          maxPrice: 2800,
          priceCurrency: "EUR",
          unitText: "par m²",
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction sur mesure",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plans d'architecte sur mesure" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Visualisation en réalité virtuelle" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestion du permis de construire" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coordination de tous les corps de métier" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garanties décennale, biennale, parfait achèvement" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Combien coûte la construction d'une maison individuelle en Calvados ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En Calvados, comptez entre 1 800 et 2 800 €/m² pour une construction sur mesure de qualité, hors terrain. Le coût varie selon la superficie, les matériaux et les finitions. Oryzon établit un devis détaillé et fixe après le premier rendez-vous.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il déjà avoir un terrain pour construire avec Oryzon ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. Oryzon peut vous accompagner dans la recherche de terrain en Calvados. Nous connaissons bien le marché local et pouvons vous orienter vers des zones adaptées à votre projet et à votre budget.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de temps prend la construction d'une maison en Normandie ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De la signature du contrat à la remise des clés, comptez 12 à 18 mois selon la complexité : 2 à 4 mois pour l'obtention du permis de construire, puis 10 à 14 mois de chantier.",
          },
        },
        {
          "@type": "Question",
          name: "Oryzon propose-t-il des maisons à faible consommation énergétique ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. Tous les projets Oryzon intègrent les standards RE2020. Des options plus poussées sont disponibles : ossature bois, isolation renforcée, panneaux solaires, récupération d'eaux pluviales, maison passive.",
          },
        },
        {
          "@type": "Question",
          name: "Que couvre la garantie décennale d'un constructeur de maison ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La garantie décennale couvre pendant 10 ans tous les désordres affectant la solidité de l'ouvrage ou le rendant impropre à sa destination : fondations, murs porteurs, charpente, toiture, étanchéité.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on visualiser sa future maison avant le début des travaux ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. Oryzon propose une visite en réalité virtuelle de votre future maison avant le premier coup de pelle. Vous visitez chaque pièce à l'échelle réelle, ajustez les détails et validez avant signature.",
          },
        },
      ],
    },
  ],
};

export default function ConstruirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ServicePage data={data} />
    </>
  );
}
