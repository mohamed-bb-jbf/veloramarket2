import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { categories, products, salons } from "@/lib/data";
import { CategoryTile, ProductCard, SalonCard } from "@/components/cards";
import ProductVisual from "@/components/ProductVisual";
import { CashIcon, ShieldIcon, StoreIcon, TruckIcon } from "@/components/icons";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const popular = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);

  const trust = [
    { Icon: ShieldIcon, title: t.trustOriginal, text: t.trustOriginalText },
    { Icon: TruckIcon, title: t.trustDelivery, text: t.trustDeliveryText },
    { Icon: StoreIcon, title: t.trustLocal, text: t.trustLocalText },
    { Icon: CashIcon, title: t.trustCod, text: t.trustCodText },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-plum text-cream overflow-hidden">
        <div className="wrap py-12 md:py-20 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="text-rose tracking-[.2em] uppercase text-xs">{t.brandTagline}</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">{t.heroTitle}</h1>
            <p className="text-cream/70 text-lg max-w-md">{t.heroText}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${lang}/categories`} className="btn btn-rose">
                {t.discover}
              </Link>
              <Link href={`/${lang}/salons`} className="btn btn-ghost text-cream/90 hover:text-rose">
                {t.bookSalon}
              </Link>
            </div>
          </div>
          <div className="relative h-72 md:h-96" aria-hidden="true">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-rose-soft/90 to-rose/50" />
            <div className="absolute -top-6 end-6 w-40 h-40 rounded-full bg-rose/30 blur-2xl" />
            <ProductVisual visual="perfume" tint="#f2a8b6" className="absolute start-[6%] bottom-[8%] w-[38%]" />
            <ProductVisual visual="lipstick" tint="#9e2a3a" className="absolute start-[38%] bottom-[10%] w-[26%]" />
            <ProductVisual visual="serum" tint="#e0b04f" className="absolute end-[4%] bottom-[8%] w-[32%]" />
            <span className="absolute top-5 start-6 font-display italic text-3xl md:text-4xl text-plum/80">
              {lang === "ar" ? "جمالك، أولويتنا" : "Votre beauté, notre priorité"}
            </span>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="wrap -mt-6 relative">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white rounded-2xl border border-line p-4 shadow-sm">
          {trust.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-3 items-start p-2">
              <Icon className="w-7 h-7 text-rose shrink-0" />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Catégories */}
      <section className="wrap mt-14">
        <SectionHead title={t.categories} href={`/${lang}/categories`} more={t.seeAll} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <CategoryTile key={c.slug} c={c} lang={lang} />
          ))}
        </div>
      </section>

      {/* Populaires */}
      <section className="wrap mt-14">
        <SectionHead title={t.popular} href={`/${lang}/recherche`} more={t.seeAll} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {popular.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} />
          ))}
        </div>
      </section>

      {/* Salons */}
      <section className="mt-16 bg-rose-soft/50">
        <div className="wrap py-12">
          <SectionHead title={t.salonTitle} href={`/${lang}/salons`} more={t.seeAll} />
          <p className="text-muted -mt-3 mb-6 max-w-xl">{t.salonText}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {salons.slice(0, 3).map((s) => (
              <SalonCard key={s.id} s={s} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendre */}
      <section className="wrap mt-16">
        <div className="rounded-[2rem] bg-plum text-cream p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <h2 className="font-display text-4xl md:text-5xl">{t.sellTitle}</h2>
            <p className="text-cream/70 max-w-xl">{t.sellText}</p>
          </div>
          <Link href={`/${lang}/vendre`} className="btn btn-rose justify-self-start">
            {t.sellCta}
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHead({ title, href, more }: { title: string; href: string; more: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      <Link href={href} className="text-sm text-rose-deep hover:underline shrink-0">
        {more}
      </Link>
    </div>
  );
}
