"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

const STATS = [
  { value: "+30 ans", label: "d'expérience" },
  { value: "100%", label: "sur mesure" },
  { value: "Réalité", label: "virtuelle" },
  { value: "1 seul", label: "interlocuteur" },
];

const HEADLINE_LINES = ["Votre maison,", "telle que vous", "l'imaginez."];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col bg-[--color-bg-dark] overflow-hidden">

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
        {/* Right-side scrim — desktop only, gives the vertical logo contrast */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#0D1117]/75 via-[#0D1117]/35 to-transparent" />
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

      {/* ── Main content — 100dvh fold ───────────────────── */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col max-w-9xl mx-auto w-full px-6 md:px-10 lg:px-10 xl:px-14">
        <div className="mt-auto pt-24 md:pt-0 pb-12">

          {/* ── Top row: text + logo (grid on lg+) ───────── */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center">

          {/* ── Left: text block ─────────────────────────── */}
          <div className="lg:col-span-7 lg:relative lg:z-10">

          {/* Headline — clip reveal line by line */}
          <h1 className="font-display text-white mb-5 md:mb-8" aria-label={HEADLINE_LINES.join(" ")}>
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
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

          {/* Eyebrow — sous le titre — masqué sur mobile pour aérer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block mb-5 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/90">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#C49A5A" }} />
              Construction, agrandissement et rénovation sur mesure
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/85 text-base md:text-lg max-w-md leading-relaxed mb-6 md:mb-10"
          >
            Votre rêve prend vie sous vos yeux, bien avant de sortir de terre.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-10 md:mb-20"
          >
            {/* Primary */}
            <GoldButton href="/contact" size="lg">Parlons de votre projet</GoldButton>

            {/* Secondary */}
            <Link
              href="/#realisations"
              className="inline-flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors duration-200 group"
            >
              <span>Voir nos réalisations</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          </div>

          {/* ── Right: vertical logo — desktop only ──────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-5 lg:items-center lg:justify-end lg:relative"
            aria-hidden="true"
          >
            <Image
              src="/images/hero-logo-vertical.webp"
              alt=""
              width={760}
              height={440}
              priority
              sizes="(min-width: 1920px) 1200px, 65vw"
              className="block h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              style={{ width: "clamp(34rem, 65vw, 75rem)" }}
            />
          </motion.div>
          </div>

          {/* ── Stats bar — full width under both blocks ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="hidden sm:block border-t border-white/10 pt-6 mt-10 lg:mt-14"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className={[
                    "flex flex-col gap-0.5",
                    i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : "",
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
      </div>

      {/* ── Stats mobile — sous le fold (visibles au scroll) ─── */}
      <div className="sm:hidden relative z-10 max-w-7xl mx-auto w-full px-6 pb-20 pt-4">
        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-display text-2xl text-white font-medium">
                  {stat.value}
                </span>
                <span className="text-xs text-white/40 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        aria-hidden="true"
        className="absolute bottom-8 right-8 md:right-12 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] rotate-90 origin-center translate-y-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/30 animate-pulse" />
      </motion.div>
    </section>
  );
}

