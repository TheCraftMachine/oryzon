import Link from "next/link";

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
    <footer className="bg-[--color-bg-dark] text-[--color-text-on-dark]">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-4">
            <p className="font-display text-2xl text-white mb-4">Oryzon</p>
            <p className="text-sm text-[--color-text-muted-on-dark] leading-relaxed max-w-xs">
              Constructeur de maisons sur mesure en Calvados. Du plan à la
              remise des clés, avec un interlocuteur unique.
            </p>
            <div className="mt-8 space-y-1">
              <p className="text-xs text-[--color-text-muted-on-dark]">
                Caen & Calvados, Normandie
              </p>
              <a
                href="tel:+33XXXXXXXXX"
                className="text-sm text-white/80 hover:text-[#C49A5A] transition-colors duration-200 block"
              >
                +33 (0)X XX XX XX XX
              </a>
              <a
                href="mailto:contact@oryzon.fr"
                className="text-sm text-white/80 hover:text-[#C49A5A] transition-colors duration-200 block"
              >
                contact@oryzon.fr
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[--color-text-muted-on-dark] mb-5">
              Nos services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[--color-text-muted-on-dark] mb-5">
              Société
            </p>
            <ul className="space-y-3">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="md:col-span-3 md:text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[--color-text-muted-on-dark] mb-5">
              Votre projet
            </p>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Premier rendez-vous gratuit et sans engagement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C49A5A] text-white text-xs font-semibold tracking-wide rounded-full px-5 py-2.5 hover:bg-[#D4B07A] active:scale-[0.98] transition-all duration-200 group"
            >
              <span>Prendre RDV</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-200">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[--color-border-on-dark]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Oryzon. Tous droits réservés.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
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
