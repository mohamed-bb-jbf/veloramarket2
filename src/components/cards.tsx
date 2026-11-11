import Image from "next/image";
import Link from "next/link";
import type { Category, Product, Salon, Shop } from "@/lib/data";
import { getShop, products } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { price } from "@/lib/format";
import { wilayaName } from "@/lib/wilayas";
import { BadgeIcon, PinIcon, StarIcon } from "./icons";

export function Rating({ value, count, lang }: { value: number; count?: number; lang: Locale }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted num">
      <StarIcon className="w-3.5 h-3.5 text-gold" />
      <span className="text-ink font-medium">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span>
          ({count} {getDict(lang).reviews})
        </span>
      )}
    </span>
  );
}

const CARD_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

export function ProductCard({ p, lang }: { p: Product; lang: Locale }) {
  const t = getDict(lang);
  const shop = getShop(p.shopId);
  return (
    <Link href={`/${lang}/produit/${p.id}`} className="group flex flex-col">
      <div className="photo aspect-[4/5] rounded-[4px]">
        <Image src={p.img} alt={p.name[lang]} fill sizes={CARD_SIZES} />
        {p.oldPrice && (
          <span className="absolute top-3 start-3 bg-ink text-cream text-[11px] font-medium px-2 py-1 num">
            −{Math.round((1 - p.price / p.oldPrice) * 100)}%
          </span>
        )}
        {p.stock <= 0 && (
          <span className="absolute inset-x-0 bottom-0 bg-ink/80 text-cream text-xs text-center py-1.5">
            {t.outOfStock}
          </span>
        )}
      </div>
      <div className="pt-3 flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[.14em] text-muted truncate" dir="ltr">
            {p.brand}
          </span>
          <Rating value={p.rating} lang={lang} />
        </div>
        <span className="leading-snug line-clamp-2 group-hover:text-rose-deep transition-colors">{p.name[lang]}</span>
        <div className="mt-auto pt-1 flex items-baseline gap-2">
          <span className="font-semibold num">{price(p.price, lang)}</span>
          {p.oldPrice && <span className="text-xs text-muted line-through num">{price(p.oldPrice, lang)}</span>}
        </div>
        {shop && (
          <span className="text-xs text-muted truncate">
            {shop.name} · {wilayaName(shop.wilaya, lang)}
          </span>
        )}
      </div>
    </Link>
  );
}

export function CategoryTile({
  c,
  lang,
  count,
  className = "",
}: {
  c: Category;
  lang: Locale;
  count?: number;
  className?: string;
}) {
  return (
    <Link href={`/${lang}/categorie/${c.slug}`} className={`group block ${className}`}>
      <div className="photo h-full min-h-44 rounded-[4px]">
        <Image src={c.img} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2 text-cream">
          <span className="font-display text-2xl md:text-3xl leading-none">{c.name[lang]}</span>
          {count !== undefined && (
            <span className="text-xs text-cream/80 num">
              {count} {getDict(lang).productsCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function SalonCard({ s, lang }: { s: Salon; lang: Locale }) {
  const t = getDict(lang);
  const min = Math.min(...s.services.map((x) => x.price));
  return (
    <Link href={`/${lang}/salons/${s.slug}`} className="group flex flex-col card overflow-hidden">
      <div className="photo aspect-[3/2]">
        <Image src={s.img} alt={s.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <span className="absolute top-3 start-3 bg-cream text-ink text-[11px] px-2.5 py-1">{t[s.type]}</span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight group-hover:text-rose-deep transition-colors">{s.name}</h3>
          <Rating value={s.rating} lang={lang} />
        </div>
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <PinIcon className="w-4 h-4 shrink-0" /> {s.address}
        </span>
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {s.services.slice(0, 3).map((x) => (
            <li key={x.id} className="text-xs border border-line px-2 py-0.5 text-muted">
              {x.name[lang]}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-line">
          <span className="text-sm">
            <span className="text-muted text-xs">{t.from} </span>
            <span className="font-semibold num">{price(min, lang)}</span>
          </span>
          <span className="text-sm text-rose-deep font-medium">{t.bookNow} <span className="inline-block rtl:-scale-x-100">→</span></span>
        </div>
      </div>
    </Link>
  );
}

export function ShopCard({ s, lang }: { s: Shop; lang: Locale }) {
  const t = getDict(lang);
  const list = products.filter((p) => p.shopId === s.id);
  return (
    <Link href={`/${lang}/boutique/${s.slug}`} className="group card p-4 flex gap-4 items-center">
      <div className="photo w-20 h-20 rounded-full shrink-0">
        {list[0] && <Image src={list[0].img} alt="" fill sizes="80px" />}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="font-display text-xl leading-tight flex items-center gap-1.5 group-hover:text-rose-deep">
          <span className="truncate">{s.name}</span>
          {s.verified && <BadgeIcon className="w-4 h-4 text-[#3b82f6] shrink-0" />}
        </h3>
        <p className="text-xs text-muted flex items-center gap-1">
          <PinIcon className="w-3.5 h-3.5" /> {wilayaName(s.wilaya, lang)}
        </p>
        <p className="text-xs text-muted flex items-center gap-2">
          <Rating value={s.rating} lang={lang} />
          <span className="num">
            {list.length} {t.productsCount}
          </span>
        </p>
      </div>
    </Link>
  );
}
