"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { value: "+30 ans", label: "de métier" },
  { value: "+800", label: "réalisations" },
  { value: "100%", label: "sur mesure" },
  { value: "1 seul", label: "interlocuteur" },
];

const HEADLINE_LINES = ["Votre maison,", "telle que vous", "l'imaginez."];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-[--color-bg-dark] overflow-hidden">

      {/* ── Background image with Ken Burns ──────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Maison contemporaine construite par Oryzon en Calvados"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] animate-ken-burns"
        />
        {/* Bottom gradient — for text legibility on lower portion */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/95 via-[#0D1117]/30 to-transparent" />
        {/* Very subtle top vignette — navbar readability only */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0D1117]/50 to-transparent" />
      </div>

      {/* ── Grain overlay (fixed, GPU-safe) ──────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 md:px-12 pb-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/90">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#C49A5A" }} />
            Construction sur mesure · Calvados
          </span>
        </motion.div>

        {/* Headline — clip reveal line by line */}
        <h1 className="font-display text-white mb-8" aria-label={HEADLINE_LINES.join(" ")}>
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.75,
                  delay: 0.5 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {i === 2 ? (
                  <>
                    {"l'"}
                    <em className="not-italic" style={{ color: "#C49A5A" }}>imaginez.</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/85 text-base md:text-lg max-w-md leading-relaxed mb-10"
        >
          De l'esquisse à la remise des clés — avec un seul interlocuteur
          et votre projet en réalité virtuelle avant le premier coup de pelle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-16 md:mb-20"
        >
          {/* Primary */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-[#C49A5A] hover:bg-[#D4B07A] text-white text-sm font-semibold tracking-wide rounded-full px-6 py-3.5 active:scale-[0.98] transition-all duration-300"
          >
            <span>Parlons de votre projet</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowIcon />
            </span>
          </Link>

          {/* Secondary */}
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors duration-200 group"
          >
            <span>Voir nos réalisations</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="border-t border-white/10 pt-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={[
                  "flex flex-col gap-0.5",
                  i > 0 ? "md:border-l md:border-white/10 md:pl-8" : "",
                ].join(" ")}
              >
                <span className="font-display text-2xl md:text-3xl text-white font-medium">
                  {stat.value}
                </span>
                <span className="text-xs text-white/40 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        aria-hidden="true"
        className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] rotate-90 origin-center translate-y-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/30 animate-pulse" />
      </motion.div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 8L8 2M8 2H3M8 2V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
