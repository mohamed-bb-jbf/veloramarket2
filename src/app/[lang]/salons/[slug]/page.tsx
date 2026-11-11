import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { getSalon, salons } from "@/lib/data";
import { wilayaName } from "@/lib/wilayas";
import { Rating } from "@/components/cards";
import BookingWidget from "@/components/BookingWidget";
import { PinIcon } from "@/components/icons";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => salons.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = getSalon(slug);
  if (!isLocale(lang) || !s) return {};
  return {
    title: `${s.name} · ${wilayaName(s.wilaya, lang)}`,
    description: s.bio[lang],
    alternates: { canonical: `/${lang}/salons/${slug}` },
  };
}

const dayNames = {
  fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
};

export default async function SalonPage({ params }: P) {
  const { lang, slug } = await params;
  const s = getSalon(slug);
  if (!isLocale(lang) || !s) notFound();
  const t = getDict(lang);
  // Semaine algérienne : du samedi au vendredi.
  const order = [6, 0, 1, 2, 3, 4, 5];

  return (
    <>
      <section className="relative bg-ink text-cream">
        <Image src={s.img} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="wrap relative pt-24 md:pt-40 pb-8 space-y-3">
          <Link href={`/${lang}/salons`} className="text-sm text-cream/70 hover:text-rose">
            {lang === "ar" ? "→" : "←"} {t.salons}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-5xl md:text-7xl">{s.name}</h1>
            <span className="text-xs bg-cream text-ink px-3 py-1">{t[s.type]}</span>
          </div>
          <p className="text-cream/80 flex items-center gap-1.5">
            <PinIcon className="w-4 h-4" /> {s.address} · {wilayaName(s.wilaya, lang)}
          </p>
          <span className="inline-block bg-cream px-3 py-1.5">
            <Rating value={s.rating} count={s.reviews} lang={lang} />
          </span>
        </div>
      </section>

      <div className="wrap py-8 grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="min-w-0">
          <BookingWidget salon={s} lang={lang} />
        </div>
        <aside className="space-y-4">
          {s.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {s.gallery.map((g) => (
                <div key={g} className="photo aspect-square rounded-[4px]">
                  <Image src={g} alt="" fill sizes="160px" />
                </div>
              ))}
            </div>
          )}
          <div className="card p-5">
            <h2 className="font-medium mb-2">{t.about}</h2>
            <p className="text-sm text-muted">{s.bio[lang]}</p>
          </div>
          <div className="card p-5">
            <h2 className="font-medium mb-3">{t.hours}</h2>
            <dl className="text-sm space-y-1.5">
              {order.map((d) => (
                <div key={d} className="flex justify-between">
                  <dt className="text-muted">{dayNames[lang][d]}</dt>
                  <dd className="num" dir="ltr">
                    {s.hours[d] ? `${s.hours[d]![0]} – ${s.hours[d]![1]}` : <span className="text-rose-deep">{t.closed}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}
