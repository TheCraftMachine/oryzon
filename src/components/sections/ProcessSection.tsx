"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STEPS: {
  number: string;
  title: string;
  description: string;
  video: string;
  duration: string;
}[] = [
  {
    number: "01",
    title: "Rendez-vous découverte",
    description:
      "On écoute votre projet, votre terrain, vos envies. Aucun engagement — juste une conversation pour comprendre ce que vous voulez construire.",
    video: "/videos/process-rdv.mp4",
    duration: "30 min",
  },
  {
    number: "02",
    title: "Conception des plans",
    description:
      "Votre maison prend forme sur papier. Plans, façades, volumes — tout est pensé sur mesure pour votre terrain et votre style de vie.",
    video: "/videos/process-plans.mp4",
    duration: "4–6 semaines",
  },
  {
    number: "03",
    title: "Visualisation en VR",
    description:
      "Vous enfilez le casque et vous visitez votre future maison pièce par pièce. Vous ajustez en temps réel avant de valider définitivement.",
    video: "/videos/process-vr.mp4",
    duration: "1 séance",
  },
  {
    number: "04",
    title: "Chantier & suivi",
    description:
      "Un seul interlocuteur vous accompagne du premier coup de pelle à la fin du chantier. Délais contractuels, rapports hebdomadaires.",
    video: "/videos/process-chantier.mp4",
    duration: "10–14 mois",
  },
  {
    number: "05",
    title: "Remise des clés",
    description:
      "Votre maison est livrée conforme aux plans, aux délais et au budget convenu. Garanties décennale et parfait achèvement incluses.",
    video: "/videos/process-cles.mp4",
    duration: "Jour J",
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Play/pause desktop videos on step change
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeStep) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeStep]);

  // Desktop only: pin section + advance steps via scroll
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      if (window.matchMedia("(max-width: 1023px)").matches) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(STEPS.length - 1) * 70}%`,
          pin: true,
          anticipatePin: 1,
          scrub: false,
          onUpdate: (self) => {
            const index = Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length)
            );
            if (index !== activeStepRef.current) {
              activeStepRef.current = index;
              setActiveStep(index);
            }
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    // min-h-[100dvh] ensures the pinned section fills exactly the viewport on desktop
    <section
      ref={sectionRef}
      className="bg-[#0D1117] min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 py-16 lg:py-0"
    >
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-5">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Le processus
          </span>
          <h2
            className="font-display text-white"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Votre projet,{" "}
            <em className="not-italic" style={{ color: "#C49A5A" }}>étape par étape.</em>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Sticky video panel — desktop only */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="rounded-[1.75rem] bg-white/5 ring-1 ring-white/8 p-1.5">
              <div className="rounded-[1.25rem] overflow-hidden bg-[#111827] aspect-[4/3] relative">
                {STEPS.map((step, i) => (
                  <video
                    key={step.number}
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={step.video}
                    muted
                    loop
                    playsInline
                    className={[
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                      i === activeStep ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D3559]/40 to-[#0D1117]/80 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-display text-[#C49A5A] text-xs tracking-widest mb-1">
                        Étape {STEPS[activeStep].number}
                      </p>
                      <p className="font-display text-white text-lg" style={{ letterSpacing: "-0.02em" }}>
                        {STEPS[activeStep].title}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] text-white/50">
                      {STEPS[activeStep].duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  aria-label={`Étape ${i + 1}`}
                  className={[
                    "rounded-full transition-all duration-300 cursor-pointer",
                    i === activeStep
                      ? "w-6 h-1.5 bg-[#C49A5A]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Steps list */}
          <div className="flex flex-col justify-center space-y-1">
            {STEPS.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className={[
                  "w-full text-left rounded-2xl px-5 py-4 transition-all duration-400 cursor-pointer",
                  i === activeStep
                    ? "bg-white/6 ring-1 ring-white/10"
                    : "hover:bg-white/3",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={[
                      "font-display text-3xl lg:text-4xl transition-colors duration-300 shrink-0 leading-none mt-0.5",
                      i === activeStep ? "text-[#C49A5A]" : "text-white/15",
                    ].join(" ")}
                  >
                    {step.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
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
                        i === activeStep
                          ? "border-[#C49A5A]/40 text-[#C49A5A]/80"
                          : "border-white/8 text-white/20",
                      ].join(" ")}>
                        {step.duration}
                      </span>
                    </div>

                    {/* Description: always visible on mobile, animated on desktop */}
                    <p className={[
                      "text-sm leading-relaxed transition-all duration-400 overflow-hidden",
                      i === activeStep
                        ? "text-white/60 max-h-24 opacity-100 mt-1"
                        : "lg:max-h-0 lg:opacity-0 max-h-24 opacity-100 text-white/40 mt-1",
                    ].join(" ")}>
                      {step.description}
                    </p>

                    {/* Mobile inline video */}
                    {i === activeStep && (
                      <div className="lg:hidden mt-4 rounded-xl overflow-hidden aspect-video bg-[#111827]">
                        <video
                          src={step.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mid-funnel CTA */}
        <div className="mt-10 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-white/40 text-sm leading-relaxed">
            Prêt à voir votre projet prendre forme ?{" "}
            <span className="text-white/60">Premier rendez-vous gratuit, sans engagement.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-[#C49A5A] hover:bg-[#D4B07A] text-white text-sm font-semibold tracking-wide rounded-full px-6 py-3 transition-all duration-300 active:scale-[0.98] shrink-0"
          >
            <span>Démarrer mon projet</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
