"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    number: "01",
    title: "Interlocuteur unique",
    description: "Un seul chef de projet suit votre chantier de A à Z. Pas de passage de main, pas de perte d'information.",
  },
  {
    number: "02",
    title: "Devis fixe garanti",
    description: "Le prix signé est le prix final. Aucune mauvaise surprise à la livraison — c'est contractuel.",
  },
  {
    number: "03",
    title: "Délais respectés",
    description: "Vos délais de livraison sont inscrits au contrat. On s'y tient, avec des rapports hebdomadaires pour vous tenir informé.",
  },
  {
    number: "04",
    title: "Garanties décennales",
    description: "Couverture complète sur tous nos travaux pendant 10 ans. Votre investissement est protégé, quoi qu'il arrive.",
  },
  {
    number: "05",
    title: "Réalité virtuelle",
    description: "Vous visitez votre maison avant qu'elle existe. Aucun autre constructeur en Calvados ne propose ça.",
  },
  {
    number: "06",
    title: "Matériaux sélectionnés",
    description: "Chaque matériau est choisi pour sa durabilité, son esthétique et son impact environnemental. Pas de compromis.",
  },
];

export default function WhySection() {
  return (
    <section className="bg-[#F2EDE6] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Sticky left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
              Pourquoi Oryzon
            </span>
            <h2
              className="font-display text-[#111111] mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              L'expérience<br />
              <em className="not-italic" style={{ color: "#C49A5A" }}>sans stress.</em>
            </h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-sm">
              Construire une maison est l'un des projets les plus importants d'une vie.
              Notre engagement : vous offrir une expérience claire, transparente,
              et à la hauteur de ce que vous construisez.
            </p>
          </motion.div>

          {/* Reasons grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/8 rounded-2xl overflow-hidden">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-[#F2EDE6] p-7 md:p-8 hover:bg-[#EDE5DA] transition-colors duration-300 group"
              >
                <span className="font-display text-[#C49A5A] text-xs tracking-widest mb-4 block">
                  {reason.number}
                </span>
                <h3
                  className="font-display text-[#111111] mb-3 group-hover:text-[#0D3559] transition-colors duration-300"
                  style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                >
                  {reason.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
