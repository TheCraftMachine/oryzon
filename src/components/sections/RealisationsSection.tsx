"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Villa contemporaine",
    location: "Caen, Calvados",
    type: "Construction",
    surface: "180 m²",
    image: "/images/realisation-1.jpg",
    href: "/realisations",
  },
  {
    title: "Extension vitrée",
    location: "Bayeux, Calvados",
    type: "Agrandissement",
    surface: "45 m²",
    image: "/images/realisation-2.jpg",
    href: "/realisations",
  },
  {
    title: "Rénovation complète",
    location: "Hérouville-Saint-Clair",
    type: "Rénovation",
    surface: "130 m²",
    image: "/images/realisation-3.jpg",
    href: "/realisations",
  },
];

export default function RealisationsSection() {
  return (
    <section className="bg-[#F9F7F4] py-32 px-6 md:px-12">
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
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
              Réalisations
            </span>
            <h2
              className="font-display text-[#111111]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              +800 projets.<br />
              <em className="not-italic" style={{ color: "#C49A5A" }}>Chacun unique.</em>
            </h2>
          </div>
          <Link
            href="/realisations"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#111111] hover:text-[#C49A5A] transition-colors duration-200 shrink-0"
          >
            <span>Voir toutes nos réalisations</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Grid — asymmetric: 1 big + 2 small */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 ? "md:col-span-7" : "md:col-span-5"}
            >
              <Link href={project.href} className="group block">
                {/* Double-bezel */}
                <div className="rounded-[1.75rem] bg-black/4 ring-1 ring-black/6 p-1.5">
                  <div className="rounded-[1.25rem] overflow-hidden bg-[#111111]">
                    {/* Image */}
                    <div className={[
                      "relative overflow-hidden",
                      i === 0 ? "aspect-[4/3]" : "aspect-[4/3]",
                    ].join(" ")}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes={i === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      />
                      {/* Type badge */}
                      <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-1 text-[10px] text-white/80 uppercase tracking-[0.15em]">
                        {project.type}
                      </span>
                    </div>

                    {/* Info bar */}
                    <div className="px-5 py-4 flex items-center justify-between bg-[#111111]">
                      <div>
                        <p className="font-display text-white text-base" style={{ letterSpacing: "-0.02em" }}>
                          {project.title}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">{project.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/30">{project.surface}</span>
                        <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 group-hover:bg-[#C49A5A] group-hover:border-[#C49A5A] group-hover:text-white transition-all duration-300">
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
