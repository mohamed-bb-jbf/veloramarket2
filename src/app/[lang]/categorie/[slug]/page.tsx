import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { categories, getCategory, products } from "@/lib/data";
import { ProductCard } from "@/components/cards";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => categories.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  if (!isLocale(lang) || !c) return {};
  return { title: c.name[lang], alternates: { canonical: `/${lang}/categorie/${slug}` } };
}

export default async function CategoryPage({ params }: P) {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  if (!isLocale(lang) || !c) notFound();
  const t = getDict(lang);
  const list = products.filter((p) => p.category === slug);
  return (
    <>
      <section style={{ background: c.tint }}>
        <div className="wrap py-10">
          <nav className="text-sm text-muted mb-2">
            <Link href={`/${lang}/categories`} className="hover:text-rose-deep">{t.categories}</Link> /
          </nav>
          <h1 className="font-display text-5xl text-plum">{c.name[lang]}</h1>
          <p className="text-muted mt-1 num">{list.length} {t.results}</p>
        </div>
      </section>
      <div className="wrap py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1">
          {categories.map((x) => (
            <Link
              key={x.slug}
              href={`/${lang}/categorie/${x.slug}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm border ${x.slug === slug ? "bg-plum text-cream border-plum" : "bg-white border-line hover:border-rose"}`}
            >
              {x.name[lang]}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {list.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}
        </div>
      </div>
    </>
  );
}
