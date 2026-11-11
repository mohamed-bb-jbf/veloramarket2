"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { wilayas } from "@/lib/wilayas";
import { submit as send } from "@/lib/submit";
import { cleanPhone, PHONE_RE } from "./CheckoutForm";
import { CheckIcon, TrashIcon } from "./icons";

const copy = {
  fr: {
    business: "Votre établissement",
    shopName: "Nom de la boutique",
    salonName: "Nom du salon",
    salonType: "Clientèle",
    owner: "Nom du ou de la responsable",
    contact: "Contact",
    whatsapp: "WhatsApp (si différent)",
    social: "Page Instagram ou Facebook (facultatif)",
    location: "Adresse",
    sells: "Ce que vous vendez",
    delivery: "Livraison",
    deliveryAll: "Dans les 58 wilayas",
    deliveryLocal: "Dans ma wilaya seulement",
    hours: "Horaires d'ouverture",
    open: "Ouverture",
    close: "Fermeture",
    closedDays: "Jours de fermeture",
    services: "Vos prestations",
    servicesHint: "Ajoutez au moins une prestation. Vous pourrez en ajouter d'autres plus tard.",
    serviceName: "Prestation",
    servicePrice: "Prix (DA)",
    serviceMin: "Durée (min)",
    addService: "+ Ajouter une prestation",
    about: "Présentation (facultatif)",
    aboutHint: "Quelques phrases que les clientes verront sur votre page.",
    terms: "J'accepte que Velora me contacte pour vérifier ces informations.",
    send: "Envoyer ma demande",
    doneTitle: "Demande reçue",
    doneText: "Nous vous appelons sous 48 heures pour vérifier vos informations et activer votre page.",
    back: "Retour à l'accueil",
    needOne: "Choisissez au moins une catégorie.",
    needService: "Ajoutez au moins une prestation avec son prix et sa durée.",
    days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  },
  ar: {
    business: "مؤسستك",
    shopName: "اسم المتجر",
    salonName: "اسم الصالون",
    salonType: "الزبائن",
    owner: "اسم المسؤول(ة)",
    contact: "الاتصال",
    whatsapp: "واتساب (إن كان مختلفاً)",
    social: "صفحة إنستغرام أو فيسبوك (اختياري)",
    location: "العنوان",
    sells: "ماذا تبيعين",
    delivery: "التوصيل",
    deliveryAll: "إلى 58 ولاية",
    deliveryLocal: "داخل ولايتي فقط",
    hours: "أوقات العمل",
    open: "الفتح",
    close: "الإغلاق",
    closedDays: "أيام العطلة",
    services: "خدماتك",
    servicesHint: "أضف خدمة واحدة على الأقل. يمكنك إضافة المزيد لاحقاً.",
    serviceName: "الخدمة",
    servicePrice: "السعر (د.ج)",
    serviceMin: "المدة (دقيقة)",
    addService: "+ إضافة خدمة",
    about: "تعريف (اختياري)",
    aboutHint: "بضع جمل يراها الزبائن في صفحتك.",
    terms: "أوافق على أن تتصل بي Velora للتحقق من هذه المعلومات.",
    send: "إرسال الطلب",
    doneTitle: "تم استلام الطلب",
    doneText: "سنتصل بك خلال 48 ساعة للتحقق من معلوماتك وتفعيل صفحتك.",
    back: "العودة إلى الرئيسية",
    needOne: "اختاري فئة واحدة على الأقل.",
    needService: "أضف خدمة واحدة على الأقل مع السعر والمدة.",
    days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  },
};

type Service = { name: string; price: string; minutes: string };
const WEEK = [6, 0, 1, 2, 3, 4, 5]; // semaine algérienne : samedi → vendredi

