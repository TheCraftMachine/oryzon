"use client";

import { motion } from "framer-motion";

export default function FounderSection() {
  return (
    <section className="bg-[#16202a] py-40 px-6 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Opening mark */}
          <div
            className="font-display text-[#ba873f] leading-none select-none mb-8"
            style={{ fontSize: "clamp(5rem, 12vw, 10rem)", opacity: 0.25, lineHeight: 0.8 }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Quote */}
          <blockquote>
            <p
              className="font-display text-white"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 3rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.025em",
              }}
            >
              Une maison n'est pas un produit.{" "}
              <span style={{ color: "#ba873f" }}>
                C'est un lieu que l'on ne cessera de traverser,
                de regarder, d'habiter.
              </span>{" "}
              Ce que nous concevons doit tenir dans trente ans comme
              le premier soir — et ressembler, jusqu'au dernier détail,
              à ce que vous aviez en tête.
            </p>

            {/* Attribution */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex items-center gap-6"
            >
              <span className="w-12 h-px bg-[#ba873f]/40 shrink-0" />
              <div>
                <p className="font-display text-white/80 text-sm tracking-wide">
                  Olivier
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mt-0.5">
                  Fondateur · Caen, Calvados
                </p>
              </div>
            </motion.footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
