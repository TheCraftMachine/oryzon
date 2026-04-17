"use client";

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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Play/pause videos based on active step
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

  // Pin section + advance steps with scroll
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          // 1 extra scroll length per step after the first
          end: `+=${(STEPS.length - 1) * 70}%`,
          pin: true,
          anticipatePin: 1,
          scrub: false,
          onUpdate: (self) => {
            const index = Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length)
            );
            setActiveStep(index);
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0D1117] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-6">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Le processus
          </span>
          <h2
            className="font-display text-white"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Votre projet,<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>étape par étape.</em>
          </h2>
        </div>

        {/* Layout : sticky video left + scrollable steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Sticky video panel */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              {/* Double-bezel video card */}
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
                  {/* Fallback gradient when no video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D3559]/40 to-[#0D1117]/80 pointer-events-none" />

                  {/* Step label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-display text-[#C49A5A] text-xs tracking-widest mb-1">
                          Étape {STEPS[activeStep].number}
                        </p>
                        <p className="font-display text-white text-xl" style={{ letterSpacing: "-0.02em" }}>
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
              <div className="flex items-center justify-center gap-2 mt-5">
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
          </div>

          {/* Scrollable steps */}
          <div className="space-y-2">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={[
                  "rounded-2xl p-6 md:p-8 transition-all duration-500 cursor-pointer",
                  i === activeStep
                    ? "bg-white/6 ring-1 ring-white/10"
                    : "hover:bg-white/3",
                ].join(" ")}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex items-start gap-5">
                  {/* Number */}
                  <span
                    className={[
                      "font-display text-4xl transition-colors duration-300 shrink-0 leading-none mt-1",
                      i === activeStep ? "text-[#C49A5A]" : "text-white/15",
                    ].join(" ")}
                  >
                    {step.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3
                        className={[
                          "font-display transition-colors duration-300",
                          i === activeStep ? "text-white" : "text-white/40",
                        ].join(" ")}
                        style={{ fontSize: "1.35rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                      >
                        {step.title}
                      </h3>
                      <span className={[
                        "shrink-0 rounded-full border px-2.5 py-1 text-[10px] transition-all duration-300",
                        i === activeStep
                          ? "border-[#C49A5A]/40 text-[#C49A5A]/80"
                          : "border-white/8 text-white/20",
                      ].join(" ")}>
                        {step.duration}
                      </span>
                    </div>

                    <p
                      className={[
                        "text-sm leading-relaxed transition-all duration-500",
                        i === activeStep ? "text-white/60 max-h-40 opacity-100" : "text-white/0 max-h-0 opacity-0 overflow-hidden",
                      ].join(" ")}
                    >
                      {step.description}
                    </p>

                    {/* Mobile video */}
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

      </div>
    </section>
  );
}
