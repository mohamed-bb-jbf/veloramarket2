import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative bg-ink text-cream">
        <Image src={c.img} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="wrap relative py-14 md:py-20">
          <nav className="text-sm text-cream/70 mb-2">
            <Link href={`/${lang}/categories`} className="hover:text-rose">{t.categories}</Link> /
          </nav>
          <h1 className="font-display text-5xl md:text-7xl">{c.name[lang]}</h1>
          <p className="text-cream/70 mt-2 num">{list.length} {t.productsCount}</p>
        </div>
      </section>
      <div className="wrap py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1">
          {categories.map((x) => (
            <Link
              key={x.slug}
              href={`/${lang}/categorie/${x.slug}`}
              className={`shrink-0 px-4 py-1.5 text-sm border ${x.slug === slug ? "bg-ink text-cream border-ink" : "bg-white border-line hover:border-ink"}`}
            >
              {x.name[lang]}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 mt-4">
          {list.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}
        </div>
      </div>
    </>
  );
}
