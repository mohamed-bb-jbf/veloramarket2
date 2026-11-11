import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { categories, products } from "@/lib/data";
import { CategoryTile } from "@/components/cards";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDict(lang).categories, alternates: { canonical: `/${lang}/categories` } } : {};
}

export default async function Categories({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <div className="wrap py-10">
      <h1 className="font-display text-4xl md:text-5xl mb-6">{t.categories}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <CategoryTile key={c.slug} c={c} lang={lang} className="aspect-[4/3]" count={products.filter((p) => p.category === c.slug).length} />
        ))}
      </div>
    </div>
  );
}
