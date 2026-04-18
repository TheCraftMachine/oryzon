"use client";

import Link from "next/link";

const sizes = {
  sm: { pill: "px-4 py-2 text-[11px] gap-2.5",  icon: "w-4 h-4", svg: 8  },
  md: { pill: "px-5 py-2.5 text-xs gap-3",       icon: "w-5 h-5", svg: 9  },
  lg: { pill: "px-6 py-3.5 text-sm gap-3",       icon: "w-5 h-5", svg: 10 },
  xl: { pill: "px-8 py-4 text-sm gap-3.5",       icon: "w-6 h-6", svg: 10 },
} as const;

type Props = {
  children: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

function ArrowIcon({ n }: { n: number }) {
  return (
    <svg width={n} height={n} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GoldButton({ children, size = "lg", className = "", href, onClick, type = "button" }: Props) {
  const s = sizes[size];

  const base = [
    "group inline-flex items-center rounded-full",
    "bg-[#C49A5A] hover:bg-[#D4AA6E] text-white",
    "font-medium tracking-[0.04em]",
    "transition-all duration-300",
    "active:scale-[0.97]",
    s.pill,
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {/* Arrow — outlined circle, moves ↗ on hover */}
      <span className={`flex items-center justify-center rounded-full border border-white/30 shrink-0 transition-all duration-300 group-hover:border-white/70 group-hover:bg-white/10 ${s.icon}`}>
        <span className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
          <ArrowIcon n={s.svg} />
        </span>
      </span>
    </>
  );

  if (href) {
    return <Link href={href} onClick={onClick} className={base}>{inner}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {inner}
    </button>
  );
}