export default function RegisterForm({ lang, kind }: { lang: Locale; kind: "shop" | "salon" }) {
  const t = getDict(lang);
  const c = copy[lang];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [services, setServices] = useState<Service[]>([{ name: "", price: "", minutes: "30" }]);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState<null | { demo: boolean }>(null);

  if (done)
    return (
      <div className="card p-10 text-center space-y-4 max-w-lg mx-auto">
        <span className="w-14 h-14 rounded-full bg-ok/10 text-ok grid place-items-center mx-auto">
          <CheckIcon className="w-7 h-7" />
        </span>
        <h2 className="font-display text-3xl">{c.doneTitle}</h2>
        <p className="text-muted">{c.doneText}</p>
        {done.demo && <p className="text-xs bg-rose-soft px-3 py-2">{t.demoSaved}</p>}
        <Link href={`/${lang}`} className="btn btn-rose">{c.back}</Link>
      </div>
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const f = Object.fromEntries(fd) as Record<string, string>;
    const err: Record<string, string> = {};
    for (const k of ["name", "owner", "phone", "wilaya", "commune", "address"]) if (!f[k]?.trim()) err[k] = t.required;
    if (f.phone && !PHONE_RE.test(cleanPhone(f.phone))) err.phone = t.phoneError;
    if (!f.terms) err.terms = t.required;

    const cats = fd.getAll("cats").map(String);
    const closed = fd.getAll("closed").map(Number);
    const cleanServices = services
      .filter((s) => s.name.trim())
      .map((s) => ({ name: s.name.trim(), price: Number(s.price), minutes: Number(s.minutes) }));
    if (kind === "shop" && !cats.length) err.cats = c.needOne;
    if (kind === "salon") {
      if (!f.type) err.type = t.required;
      if (!cleanServices.length || cleanServices.some((s) => !(s.price > 0) || !(s.minutes > 0))) err.services = c.needService;
      if (f.open && f.close && f.open >= f.close) err.hours = t.required;
    }
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`rf-${Object.keys(err)[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const base = {
      name: f.name.trim(),
      owner: f.owner.trim(),
      phone: cleanPhone(f.phone),
      whatsapp: f.whatsapp ? cleanPhone(f.whatsapp) : undefined,
      social: f.social || undefined,
      wilaya: Number(f.wilaya),
      commune: f.commune.trim(),
      address: f.address.trim(),
      about: f.about || undefined,
      lang,
    };
    setBusy(true);
    setFailed(false);
    const res = await send(
      kind,
      kind === "shop"
        ? { ...base, categories: cats, delivery: f.delivery }
        : { ...base, type: f.type, open: f.open, close: f.close, closedDays: closed, services: cleanServices },
    );
    setBusy(false);
    if (!res.ok) return setFailed(true);
    setDone({ demo: res.demo });
    window.scrollTo({ top: 0 });
  }

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="text-xs text-rose-deep mt-1" role="alert">{errors[k]}</p> : null;
  const setService = (i: number, patch: Partial<Service>) =>
    setServices((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Section title={c.business}>
        <Field label={kind === "shop" ? c.shopName : c.salonName} k="name" wide>
          <input id="rf-name" name="name" className="field" />
          <Err k="name" />
        </Field>
        <Field label={c.owner} k="owner" wide={kind === "shop"}>
          <input id="rf-owner" name="owner" autoComplete="name" className="field" />
          <Err k="owner" />
        </Field>
        {kind === "salon" && (
          <Field label={c.salonType} k="type">
            <select id="rf-type" name="type" defaultValue="" className="field">
              <option value="" disabled>—</option>
              <option value="women">{t.women}</option>
              <option value="men">{t.men}</option>
              <option value="mixed">{t.mixed}</option>
            </select>
            <Err k="type" />
          </Field>
        )}
      </Section>

      <Section title={c.contact}>
        <Field label={t.phone} k="phone">
          <input id="rf-phone" name="phone" type="tel" inputMode="tel" dir="ltr" placeholder="0555 12 34 56" autoComplete="tel" className="field num" />
          <Err k="phone" />
        </Field>
        <Field label={c.whatsapp} k="whatsapp">
          <input id="rf-whatsapp" name="whatsapp" type="tel" inputMode="tel" dir="ltr" className="field num" />
        </Field>
        <Field label={c.social} k="social" wide>
          <input id="rf-social" name="social" dir="ltr" placeholder="instagram.com/…" className="field" />
        </Field>
      </Section>

      <Section title={c.location}>
        <Field label={t.wilaya} k="wilaya">
          <select id="rf-wilaya" name="wilaya" defaultValue="" className="field">
            <option value="" disabled>{t.chooseWilaya}</option>
            {wilayas.map(([code, fr, ar]) => (
              <option key={code} value={code}>
                {String(code).padStart(2, "0")} · {lang === "ar" ? ar : fr}
              </option>
            ))}
          </select>
          <Err k="wilaya" />
        </Field>
        <Field label={t.commune} k="commune">
          <input id="rf-commune" name="commune" className="field" />
          <Err k="commune" />
        </Field>
        <Field label={t.address} k="address" wide>
          <input id="rf-address" name="address" autoComplete="street-address" className="field" />
          <Err k="address" />
        </Field>
      </Section>

      {kind === "shop" ? (
        <Section title={c.sells}>
          <fieldset id="rf-cats" className="sm:col-span-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <label key={cat.slug} className="cursor-pointer">
                  <input type="checkbox" name="cats" value={cat.slug} className="peer sr-only" />
                  <span className="block px-4 py-2 text-sm border border-line peer-checked:bg-ink peer-checked:text-cream peer-checked:border-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-rose">
                    {cat.name[lang]}
                  </span>
                </label>
              ))}
            </div>
            <Err k="cats" />
          </fieldset>
          <Field label={c.delivery} k="delivery" wide>
            <select id="rf-delivery" name="delivery" defaultValue="all" className="field">
              <option value="all">{c.deliveryAll}</option>
              <option value="local">{c.deliveryLocal}</option>
            </select>
          </Field>
        </Section>
      ) : (
        <>
          <Section title={c.hours}>
            <Field label={c.open} k="open">
              <input id="rf-open" name="open" type="time" defaultValue="09:00" className="field num" />
            </Field>
            <Field label={c.close} k="close">
              <input id="rf-close" name="close" type="time" defaultValue="18:00" className="field num" />
              <Err k="hours" />
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm mb-2">{c.closedDays}</legend>
              <div className="flex flex-wrap gap-2">
                {WEEK.map((d) => (
                  <label key={d} className="cursor-pointer">
                    <input type="checkbox" name="closed" value={d} defaultChecked={d === 5} className="peer sr-only" />
                    <span className="block px-3 py-1.5 text-sm border border-line peer-checked:bg-rose-soft peer-checked:border-rose peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-rose">
                      {c.days[d]}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Section>

          <Section title={c.services}>
            <div id="rf-services" className="sm:col-span-2 space-y-3">
              <p className="text-sm text-muted">{c.servicesHint}</p>
              {services.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_120px_120px_auto] gap-2 items-end">
                  <label className="text-sm space-y-1 col-span-2 sm:col-span-1">
                    <span className={i ? "sr-only" : ""}>{c.serviceName}</span>
                    <input id={`rf-svc-name-${i}`} value={s.name} onChange={(e) => setService(i, { name: e.target.value })} className="field" />
                  </label>
                  <label className="text-sm space-y-1">
                    <span className={i ? "sr-only" : ""}>{c.servicePrice}</span>
                    <input id={`rf-svc-price-${i}`} value={s.price} onChange={(e) => setService(i, { price: e.target.value })} type="number" min="0" step="50" inputMode="numeric" className="field num" />
                  </label>
                  <label className="text-sm space-y-1">
                    <span className={i ? "sr-only" : ""}>{c.serviceMin}</span>
                    <input id={`rf-svc-min-${i}`} value={s.minutes} onChange={(e) => setService(i, { minutes: e.target.value })} type="number" min="5" step="5" inputMode="numeric" className="field num" />
                  </label>
                  <button
                    type="button"
                    aria-label={t.remove}
                    disabled={services.length === 1}
                    onClick={() => setServices((prev) => prev.filter((_, j) => j !== i))}
                    className="h-[46px] w-10 grid place-items-center text-muted hover:text-rose-deep disabled:opacity-30"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setServices((prev) => [...prev, { name: "", price: "", minutes: "30" }])}
                className="text-sm text-rose-deep hover:underline"
              >
                {c.addService}
              </button>
              <Err k="services" />
            </div>
          </Section>
        </>
      )}

      <Section title={c.about}>
        <label className="sm:col-span-2 text-sm space-y-1.5">
          <span className="text-muted">{c.aboutHint}</span>
          <textarea id="rf-about" name="about" rows={4} maxLength={600} className="field" />
        </label>
      </Section>

      <div className="space-y-3">
        <label id="rf-terms" className="flex gap-3 items-start text-sm cursor-pointer">
          <input type="checkbox" name="terms" className="mt-1 accent-[var(--color-rose)]" />
          <span>{c.terms}</span>
        </label>
        <Err k="terms" />
        {failed && <p className="text-sm text-rose-deep" role="alert">{t.sendError}</p>}
        <button disabled={busy} className="btn btn-rose w-full sm:w-auto disabled:opacity-60">
          {busy ? t.sending : c.send}
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <h2 className="font-display text-2xl mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function Field({ label, k, wide, children }: { label: string; k: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={`rf-${k}`} className={`text-sm space-y-1.5 block ${wide ? "sm:col-span-2" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}
