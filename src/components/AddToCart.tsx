"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { CheckIcon } from "./icons";

export default function AddToCart({ p, lang }: { p: Product; lang: Locale }) {
  const t = getDict(lang);
  const { add } = useCart();
  const [shade, setShade] = useState(p.shades?.[0]?.name);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const out = p.stock <= 0;

  return (
    <div className="space-y-5">
      {p.shades && (
        <fieldset>
          <legend className="text-sm mb-2">
            {t.color} : <span className="font-medium">{shade}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {p.shades.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setShade(s.name)}
                aria-label={s.name}
                aria-pressed={shade === s.name}
                className={`w-10 h-10 rounded-full border-2 transition ${shade === s.name ? "border-rose scale-110" : "border-white shadow"}`}
                style={{ background: s.hex }}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center border border-line rounded-full bg-white" aria-label={t.qty}>
          <button type="button" className="w-10 h-11 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={out}>
            −
          </button>
          <span className="w-8 text-center num">{qty}</span>
          <button
            type="button"
            className="w-10 h-11 text-lg"
            onClick={() => setQty((q) => Math.min(p.stock, q + 1))}
            disabled={out}
          >
            +
          </button>
        </div>
        <button
          type="button"
          disabled={out}
          onClick={() => {
            add(p.id, shade, qty);
            setDone(true);
          }}
          className="btn btn-rose flex-1 min-w-48 disabled:opacity-40"
        >
          {out ? t.outOfStock : t.addToCart}
        </button>
      </div>

      {done && (
        <p className="flex items-center gap-2 text-sm text-ok" role="status">
          <CheckIcon className="w-4 h-4" /> {t.added} ·{" "}
          <Link href={`/${lang}/panier`} className="underline">
            {t.cart}
          </Link>
        </p>
      )}
    </div>
  );
}
