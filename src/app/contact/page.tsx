"use client";

import { useState } from "react";
import Link from "next/link";

// ── Endpoint ─────────────────────────────────────────────────────────────────
// Le formulaire POST sur /contact.php (script PHP à la racine de l'hébergement OVH),
// qui transmet via l'API Brevo (serveurs France, RGPD-natif).
const CONTACT_ENDPOINT = "/contact.php";

// ── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Honeypot — si rempli, c'est un bot.
    if (formData.get("botcheck")) {
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Une erreur est survenue. Merci de réessayer ou de nous appeler au 02 31 348 340.");
      }
    } catch {
      setError("Impossible d'envoyer le message. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-6">
        <div className="w-14 h-14 rounded-full bg-[#ba873f]/15 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#ba873f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="font-display text-[#111111] text-xl mb-2" style={{ letterSpacing: "-0.02em" }}>
            Message envoyé
          </p>
        </div>
        <p className="text-xs text-[#6B6B6B]/60 max-w-xs">
          Pour une réponse plus rapide, vous pouvez aussi nous appeler au 02 31 348 340.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field — bots le remplissent, humains non */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
        aria-hidden="true"
      />

      {/* Nom */}
      <div>
        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#111111]/40 mb-2">
          Nom complet *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-4 py-3 rounded-xl bg-black/3 border border-black/8 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:border-[#ba873f] focus:bg-white transition-colors"
        />
      </div>

      {/* Email + Téléphone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#111111]/40 mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl bg-black/3 border border-black/8 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:border-[#ba873f] focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[#111111]/40 mb-2">
            Téléphone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl bg-black/3 border border-black/8 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:border-[#ba873f] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Type de projet */}
      <fieldset>
        <legend className="block text-xs uppercase tracking-widest text-[#111111]/40 mb-2">
          Type de projet *
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {["Construction", "Rénovation", "Agrandissement", "Autre"].map((opt) => (
            <label key={opt} className="relative cursor-pointer">
              <input
                type="radio"
                name="project_type"
                value={opt}
                required
                className="peer sr-only"
              />
              <div className="rounded-xl bg-black/3 border border-black/8 px-4 py-3 text-sm text-[#111111]/60 text-center transition-colors peer-checked:bg-[#ba873f] peer-checked:border-[#ba873f] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#ba873f]/40 hover:border-[#ba873f]/30">
                {opt}
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[#111111]/40 mb-2">
          Votre projet en quelques mots *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-xl bg-black/3 border border-black/8 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:border-[#ba873f] focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Consentement RGPD */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 w-4 h-4 rounded border-black/15 accent-[#ba873f] cursor-pointer"
        />
        <label htmlFor="consent" className="text-xs text-[#6B6B6B] leading-relaxed cursor-pointer">
          J'accepte que mes coordonnées soient utilisées pour traiter ma demande, conformément à la{" "}
          <Link href="/politique-confidentialite" className="text-[#ba873f] underline underline-offset-2">
            politique de confidentialité
          </Link>.
        </label>
      </div>

      {/* Erreur */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#ba873f] text-white px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-[#a37535] disabled:opacity-50 disabled:cursor-wait transition-colors cursor-pointer"
      >
        {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">

      {/* Top band */}
      <div className="bg-[#16202a] px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-6">
              <span className="w-1 h-1 rounded-full bg-[#ba873f]" />
              Premier contact
            </span>
            <h1
              className="font-display text-white mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              prenons le temps d’étudier<br />
              <em className="not-italic" style={{ color: "#ba873f" }}>votre projet.</em>
            </h1>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              Nous analysons ensemble ce qui est réalisable sur votre idée en un projet concret sans aucun engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left — reassurance */}
            <div className="lg:pt-4">
              <div className="space-y-8 mb-12">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#ba873f" strokeWidth="1.5" />
                        <path d="M12 7v5l3 3" stroke="#ba873f" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "Réponse rapide",
                    body: "Chaque demande est lue et traitée personnellement. Vous recevez une réponse rapide, jamais une relance automatique.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#ba873f" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    ),
                    title: "Aucun engagement",
                    body: "Cette prise de contact ne vous oblige à rien. Pas de devis forcé, pas de relance commerciale.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#ba873f" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="9" cy="7" r="4" stroke="#ba873f" strokeWidth="1.5" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#ba873f" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "Votre interlocuteur dédié",
                    body: "Bénéficiez d’un échange direct avec un expert impliqué à chaque étape de votre projet.",
                  },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#ba873f]/10 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-display text-[#111111] text-base mb-1" style={{ letterSpacing: "-0.01em" }}>
                        {item.title}
                      </p>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact direct */}
              <div className="rounded-2xl bg-white ring-1 ring-black/6 p-6">
                <p className="text-xs uppercase tracking-widest text-[#111111]/30 mb-4">
                  Contact direct
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+33231348340"
                    className="flex items-center gap-3 text-sm text-[#111111]/60 hover:text-[#ba873f] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-full bg-black/4 flex items-center justify-center group-hover:bg-[#ba873f]/10 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    02 31 348 340
                  </a>
                  <a
                    href="mailto:contact@maison-oryzon.fr"
                    className="flex items-center gap-3 text-sm text-[#111111]/60 hover:text-[#ba873f] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-full bg-black/4 flex items-center justify-center group-hover:bg-[#ba873f]/10 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    contact@maison-oryzon.fr
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[#111111]/40">
                    <span className="w-7 h-7 rounded-full bg-black/4 flex items-center justify-center">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                    Caen & Calvados
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="rounded-[1.75rem] bg-black/3 ring-1 ring-black/6 p-1.5">
                <div className="rounded-[1.25rem] bg-white p-6 md:p-8">
                  <p className="font-display text-[#111111] text-lg mb-1" style={{ letterSpacing: "-0.02em" }}>
                    Parlez-nous de votre projet
                  </p>
                  <p className="text-xs text-[#6B6B6B] mb-7">
                    Construction, rénovation ou agrandissement, décrivez-nous votre idée.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
