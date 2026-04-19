"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";
import { PROJECTS } from "@/data/projects";

const FILTERS = ["Tous", "Construction", "Rénovation", "Agrandissement"] as const;
type Filter = typeof FILTERS[number];

const TYPE_COLORS: Record<string, string> = {
  Construction:   "text-blue-300/80   border-blue-300/20  bg-blue-400/10",
  Rénovation:     "text-amber-300/80  border-amber-300/20 bg-amber-400/10",
  Agrandissement: "text-emerald-300/80 border-emerald-300/20 bg-emerald-400/10",
};

// ── Grid layout helpers ───────────────────────────────────────────────────────

// Returns col-span class based on position in filtered list
function colSpan(index: number, total: number): string {
  if (total === 1) return "md:col-span-12";
  if (total === 2) return "md:col-span-6";
  if (total === 3) {
    if (index === 0) return "md:col-span-12";
    return "md:col-span-6";
  }
  // 4+: alternating Z-pattern 7-5 / 5-7
  const row = Math.floor(index / 2);
  const col = index % 2;
  if (row % 2 === 0) return col === 0 ? "md:col-span-7" : "md:col-span-5";
  return col === 0 ? "md:col-span-5" : "md:col-span-7";
}

function isLargeCard(index: number, total: number): boolean {
  if (total <= 2) return true;
  if (total === 3) return index === 0;
  const row = Math.floor(index / 2);
  const col = index % 2;
  return row % 2 === 0 ? col === 0 : col === 1;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Tous");

  const filtered = activeFilter === "Tous"
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === activeFilter);

  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="bg-[#0D1117] px-6 md:px-12 pt-32 pb-24 relative overflow-hidden">

        {/* Blueprint grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        <div className="relative max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-8">
                <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
                Portfolio
              </span>
              <h1 className="font-display text-white mb-5" style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
                Chaque maison,<br />
                <em className="not-italic" style={{ color: "#C49A5A" }}>une histoire.</em>
              </h1>
              <p className="text-white/45 text-base max-w-lg leading-relaxed">
                30 ans de métier en Calvados. Des maisons sur mesure, des rénovations exigeantes,
                des extensions pensées pour durer.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-10 lg:gap-12 lg:pb-2 shrink-0">
              {[
                { value: "+800", label: "projets réalisés" },
                { value: "30 ans", label: "de métier" },
                { value: "100%", label: "sur mesure" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-white text-3xl md:text-4xl" style={{ letterSpacing: "-0.03em", color: "#C49A5A" }}>{s.value}</p>
                  <p className="text-white/35 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter + Grid ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={[
                "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer",
                activeFilter === f
                  ? "bg-[#111111] text-white"
                  : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black/70",
              ].join(" ")}
            >
              {f}
              {f !== "Tous" && (
                <span className={`ml-2 text-[10px] ${activeFilter === f ? "text-white/40" : "text-black/30"}`}>
                  {PROJECTS.filter((p) => p.type === f).length}
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto text-xs text-black/30">
            {filtered.length} projet{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const large = isLargeCard(i, filtered.length);
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={colSpan(i, filtered.length)}
                >
                  <Link href={`/realisations/${project.slug}`} className="group block h-full">
                    <div className="rounded-[1.75rem] bg-black/4 ring-1 ring-black/6 p-1.5 h-full transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
                      <div className="rounded-[1.25rem] overflow-hidden bg-[#111111] h-full flex flex-col">

                        {/* Image */}
                        <div className={`relative overflow-hidden ${large ? "aspect-[7/5]" : "aspect-square"}`}>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes={large ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                          />
                          {/* Gradient for readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className={`rounded-full border backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.15em] ${TYPE_COLORS[project.type]}`}>
                              {project.type}
                            </span>
                          </div>
                          <span className="absolute top-4 right-4 text-[10px] text-white/35 tabular-nums">
                            {project.year}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="px-5 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-display text-white text-base" style={{ letterSpacing: "-0.02em" }}>
                              {project.title}
                            </p>
                            <p className="text-xs text-white/40 mt-0.5">{project.location}</p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs text-white/30">{project.surface}</span>
                            <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/40 group-hover:bg-[#C49A5A] group-hover:border-[#C49A5A] group-hover:text-white transition-all duration-300">
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                                <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-black/30 text-sm">Aucun projet dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
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
