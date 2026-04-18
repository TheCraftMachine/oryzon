import ServicePage, { type ServiceData } from "@/components/services/ServicePage";

const data: ServiceData = {
  tag: "Agrandissement & extension",
  hero: {
    headline: "Agrandissez sans\ndéménager.",
    goldWord: "déménager.",
    subtitle:
      "Vous aimez votre maison, votre quartier, vos voisins. Il manque juste de l'espace. On s'en occupe.",
    image: "/images/service-agrandissement.jpg",
    imageAlt: "Extension de maison réalisée par Oryzon en Calvados",
  },
  promise: {
    eyebrow: "Notre engagement",
    headline: "Plus d'espace, sans perdre ce que vous aimez déjà.",
    goldPart: "sans perdre ce que vous aimez déjà.",
    body: "Agrandir, c'est l'art d'ajouter sans trahir. Chaque extension est conçue pour s'intégrer parfaitement à votre maison existante — en termes de style, de matériaux et de proportions.",
    cards: [
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="14" y="3" width="7" height="7" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="3" y="14" width="7" height="7" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 17.5h7M17.5 14v7" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        title: "Intégration parfaite",
        body: "L'extension respecte le style architectural existant. Matériaux, teintes, proportions — tout est coordonné pour que l'ajout semble avoir toujours été là.",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 12l9-9 9 9v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8z" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 22V12h6v10" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        title: "Chantier en site occupé",
        body: "Vous restez chez vous pendant les travaux. Nous organisons le chantier pour minimiser les nuisances et préserver votre quotidien.",
      },
      {
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
        title: "Devis fixe, zéro surprise",
        body: "Le prix signé est le prix final. Chaque poste est détaillé avant le début des travaux.",
      },
    ],
  },
  forWho: {
    headline: "Votre maison actuelle a du potentiel. Exploitons-le.",
    goldPart: "Exploitons-le.",
    situations: [
      {
        title: "Votre famille s'agrandit",
        body: "Une chambre supplémentaire, une salle de jeux, un bureau — votre maison peut évoluer avec vous.",
      },
      {
        title: "Vous voulez une pièce de vie plus grande",
        body: "Extension côté jardin, véranda, cuisine ouverte sur l'extérieur — on repousse les murs.",
      },
      {
        title: "Vos combles sont inexploités",
        body: "Aménager les combles est souvent la solution la plus rapide et la moins coûteuse pour gagner de l'espace.",
      },
      {
        title: "Vous voulez monter d'un étage",
        body: "La surélévation permet de doubler la surface sans empiéter sur le jardin. Idéal en zone urbaine.",
      },
      {
        title: "Vous refusez de déménager",
        body: "Votre adresse, vos voisins, l'école des enfants — vous tenez à tout ça. Agrandir est la bonne décision.",
      },
      {
        title: "Vous cherchez à valoriser votre bien",
        body: "Une extension bien conçue augmente significativement la valeur de revente de votre propriété.",
      },
    ],
  },
  process: {
    headline: "Un projet d'extension, étape par étape.",
    goldPart: "étape par étape.",
    steps: [
      {
        number: "01",
        title: "Diagnostic & faisabilité",
        body: "On visite votre maison, on analyse les contraintes structurelles, les règles d'urbanisme (PLU) et les possibilités d'extension. On vous dit clairement ce qui est faisable.",
        duration: "1 visite",
      },
      {
        number: "02",
        title: "Conception sur mesure",
        body: "Plans d'extension conçus pour s'intégrer parfaitement à l'existant. Choix des matériaux, des ouvertures, des finitions — tout est décidé avec vous.",
        duration: "3–4 semaines",
      },
      {
        number: "03",
        title: "Visite en réalité virtuelle",
        body: "Vous visualisez l'extension dans votre maison avant les travaux. Vous ajustez les détails jusqu'à ce que ce soit exactement ce que vous voulez.",
        duration: "1 séance",
      },
      {
        number: "04",
        title: "Démarches administratives",
        body: "Déclaration préalable ou permis de construire selon la surface : nous gérons tout.",
        duration: "1–3 mois",
      },
      {
        number: "05",
        title: "Chantier organisé",
        body: "Travaux menés avec un plan de phasage pour que vous puissiez rester chez vous. Coordination de tous les corps de métier par un seul chef de projet.",
        duration: "3–6 mois",
      },
    ],
  },
  faq: [
    {
      question: "Faut-il un permis de construire pour une extension ?",
      answer:
        "Cela dépend de la surface. Jusqu'à 20 m², une déclaration préalable suffit (40 m² en zone couverte par un PLU). Au-delà, un permis de construire est obligatoire. Nous gérons l'ensemble des démarches.",
    },
    {
      question: "Peut-on rester dans la maison pendant les travaux ?",
      answer:
        "Dans la majorité des cas, oui. Nous organisons le chantier par phases pour préserver votre confort quotidien. Seules certaines opérations spécifiques (percement de murs porteurs, toiture) nécessitent parfois une courte absence.",
    },
    {
      question: "Combien coûte une extension de maison ?",
      answer:
        "Le coût dépend du type d'extension : une extension de plain-pied classique en Calvados est généralement entre 1 500 et 2 500 €/m². Une surélévation ou des combles aménagés peuvent varier différemment selon la structure existante.",
    },
    {
      question: "L'extension peut-elle changer le style de ma maison ?",
      answer:
        "Oui, si vous le souhaitez. Certains clients profitent de l'extension pour moderniser l'esthétique de l'ensemble. D'autres veulent une intégration discrète. Les deux approches sont possibles — on s'adapte à votre vision.",
    },
  ],
  others: [
    { label: "Construction sur mesure", href: "/construire", tag: "Construction" },
    { label: "Rénovation & transformation", href: "/renover", tag: "Rénovation" },
  ],
};

export default function AgrandirPage() {
  return <ServicePage data={data} />;
}
