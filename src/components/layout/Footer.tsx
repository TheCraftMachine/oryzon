import Link from "next/link";
import Image from "next/image";
import GoldButton from "@/components/ui/GoldButton";

const SERVICES = [
  { label: "Construction sur mesure", href: "/construire" },
  { label: "Rénovation", href: "/renover" },
  { label: "Agrandissement", href: "/agrandir" },
  { label: "Réalisations", href: "/realisations" },
];

const COMPANY = [
  { label: "Notre histoire", href: "/notre-histoire" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0D1117] overflow-hidden">

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

        {/* ── Brand row ───────────────────────────────────────── */}
        <div className="pt-20 pb-14 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/[0.07]">

          {/* Wordmark + tagline */}
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C49A5A]/60 mb-5">
              Caen · Calvados · Normandie
            </p>
            <Image
              src="/images/footer-logo.webp"
              alt="Oryzon – Constructeur de maisons sur mesure en Calvados"
              width={0}
              height={0}
              sizes="600px"
              className="block"
              style={{ height: "clamp(5rem, 12vw, 9rem)", width: "auto" }}
            />
            <p className="text-white/30 text-sm mt-4 leading-relaxed">
              Constructeur de maisons sur mesure.<br />
              Du plan à la remise des clés.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center md:items-end gap-3 md:pb-2">
            <GoldButton href="/contact" size="lg">Démarrer mon projet</GoldButton>
            <p className="text-[11px] text-white/20">Premier RDV gratuit · Sans engagement</p>
          </div>
        </div>

        {/* ── Links + Contact row ─────────────────────────────── */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* Services */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-7">Services</p>
            <ul className="space-y-4">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-0 text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 shrink-0 h-px bg-[#C49A5A] group-hover:w-4 transition-all duration-300 ease-out mr-0 group-hover:mr-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-7">Société</p>
            <ul className="space-y-4">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-0 text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 shrink-0 h-px bg-[#C49A5A] group-hover:w-4 transition-all duration-300 ease-out mr-0 group-hover:mr-2" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-7">Contact</p>
            <div className="space-y-4">
              <a
                href="tel:+33XXXXXXXXX"
                className="group flex items-center gap-3 text-sm text-white/45 hover:text-white transition-colors duration-200"
              >
                <span className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center shrink-0 group-hover:ring-[#C49A5A]/30 group-hover:bg-[#C49A5A]/8 transition-all duration-200">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                06 XX XX XX XX
              </a>
              <a
                href="mailto:contact@oryzon.fr"
                className="group flex items-center gap-3 text-sm text-white/45 hover:text-white transition-colors duration-200"
              >
                <span className="w-8 h-8 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] flex items-center justify-center shrink-0 group-hover:ring-[#C49A5A]/30 group-hover:bg-[#C49A5A]/8 transition-all duration-200">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                contact@oryzon.fr
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
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-[#C49A5A]/50" />
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
