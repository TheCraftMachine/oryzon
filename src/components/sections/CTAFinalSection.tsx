"use client";

import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

export default function CTAFinalSection() {
  return (
    <section className="bg-[#0D1117] py-40 px-6 md:px-12 relative overflow-hidden">

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,154,90,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,154,90,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-10">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Votre projet commence ici
          </span>

          <h2
            className="font-display text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
          >
            Parlons de<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>votre maison.</em>
          </h2>

          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-12">
            Premier rendez-vous gratuit et sans engagement.
            On écoute, on conseille, vous décidez.
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
