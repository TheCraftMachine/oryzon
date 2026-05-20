"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

const NAV_LINKS = [
  { label: "Savoir-faire", href: "/#expertises" },
  { label: "Réalité virtuelle", href: "/#vr" },
  { label: "Processus", href: "/#processus" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Pourquoi Oryzon", href: "/#pourquoi" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Floating pill — no entrance animation to avoid SSR flash ── */}
      <header className="fixed top-0 left-0 right-0 z-[300] flex justify-center lg:justify-end pt-4 px-4 pointer-events-none">
        <nav
          className={[
            "pointer-events-auto flex items-center gap-2 sm:gap-4",
            "rounded-full px-2 sm:px-3 py-2 transition-all duration-500",
            scrolled || open
              ? "bg-[#0D1117]/90 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-[#0D1117]/70 backdrop-blur-md ring-1 ring-white/8",
          ].join(" ")}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center px-1.5 sm:px-2 opacity-90 hover:opacity-100 transition-opacity duration-200">
            <Image
              src="/images/nav-logo.webp"
              alt="Oryzon – Constructeur de maisons sur mesure en Calvados"
              width={0}
              height={0}
              sizes="200px"
              className="block"
              style={{ height: "18px", width: "auto" }}
              priority
            />
          </Link>

          {/* Separator + CTA — hidden on very small screens to prevent pill overflow */}
          <span className="hidden sm:flex items-center gap-4">
            <span className="w-px h-4 bg-white/15" aria-hidden="true" />
            <GoldButton href="/contact" size="sm">Prendre RDV</GoldButton>
          </span>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] cursor-pointer rounded-full hover:bg-white/8 transition-colors duration-200"
          >
            <span className={[
              "block h-px w-4 bg-white origin-center transition-all duration-300",
              open ? "translate-y-[4.5px] rotate-45" : "",
            ].join(" ")} />
            <span className={[
              "block h-px bg-white origin-center transition-all duration-300",
              open ? "w-4 opacity-0 scale-x-0" : "w-2.5 self-end mr-[3px]",
            ].join(" ")} />
            <span className={[
              "block h-px w-4 bg-white origin-center transition-all duration-300",
              open ? "-translate-y-[4.5px] -rotate-45" : "",
            ].join(" ")} />
          </button>
        </nav>
      </header>

      {/* ── Full-screen overlay ──────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-[#0D1117]/96 backdrop-blur-2xl flex flex-col"
          >
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-20 pt-20">
              <ul className="space-y-0">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.04 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-white/6 last:border-0"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 md:py-6"
                    >
                      <span className="font-display text-3xl md:text-5xl text-white/85 group-hover:text-white transition-colors duration-200">
                        {link.label}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#C49A5A] group-hover:text-[#C49A5A] transition-all duration-200">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-10"
              >
                <GoldButton href="/contact" onClick={() => setOpen(false)} size="lg">
                  Parlons de votre projet
                </GoldButton>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="px-8 md:px-20 pb-8 pt-6 flex items-center justify-between border-t border-white/6"
            >
              <p className="text-white/25 text-xs">Calvados & Normandie</p>
              <p className="text-white/25 text-xs">© {new Date().getFullYear()} Oryzon</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
