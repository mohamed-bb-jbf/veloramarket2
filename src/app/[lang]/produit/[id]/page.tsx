import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { getCategory, getProduct, getShop, products } from "@/lib/data";
import { price } from "@/lib/format";
import { wilayaName } from "@/lib/wilayas";
import { SITE_URL } from "@/lib/site";
import AddToCart from "@/components/AddToCart";
import { ProductCard, Rating } from "@/components/cards";
import { BadgeIcon, CashIcon, PinIcon, ShieldIcon, TruckIcon } from "@/components/icons";

type P = { params: Promise<{ lang: string; id: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, id: p.id })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, id } = await params;
  const p = getProduct(id);
  if (!isLocale(lang) || !p) return {};
  return {
    title: `${p.brand} ${p.name[lang]}`,
    openGraph: { images: [p.img] },
    description: p.desc[lang],
    alternates: { canonical: `/${lang}/produit/${id}` },
  };
}

export default async function ProductPage({ params }: P) {
  const { lang, id } = await params;
  const p = getProduct(id);
  if (!isLocale(lang) || !p) notFound();
  const t = getDict(lang);
  const shop = getShop(p.shopId)!;
  const cat = getCategory(p.category);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.name[lang]}`,
    image: `${SITE_URL}${p.img}`,
    brand: { "@type": "Brand", name: p.brand },
    description: p.desc[lang],
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "DZD",
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/${lang}/produit/${p.id}`,
      seller: { "@type": "Organization", name: shop.name },
    },
  };

  return (
    <div className="wrap py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-muted mb-5 flex gap-1 flex-wrap">
        <Link href={`/${lang}`} className="hover:text-rose-deep">{t.home}</Link> /
        {cat && (
          <>
            <Link href={`/${lang}/categorie/${cat.slug}`} className="hover:text-rose-deep">{cat.name[lang]}</Link> /
          </>
        )}
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
        <div className="photo aspect-[4/5] rounded-[4px]">
          <Image src={p.img} alt={p.name[lang]} fill priority sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        <div className="space-y-5 min-w-0">
          <div className="space-y-2">
            <p className="eyebrow" dir="ltr">{p.brand}</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight">{p.name[lang]}</h1>
            <Rating value={p.rating} count={p.reviews} lang={lang} />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-semibold text-plum num">{price(p.price, lang)}</span>
            {p.oldPrice && <span className="text-muted line-through num">{price(p.oldPrice, lang)}</span>}
            <span
              className={`ms-auto text-xs px-3 py-1 ${p.stock > 0 ? "bg-ok/10 text-ok" : "bg-rose-soft text-rose-deep"}`}
            >
              {p.stock > 0 ? t.inStock : t.outOfStock}
            </span>
          </div>

          <p className="text-muted leading-relaxed max-w-prose">{p.desc[lang]}</p>

          <AddToCart p={p} lang={lang} />

          <ul className="grid grid-cols-3 gap-2 text-center text-xs text-muted border-y border-line py-4">
            <li className="flex flex-col items-center gap-1"><ShieldIcon className="w-6 h-6 text-rose" />{t.trustOriginal}</li>
            <li className="flex flex-col items-center gap-1"><TruckIcon className="w-6 h-6 text-rose" />{t.trustDelivery}</li>
            <li className="flex flex-col items-center gap-1"><CashIcon className="w-6 h-6 text-rose" />{t.trustCod}</li>
          </ul>

          <Link
            href={`/${lang}/boutique/${shop.slug}`}
            className="flex items-center gap-4 card p-4 hover:border-rose"
          >
            <span className="w-12 h-12 rounded-full bg-rose-soft grid place-items-center font-display text-xl text-rose-deep shrink-0">
              {shop.name[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-xs text-muted block">{t.soldBy}</span>
              <span className="font-medium flex items-center gap-1">
                {shop.name}
                {shop.verified && <BadgeIcon className="w-4 h-4 text-[#3b82f6]" />}
              </span>
              <span className="text-xs text-muted flex items-center gap-1">
                <PinIcon className="w-3.5 h-3.5" /> {wilayaName(shop.wilaya, lang)} · ★ {shop.rating}
              </span>
            </span>
            <span className="text-sm text-rose-deep shrink-0">{t.visitShop}</span>
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl mb-5">{cat?.name[lang]}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {related.map((x) => <ProductCard key={x.id} p={x} lang={lang} />)}
          </div>
        </section>
      )}
    </div>
  );
}
