"use client";

import GoldButton from "@/components/ui/GoldButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STEPS: {
  number: string;
  title: string;
  description: string;
  image: string;
  duration: string;
}[] = [
    {
      number: "01",
      title: "Premier contact",
      description: "Vous venez avec vos idées, vos envies et votre terrain. Nous échangeons sur votre projet de construction.",
      image: "/images/step1.png",
      duration: "30 min",
    },
    {
      number: "02",
      title: "Conception des plans",
      description: "Votre projet prend forme sur papier. Plans, façades, volumes — tout est pensé sur mesure pour votre terrain et style de vie.",
      image: "/images/step2.png",
      duration: "4–6 semaines",
    },
    {
      number: "03",
      title: "Projection en VR",
      description: "Vous enfilez le casque et vous visitez vos espaces, pièce par pièce. Vous personnalisez à l'infini votre projet.",
      image: "/images/step3.png",
      duration: "1 séance",
    },
    {
      number: "04",
      title: "Suivi des travaux",
      description: "Un seul interlocuteur vous accompagne de la conception à la fin de la prestation : délais, accompagnement personnalisé, optimisation de la prestation.",
      image: "/images/step4.png",
      duration: "10–14 mois",
    },
    {
      number: "05",
      title: "Remise des clés",
      description: "Votre projet de vie est livré conforme aux plans, aux délais et au budget convenu.",
      image: "/images/step5.png",
      duration: "Jour J",
    },
  ];

// Each step gets 100vh of scroll distance
const VH_PER_STEP = 100;
const WRAPPER_HEIGHT = `${STEPS.length * VH_PER_STEP}vh`;

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll listener — rAF-guarded to coalesce events to one read per frame
  useEffect(() => {
    let rafId: number | null = null;
    const compute = () => {
      rafId = null;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const { top, height } = wrapper.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      const index = Math.round(progress * (STEPS.length - 1));
      if (index !== activeStepRef.current) {
        activeStepRef.current = index;
        setActiveStep(index);
      }
    };
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
    {/* ── Mobile: timeline verticale ─────────────────────────── */}
    <section className="xl:hidden bg-[#0D1117] px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-5">
          <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
          Le processus
        </span>
        <h2 className="font-display text-white mb-12"
          style={{ fontSize: "clamp(1.9rem, 7vw, 2.8rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          Votre projet,{" "}
          <em className="not-italic" style={{ color: "#C49A5A" }}>étape par étape.</em>
        </h2>

        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-[0.7rem] top-3 bottom-3 w-px bg-white/8" />

          <div className="space-y-0">
            {STEPS.map((step) => (
              <div key={step.number} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Dot */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className="w-[1.4rem] h-[1.4rem] rounded-full bg-[#0D1117] ring-1 ring-[#C49A5A]/60 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C49A5A]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-display text-white" style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
                      {step.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-[#C49A5A]/30 text-[#C49A5A]/70 px-2.5 py-0.5 text-[10px]">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col items-center text-center gap-4">
          <p className="text-white/40 text-sm leading-relaxed">
            Premier rendez-vous gratuit, sans engagement.
          </p>
          <GoldButton href="/contact" size="lg">Démarrer mon projet</GoldButton>
        </div>
      </div>
    </section>

    {/* ── Desktop: sticky scroll animation ───────────────────── */}
    <div ref={wrapperRef} style={{ height: WRAPPER_HEIGHT }} className="hidden xl:block bg-[#0D1117]">
      <section className="sticky top-0 h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-20 xl:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">

          <div className="mb-8 xl:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-4 xl:mb-5">
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
              Le processus
            </span>
            <h2 className="font-display h2-display text-white">
              Votre projet,{" "}
              <em className="not-italic" style={{ color: "#C49A5A" }}>étape par étape.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">

            {/* Video panel */}
            <div className="hidden lg:flex flex-col justify-center">
              <div className="rounded-[1.75rem] bg-white/5 ring-1 ring-white/8 p-1.5">
                <div className="rounded-[1.25rem] overflow-hidden bg-[#111827] aspect-[4/3] relative">
                  {STEPS.map((step, i) => (
                    <Image
                      key={step.number}
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={i === 0}
                      className={[
                        "object-cover transition-opacity duration-700",
                        i === activeStep ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D3559]/40 to-[#0D1117]/80 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-display text-[#C49A5A] text-xs tracking-widest mb-1">Étape {STEPS[activeStep].number}</p>
                        <p className="font-display text-white text-lg" style={{ letterSpacing: "-0.02em" }}>{STEPS[activeStep].title}</p>
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] text-white/50">{STEPS[activeStep].duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                {STEPS.map((_, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} aria-label={`Étape ${i + 1}`}
                    className={["rounded-full transition-all duration-300 cursor-pointer",
                      i === activeStep ? "w-6 h-1.5 bg-[#C49A5A]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40",
                    ].join(" ")} />
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col justify-center space-y-1.5 xl:space-y-2">
              {STEPS.map((step, i) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  className={[
                    "w-full text-left rounded-2xl px-5 xl:px-6 py-4 xl:py-5 transition-all duration-500 cursor-pointer",
                    i === activeStep ? "bg-white/6 ring-1 ring-white/10" : "hover:bg-white/3",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-5">
                    <span className={[
                      "font-display text-4xl transition-colors duration-300 shrink-0 leading-none mt-0.5",
                      i === activeStep ? "text-[#C49A5A]" : "text-white/15",
                    ].join(" ")}>
                      {step.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          className={[
                            "font-display transition-colors duration-300",
                            i === activeStep ? "text-white" : "text-white/40",
                          ].join(" ")}
                          style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                        >
                          {step.title}
                        </h3>
                        <span className={[
                          "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] transition-all duration-300",
                          i === activeStep ? "border-[#C49A5A]/40 text-[#C49A5A]/80" : "border-white/8 text-white/20",
                        ].join(" ")}>
                          {step.duration}
                        </span>
                      </div>
                      <p className={[
                        "text-sm leading-relaxed transition-colors duration-300",
                        i === activeStep ? "text-white/60" : "text-white/25",
                      ].join(" ")}>
                        {step.description}
                      </p>
                      {i === activeStep && (
                        <div className="lg:hidden mt-5 rounded-xl overflow-hidden aspect-video bg-[#111827] relative">
                          <Image src={step.image} alt={step.title} fill sizes="100vw" className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
