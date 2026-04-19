"use client";

import { useState } from "react";
import Link from "next/link";
import GoldButton from "@/components/ui/GoldButton";

// ── Fake calendar data ───────────────────────────────────────────────────────

const UNAVAILABLE_DAYS = [0, 6]; // Sun, Sat
const BOOKED_SLOTS: Record<number, number[]> = {
  3: [9, 10],
  7: [14, 15],
  11: [9],
  16: [10, 11, 14],
  22: [15],
};

const TIME_SLOTS = [
  { label: "9h00", value: 9 },
  { label: "10h00", value: 10 },
  { label: "11h00", value: 11 },
  { label: "14h00", value: 14 },
  { label: "15h00", value: 15 },
  { label: "16h00", value: 16 },
];

const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// ── Booking calendar ─────────────────────────────────────────────────────────

function BookingCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const firstDay = new Date(viewYear, viewMonth, 1);
  // Monday-first offset
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null); setSelectedTime(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null); setSelectedTime(null);
  };

  const isUnavailable = (day: number) => {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    const isPast = new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return UNAVAILABLE_DAYS.includes(dow) || isPast;
  };

  const availableSlots = selectedDay
    ? TIME_SLOTS.filter(s => !(BOOKED_SLOTS[selectedDay] ?? []).includes(s.value))
    : [];

  if (confirmed && selectedDay && selectedTime) {
    const slot = TIME_SLOTS.find(s => s.value === selectedTime);
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-6">
        <div className="w-14 h-14 rounded-full bg-[#C49A5A]/15 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#C49A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="font-display text-[#111111] text-xl mb-2" style={{ letterSpacing: "-0.02em" }}>
            Rendez-vous réservé
          </p>
          <p className="text-sm text-[#6B6B6B]">
            Le {selectedDay} {MONTH_NAMES[viewMonth]} à {slot?.label}
          </p>
        </div>
        <p className="text-xs text-[#6B6B6B]/60 max-w-xs">
          Vous recevrez une confirmation par email. Olivier vous contactera si besoin d'informations complémentaires.
        </p>
        <button
          onClick={() => { setConfirmed(false); setSelectedDay(null); setSelectedTime(null); }}
          className="text-xs text-[#C49A5A] underline underline-offset-4 cursor-pointer"
        >
          Modifier le rendez-vous
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#111111]/40 hover:border-black/20 hover:text-[#111111] transition-all cursor-pointer"
          aria-label="Mois précédent"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-[#111111] text-sm tracking-wide">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </p>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#111111]/40 hover:border-black/20 hover:text-[#111111] transition-all cursor-pointer"
          aria-label="Mois suivant"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] uppercase tracking-widest text-[#111111]/25 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const unavailable = isUnavailable(day);
          const isSelected = selectedDay === day;
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();

          return (
            <button
              key={day}
              disabled={unavailable}
              onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
              className={[
                "aspect-square rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                unavailable
                  ? "text-[#111111]/15 cursor-not-allowed"
                  : isSelected
                    ? "bg-[#C49A5A] text-white shadow-sm"
                    : isToday
                      ? "ring-1 ring-[#C49A5A] text-[#C49A5A] hover:bg-[#C49A5A]/8"
                      : "text-[#111111]/70 hover:bg-black/5 hover:text-[#111111]",
              ].join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div className="mt-6 pt-6 border-t border-black/6">
          <p className="text-xs text-[#111111]/40 uppercase tracking-widest mb-3">
            Créneaux disponibles — {selectedDay} {MONTH_NAMES[viewMonth]}
          </p>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-[#6B6B6B]">Aucun créneau disponible ce jour.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {availableSlots.map(slot => (
                <button
                  key={slot.value}
                  onClick={() => setSelectedTime(slot.value)}
                  className={[
                    "rounded-full border px-4 py-1.5 text-sm transition-all duration-200 cursor-pointer",
                    selectedTime === slot.value
                      ? "bg-[#C49A5A] border-[#C49A5A] text-white"
                      : "border-black/10 text-[#111111]/60 hover:border-[#C49A5A]/50 hover:text-[#C49A5A]",
                  ].join(" ")}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Confirm */}
      {selectedDay && selectedTime && (
        <div className="mt-6">
          <GoldButton onClick={() => setConfirmed(true)} size="lg" className="w-full justify-center">
            Confirmer le rendez-vous
          </GoldButton>
          <p className="text-center text-[10px] text-[#111111]/30 mt-3">
            Sans engagement · Annulation libre 24h avant
          </p>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F9F7F4]">

      {/* Top band */}
      <div className="bg-[#0D1117] px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 mb-6">
              <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
              Premier contact
            </span>
            <h1
              className="font-display text-white mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Parlons de<br />
              <em className="not-italic" style={{ color: "#C49A5A" }}>votre maison.</em>
            </h1>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              30 minutes pour vous écouter, vous conseiller, et voir ensemble si votre projet est réalisable. Gratuit, sans engagement.
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
                        <circle cx="12" cy="12" r="10" stroke="#C49A5A" strokeWidth="1.5" />
                        <path d="M12 7v5l3 3" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "30 minutes chrono",
                    body: "Un rendez-vous court, structuré et efficace. Vous repartez avec une vision claire de votre projet.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C49A5A" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    ),
                    title: "Aucun engagement",
                    body: "Ce rendez-vous ne vous oblige à rien. Pas de devis forcé, pas de relance commerciale.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="9" cy="7" r="4" stroke="#C49A5A" strokeWidth="1.5" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#C49A5A" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ),
                    title: "Directement avec Olivier",
                    body: "Pas d'assistant commercial. Vous échangez dès le départ avec le fondateur et chef de projet.",
                  },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#C49A5A]/10 flex items-center justify-center shrink-0 mt-0.5">
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
                    href="tel:+33XXXXXXXXX"
                    className="flex items-center gap-3 text-sm text-[#111111]/60 hover:text-[#C49A5A] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-full bg-black/4 flex items-center justify-center group-hover:bg-[#C49A5A]/10 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    06 XX XX XX XX
                  </a>
                  <a
                    href="mailto:contact@oryzon.fr"
                    className="flex items-center gap-3 text-sm text-[#111111]/60 hover:text-[#C49A5A] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-full bg-black/4 flex items-center justify-center group-hover:bg-[#C49A5A]/10 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    contact@oryzon.fr
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

            {/* Right — calendar */}
            <div>
              <div className="rounded-[1.75rem] bg-black/3 ring-1 ring-black/6 p-1.5">
                <div className="rounded-[1.25rem] bg-white p-6 md:p-8">
                  <p className="font-display text-[#111111] text-lg mb-1" style={{ letterSpacing: "-0.02em" }}>
                    Choisissez un créneau
                  </p>
                  <p className="text-xs text-[#6B6B6B] mb-7">
                    Réponse sous 24h · Visio ou présentiel à Caen
                  </p>
                  <BookingCalendar />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
