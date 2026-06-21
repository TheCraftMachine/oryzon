"use client";

import Image from "next/image";
import { motion, type Variants, type Easing } from "framer-motion";

const EASE_OUT_EXPO: Easing = [0.16, 1, 0.3, 1];

const SERVICES = [
  {
    number: "01",
    title: "Construction",
    subtitle: "sur mesure",
    description:
      "Marre du copier-coller ? Nous aussi. Votre terrain est unique, votre exposition est spécifique : votre plan doit l'être tout autant.",
    href: "/construire",
    image: "/images/service-construction.webp",
    tag: "Du projet à la livraison",
  },
  {
    number: "02",
    title: "Agrandissement",
    subtitle: "& personnalisation",
    description:
      "Vous aimez votre quartier, votre maison, votre cadre de vie. Ajoutez de l'espace qui manque sans changer ce que vous aimez déjà. Nous le réalisons sur-mesure.",
    href: "/agrandir",
    image: "/images/service-agrandissement.webp",
    tag: "Extension, surélévation, combles",
  },
  {
    number: "03",
    title: "Rénovation",
    subtitle: "& optimisation",
    description:
      "Une rénovation totale bien pensée depuis la conception : nous intégrons les dernières normes techniques au cœur de votre projet pour un résultat aussi performant qu'élégant.",
    href: "/renover",
    image: "/images/service-renovation-1.jpg",
    tag: "Rénovation complète ou partielle",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE_OUT_EXPO },
  }),
};

export default function ServicesSection() {
  return (
    <section className="bg-[#F9F7F4] section-y section-x">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">
            <span className="w-1 h-1 rounded-full bg-[#ba873f]" />
            Notre savoir-faire
          </span>
          <h2 className="font-display h2-display text-[#111111]">
            Ce que nous<br />
            <em className="not-italic" style={{ color: "#ba873f" }}>construisons</em> pour vous.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Double-bezel outer shell */}
              <div className="group block h-full">
                <div className="h-full rounded-[1.75rem] bg-black/4 ring-1 ring-black/6 p-1.5">
                  {/* Inner core */}
                  <div className="h-full rounded-[1.25rem] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] overflow-hidden flex flex-col">

                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={`${service.title} par Oryzon`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      />
                      {/* Number badge */}
                      <span className="absolute top-4 left-4 font-display text-white/60 text-xs tracking-widest">
                        {service.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <span className="inline-block rounded-full border border-black/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-black/40 mb-4 self-start">
                        {service.tag}
                      </span>

                      <h3 className="font-display text-[#111111] mb-1" style={{ fontSize: "1.6rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                        {service.title}
                      </h3>
                      <p className="font-display text-[#ba873f] mb-4" style={{ fontSize: "1.2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                        {service.subtitle}
                      </p>

                      <p className="text-sm text-[#6B6B6B] leading-relaxed flex-1">
                        {service.description}
                      </p>

                      {/* Arrow CTA — hidden */}
                      <div className="hidden mt-6 items-center justify-between">
                        <span className="text-xs font-semibold text-[#111111] tracking-wide group-hover:text-[#ba873f] transition-colors duration-200">
                          En savoir plus
                        </span>
                        <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#111111] group-hover:bg-[#ba873f] group-hover:border-[#ba873f] group-hover:text-white transition-all duration-300">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
