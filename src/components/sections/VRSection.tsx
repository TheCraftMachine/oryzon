"use client";

import { useEffect, useRef, useState } from "react";
import GoldButton from "@/components/ui/GoldButton";

export default function VRSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setVideoReady(true);
    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });
  }, []);

  // Desktop: GSAP scrubs video.currentTime — NO pin:true, CSS sticky handles pinning
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const video = videoRef.current;
      if (!wrapper) return;

      // Pause video on desktop — scroll drives currentTime instead
      if (video) { video.pause(); video.currentTime = 0; }

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            if (video?.duration) video.currentTime = video.duration * self.progress;
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  // Mobile: text entrance via IntersectionObserver
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTextVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Mobile: progress bar via timeupdate
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (!video.duration || !progressRef.current) return;
      progressRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
    };
    video.addEventListener("timeupdate", onTime, { passive: true });
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "400vh" }} className="bg-[#0D1117]">
      <section ref={sectionRef} className="sticky top-0 h-[100dvh] relative bg-[#0D1117] overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-px bg-white/10">
          <div ref={progressRef} className="h-full bg-[#C49A5A] origin-left"
            style={{ transform: "scaleX(0)", transition: "none" }} />
        </div>

        {/* Scroll hint — desktop only */}
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 pointer-events-none">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">Scroll pour explorer</p>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        {/* Video — autoPlay on mobile only, scrubbed by scroll on desktop */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/videos/vr-plongeon.mp4"
            muted
            playsInline
            preload="auto"
            loop
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[#0D1117]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/60 to-transparent pointer-events-none lg:hidden" />

        {/* Blueprint fallback */}
        {!videoReady && (
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(196,154,90,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,154,90,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        )}

        {/* Desktop overlay */}
        <div className="hidden lg:flex absolute inset-0 z-10 flex-col items-center justify-center px-6 text-center pointer-events-none">
          <OverlayContent />
        </div>

        {/* Mobile overlay */}
        <div className="lg:hidden absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <div style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-6">
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />Réalité virtuelle
            </span>
          </div>
          <div style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "120ms" }}>
            <h2 className="font-display text-white mb-5" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
              Voyez votre maison<br />
              <em className="not-italic" style={{ color: "#C49A5A" }}>avant qu'elle existe.</em>
            </h2>
          </div>
          <div style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "240ms" }}>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed mb-8">
              Visitez chaque pièce en réalité virtuelle avant le premier coup de pelle.
            </p>
          </div>
          <div style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "360ms" }}
            className="pointer-events-auto flex flex-wrap justify-center gap-2">
            {["Visite à 360°", "Temps réel", "Matériaux au choix"].map(f => (
              <span key={f} className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] text-white/50">{f}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="absolute bottom-8 right-6 md:right-12 z-20">
          <GoldButton href="/contact" size="md">Découvrir la VR</GoldButton>
        </div>
      </section>
    </div>
  );
}

function OverlayContent() {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-8">
        <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />Réalité virtuelle
      </span>
      <h2 className="font-display text-white mb-6"
        style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
        Voyez votre maison<br />
        <em className="not-italic" style={{ color: "#C49A5A" }}>avant qu'elle existe.</em>
      </h2>
      <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-10">
        Avant le premier coup de pelle, vous visitez chaque pièce en réalité virtuelle.
        Vous ajustez, vous validez, vous avancez sereinement.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pointer-events-auto">
        {["Visite immersive à 360°", "Modifications en temps réel", "Matériaux & finitions au choix"].map(f => (
          <span key={f} className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs text-white/50">{f}</span>
        ))}
      </div>
    </>
  );
}
