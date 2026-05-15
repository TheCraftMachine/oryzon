"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Interlocuteur unique",
    description: "Un seul chef de projet suit votre chantier de A à Z. Pas de passage de main, pas de perte d'information.",
  },
  {
    title: "Prix ferme",
    description: "Un chiffrage précis et détaillé pour bâtir votre projet sur des bases solides, sans aucun coût caché.",
  },
  {
    title: "Délais respectés",
    description: "Vos délais de livraison sont contractualisés. On s'engage, avec un suivi personnalisé pour vous tenir informés tout au long du chantier.",
  },
  {
    title: "Les garanties",
    description: "Les garanties — décennale, financière, technique, biennale, dommage-ouvrage, contractant général — sont adaptées à chacun de nos contrats.",
  },
  {
    title: "Réalité virtuelle",
    description: "Explorez chaque pièce virtuellement avant de construire. Une innovation que nous sommes les seuls à maîtriser ici.",
  },
  {
    title: "Matériaux sélectionnés",
    description: "Nous vous proposons un choix de matériaux correspondant à vos besoins, vos envies et votre budget.",
  },
];

export default function WhySection() {
  return (
    <section className="bg-[#F2EDE6] section-y section-x">
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
            <h2 className="font-display h2-display text-[#111111] mb-6">
              L'évidence du<br />
              <em className="not-italic" style={{ color: "#C49A5A" }}>sur-mesure.</em>
            </h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-sm">
              Construire une maison, un agrandissement ou une rénovation est l'un
              des projets les plus importants d'une vie. Notre engagement vous offre
              une expérience unique et à la hauteur de vos ambitions.
            </p>
          </motion.div>

          {/* Reasons grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/8 rounded-2xl overflow-hidden">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-[#F2EDE6] p-7 md:p-8 hover:bg-[#EDE5DA] transition-colors duration-300 group"
              >
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
