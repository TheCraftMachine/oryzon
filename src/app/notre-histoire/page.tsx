import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GoldButton from "@/components/ui/GoldButton";

export const metadata: Metadata = {
  title: "Notre histoire – Oryzon, constructeur de maisons en Calvados depuis 1994",
  description:
    "30 ans de métier, 800+ maisons construites en Normandie. Découvrez l'histoire d'Oryzon, constructeur indépendant à Caen depuis 1994 — notre équipe, nos valeurs, notre engagement.",
  alternates: { canonical: "https://oryzon.fr/notre-histoire" },
  keywords: [
    "histoire Oryzon",
    "constructeur maison Caen depuis 1994",
    "constructeur local Calvados",
    "entreprise construction familiale Normandie",
    "constructeur indépendant Caen",
    "30 ans expérience construction Calvados",
  ],
  openGraph: {
    title: "Notre histoire – Oryzon, constructeur en Calvados depuis 1994",
    description:
      "Depuis 1994, Oryzon accompagne les familles normandes dans leurs projets de construction. Entreprise familiale indépendante, ancrée en Calvados.",
    type: "website",
    url: "https://oryzon.fr/notre-histoire",
    locale: "fr_FR",
    siteName: "Oryzon",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://oryzon.fr/notre-histoire#page",
      name: "Notre histoire – Oryzon",
      url: "https://oryzon.fr/notre-histoire",
      description:
        "L'histoire d'Oryzon, constructeur de maisons individuelles sur mesure à Caen depuis 1994.",
      about: { "@id": "https://oryzon.fr/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://oryzon.fr" },
          { "@type": "ListItem", position: 2, name: "Notre histoire", item: "https://oryzon.fr/notre-histoire" },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": "https://oryzon.fr/#organization",
      name: "Oryzon",
      foundingDate: "1994",
      foundingLocation: { "@type": "Place", name: "Caen, Calvados, Normandie, France" },
      founder: {
        "@type": "Person",
        name: "Alain Moreau",
        jobTitle: "Fondateur & Gérant",
      },
      numberOfEmployees: { "@type": "QuantitativeValue", value: 12 },
      description:
        "Constructeur de maisons individuelles sur mesure à Caen depuis 1994. Entreprise familiale indépendante, 800+ réalisations en Calvados et Normandie.",
      slogan: "Votre maison, telle que vous l'imaginez.",
      award: "Premier prix régional de la construction normande 2003",
    },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: "1994",
    title: "Les fondations",
    description: "Alain Moreau crée Oryzon à Caen avec une équipe de cinq compagnons. Premier chantier : une maison de 120 m² à Bretteville-sur-Odon.",
  },
  {
    year: "2003",
    title: "Le premier grand chantier",
    description: "Livraison d'un ensemble de 18 maisons individuelles à Hérouville-Saint-Clair. Premier prix régional de la construction normande.",
  },
  {
    year: "2012",
    title: "L'obsession du sur-mesure",
    description: "Abandon des plans-types. Chaque projet devient unique, dessiné depuis zéro pour son terrain, sa famille, son style de vie.",
  },
  {
    year: "2018",
    title: "La révolution VR",
    description: "Intégration de la réalité virtuelle dans chaque projet. Les clients visitent leur maison avant le premier coup de pelle.",
  },
  {
    year: "2024",
    title: "800 projets, une exigence",
    description: "Trente ans après le premier parpaing posé, Oryzon reste une entreprise familiale indépendante, ancrée en Calvados.",
  },
];

const VALEURS = [
  {
    number: "01",
    title: "L'exigence\nsans compromis",
    description: "Chaque détail compte. Des fondations à la remise des clés, nous appliquons les mêmes standards — qu'il s'agisse d'une extension de 30 m² ou d'une villa de 300 m².",
  },
  {
    number: "02",
    title: "La transparence\nabsolue",
    description: "Devis au centime, délais contractuels, rapports de chantier hebdomadaires. Vous savez toujours où en est votre maison. Aucune mauvaise surprise.",
  },
  {
    number: "03",
    title: "Le sur-mesure\nen vrai",
    description: "Pas de plan-type. Votre terrain est unique, votre famille est unique, votre maison doit l'être aussi. Nous repartons de zéro pour chaque projet.",
  },
];

const EQUIPE = [
  {
    initials: "AM",
    color: "#C49A5A",
    name: "Alain Moreau",
    role: "Fondateur & Gérant",
    description: "30 ans de métier. A posé lui-même les premières pierres d'Oryzon en 1994. Toujours présent sur les chantiers complexes.",
  },
  {
    initials: "CM",
    color: "#7B9EA8",
    name: "Camille Moreau",
    role: "Architecte DPLG",
    description: "Diplômée de l'ENSA Normandie. Pilote la conception de chaque projet, de l'esquisse au dépôt de permis de construire.",
  },
  {
    initials: "TA",
    color: "#8B8B7A",
    name: "Thomas Aubert",
    role: "Conducteur de travaux",
    description: "15 ans chez Oryzon. Votre interlocuteur unique du premier coup de pelle à la remise des clés. Rigueur et sang-froid.",
  },
  {
    initials: "LB",
    color: "#7A8B7A",
    name: "Léa Bruneau",
    role: "Responsable VR",
    description: "Spécialiste en visualisation architecturale. Transforme vos plans en expérience immersive avant le démarrage des travaux.",
  },
];

