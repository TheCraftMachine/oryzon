"use client";

import { useEffect, useState } from "react";
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

const INTRO_WORDS = ["Construction", "Agrandissement", "Rénovation"];

export default function HeroSection() {
  // Intro adaptative : fond blanc + logo sombre en journée, fond bleu + logo clair la nuit.
  // Défaut "nuit" pendant le SSR pour matcher le bg-dark de la section (évite un flash blanc
  // chez les visiteurs nocturnes au premier paint).
  const [isDay, setIsDay] = useState(false);
  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 7 && hour < 19);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-[--color-bg-dark] overflow-hidden">

      {/* ── Background image with Ken Burns ──────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/front.webp"
          alt="Maison contemporaine construite par Oryzon en Calvados"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] animate-ken-burns"
        />
        {/* Bottom gradient — for text legibility on lower portion */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16202a]/95 via-[#16202a]/30 to-transparent" />
        {/* Very subtle top vignette — navbar readability only */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#16202a]/50 to-transparent" />
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
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="mt-auto pt-24 md:pt-0 pb-12">

          {/* Headline — clip reveal line by line */}
          <h1 className="font-display text-white mb-5 md:mb-8" aria-label={HEADLINE_LINES.join(" ")}>
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.75,
                    delay: 3.4 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {i === 2 ? (
                    <>
                      {"l'"}
                      <em className="not-italic" style={{ color: "#ba873f" }}>imaginez.</em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Eyebrow — sous le titre */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/90">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#ba873f" }} />
              Construction, agrandissement et rénovation sur mesure
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/85 text-base md:text-lg max-w-md leading-relaxed mb-6 md:mb-10"
          >
            Votre rêve prend vie sous vos yeux, bien avant de sortir de terre.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 4.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-16 md:mb-20"
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

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.2 }}
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
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Faire défiler vers le contenu suivant"
        className="absolute bottom-6 right-6 md:bottom-8 md:right-12 z-10 flex flex-col items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer group"
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em] font-medium"
          style={{ writingMode: "vertical-rl" }}
        >
          Découvrir
        </span>
        <span
          aria-hidden="true"
          className="flex flex-col items-center -space-y-1 text-[#ba873f] group-hover:text-[#d1a464] transition-colors duration-200"
        >
          <motion.span
            className="flex"
            animate={{ y: [0, 5, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown />
          </motion.span>
          <motion.span
            className="flex"
            animate={{ y: [0, 5, 0], opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <ChevronDown />
          </motion.span>
        </span>
      </motion.button>

      {/* ── Intro overlay (fades to reveal the hero) ── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 3.3, ease: [0.32, 0.72, 0, 1] }}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[400] ${isDay ? "bg-white" : "bg-[#16202a]"}`}
      />

      {/* ── Intro logo + mots (centered, large, fades + slight scale-down on exit) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 0.92] }}
        transition={{
          duration: 3.6,
          times: [0, 0.097, 0.917, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[401] flex flex-col items-center justify-center px-8 gap-7 md:gap-9"
      >
        <Image
          src={isDay ? "/images/logo-light-animated.webp" : "/images/logo-black-animated.webp"}
          alt=""
          width={455}
          height={242}
          unoptimized
          preload
          loading="eager"
          className="block w-auto h-[clamp(160px,32vh,240px)] max-w-[82vw]"
        />
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {INTRO_WORDS.map((word, wi) => {
            const PER_CHAR = 0.025;
            const LETTER_DUR = 0.06;
            const TEXT_DELAY = 0.2;
            const WORD_GAP = 0.12;
            const START = 0.35;
            const prev = INTRO_WORDS.slice(0, wi).reduce(
              (sum, w) =>
                sum + TEXT_DELAY + Math.max(0, w.length - 1) * PER_CHAR + LETTER_DUR + WORD_GAP,
              0,
            );
            const chipStart = START + prev;
            const textStart = chipStart + TEXT_DELAY;
            return (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: chipStart,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block rounded-sm px-3 py-1.5 text-[11px] md:text-xs uppercase font-medium text-white shadow-[0_6px_20px_-10px_rgba(186,135,63,0.55)]"
                style={{ backgroundColor: "#ba873f", letterSpacing: "0.22em" }}
              >
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: LETTER_DUR,
                      delay: textStart + ci * PER_CHAR,
                      ease: "linear",
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 7.5L10 13L16 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
