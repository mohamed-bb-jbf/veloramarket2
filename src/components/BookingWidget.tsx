"use client";

import { useEffect, useMemo, useState } from "react";
import type { Salon } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { price } from "@/lib/format";
import { CheckIcon, ClockIcon } from "./icons";
import { cleanPhone, PHONE_RE } from "./CheckoutForm";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Créneaux de 30 min où la prestation tient avant la fermeture. */
export function slotsFor(salon: Salon, day: Date, minutes: number, now = new Date()) {
  const h = salon.hours[day.getDay()];
  if (!h) return [];
  const [open, close] = h.map(toMin);
  const sameDay = day.toDateString() === now.toDateString();
  const earliest = sameDay ? now.getHours() * 60 + now.getMinutes() + 60 : 0;
  const out: string[] = [];
  for (let m = open; m + minutes <= close; m += 30) if (m >= earliest) out.push(toHHMM(m));
  return out;
}

export default function BookingWidget({ salon, lang }: { salon: Salon; lang: Locale }) {
  const t = getDict(lang);
  const [serviceId, setServiceId] = useState(salon.services[0].id);
  const [days, setDays] = useState<Date[]>([]);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  // Dates calculées côté navigateur (fuseau horaire de la cliente).
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const list = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
    setDays(list);
    setDayIdx(Math.max(0, list.findIndex((d) => slotsFor(salon, d, salon.services[0].minutes).length > 0)));
  }, [salon]);

  const service = salon.services.find((s) => s.id === serviceId)!;
  const day = days[dayIdx];
  const slots = useMemo(() => (day ? slotsFor(salon, day, service.minutes) : []), [day, salon, service.minutes]);
  const locale = lang === "ar" ? "ar-DZ" : "fr-FR";

  if (sent)
    return (
      <div className="bg-white rounded-2xl border border-line p-8 text-center space-y-3">
        <span className="w-14 h-14 rounded-full bg-ok/10 text-ok grid place-items-center mx-auto">
          <CheckIcon className="w-7 h-7" />
        </span>
        <h3 className="font-display text-3xl">{t.bookingSent}</h3>
        <p className="text-muted">{t.bookingSentText}</p>
        <p className="font-medium">
          {service.name[lang]} ·{" "}
          {day?.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })} · {time}
        </p>
      </div>
    );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!time) err.time = t.required;
    if (!f.name?.trim()) err.name = t.required;
    if (!PHONE_RE.test(cleanPhone(f.phone || ""))) err.phone = t.phoneError;
    setErrors(err);
    if (Object.keys(err).length) return;
    // Phase 4 : insertion dans la table bookings de Supabase.
    try {
      const prev = JSON.parse(localStorage.getItem("velora-bookings") || "[]");
      localStorage.setItem(
        "velora-bookings",
        JSON.stringify([...prev, { salon: salon.slug, service: serviceId, day: day.toISOString(), time, ...f }]),
      );
    } catch {}
    setSent(true);
  }

  return (
    <form onSubmit={submit} noValidate className="bg-white rounded-2xl border border-line p-5 space-y-6">
      <fieldset className="space-y-2">
        <legend className="font-medium mb-2">{t.chooseService}</legend>
        {salon.services.map((s) => (
          <label
            key={s.id}
            className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer ${s.id === serviceId ? "border-rose bg-rose-soft/30" : "border-line"}`}
          >
            <input
              type="radio"
              name="service"
              id={`svc-${s.id}`}
              value={s.id}
              checked={s.id === serviceId}
              onChange={() => {
                setServiceId(s.id);
                setTime(null);
              }}
              className="accent-[var(--color-rose)]"
            />
            <span className="flex-1">{s.name[lang]}</span>
            <span className="text-xs text-muted flex items-center gap-1 num">
              <ClockIcon className="w-3.5 h-3.5" />
              {s.minutes} {t.minutes}
            </span>
            <span className="font-semibold text-rose-deep text-sm num w-24 text-end">{price(s.price, lang)}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="font-medium mb-2">{t.chooseDay}</legend>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((d, i) => {
            const closed = !salon.hours[d.getDay()];
            return (
              <button
                key={d.toISOString()}
                type="button"
                disabled={closed}
                onClick={() => {
                  setDayIdx(i);
                  setTime(null);
                }}
                className={`shrink-0 w-16 rounded-xl border py-2 text-center text-xs transition ${i === dayIdx ? "bg-plum text-cream border-plum" : "border-line hover:border-rose"} disabled:opacity-35 disabled:hover:border-line`}
              >
                <span className="block capitalize">{d.toLocaleDateString(locale, { weekday: "short" })}</span>
                <span className="block text-lg font-semibold num">{d.getDate()}</span>
                <span className="block">{closed ? t.closed : d.toLocaleDateString(locale, { month: "short" })}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-medium mb-2">{t.chooseTime}</legend>
        {slots.length ? (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2" dir="ltr">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTime(s)}
                className={`rounded-lg border py-2 text-sm num ${time === s ? "bg-rose text-white border-rose" : "border-line hover:border-rose"}`}
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">{t.closed}</p>
        )}
        {errors.time && <p className="text-xs text-rose-deep mt-1">{errors.time}</p>}
      </fieldset>

      <fieldset className="grid sm:grid-cols-2 gap-3">
        <legend className="font-medium mb-2">{t.yourInfo}</legend>
        <label className="text-sm space-y-1.5">
          <span>{t.fullName}</span>
          <input id="bk-name" name="name" className="field" autoComplete="name" />
          {errors.name && <p className="text-xs text-rose-deep">{errors.name}</p>}
        </label>
        <label className="text-sm space-y-1.5">
          <span>{t.phone}</span>
          <input id="bk-phone" name="phone" type="tel" inputMode="tel" dir="ltr" placeholder="0555 12 34 56" className="field num" />
          {errors.phone && <p className="text-xs text-rose-deep">{errors.phone}</p>}
        </label>
      </fieldset>

      <button className="btn btn-rose w-full">
        {t.confirmBooking}
        {time && ` · ${time}`}
      </button>
    </form>
  );
}