const STATS = [
  { value: "+800", label: "projets réalisés", sub: "depuis 1994" },
  { value: "30", label: "ans d'expérience", sub: "en Calvados" },
  { value: "100%", label: "sur mesure", sub: "aucun plan-type" },
  { value: "1", label: "interlocuteur", sub: "du début à la fin" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NotreHistoirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    <div className="min-h-[100dvh]">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0D1117] overflow-hidden" style={{ minHeight: "100dvh" }}>

        {/* Blueprint grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        {/* Radial glow */}
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #C49A5A 0%, transparent 70%)" }} />

        {/* Split layout */}
        <div className="relative min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2">

          {/* Left: text */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-32 lg:py-0 relative z-10">



            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-10 w-fit">
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
              Notre histoire
            </span>

            <h1
              className="font-display text-white mb-8"
              style={{ fontSize: "clamp(3rem, 5.5vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
            >
              Bâtisseurs<br />
              <em className="not-italic" style={{ color: "#C49A5A" }}>depuis</em><br />
              1994.
            </h1>

            <p className="text-white/45 text-base max-w-sm leading-relaxed mb-12">
              Trente ans à construire, rénover et agrandir des maisons en Calvados.
              Une entreprise familiale, indépendante, qui ne travaille que sur mesure.
            </p>

            {/* Inline stats */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-8 border-t border-white/8 pt-8">
              {[
                { v: "+800", l: "projets" },
                { v: "30 ans", l: "de métier" },
                { v: "Caen", l: "Normandie" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-[#C49A5A] text-xl" style={{ letterSpacing: "-0.03em" }}>{s.v}</p>
                  <p className="text-white/30 text-[11px] mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative hidden lg:block">
            <Image
              src="/images/notre-histoire.jpg"
              alt="L'équipe Oryzon sur chantier"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 to-transparent" />

            {/* Year badge floating */}
            <div className="absolute bottom-12 right-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 px-6 py-4">
              <p className="font-display text-[#C49A5A] text-4xl" style={{ letterSpacing: "-0.04em" }}>1994</p>
              <p className="text-white/40 text-xs mt-1">Année de création</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── Manifeste ───────────────────────────────────────────────── */}
      <section className="bg-[#F9F7F4] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: quote */}
            <div className="lg:sticky lg:top-24">
              <div className="w-8 h-px bg-[#C49A5A] mb-8" />
              <blockquote
                className="font-display text-black/85"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.03em" }}
              >
                "Une maison, c'est{" "}
                <em className="not-italic" style={{ color: "#C49A5A" }}>la décision la plus importante</em>{" "}
                d'une vie. Elle mérite qu'on la traite comme telle."
              </blockquote>
              <p className="text-black/35 text-sm mt-6">— Alain Moreau, fondateur</p>
            </div>

            {/* Right: text */}
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">L'histoire</p>

              <p className="text-black/65 text-base leading-relaxed">
                Tout a commencé dans un petit bureau de la rue de Vaucelles, à Caen, avec une équipe de cinq personnes, un traceur A0 et la conviction que le Calvados méritait mieux que les maisons catalogue vendues à la chaîne par les grands groupes nationaux.
              </p>
              <p className="text-black/65 text-base leading-relaxed">
                Trente ans plus tard, Oryzon est toujours une entreprise familiale indépendante. Nous n'avons jamais levé de fonds, jamais vendu de franchise, jamais externalisé notre conduite de chantier. Chaque projet est suivi par nos propres équipes, de la première esquisse à la remise des clés.
              </p>
              <p className="text-black/65 text-base leading-relaxed">
                Ce qui a changé en trois décennies ? La technologie, les normes, les matériaux. Ce qui n'a pas changé : notre façon d'écouter, de concevoir, et d'exécuter. Le même soin que sur le premier chantier de 1994.
              </p>

              <div className="pt-4">
                <Image
                  src="/images/realisation-1.jpg"
                  alt="Chantier Oryzon"
                  width={700}
                  height={460}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="rounded-[1.25rem] w-full object-cover"
                  style={{ aspectRatio: "3/2" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <section className="bg-[#0D1117] px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">

        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-5">
                <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
                Jalons
              </span>
              <h2 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
                Trente ans<br />
                <em className="not-italic" style={{ color: "#C49A5A" }}>de construction.</em>
              </h2>
            </div>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 lg:left-[9.25rem] top-0 bottom-0 w-px bg-white/8 hidden lg:block" />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="group relative flex flex-col lg:flex-row gap-4 lg:gap-0 pb-12 last:pb-0">

                  {/* Year */}
                  <div className="lg:w-[8.5rem] lg:pr-10 shrink-0 flex lg:flex-col lg:items-end">
                    <span
                      className="font-display text-[#C49A5A]/60 group-hover:text-[#C49A5A] transition-colors duration-300"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Dot on line */}
                  <div className="hidden lg:flex items-start justify-center w-6 shrink-0 pt-2 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-[#0D1117] ring-1 ring-[#C49A5A]/40 group-hover:ring-[#C49A5A] group-hover:bg-[#C49A5A]/20 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="lg:pl-10 flex-1 pb-1">
                    <h3
                      className="font-display text-white mb-2 group-hover:text-[#C49A5A] transition-colors duration-300"
                      style={{ fontSize: "1.3rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xl">{item.description}</p>
                  </div>

                  {/* Number */}
                  <div className="hidden lg:flex items-start justify-end shrink-0 pt-1">
                    <span className="font-display text-white/5 text-6xl select-none" style={{ letterSpacing: "-0.05em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Valeurs ─────────────────────────────────────────────────── */}
      <section className="bg-[#F9F7F4] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/30 mb-5">
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
              Ce qui nous guide
            </span>
            <h2 className="font-display text-black/85" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
              Nos valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/8 rounded-[1.75rem] overflow-hidden">
            {VALEURS.map((v, i) => (
              <div
                key={v.number}
                className="bg-[#F9F7F4] p-8 md:p-10 group hover:bg-white transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-display text-[#C49A5A]/50 text-5xl" style={{ letterSpacing: "-0.05em", lineHeight: 1 }}>
                    {v.number}
                  </span>
                  {i === 0 && (
                    <div className="w-8 h-8 rounded-full bg-[#C49A5A]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#C49A5A]" />
                    </div>
                  )}
                </div>
                <h3
                  className="font-display text-black/80 mb-4 whitespace-pre-line"
                  style={{ fontSize: "1.4rem", letterSpacing: "-0.025em", lineHeight: 1.15 }}
                >
                  {v.title}
                </h3>
                <p className="text-black/45 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Équipe ──────────────────────────────────────────────────── */}
      <section className="bg-[#F9F7F4] border-t border-black/6 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/30 mb-5">
                <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
                Les visages d'Oryzon
              </span>
              <h2 className="font-display text-black/85" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
                L'équipe
              </h2>
            </div>
            <p className="text-black/35 text-sm max-w-xs leading-relaxed">
              Une équipe soudée, formée en interne, fidèle à la même exigence depuis le premier jour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EQUIPE.map((member) => (
              <div key={member.name} className="group rounded-[1.5rem] bg-white ring-1 ring-black/6 p-6 hover:ring-[#C49A5A]/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">

                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 font-display text-white text-lg"
                  style={{ backgroundColor: member.color, letterSpacing: "-0.02em" }}
                >
                  {member.initials}
                </div>

                <p className="font-display text-black/85 text-base mb-0.5" style={{ letterSpacing: "-0.02em" }}>
                  {member.name}
                </p>
                <p className="text-[#C49A5A] text-xs mb-4" style={{ letterSpacing: "0.02em" }}>
                  {member.role}
                </p>
                <p className="text-black/40 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div className="mt-10 rounded-[1.5rem] border border-dashed border-black/15 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display text-black/60 text-base mb-1" style={{ letterSpacing: "-0.02em" }}>Vous rejoindre l'équipe ?</p>
              <p className="text-black/35 text-sm">On cherche des compagnons passionnés par le bâti normand.</p>
            </div>
            <Link href="/contact" className="shrink-0 text-sm text-[#C49A5A] hover:text-[#C49A5A]/70 transition-colors font-medium whitespace-nowrap">
              Nous écrire →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="bg-[#0D1117] px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">

        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #C49A5A 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[1.75rem] overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0D1117] px-8 py-12 text-center group hover:bg-white/3 transition-colors duration-300">
                <p
                  className="font-display text-[#C49A5A] mb-2"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="text-white/60 text-sm mb-1">{s.label}</p>
                <p className="text-white/20 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <div className="bg-[#0D1117] px-6 md:px-12 py-24 border-t border-white/5 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-8">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Votre projet
          </span>
          <h2 className="font-display text-white mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Construisons quelque chose<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>ensemble.</em>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed mb-10">
            Premier rendez-vous gratuit et sans engagement.
            On écoute, on conseille, vous décidez.
          </p>
          <GoldButton href="/contact" size="xl">Démarrer mon projet</GoldButton>
        </div>
      </div>

    </div>
    </>
  );
}
