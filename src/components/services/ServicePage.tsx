"use client";

import Link from "next/link";
import Image from "next/image";
import GoldButton from "@/components/ui/GoldButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ServiceData = {
  tag: string;
  hero: {
    headline: string;
    goldWord: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  promise: {
    eyebrow: string;
    headline: string;
    goldPart: string;
    body: string;
    cards: { icon: React.ReactNode; title: string; body: string }[];
  };
  forWho: {
    headline: string;
    goldPart: string;
    situations: { title: string; body: string }[];
  };
  process: {
    headline: string;
    goldPart: string;
    steps: { number: string; title: string; body: string; duration: string }[];
  };
  faq: { question: string; answer: string }[];
  others: { label: string; href: string; tag: string }[];
};

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Shared micro-components ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
      <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
      {children}
    </span>
  );
}

function SectionLabelDark({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-6">
      <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
      {children}
    </span>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ data }: { data: ServiceData }) {
  const parts = data.hero.headline.split(data.hero.goldWord);

  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-[#0D1117] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.hero.image}
          alt={data.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/95 via-[#0D1117]/50 to-[#0D1117]/30" />
      </div>

      {/* Back */}
      <div className="relative z-10 pt-28 px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 text-xs hover:text-white/60 transition-colors group"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Accueil
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/80">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            {data.tag}
          </span>
        </motion.div>

        <h1 className="font-display text-white mb-6" aria-label={data.hero.headline}>
          {parts.map((part, i) => (
            <span key={i}>
              {part.split("\n").map((line, j) => (
                <span key={j} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, delay: 0.35 + (i * 2 + j) * 0.1, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              {i < parts.length - 1 && (
                <span className="block overflow-hidden">
                  <motion.span
                    className="block not-italic"
                    style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#C49A5A" }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, delay: 0.45 + i * 0.12, ease: EASE }}
                  >
                    {data.hero.goldWord}
                  </motion.span>
                </span>
              )}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed mb-10"
        >
          {data.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: EASE }}
          className="flex flex-wrap items-center gap-4"
        >
          <GoldButton href="/contact" size="lg">Discutons de votre projet</GoldButton>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors group"
          >
            Voir nos réalisations
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Promise ───────────────────────────────────────────────────────────────────

function Promise({ data }: { data: ServiceData }) {
  return (
    <section className="bg-[#F9F7F4] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl mb-20"
        >
          <SectionLabel>{data.promise.eyebrow}</SectionLabel>
          <h2
            className="font-display text-[#111111] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            {data.promise.headline.split(data.promise.goldPart).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <em className="not-italic" style={{ color: "#C49A5A" }}>{data.promise.goldPart}</em>
                )}
              </span>
            ))}
          </h2>
          <p className="text-[#6B6B6B] text-base md:text-lg leading-relaxed max-w-xl">
            {data.promise.body}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.promise.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="rounded-[1.75rem] bg-black/3 ring-1 ring-black/6 p-1.5"
            >
              <div className="rounded-[1.25rem] bg-white p-7 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-[#C49A5A]/10 flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3
                  className="font-display text-[#111111] mb-3"
                  style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed flex-1">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── For who ───────────────────────────────────────────────────────────────────

function ForWho({ data }: { data: ServiceData }) {
  return (
    <section className="bg-[#0D1117] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <SectionLabelDark>Pour qui ?</SectionLabelDark>
          <h2
            className="font-display text-white max-w-2xl"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            {data.forWho.headline.split(data.forWho.goldPart).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <em className="not-italic" style={{ color: "#C49A5A" }}>{data.forWho.goldPart}</em>
                )}
              </span>
            ))}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden">
          {data.forWho.situations.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#0D1117] hover:bg-white/4 transition-colors duration-300 p-8 group"
            >
              <span className="font-display text-[#C49A5A] text-xs tracking-widest mb-4 block opacity-60">
                0{i + 1}
              </span>
              <h3
                className="font-display text-white mb-3 group-hover:text-[#C49A5A] transition-colors duration-300"
                style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────

function Process({ data }: { data: ServiceData }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#F2EDE6] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <SectionLabel>Comment ça se passe</SectionLabel>
            <h2
              className="font-display text-[#111111] mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {data.process.headline.split(data.process.goldPart).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <em className="not-italic" style={{ color: "#C49A5A" }}>{data.process.goldPart}</em>
                  )}
                </span>
              ))}
            </h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
              Un accompagnement clair, de la première rencontre à la remise des clés.
            </p>

            {/* Progress indicator */}
            <div className="hidden lg:flex items-center gap-2 mt-10">
              {data.process.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(i)}
                  aria-label={`Étape ${i + 1}`}
                  className={[
                    "rounded-full transition-all duration-300 cursor-pointer",
                    i === open ? "w-8 h-2 bg-[#C49A5A]" : "w-2 h-2 bg-black/15 hover:bg-black/30",
                  ].join(" ")}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — accordion steps */}
          <div className="space-y-2">
            {data.process.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className={[
                    "w-full text-left rounded-2xl px-6 py-5 transition-all duration-400 cursor-pointer",
                    open === i ? "bg-white ring-1 ring-black/6 shadow-sm" : "hover:bg-black/4",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={[
                          "font-display text-2xl transition-colors duration-300 shrink-0",
                          open === i ? "text-[#C49A5A]" : "text-black/15",
                        ].join(" ")}
                      >
                        {step.number}
                      </span>
                      <span
                        className={[
                          "font-display transition-colors duration-300",
                          open === i ? "text-[#111111]" : "text-[#111111]/50",
                        ].join(" ")}
                        style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                      >
                        {step.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={[
                        "hidden sm:block rounded-full border px-2.5 py-0.5 text-[10px] transition-colors duration-300",
                        open === i ? "border-[#C49A5A]/40 text-[#C49A5A]/70" : "border-black/10 text-black/30",
                      ].join(" ")}>
                        {step.duration}
                      </span>
                      <span className={[
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
                        open === i ? "border-[#C49A5A] bg-[#C49A5A] text-white rotate-45" : "border-black/15 text-black/30",
                      ].join(" ")} aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#6B6B6B] leading-relaxed mt-4 ml-12 max-w-md">
                          {step.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FAQ({ items }: { items: ServiceData["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#F9F7F4] py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <SectionLabel>Questions fréquentes</SectionLabel>
          <h2
            className="font-display text-[#111111]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Vos questions,{" "}
            <em className="not-italic" style={{ color: "#C49A5A" }}>nos réponses.</em>
          </h2>
        </motion.div>

        <div className="divide-y divide-black/8">
          {items.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group"
              >
                <span className={[
                  "font-sans text-base font-medium leading-snug transition-colors duration-200",
                  openIndex === i ? "text-[#111111]" : "text-[#111111]/60 group-hover:text-[#111111]",
                ].join(" ")}>
                  {faq.question}
                </span>
                <span className={[
                  "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5",
                  openIndex === i
                    ? "border-[#C49A5A] bg-[#C49A5A] text-white rotate-45"
                    : "border-black/15 text-black/40 group-hover:border-black/30",
                ].join(" ")} aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#6B6B6B] leading-relaxed pb-6 max-w-xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Other services ────────────────────────────────────────────────────────────

function OtherServices({ items }: { items: ServiceData["others"] }) {
  return (
    <section className="bg-[#F2EDE6] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#111111]/30 mb-6">Nos autres services</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <Link
                href={item.href}
                className="group flex items-center justify-between rounded-2xl bg-white ring-1 ring-black/6 px-6 py-5 hover:ring-[#C49A5A]/40 transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C49A5A] block mb-1">{item.tag}</span>
                  <span className="font-display text-[#111111] text-lg group-hover:text-[#C49A5A] transition-colors duration-300" style={{ letterSpacing: "-0.02em" }}>
                    {item.label}
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#111111]/40 group-hover:bg-[#C49A5A] group-hover:border-[#C49A5A] group-hover:text-white transition-all duration-300">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Final ────────────────────────────────────────────────────────────────

function CTAFinal({ tag }: { tag: string }) {
  return (
    <section className="bg-[#0D1117] py-40 px-6 md:px-12 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(196,154,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,154,90,0.06) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-10">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            {tag}
          </span>
          <h2
            className="font-display text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
          >
            Votre projet commence<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>par une conversation.</em>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-12">
            Premier rendez-vous gratuit et sans engagement. On écoute, on conseille, vous décidez.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton href="/contact" size="xl">Prendre rendez-vous</GoldButton>
            <div className="flex items-center gap-3 text-white/30 text-xs">
              <span className="w-px h-4 bg-white/15" />
              <span>Réponse sous 24h</span>
              <span>·</span>
              <span>Caen & Calvados</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ServicePage({ data }: { data: ServiceData }) {
  return (
    <>
      <Hero data={data} />
      <Promise data={data} />
      <ForWho data={data} />
      <Process data={data} />
      <FAQ items={data.faq} />
      <OtherServices items={data.others} />
      <CTAFinal tag={data.tag} />
    </>
  );
}
