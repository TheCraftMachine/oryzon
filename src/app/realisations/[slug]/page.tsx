import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import GoldButton from "@/components/ui/GoldButton";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const TYPE_COLORS: Record<string, string> = {
  Construction:   "text-blue-300/80   border-blue-300/20  bg-blue-400/10",
  Rénovation:     "text-amber-300/80  border-amber-300/20 bg-amber-400/10",
  Agrandissement: "text-emerald-300/80 border-emerald-300/20 bg-emerald-400/10",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = PROJECTS
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // same type first
      const aScore = a.type === project.type ? 1 : 0;
      const bScore = b.type === project.type ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative h-[75vh] bg-[#0D1117] overflow-hidden">

        {/* Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/60 to-transparent" />

        {/* Blueprint grid texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Back button */}
        <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 pt-8">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-white/40 text-xs hover:text-white/70 transition-colors group"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Toutes les réalisations
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`rounded-full border backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] ${TYPE_COLORS[project.type]}`}>
                {project.type}
              </span>
              <span className="text-white/30 text-xs">{project.location}</span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-white/30 text-xs">{project.year}</span>
            </div>

            <h1
              className="font-display text-white mb-3"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
            >
              {project.title}
            </h1>

            <p className="text-[#C49A5A] text-base font-medium" style={{ letterSpacing: "-0.01em" }}>
              {project.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

          {/* Left: description */}
          <div>
            <div className="space-y-5 mb-12">
              {project.description.map((para, i) => (
                <p key={i} className="text-black/60 text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Highlights grid */}
            <div className="border-t border-black/8 pt-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/30 mb-6">Caractéristiques</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
                {project.highlights.map((h) => (
                  <div key={h.label}>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-black/30 mb-1">{h.label}</p>
                    <p className="font-display text-black/80 text-base" style={{ letterSpacing: "-0.02em" }}>{h.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: specs card */}
          <div className="lg:sticky lg:top-8">
            <div className="rounded-[1.75rem] bg-[#0D1117] p-6">

              <div className="flex items-center gap-2 mb-6">
                <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Fiche projet</p>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Type", value: project.type },
                  { label: "Surface", value: project.surface },
                  { label: "Localisation", value: project.location },
                  { label: "Année", value: project.year },
                  { label: "Durée de chantier", value: project.duration },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                    <p className="text-white/35 text-xs shrink-0">{row.label}</p>
                    <p className="font-display text-white text-sm text-right" style={{ letterSpacing: "-0.01em" }}>{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/8">
                <p className="text-white/30 text-xs leading-relaxed mb-4">
                  Un projet similaire en tête ?
                </p>
                <GoldButton href="/contact" size="md" className="w-full justify-center">
                  Démarrer mon projet
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Gallery ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/30 mb-6">Galerie</p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Large first image */}
            <div className="md:col-span-8 rounded-[1.25rem] overflow-hidden aspect-[4/3] bg-black/5">
              <Image
                src={project.gallery[0]}
                alt={`${project.title} — vue 1`}
                width={900}
                height={675}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
            </div>

            {/* Stack of two on the right */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <div className="rounded-[1.25rem] overflow-hidden aspect-square bg-black/5 flex-1">
                <Image
                  src={project.gallery[1]}
                  alt={`${project.title} — vue 2`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
              </div>
              <div className="rounded-[1.25rem] overflow-hidden aspect-square bg-black/5 flex-1">
                <Image
                  src={project.gallery[2]}
                  alt={`${project.title} — vue 3`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
              </div>
            </div>

            {/* Bottom row: two equal images */}
            <div className="md:col-span-6 rounded-[1.25rem] overflow-hidden aspect-[4/3] bg-black/5">
              <Image
                src={project.gallery[3]}
                alt={`${project.title} — vue 4`}
                width={700}
                height={525}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
            </div>
            <div className="md:col-span-6 rounded-[1.25rem] overflow-hidden aspect-[4/3] bg-black/5">
              <Image
                src={project.image}
                alt={`${project.title} — vue principale`}
                width={700}
                height={525}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Related projects ──────────────────────────────────────── */}
      <div className="border-t border-black/8 px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/30 mb-2">À découvrir aussi</p>
              <h2 className="font-display text-black/80 text-2xl" style={{ letterSpacing: "-0.03em" }}>
                Projets similaires
              </h2>
            </div>
            <Link href="/realisations" className="text-xs text-black/40 hover:text-black/70 transition-colors hidden sm:block">
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/realisations/${p.slug}`} className="group block">
                <div className="rounded-[1.5rem] bg-black/4 ring-1 ring-black/6 p-1.5 transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
                  <div className="rounded-[1rem] overflow-hidden bg-[#111]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className={`absolute top-3 left-3 rounded-full border backdrop-blur-sm px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${TYPE_COLORS[p.type]}`}>
                        {p.type}
                      </span>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-display text-white text-sm" style={{ letterSpacing: "-0.02em" }}>{p.title}</p>
                        <p className="text-xs text-white/35 mt-0.5">{p.location}</p>
                      </div>
                      <span className="text-xs text-white/25 shrink-0">{p.surface}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div className="bg-[#0D1117] px-6 md:px-12 py-24 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-8">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Votre projet
          </span>
          <h2 className="font-display text-white mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            À vous de<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>laisser votre empreinte.</em>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed mb-10">
            Premier rendez-vous gratuit et sans engagement.
            On écoute, on conseille, vous décidez.
          </p>
          <GoldButton href="/contact" size="xl">Démarrer mon projet</GoldButton>
        </div>
      </div>

    </div>
  );
}
