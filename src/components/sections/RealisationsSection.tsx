"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";
import ProjectLightbox, { type LightboxImage } from "@/components/ui/ProjectLightbox";
import { PROJECTS as ALL_PROJECTS, type Project } from "@/data/projects";

// Rénovation complète (id 3) shown first as the section's flagship project.
const FEATURED: Project[] = [
  ALL_PROJECTS[2],
  ALL_PROJECTS[0],
  ALL_PROJECTS[1],
  ALL_PROJECTS[3],
];

function buildImages(p: Project): LightboxImage[] {
  return [
    { src: p.image, type: "photo" },
    ...p.gallery.map((src) => ({ src, type: "photo" as const })),
    ...(p.plans ?? []).map((src) => ({ src, type: "plan" as const })),
  ];
}

export default function RealisationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeProject = openIndex != null ? FEATURED[openIndex] : null;
  const activeImages = useMemo(
    () => (activeProject ? buildImages(activeProject) : []),
    [activeProject],
  );

  return (
    <section className="bg-[#F9F7F4] section-y section-x">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
              <span className="w-1 h-1 rounded-full bg-[#ba873f]" />
              Réalisations
            </span>
            <h2 className="font-display h2-display text-[#111111]">
              Plus de 30 ans d’expérience<br />
              <em className="not-italic" style={{ color: "#ba873f" }}>Chacun unique.</em>
            </h2>
          </div>
        </motion.div>

        {/* Grid — Z-pattern: 7-5 / 5-7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-5 md:gap-4">
          {FEATURED.map((project, i) => {
            // Alternating: large (7) on left then right
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={isLarge ? "md:col-span-7" : "md:col-span-5"}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Voir les photos du projet ${project.title}`}
                  className="group block h-full w-full text-left cursor-pointer"
                >
                  <div className="rounded-[1.75rem] bg-black/4 ring-1 ring-black/6 p-1.5 h-full transition-shadow duration-300 group-hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]">
                    <div className="rounded-[1.25rem] overflow-hidden bg-[#111111] h-full flex flex-col">

                      {/* Image — aspect ratio calibré pour égaliser les hauteurs: 7cols→[7/5], 5cols→square */}
                      <div className={`relative overflow-hidden aspect-[4/3] ${isLarge ? "md:aspect-[7/5]" : "md:aspect-square"}`}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes={isLarge ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                        />
                        {/* Type badge */}
                        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-1 text-[10px] text-white/80 uppercase tracking-[0.15em]">
                          {project.type}
                        </span>
                        {/* Year */}
                        <span className="absolute top-4 right-4 text-[10px] text-white/40 tabular-nums">
                          {project.year}
                        </span>
                      </div>

                      {/* Info bar */}
                      <div className="px-5 py-4 flex items-center justify-between">
                        <div>
                          <p className="font-display text-white text-base" style={{ letterSpacing: "-0.02em" }}>
                            {project.title}
                          </p>
                          <p className="text-xs text-white/40 mt-0.5">{project.location}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/30">{project.surface}</span>
                          <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 group-hover:bg-[#ba873f] group-hover:border-[#ba873f] group-hover:text-white transition-all duration-300">
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-black/6"
        >
          <p className="text-sm text-black/40">
            Découvrez l'ensemble de nos projets — construction, rénovation, agrandissement.
          </p>
          <GoldButton href="/contact" size="lg" className="shrink-0">
            Parlons de votre projet
          </GoldButton>
        </motion.div>

      </div>

      <ProjectLightbox
        open={openIndex != null}
        onClose={() => setOpenIndex(null)}
        title={activeProject?.title ?? ""}
        location={activeProject?.location}
        images={activeImages}
      />
    </section>
  );
}
