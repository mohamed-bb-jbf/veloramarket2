import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { categories, getShop, products } from "@/lib/data";
import { wilayas } from "@/lib/wilayas";
import { ProductCard } from "@/components/cards";

export const metadata: Metadata = { robots: { index: false } };

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; w?: string; cat?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const { q = "", w = "", cat = "" } = await searchParams;
  const nq = norm(q.trim());

  const list = products.filter((p) => {
    const shop = getShop(p.shopId);
    const c = categories.find((x) => x.slug === p.category);
    const hay = norm([p.name, p.brand, shop?.name, c?.name.fr, c?.name.ar, p.desc.fr, p.desc.ar].join(" "));
    return (!nq || hay.includes(nq)) && (!w || String(shop?.wilaya) === w) && (!cat || p.category === cat);
  });

  return (
    <div className="wrap py-8">
      <form className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] mb-6" role="search">
        <input id="q" name="q" defaultValue={q} placeholder={t.search} className="field" />
        <select id="cat" name="cat" defaultValue={cat} className="field">
          <option value="">{t.categories} : {t.all}</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name[lang]}</option>
          ))}
        </select>
        <select id="w" name="w" defaultValue={w} className="field">
          <option value="">{t.allWilayas}</option>
          {wilayas.map(([code, fr, ar]) => (
            <option key={code} value={code}>
              {String(code).padStart(2, "0")} · {lang === "ar" ? ar : fr}
            </option>
          ))}
        </select>
        <button className="btn btn-rose">{t.searchBtn}</button>
      </form>

      <p className="text-sm text-muted mb-4 num">
        {list.length} {t.results}
      </p>
      {list.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {list.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}
        </div>
      ) : (
        <p className="bg-white rounded-2xl border border-line p-8 text-center text-muted">{t.noResults}</p>
      )}
    </div>
  );
}
