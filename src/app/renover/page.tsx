import type { Metadata } from "next";
import ServicePage, { type ServiceData } from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Rénovation maison – Caen, Calvados (14) | Oryzon",
  description:
    "Rénovation complète ou partielle de maison à Caen et en Calvados. Diagnostic gratuit, devis fixe garanti, chantier sans mauvaises surprises. Oryzon rénove votre bien depuis 1994.",
  alternates: { canonical: "https://oryzon.fr/renover" },
  keywords: [
    "rénovation maison Caen",
    "rénovation maison Calvados",
    "entreprise rénovation Caen",
    "rénovation complète maison Normandie",
    "rénovation énergétique Calvados 14",
    "artisan rénovation Caen",
  ],
  openGraph: {
    title: "Rénovation maison à Caen et en Calvados – Oryzon",
    description:
      "Transformez votre bien avec Oryzon. Diagnostic complet, devis fixe, rénovation globale ou partielle en Calvados. Résultat validé en réalité virtuelle avant travaux.",
    type: "website",
    url: "https://oryzon.fr/renover",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};

const data: ServiceData = {
  tag: "Rénovation & transformation",
  hero: {
    headline: "L'adresse de vos\nrêves, transformée.",
    goldWord: "transformée.",
    subtitle:
      "Vous avez trouvé le bon emplacement. La maison a du potentiel mais elle ne vous ressemble pas encore. On s'occupe du reste.",
    image: "/images/service-renovation.jpg",
    imageAlt: "Rénovation complète réalisée par Oryzon en Calvados",
  },
  promise: {
    eyebrow: "Notre engagement",
    headline: "Rénover sans mauvaises surprises. C'est possible.",
    goldPart: "C'est possible.",
    body: "La rénovation a la réputation de dérailler — budget explosé, délais sans fin, résultat décevant. Chez Oryzon, le devis est fixe, le planning est contractuel et le résultat est celui que vous avez validé en réalité virtuelle.",
    cards: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 11l3 3L22 4" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        title: "Diagnostic complet inclus",
        body: "Avant le moindre devis, nous inspectons tout : structure, électricité, plomberie, isolation. Les problèmes cachés sont identifiés en amont, pas en cours de chantier.",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        title: "Devis fixe, garanti",
        body: "Tout est détaillé avant signature. Si on découvre un imprévu en cours de chantier, on vous en informe immédiatement avant d'agir.",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#C49A5A" strokeWidth="1.5" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        title: "Rénovation globale ou partielle",
        body: "Remise aux normes, rénovation énergétique, restructuration de l'espace, finitions haut de gamme — on intervient sur tout ou partie selon votre projet.",
      },
    ],
  },
  forWho: {
    headline: "Vous avez un bien à transformer. On a l'expertise pour le faire.",
    goldPart: "On a l'expertise pour le faire.",
    situations: [
      {
        title: "Vous venez d'acheter une maison ancienne",
        body: "Bonne affaire à l'achat, mais tout est à refaire. On repart de l'existant pour créer quelque chose de neuf.",
      },
      {
        title: "Vous rénové pour y vivre",
        body: "Cuisine ouverte, salle de bain moderne, isolation — vous voulez un intérieur qui vous ressemble vraiment.",
      },
      {
        title: "Vous rénové pour revendre",
        body: "Une rénovation bien pensée peut doubler la valeur d'un bien. On optimise chaque euro investi.",
      },
      {
        title: "Votre maison n'est plus aux normes",
        body: "Électricité vétuste, isolation insuffisante, amiante — on diagnostique, on planifie, on remet aux normes.",
      },
      {
        title: "Vous voulez restructurer les espaces",
        body: "Abattre une cloison, créer une suite parentale, ouvrir sur le jardin — on repense le plan depuis l'intérieur.",
      },
      {
        title: "Vous cherchez des économies d'énergie",
        body: "Isolation thermique, fenêtres double vitrage, chauffage performant — on améliore votre DPE et vos factures.",
      },
    ],
  },
  process: {
    headline: "Rénover avec méthode, de A à Z.",
    goldPart: "avec méthode,",
    steps: [
      {
        number: "01",
        title: "Visite & diagnostic complet",
        body: "On inspecte l'ensemble du bâti : structure, réseaux, isolation, humidité. Tout ce qui se cache derrière les murs est identifié avant le devis.",
        duration: "1 visite",
      },
      {
        number: "02",
        title: "Conception du projet",
        body: "Plans de réaménagement, choix des matériaux, sélection des finitions. Tout est décidé avec vous, par écrit, avant que le moindre outil soit sorti.",
        duration: "2–4 semaines",
      },
      {
        number: "03",
        title: "Visualisation en réalité virtuelle",
        body: "Avant les travaux, vous visitez votre futur intérieur rénové. Vous voyez les matériaux, les couleurs, les proportions — et vous validez.",
        duration: "1 séance",
      },
      {
        number: "04",
        title: "Démarches & autorisations",
        body: "Selon l'ampleur des travaux : déclaration préalable, permis de construire, déclaration d'ouverture de chantier. Nous gérons tout.",
        duration: "2–6 semaines",
      },
      {
        number: "05",
        title: "Chantier & coordination",
        body: "Démolition, gros œuvre, second œuvre, finitions — un seul chef de projet coordonne tous les artisans. Vous avez un point de contact unique.",
        duration: "2–8 mois",
      },
    ],
  },
  faq: [
    {
      question: "Comment gérez-vous les imprévus en cours de chantier ?",
      answer:
        "Le diagnostic initial limite les mauvaises surprises au maximum. En cas d'imprévu inévitable (structure cachée, canalisation hors normes), nous vous contactons immédiatement avec une solution et un chiffrage avant d'agir. Jamais de travaux supplémentaires sans votre accord.",
    },
    {
      question: "Faut-il quitter le logement pendant la rénovation ?",
      answer:
        "Cela dépend de l'ampleur des travaux. Pour une rénovation partielle, vous pouvez souvent rester. Pour une rénovation complète, un relogement temporaire est généralement nécessaire. On vous aide à planifier ça dès la conception.",
    },
    {
      question: "Intervenez-vous sur des maisons classées ou en zone protégée ?",
      answer:
        "Oui. Nous travaillons dans le respect des contraintes des Architectes des Bâtiments de France et des règles d'urbanisme locales. Nous connaissons bien le tissu normand et ses spécificités.",
    },
    {
      question: "La rénovation énergétique est-elle éligible aux aides ?",
      answer:
        "Oui. Selon votre situation : MaPrimeRénov', CEE (Certificats d'Économies d'Énergie), éco-PTZ, TVA réduite à 5,5 %. Nous vous aidons à identifier les aides auxquelles vous êtes éligible.",
    },
    {
      question: "Peut-on rénover et agrandir en même temps ?",
      answer:
        "Absolument — c'est même souvent plus économique. Combiner rénovation et extension permet de n'ouvrir le chantier qu'une seule fois et de coordonner les corps de métier de manière optimale.",
    },
  ],
  others: [
    { label: "Construction sur mesure", href: "/construire", tag: "Construction" },
    { label: "Agrandissement & extension", href: "/agrandir", tag: "Extension" },
  ],
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://oryzon.fr/renover#service",
      name: "Rénovation de maison à Caen et en Calvados",
      serviceType: "Rénovation de maison",
      provider: { "@id": "https://oryzon.fr/#organization" },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Calvados" },
        { "@type": "City", name: "Caen" },
      ],
      description:
        "Rénovation complète ou partielle de maison à Caen et en Calvados. Diagnostic gratuit inclus, devis fixe garanti, rénovation énergétique éligible aux aides MaPrimeRénov' et CEE.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Rénovation",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diagnostic complet avant travaux" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rénovation énergétique (isolation, chauffage)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Restructuration des espaces" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remise aux normes électricité et plomberie" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rénovation maison ancienne et normande" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment se déroule une rénovation complète de maison en Calvados ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oryzon commence par un diagnostic complet du bâti (structure, réseaux, isolation, humidité). Ensuite vient la conception du projet avec visualisation VR, puis les démarches administratives et enfin le chantier coordonné par un chef de projet unique.",
          },
        },
        {
          "@type": "Question",
          name: "La rénovation énergétique est-elle éligible aux aides de l'État ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. En Calvados, plusieurs aides sont disponibles pour la rénovation énergétique : MaPrimeRénov', CEE (Certificats d'Économies d'Énergie), éco-PTZ, TVA réduite à 5,5 %. Oryzon accompagne ses clients dans l'identification et la demande de ces aides.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il quitter son logement pendant les travaux de rénovation ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cela dépend de l'ampleur des travaux. Pour une rénovation partielle, vous pouvez généralement rester. Pour une rénovation complète, un relogement temporaire est souvent nécessaire. Oryzon vous aide à planifier cela dès la phase de conception.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de temps dure une rénovation complète de maison ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La durée dépend de l'ampleur des travaux : de 2 à 8 mois pour le chantier, auxquels s'ajoutent 2 à 6 semaines de conception et les éventuelles démarches administratives.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on rénover et agrandir sa maison en même temps ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolument — c'est souvent plus économique. Combiner rénovation et extension permet de n'ouvrir le chantier qu'une seule fois et de coordonner tous les corps de métier de façon optimale.",
          },
        },
      ],
    },
  ],
};

export default function RenoverPage() {
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
