import Link from "next/link";
import Image from "next/image";
import FooterAnimatedChips from "./FooterAnimatedChips";

const SECTIONS = [
  { label: "Savoir-faire", href: "/#expertises" },
  { label: "Réalité virtuelle", href: "/#vr" },
  { label: "Processus", href: "/#processus" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Pourquoi Oryzon", href: "/#pourquoi" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#16202a] overflow-hidden">

      {/* Blueprint grid — architectural texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,154,90,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,154,90,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow — anchored bottom-left near the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[400px]"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(196,154,90,0.05) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Links + Logo + Contact row ─────────────────────── */}
        <div className="pt-16 md:pt-20 pb-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 items-center">

          {/* Sections (one-page nav) */}
          <div className="md:col-span-1">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-7">Sections</p>
            <ul className="space-y-4">
              {SECTIONS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-0 text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 shrink-0 h-px bg-[#ba873f] group-hover:w-4 transition-all duration-300 ease-out mr-0 group-hover:mr-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo + chips animés en loop — center column (50%) */}
          <div className="md:col-span-2 flex flex-col items-center gap-5 md:gap-6">
            <Image
              src="/images/logo-black-animated.webp"
              alt="Oryzon – Constructeur de maisons sur mesure en Calvados"
              width={456}
              height={239}
              unoptimized
              className="block w-auto max-w-none"
              style={{ height: "clamp(7rem, 16vw, 12rem)" }}
            />
            <FooterAnimatedChips />
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 md:col-span-1 md:justify-self-end">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-7">Contact</p>
            <div className="space-y-4">
              <a
                href="tel:+33231348340"
                className="group flex items-center gap-3 text-sm text-white/45 hover:text-white transition-colors duration-200"
              >
                <span className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center shrink-0 group-hover:ring-[#ba873f]/30 group-hover:bg-[#ba873f]/8 transition-all duration-200">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                02 31 348 340
              </a>
              <a
                href="mailto:contact@maison-oryzon.fr"
                className="group flex items-center gap-3 text-sm text-white/45 hover:text-white transition-colors duration-200"
              >
                <span className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center shrink-0 group-hover:ring-[#ba873f]/30 group-hover:bg-[#ba873f]/8 transition-all duration-200">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                contact@maison-oryzon.fr
              </a>
              <div className="flex items-center gap-3 text-sm text-white/25">
                <span className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                Caen &amp; Calvados, Normandie
              </div>

              {/* Social */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Oryzon sur Facebook"
                  className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center text-white/45 hover:text-white hover:ring-[#ba873f]/30 hover:bg-[#ba873f]/8 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M13.5 21v-8.25h2.77l.41-3.22h-3.18V7.46c0-.93.26-1.57 1.6-1.57h1.7V3.02C16.5 3 15.5 2.9 14.3 2.9c-2.5 0-4.2 1.52-4.2 4.3v2.4H7.3v3.22h2.8V21h3.4z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Oryzon sur Instagram"
                  className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center text-white/45 hover:text-white hover:ring-[#ba873f]/30 hover:bg-[#ba873f]/8 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-[#ba873f]/50" />
            <p className="text-[11px] text-white/20">
              © {new Date().getFullYear()} Oryzon · Tous droits réservés
            </p>
          </div>
          <ul className="flex items-center gap-6">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[11px] text-white/20 hover:text-white/50 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </footer>
  );
}
