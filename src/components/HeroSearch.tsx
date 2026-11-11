"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getDict, type Locale } from "@/lib/i18n";
import { wilayas } from "@/lib/wilayas";
import { PinIcon, SearchIcon } from "./icons";

/** Recherche de l'accueil : produits ou salons, filtrés par wilaya. */
export default function HeroSearch({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const router = useRouter();
  const [mode, setMode] = useState<"products" | "salons">("products");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const q = new URLSearchParams();
    const w = String(f.get("w") || "");
    const text = String(f.get("q") || "").trim();
    if (w) q.set("w", w);
    if (mode === "products" && text) q.set("q", text);
    const qs = q.toString();
    router.push(`/${lang}/${mode === "products" ? "recherche" : "salons"}${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="bg-cream text-ink shadow-[0_24px_60px_-24px_rgba(26,16,20,.55)] rounded-[4px]">
      <div className="flex border-b border-line" role="tablist">
        {(["products", "salons"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`px-5 py-3 text-sm border-b-2 -mb-px transition-colors ${mode === m ? "border-rose text-ink font-medium" : "border-transparent text-muted hover:text-ink"}`}
          >
            {m === "products" ? t.products : t.salons}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="grid sm:grid-cols-[1.3fr_1fr_auto] gap-px bg-line" role="search">
        {mode === "products" && (
          <label className="bg-cream flex items-center gap-2 px-4">
            <SearchIcon className="w-4 h-4 text-muted shrink-0" />
            <input
              id="hero-q"
              name="q"
              placeholder={t.whatSearch}
              className="w-full py-4 bg-transparent focus:outline-none placeholder:text-muted/70"
            />
          </label>
        )}
        <label className={`bg-cream flex items-center gap-2 px-4 ${mode === "salons" ? "sm:col-span-2" : ""}`}>
          <PinIcon className="w-4 h-4 text-muted shrink-0" />
          <select id="hero-w" name="w" defaultValue="" className="w-full py-4 bg-transparent focus:outline-none">
            <option value="">{t.allWilayas}</option>
            {wilayas.map(([code, fr, ar]) => (
              <option key={code} value={code}>
                {String(code).padStart(2, "0")} · {lang === "ar" ? ar : fr}
              </option>
            ))}
          </select>
        </label>
        <button className="btn btn-rose rounded-none sm:rounded-e-[4px]">{t.searchBtn}</button>
      </form>
    </div>
  );
}
