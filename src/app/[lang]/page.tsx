import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { categories, products, salons, shops } from "@/lib/data";
import { CategoryTile, ProductCard, SalonCard, ShopCard } from "@/components/cards";
import HeroSearch from "@/components/HeroSearch";
import { CashIcon, ShieldIcon, StoreIcon, TruckIcon } from "@/components/icons";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const popular = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const count = (slug: string) => products.filter((p) => p.category === slug).length;

  const trust = [
    { Icon: ShieldIcon, title: t.trustOriginal, text: t.trustOriginalText },
    { Icon: TruckIcon, title: t.trustDelivery, text: t.trustDeliveryText },
    { Icon: StoreIcon, title: t.trustLocal, text: t.trustLocalText },
    { Icon: CashIcon, title: t.trustCod, text: t.trustCodText },
  ];
  const how = [
    [t.how1t, t.how1],
    [t.how2t, t.how2],
    [t.how3t, t.how3],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink text-cream">
        <div className="absolute inset-y-0 end-0 w-full md:w-[62%]">
          <Image src="/img/hero.jpg" alt="" fill priority sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-[60%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-ink via-ink/70 md:via-ink/40 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        </div>
        <div className="wrap relative pt-14 md:pt-24 pb-36 md:pb-44">
          <div className="max-w-xl space-y-6">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 className="font-display text-[3.2rem] md:text-[5.2rem] leading-[0.98]">{t.heroTitle}</h1>
            <p className="text-cream/80 text-lg max-w-md">{t.heroText}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={`/${lang}/categories`} className="btn btn-rose">
                {t.discover}
              </Link>
              <Link href={`/${lang}/salons`} className="btn btn-ghost text-cream hover:bg-cream hover:text-ink">
                {t.bookSalon}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recherche */}
      <section className="wrap relative -mt-24 md:-mt-28">
        <div className="max-w-3xl">
          <HeroSearch lang={lang} />
        </div>
      </section>

      {/* Garanties */}
      <section className="wrap mt-10">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 border-y border-line py-6">
          {trust.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-3 items-start">
              <Icon className="w-6 h-6 text-gold shrink-0 mt-0.5" />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Catégories : mosaïque */}
      <section className="wrap mt-16">
        <SectionHead eyebrow={t.brandTagline} title={t.categories} href={`/${lang}/categories`} more={t.seeAll} />
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-3 md:h-[660px]">
          {categories.map((c, i) => (
            <CategoryTile
              key={c.slug}
              c={c}
              lang={lang}
              count={count(c.slug)}
              className={i === 0 ? "col-span-2 md:row-span-2" : i === 5 ? "col-span-2" : i >= 3 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      </section>

      {/* Populaires */}
      <section className="wrap mt-20">
        <SectionHead eyebrow="Velora" title={t.popular} href={`/${lang}/recherche`} more={t.seeAll} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {popular.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} />
          ))}
        </div>
      </section>

      {/* Salons */}
      <section className="mt-20 bg-ink text-cream">
        <div className="wrap py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <p className="eyebrow">{t.bookNow}</p>
              <h2 className="font-display text-4xl md:text-5xl">{t.salonTitle}</h2>
              <p className="text-cream/65 max-w-xl">{t.salonText}</p>
            </div>
            <Link href={`/${lang}/salons`} className="text-sm text-gold hover:text-rose shrink-0">
              {t.seeAll} <span className="inline-block rtl:-scale-x-100">→</span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-ink">
            {salons.slice(0, 3).map((s) => (
              <SalonCard key={s.id} s={s} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="wrap mt-20">
        <h2 className="font-display text-4xl md:text-5xl mb-8">{t.howTitle}</h2>
        <ol className="grid md:grid-cols-3 gap-8">
          {how.map(([title, text], i) => (
            <li key={title} className="border-t border-ink pt-4 flex gap-4">
              <span className="font-display text-5xl text-rose leading-none num">{i + 1}</span>
              <span>
                <span className="block font-medium text-lg">{title}</span>
                <span className="block text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Boutiques */}
      <section className="wrap mt-20">
        <SectionHead eyebrow={t.trustLocal} title={t.shopsTitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((s) => (
            <ShopCard key={s.id} s={s} lang={lang} />
          ))}
        </div>
      </section>

      {/* Professionnels */}
      <section className="wrap mt-20">
        <h2 className="font-display text-4xl md:text-5xl mb-8">{t.proTitle}</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { img: "/img/cat-maquillage.jpg", title: t.registerShop, text: t.proShopText, href: `/${lang}/inscription/boutique` },
            { img: "/img/s-salon.jpg", title: t.registerSalon, text: t.proSalonText, href: `/${lang}/inscription/salon` },
          ].map((b) => (
            <Link key={b.href} href={b.href} className="group block">
              <div className="photo aspect-[16/9] rounded-[4px]">
                <Image src={b.img} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream space-y-2">
                  <h3 className="font-display text-3xl">{b.title}</h3>
                  <p className="text-cream/80 text-sm max-w-sm">{b.text}</p>
                  <span className="btn btn-rose mt-2">{b.title} <span className="inline-block rtl:-scale-x-100">→</span></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, href, more }: { eyebrow: string; title: string; href?: string; more?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-7">
      <div className="space-y-1.5">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-sm text-rose-deep hover:underline shrink-0">
          {more} <span className="inline-block rtl:-scale-x-100">→</span>
        </Link>
      )}
    </div>
  );
}
