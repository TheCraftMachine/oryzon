"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type LightboxImage = {
  src: string;
  type?: "photo" | "plan";
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  location?: string;
  images: LightboxImage[];
};

export default function ProjectLightbox({
  open,
  onClose,
  title,
  location,
  images,
}: Props) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, next, prev]);

  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStart.current = null;
  };

  return (
    <AnimatePresence>
      {open && total > 0 && (
        <motion.div
          key="lb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie - ${title}`}
          className="fixed inset-0 z-[500] bg-[#0d141c]/97 backdrop-blur-xl flex flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-5 md:px-10 py-4 md:py-5 shrink-0">
            <div className="min-w-0 flex items-center gap-3 md:gap-4">
              <span className="w-1 h-1 rounded-full bg-[#ba873f] shrink-0" />
              <p
                className="font-display text-white text-sm md:text-lg truncate"
                style={{ letterSpacing: "-0.02em" }}
              >
                {title}
                {location && (
                  <span className="text-white/40 text-xs md:text-sm font-sans ml-3">
                    {location}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <p className="text-white/55 text-xs tabular-nums tracking-[0.15em]">
                <span className="text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/25 mx-1.5">/</span>
                {String(total).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la galerie"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/8 transition-colors duration-200 cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center relative px-4 md:px-20 min-h-0">
            <button
              type="button"
              onClick={prev}
              aria-label="Image précédente"
              className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/80 hover:text-white items-center justify-center transition-all duration-200 z-10 cursor-pointer"
            >
              <ChevronLeft />
            </button>

            <div className="relative w-full max-w-6xl h-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={images[index].src}
                      alt={`${title} - vue ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 95vw, 1200px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  {images[index].type === "plan" && (
                    <span className="absolute top-3 left-3 md:top-5 md:left-5 rounded-full border border-[#ba873f]/40 bg-[#ba873f]/15 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#d1a464]">
                      Plan 2D
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Image suivante"
              className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/80 hover:text-white items-center justify-center transition-all duration-200 z-10 cursor-pointer"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0 px-4 md:px-12 pb-5 md:pb-8 pt-4">
            <div className="mx-auto max-w-6xl overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-center gap-2 min-w-min py-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Voir image ${i + 1}`}
                    aria-current={i === index}
                    className={[
                      "relative shrink-0 overflow-hidden rounded-md transition-all duration-200 cursor-pointer",
                      i === index
                        ? "ring-2 ring-[#ba873f] opacity-100"
                        : "ring-1 ring-white/10 opacity-50 hover:opacity-90",
                    ].join(" ")}
                    style={{ width: 72, height: 54 }}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                    {img.type === "plan" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-[8px] text-[#d1a464] uppercase tracking-[0.15em] font-medium">
                        Plan
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 3L13 13M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M9 2L4 7L9 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M5 2L10 7L5 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
