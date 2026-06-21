"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const WORDS = ["Construction", "Agrandissement", "Rénovation"];
const CYCLE_MS = 6000;

export default function FooterAnimatedChips() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "120px" });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={ref} aria-label={WORDS.join(", ")}>
      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          {WORDS.map((word, wi) => {
            const PER_CHAR = 0.025;
            const LETTER_DUR = 0.06;
            const TEXT_DELAY = 0.2;
            const WORD_GAP = 0.12;
            const prev = WORDS.slice(0, wi).reduce(
              (sum, w) =>
                sum + TEXT_DELAY + Math.max(0, w.length - 1) * PER_CHAR + LETTER_DUR + WORD_GAP,
              0,
            );
            const chipStart = prev;
            const textStart = chipStart + TEXT_DELAY;
            return (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: chipStart,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block rounded-sm px-3 py-1.5 text-[11px] md:text-xs uppercase font-medium text-white shadow-[0_6px_20px_-10px_rgba(186,135,63,0.55)]"
                style={{ backgroundColor: "#ba873f", letterSpacing: "0.22em" }}
              >
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: LETTER_DUR,
                      delay: textStart + ci * PER_CHAR,
                      ease: "linear",
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
