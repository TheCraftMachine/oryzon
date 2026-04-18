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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // IntersectionObserver — activates the step crossing the centre of the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && i !== activeStepRef.current) {
            activeStepRef.current = i;
            setActiveStep(i);
          }
        },
        { rootMargin: "-38% 0px -38% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-[#0D1117] px-6 md:px-12 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left — CSS sticky video panel, desktop only */}
          <div className="hidden lg:block sticky top-28 self-start">
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

          {/* Right — scrollable steps */}
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                onClick={() => setActiveStep(i)}
                className={[
                  "rounded-2xl px-6 py-8 transition-all duration-500 cursor-pointer",
                  i === activeStep
                    ? "bg-white/6 ring-1 ring-white/10"
                    : "hover:bg-white/3",
                ].join(" ")}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={[
                      "font-display text-4xl transition-colors duration-300 shrink-0 leading-none mt-0.5",
                      i === activeStep ? "text-[#C49A5A]" : "text-white/15",
                    ].join(" ")}
                  >
                    {step.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className={[
                          "font-display transition-colors duration-300",
                          i === activeStep ? "text-white" : "text-white/40",
                        ].join(" ")}
                        style={{ fontSize: "1.25rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
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

                    {/* Always visible on mobile, fades on desktop when inactive */}
                    <p className={[
                      "text-sm leading-relaxed transition-colors duration-300",
                      i === activeStep ? "text-white/60" : "text-white/30 lg:text-white/20",
                    ].join(" ")}>
                      {step.description}
                    </p>

                    {/* Mobile inline video for active step */}
                    {i === activeStep && (
                      <div className="lg:hidden mt-5 rounded-xl overflow-hidden aspect-video bg-[#111827]">
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
              </div>
            ))}
          </div>
        </div>

        {/* Mid-funnel CTA */}
        <div className="mt-16 pt-10 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
