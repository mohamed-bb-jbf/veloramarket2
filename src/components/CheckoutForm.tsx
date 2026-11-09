"use client";

import { useState } from "react";
import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { wilayas } from "@/lib/wilayas";
import { useCart } from "./CartProvider";
import { Totals, useGroupedCart } from "./CartView";
import { CheckIcon } from "./icons";

export const PHONE_RE = /^0[567]\d{8}$/;
export const cleanPhone = (s: string) => s.replace(/[\s.-]/g, "");

export default function CheckoutForm({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { items, clear } = useCart();
  const { groups, total } = useGroupedCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderNo, setOrderNo] = useState<string | null>(null);

  if (orderNo)
    return (
      <div className="bg-white rounded-2xl border border-line p-10 text-center space-y-4 max-w-lg mx-auto">
        <span className="w-14 h-14 rounded-full bg-ok/10 text-ok grid place-items-center mx-auto">
          <CheckIcon className="w-7 h-7" />
        </span>
        <h2 className="font-display text-3xl">{t.orderSent}</h2>
        <p className="text-muted">
          {t.orderSentText} <strong className="text-ink num">{orderNo}</strong>
        </p>
        <Link href={`/${lang}`} className="btn btn-rose">{t.continueShopping}</Link>
      </div>
    );

  if (!items.length)
    return (
      <div className="bg-white rounded-2xl border border-line p-10 text-center space-y-4">
        <p className="text-muted">{t.emptyCart}</p>
        <Link href={`/${lang}/categories`} className="btn btn-rose">{t.continueShopping}</Link>
      </div>
    );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    for (const k of ["name", "phone", "wilaya", "commune", "address"]) if (!f[k]?.trim()) err[k] = t.required;
    if (f.phone && !PHONE_RE.test(cleanPhone(f.phone))) err.phone = t.phoneError;
    setErrors(err);
    if (Object.keys(err).length) return;

    const no = "VM-" + Date.now().toString(36).toUpperCase().slice(-6);
    // Phase 1 : enregistrement local. Phase 3 : insertion dans Supabase (tables orders / order_items).
    try {
      const prev = JSON.parse(localStorage.getItem("velora-orders") || "[]");
      localStorage.setItem(
        "velora-orders",
        JSON.stringify([...prev, { no, date: new Date().toISOString(), customer: f, items, total }]),
      );
    } catch {}
    clear();
    setOrderNo(no);
    window.scrollTo({ top: 0 });
  }

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="text-xs text-rose-deep mt-1" role="alert">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
      <div className="bg-white rounded-2xl border border-line p-5 grid sm:grid-cols-2 gap-4">
        <label className="sm:col-span-2 text-sm space-y-1.5">
          <span>{t.fullName}</span>
          <input id="co-name" name="name" autoComplete="name" className="field" />
          <Err k="name" />
        </label>
        <label className="text-sm space-y-1.5">
          <span>{t.phone}</span>
          <input id="co-phone" name="phone" type="tel" inputMode="tel" placeholder="0555 12 34 56" autoComplete="tel" className="field num" dir="ltr" />
          <Err k="phone" />
        </label>
        <label className="text-sm space-y-1.5">
          <span>{t.wilaya}</span>
          <select id="co-wilaya" name="wilaya" defaultValue="" className="field">
            <option value="" disabled>{t.chooseWilaya}</option>
            {wilayas.map(([code, fr, ar]) => (
              <option key={code} value={code}>
                {String(code).padStart(2, "0")} · {lang === "ar" ? ar : fr}
              </option>
            ))}
          </select>
          <Err k="wilaya" />
        </label>
        <label className="text-sm space-y-1.5">
          <span>{t.commune}</span>
          <input id="co-commune" name="commune" className="field" />
          <Err k="commune" />
        </label>
        <label className="text-sm space-y-1.5">
          <span>{t.address}</span>
          <input id="co-address" name="address" autoComplete="street-address" className="field" />
          <Err k="address" />
        </label>
        <label className="sm:col-span-2 text-sm space-y-1.5">
          <span>{t.note}</span>
          <textarea id="co-note" name="note" rows={3} className="field" />
        </label>
      </div>

      <aside className="bg-white rounded-2xl border border-line p-5 space-y-5 lg:sticky lg:top-24">
        <p className="text-sm text-muted num">
          {items.reduce((n, i) => n + i.qty, 0)} × · {groups.length} {t.fromShops}
        </p>
        <Totals lang={lang} />
        <p className="text-xs bg-blush rounded-xl p-3">{t.codNotice}</p>
        <button className="btn btn-rose w-full">{t.confirmOrder}</button>
      </aside>
    </form>
  );
}
