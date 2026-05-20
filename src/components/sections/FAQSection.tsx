"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Combien de temps dure la construction d'une maison ?",
    answer:
      "En moyenne, pour la construction d'une maison, celle-ci prend entre 10 et 14 mois, selon la superficie, la complexité du projet et de votre budget. Nous vous fournissons un calendrier dès la signature du contrat.",
  },
  {
    question: "Peut-on personnaliser les plans ?",
    answer:
      "Absolument, c'est notre cœur de métier ! Nous ne travaillons qu'avec des plans sur mesure, conçus spécifiquement pour votre terrain, votre exposition et votre mode de vie. Aucun plan standard. Nous vous apportons une expertise appropriée en fonction des spécificités de votre projet.",
  },
  {
    question: "Proposez-vous un contrat réglementé ?",
    answer:
      "La prestation comprend un plan, un descriptif et un contrat. Toutes les prestations sont détaillées. Les seules variations possibles sont les options que vous choisissez d'ajouter en cours de projet.",
  },
  {
    question: "Comment fonctionne la visite en réalité virtuelle ?",
    answer:
      "Une fois vos plans validés, nous pouvons créer un modèle 3D immersif de votre maison afin de mieux vous projeter. Vous visitez chaque pièce avec un casque VR, à l'échelle réelle. Vous pouvez vous visualiser et valider définitivement avant le premier coup de pelle.",
  },
  {
    question: "Intervenez-vous dans tout le Calvados ?",
    answer:
      "Nous intervenons principalement dans l'agglomération caennaise et dans un rayon de 50 km autour de Caen, soit la majorité du Calvados. Contactez-nous pour vérifier votre zone.",
  },
  {
    question: "Quelles sont les garanties ?",
    answer:
      "Tous nos projets de construction de maisons sont couverts par la garantie de livraison, la garantie de parfait achèvement (1 an), la garantie biennale (2 ans sur les équipements) et la garantie dommage ouvrage. Tous nos projets d'agrandissement et rénovation sont couverts par la garantie décennale et peuvent faire l'étude d'une garantie dommage ouvrage. Votre investissement est protégé.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#F9F7F4] py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            FAQ
          </span>
          <h2
            className="font-display text-[#111111]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Vos questions,<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>nos réponses.</em>
          </h2>
        </motion.div>

        <div className="divide-y divide-black/8">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group"
              >
                <span
                  className={[
                    "font-sans text-base font-medium leading-snug transition-colors duration-200",
                    openIndex === i ? "text-[#111111]" : "text-[#111111]/70 group-hover:text-[#111111]",
                  ].join(" ")}
                >
                  {faq.question}
                </span>
                <span
                  className={[
                    "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5",
                    openIndex === i
                      ? "border-[#C49A5A] bg-[#C49A5A] text-white rotate-45"
                      : "border-black/15 text-black/40 group-hover:border-black/30",
                  ].join(" ")}
                  aria-hidden="true"
                >
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
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#6B6B6B] leading-relaxed pb-6 max-w-xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
