import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { getShopBySlug, products, shops } from "@/lib/data";
import { wilayaName } from "@/lib/wilayas";
import { ProductCard, Rating } from "@/components/cards";
import { BadgeIcon, PinIcon } from "@/components/icons";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => shops.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = getShopBySlug(slug);
  if (!isLocale(lang) || !s) return {};
  return { title: s.name, description: s.bio[lang], alternates: { canonical: `/${lang}/boutique/${slug}` } };
}

export default async function ShopPage({ params }: P) {
  const { lang, slug } = await params;
  const s = getShopBySlug(slug);
  if (!isLocale(lang) || !s) notFound();
  const t = getDict(lang);
  const list = products.filter((p) => p.shopId === s.id);

  return (
    <>
      <section className="bg-plum text-cream">
        <div className="wrap py-10 flex flex-wrap items-center gap-6">
          <span className="w-20 h-20 rounded-full bg-rose-soft grid place-items-center font-display text-4xl text-rose-deep shrink-0">
            {s.name[0]}
          </span>
          <div className="space-y-1.5 min-w-0">
            <h1 className="font-display text-4xl flex items-center gap-2">
              {s.name}
              {s.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-sans bg-white/10 rounded-full px-2.5 py-1">
                  <BadgeIcon className="w-4 h-4 text-[#60a5fa]" /> {t.verified}
                </span>
              )}
            </h1>
            <p className="text-cream/70 text-sm flex items-center gap-1">
              <PinIcon className="w-4 h-4" /> {s.city}, {wilayaName(s.wilaya, lang)}
            </p>
            <p className="text-cream/80 max-w-xl">{s.bio[lang]}</p>
          </div>
          <div className="ms-auto bg-white rounded-xl px-4 py-2">
            <Rating value={s.rating} count={s.reviews} lang={lang} />
          </div>
        </div>
      </section>
      <div className="wrap py-8">
        <h2 className="font-display text-3xl mb-5">
          {t.products} <span className="text-muted text-xl num">({list.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {list.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}
        </div>
      </div>
    </>
  );
}
