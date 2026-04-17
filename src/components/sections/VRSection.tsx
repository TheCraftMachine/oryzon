"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function VRSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;
      if (!video) return;

      // Wait for video metadata so duration is available
      const onReady = () => {
        setVideoReady(true);

        ctx = gsap.context(() => {
          // Pin section for 3× its height — scroll controls the video
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            anticipatePin: 1,
            scrub: 2,
            onUpdate: (self) => {
              if (video.duration) {
                video.currentTime = video.duration * self.progress;
              }
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (overlayRef.current) {
                // fade in 0→15%, full 15→40%, fade out 40→55% (gone at ~second 4/8)
                const p = self.progress;
                const opacity = p < 0.15
                  ? p / 0.15
                  : p > 0.4
                    ? Math.max(0, 1 - (p - 0.4) / 0.15)
                    : 1;
                overlayRef.current.style.opacity = String(opacity);
              }
            },
          });
        }, sectionRef);
      };

      if (video.readyState >= 1) {
        onReady();
      } else {
        video.addEventListener("loadedmetadata", onReady, { once: true });
      }
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-[#0D1117] overflow-hidden"
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-px bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-[#C49A5A] origin-left"
          style={{ transform: "scaleX(0)", transition: "none" }}
        />
      </div>

      {/* Scroll hint — visible before scroll starts */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">Scroll pour explorer</p>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Video — fills entire section, scrubbed by scroll */}
      <video
        ref={videoRef}
        src="/videos/vr-plongeon.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle dark overlay — lighter in the middle of the video */}
      <div className="absolute inset-0 bg-[#0D1117]/40 pointer-events-none" />

      {/* Fallback — shown when no video yet */}
      {!videoReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(196,154,90,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(196,154,90,0.6) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      )}

      {/* Text overlay — fades in then out with scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-8">
          <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
          Réalité virtuelle
        </span>

        <h2
          className="font-display text-white mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          Voyez votre maison<br />
          <em className="not-italic" style={{ color: "#C49A5A" }}>
            avant qu'elle existe.
          </em>
        </h2>

        <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-10">
          Avant le premier coup de pelle, vous visitez chaque pièce
          en réalité virtuelle. Vous ajustez, vous validez, vous avancez
          sereinement.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pointer-events-auto">
          {[
            "Visite immersive à 360°",
            "Modifications en temps réel",
            "Matériaux & finitions au choix",
          ].map((feat) => (
            <span
              key={feat}
              className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs text-white/50"
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* CTA — appears at bottom, always accessible */}
      <div className="absolute bottom-10 right-8 md:right-12 z-20">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 bg-[#C49A5A] hover:bg-[#D4B07A] text-white text-xs font-semibold tracking-wide rounded-full px-5 py-2.5 transition-all duration-300 active:scale-[0.98]"
        >
          <span>Découvrir la VR</span>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
