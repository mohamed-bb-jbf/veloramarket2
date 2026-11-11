import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { salons, type SalonType } from "@/lib/data";
import { wilayas } from "@/lib/wilayas";
import { SalonCard } from "@/components/cards";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { title: t.salonTitle, description: t.salonText, alternates: { canonical: `/${lang}/salons` } };
}

export default async function Salons({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ type?: string; w?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const { type = "", w = "" } = await searchParams;
  const list = salons.filter((s) => (!type || s.type === type) && (!w || String(s.wilaya) === w));
  const types: ("" | SalonType)[] = ["", "women", "men", "mixed"];

  return (
    <>
      <section className="relative bg-ink text-cream">
        <Image src="/img/s-salon.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="wrap relative py-14 md:py-20 space-y-3">
          <p className="eyebrow">{t.bookNow}</p>
          <h1 className="font-display text-5xl md:text-7xl">{t.salonTitle}</h1>
          <p className="text-cream/75 max-w-xl">{t.salonText}</p>
        </div>
      </section>

      <div className="wrap py-8 space-y-6">
        {/* Filtres : type de salon + les 58 wilayas */}
        <form className="card p-3 grid gap-3 sm:grid-cols-[auto_1fr_auto] items-center">
          <fieldset className="flex flex-wrap gap-1.5">
            <legend className="sr-only">{t.all}</legend>
            {types.map((ty) => (
              <label key={ty || "all"} className="cursor-pointer">
                <input type="radio" name="type" value={ty} defaultChecked={type === ty} className="peer sr-only" />
                <span className="block px-4 py-2 text-sm border border-line peer-checked:bg-ink peer-checked:text-cream peer-checked:border-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-rose">
                  {ty ? t[ty] : t.all}
                </span>
              </label>
            ))}
          </fieldset>
          <select id="salon-w" name="w" defaultValue={w} className="field" aria-label={t.wilaya}>
            <option value="">{t.allWilayas}</option>
            {wilayas.map(([code, fr, ar]) => (
              <option key={code} value={code}>
                {String(code).padStart(2, "0")} · {lang === "ar" ? ar : fr}
              </option>
            ))}
          </select>
          <button className="btn btn-dark">{t.searchBtn}</button>
        </form>

        <p className="text-sm text-muted num">
          {list.length} {t.results}
        </p>

        {list.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((s) => <SalonCard key={s.id} s={s} lang={lang} />)}
          </div>
        ) : (
          <div className="card p-10 text-center space-y-4">
            <p className="text-muted">{t.noResults}</p>
            <Link href={`/${lang}/inscription/salon`} className="btn btn-rose">{t.registerSalon}</Link>
          </div>
        )}
      </div>
    </>
  );
}
