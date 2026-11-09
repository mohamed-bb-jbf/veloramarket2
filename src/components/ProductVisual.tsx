import type { Visual } from "@/lib/data";

/**
 * Illustrations vectorielles provisoires des produits.
 * Remplacées par les vraies photos quand les vendeuses publieront leurs produits.
 */
export default function ProductVisual({
  visual,
  tint,
  className = "",
}: {
  visual: Visual;
  tint: string;
  className?: string;
}) {
  const dark = "#1f1a1c";
  const gold = "#c9a46a";
  const glass = "rgba(255,255,255,.55)";
  const shapes: Record<Visual, React.ReactNode> = {
    lipstick: (
      <>
        <rect x="38" y="52" width="24" height="36" rx="3" fill={dark} />
        <rect x="40" y="44" width="20" height="10" rx="1.5" fill={gold} />
        <path d="M42 44 V26 Q42 18 58 14 V44 Z" fill={tint} />
        <rect x="58" y="52" width="2" height="36" fill="rgba(255,255,255,.12)" />
      </>
    ),
    foundation: (
      <>
        <rect x="40" y="10" width="20" height="18" rx="3" fill={dark} />
        <rect x="32" y="28" width="36" height="60" rx="6" fill={tint} />
        <rect x="32" y="28" width="36" height="60" rx="6" fill="url(#shine)" />
        <rect x="38" y="48" width="24" height="18" rx="2" fill="rgba(255,255,255,.75)" />
        <rect x="42" y="53" width="16" height="2.5" rx="1" fill={dark} />
        <rect x="44" y="58" width="12" height="2" rx="1" fill="#9a8a8f" />
      </>
    ),
    mascara: (
      <>
        <rect x="30" y="12" width="14" height="76" rx="7" fill={tint} />
        <rect x="30" y="12" width="14" height="30" rx="7" fill={gold} />
        <rect x="54" y="12" width="14" height="76" rx="7" fill={tint} transform="rotate(10 61 50)" />
        <rect x="54" y="12" width="14" height="30" rx="7" fill={dark} transform="rotate(10 61 50)" />
      </>
    ),
    palette: (
      <>
        <rect x="14" y="22" width="72" height="56" rx="6" fill={dark} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}${c}`}
              x={21 + c * 21}
              y={28 + r * 16}
              width="16"
              height="12"
              rx="2"
              fill={tint}
              opacity={0.45 + ((r * 3 + c) % 5) * 0.13}
            />
          )),
        )}
      </>
    ),
    perfume: (
      <>
        <rect x="44" y="10" width="12" height="10" rx="2" fill={gold} />
        <rect x="40" y="20" width="20" height="8" rx="2" fill={gold} />
        <rect x="24" y="28" width="52" height="60" rx="10" fill={tint} opacity=".85" />
        <rect x="24" y="28" width="52" height="60" rx="10" fill="url(#shine)" />
        <rect x="34" y="50" width="32" height="14" rx="2" fill={glass} />
      </>
    ),
    serum: (
      <>
        <circle cx="50" cy="16" r="7" fill={dark} />
        <rect x="45" y="18" width="10" height="14" fill={dark} />
        <rect x="34" y="32" width="32" height="56" rx="5" fill={tint} opacity=".9" />
        <rect x="34" y="32" width="32" height="56" rx="5" fill="url(#shine)" />
        <rect x="39" y="52" width="22" height="16" rx="2" fill={glass} />
      </>
    ),
    cream: (
      <>
        <rect x="20" y="40" width="60" height="12" rx="4" fill={tint} />
        <rect x="22" y="52" width="56" height="30" rx="6" fill="#fdfbf8" />
        <rect x="22" y="52" width="56" height="30" rx="6" fill="url(#shine)" />
        <rect x="34" y="62" width="32" height="8" rx="2" fill={tint} opacity=".6" />
      </>
    ),
    polish: (
      <>
        <rect x="42" y="12" width="16" height="30" rx="3" fill={dark} />
        <path d="M30 50 Q30 42 38 42 H62 Q70 42 70 50 V80 Q70 88 62 88 H38 Q30 88 30 80 Z" fill={tint} />
        <path d="M30 50 Q30 42 38 42 H62 Q70 42 70 50 V80 Q70 88 62 88 H38 Q30 88 30 80 Z" fill="url(#shine)" />
      </>
    ),
    shampoo: (
      <>
        <rect x="44" y="8" width="12" height="12" rx="2" fill={dark} />
        <path d="M34 26 Q34 20 40 20 H60 Q66 20 66 26 V86 Q66 90 62 90 H38 Q34 90 34 86 Z" fill={tint} />
        <path d="M34 26 Q34 20 40 20 H60 Q66 20 66 26 V86 Q66 90 62 90 H38 Q34 90 34 86 Z" fill="url(#shine)" />
        <rect x="40" y="46" width="20" height="22" rx="2" fill={glass} />
      </>
    ),
    lotion: (
      <>
        <rect x="47" y="6" width="6" height="12" fill={dark} />
        <rect x="47" y="6" width="18" height="5" rx="2" fill={dark} />
        <rect x="42" y="18" width="16" height="10" rx="2" fill={dark} />
        <rect x="32" y="28" width="36" height="62" rx="8" fill={tint} />
        <rect x="32" y="28" width="36" height="62" rx="8" fill="url(#shine)" />
        <rect x="38" y="52" width="24" height="18" rx="2" fill={glass} />
      </>
    ),
    brush: (
      <>
        {[-14, 0, 14].map((a, i) => (
          <g key={a} transform={`rotate(${a} 50 90)`}>
            <rect x="47" y="40" width="6" height="48" rx="3" fill={dark} />
            <rect x="46" y="34" width="8" height="8" fill={gold} />
            <ellipse cx="50" cy={24 - i * 2} rx="7" ry="12" fill={tint} />
          </g>
        ))}
      </>
    ),
  };
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="shine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="30" ry="3" fill="#000" opacity=".08" />
      {shapes[visual]}
    </svg>
  );
}
