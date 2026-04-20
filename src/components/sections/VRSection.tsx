"use client";

import { useEffect, useRef, useState } from "react";
import GoldButton from "@/components/ui/GoldButton";

export default function VRSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setVideoReady(true);
    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });
  }, []);

  // Desktop: start loading video 1s after page load so critical resources go first
  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    const startLoad = () => { video.preload = "auto"; video.load(); };
    if (document.readyState === "complete") {
      const t = setTimeout(startLoad, 800);
      return () => clearTimeout(t);
    }
    const onLoad = () => setTimeout(startLoad, 800);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Desktop: GSAP scrubs video.currentTime — CSS sticky handles pinning
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

      if (video) { video.pause(); video.currentTime = 0; }

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            if (video?.duration) video.currentTime = video.duration * self.progress;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  // Mobile: play only when section is in viewport
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Desktop: 400vh sticky scroll-scrub ─────────────────── */}
      <div ref={wrapperRef} style={{ height: "400vh" }} className="hidden lg:block bg-[#0D1117]">
        <section className="sticky top-0 h-[100dvh] relative bg-[#0D1117] overflow-hidden">

          <div className="absolute top-0 left-0 right-0 z-20 h-px bg-white/10">
            <div ref={progressRef} className="h-full bg-[#C49A5A] origin-left" style={{ transform: "scaleX(0)", transition: "none" }} />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">Scroll pour explorer</p>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>

          <div className="absolute inset-0">
            <video ref={videoRef} src="/videos/vr-plongeon.mp4" muted playsInline preload="none"
              className="w-full h-full object-cover" />
          </div>

          <div className="absolute inset-0 bg-[#0D1117]/40 pointer-events-none" />

          {!videoReady && (
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(196,154,90,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,90,0.6) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} />
          )}

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
            <OverlayContent />
          </div>

          <div className="absolute bottom-8 right-12 z-20">
            <GoldButton href="/contact" size="md">Découvrir la VR</GoldButton>
          </div>
        </section>
      </div>

      {/* ── Mobile: section normale, vidéo autoplay ─────────────── */}
      <section className="lg:hidden relative bg-[#0D1117] overflow-hidden h-[100dvh]">

        {/* Vidéo plein fond */}
        <video
          ref={mobileVideoRef}
          src="/videos/vr-plongeon.mp4"
          muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dégradés */}
        <div className="absolute inset-0 bg-[#0D1117]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-[#0D1117]/30 pointer-events-none" />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-8">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
            Réalité virtuelle
          </span>

          <h2 className="font-display text-white mb-5"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Voyez votre maison<br />
            <em className="not-italic" style={{ color: "#C49A5A" }}>avant qu'elle existe.</em>
          </h2>

          <p className="text-white/60 text-sm max-w-xs leading-relaxed mb-10">
            Visitez chaque pièce en réalité virtuelle avant le premier coup de pelle.
            Vous ajustez, vous validez.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["Visite à 360°", "Temps réel", "Matériaux au choix"].map(f => (
              <span key={f} className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] text-white/50">{f}</span>
            ))}
          </div>

          <GoldButton href="/contact" size="lg">Découvrir la VR</GoldButton>
        </div>
      </section>
    </>
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
      <p className="text-white/60 text-base max-w-lg leading-relaxed mb-10">
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
