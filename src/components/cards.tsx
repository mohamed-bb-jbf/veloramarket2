import Link from "next/link";
import type { Category, Product, Salon } from "@/lib/data";
import { getShop } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { price } from "@/lib/format";
import { wilayaName } from "@/lib/wilayas";
import ProductVisual from "./ProductVisual";
import { PinIcon, StarIcon } from "./icons";

export function Rating({ value, count, lang }: { value: number; count?: number; lang: Locale }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted num">
      <StarIcon className="w-3.5 h-3.5 text-[#e9a23b]" />
      <span className="text-ink font-medium">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span>
          ({count} {getDict(lang).reviews})
        </span>
      )}
    </span>
  );
}

export function ProductCard({ p, lang }: { p: Product; lang: Locale }) {
  const shop = getShop(p.shopId);
  return (
    <Link
      href={`/${lang}/produit/${p.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-line hover:shadow-[0_10px_30px_-12px_rgba(201,79,112,.35)] transition-shadow"
    >
      <div className="relative aspect-square" style={{ background: p.bg }}>
        <ProductVisual
          visual={p.visual}
          tint={p.tint}
          className="absolute inset-[12%] w-[76%] h-[76%] transition-transform duration-300 group-hover:scale-105"
        />
        {p.oldPrice && (
          <span className="absolute top-2.5 start-2.5 bg-rose text-white text-[11px] font-semibold rounded-full px-2 py-0.5 num">
            -{Math.round((1 - p.price / p.oldPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <span className="text-[11px] uppercase tracking-wider text-muted">{p.brand}</span>
        <span className="text-sm leading-snug line-clamp-2 min-h-[2.5em]" dir="auto">
          {p.name}
        </span>
        <div className="mt-auto pt-1 flex items-end justify-between gap-2">
          <span className="flex flex-col">
            <span className="text-rose-deep font-semibold num">{price(p.price, lang)}</span>
            {p.oldPrice && <span className="text-xs text-muted line-through num">{price(p.oldPrice, lang)}</span>}
          </span>
          <Rating value={p.rating} lang={lang} />
        </div>
        {shop && <span className="text-[11px] text-muted truncate">{shop.name}</span>}
      </div>
    </Link>
  );
}

const catTint: Record<string, string> = {
  maquillage: "#b8324a",
  "soins-visage": "#6fb5ae",
  cheveux: "#8a5634",
  parfums: "#e58b9b",
  "soins-corps": "#d9a35f",
  ongles: "#9b7cc8",
};

export function CategoryTile({ c, lang, count }: { c: Category; lang: Locale; count?: number }) {
  return (
    <Link
      href={`/${lang}/categorie/${c.slug}`}
      className="group relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square flex flex-col justify-end p-3"
      style={{ background: c.tint }}
    >
      <ProductVisual
        visual={c.visual}
        tint={catTint[c.slug] ?? "#c94f70"}
        className="absolute inset-x-[18%] top-[6%] w-[64%] h-[64%] transition-transform duration-300 group-hover:-translate-y-1"
      />
      <span className="relative bg-white/85 backdrop-blur rounded-xl px-3 py-2 text-sm font-medium flex justify-between items-center">
        {c.name[lang]}
        {count !== undefined && <span className="text-xs text-muted num">{count}</span>}
      </span>
    </Link>
  );
}

const typeColor = { women: "#f7d6de", men: "#d9e2ea", mixed: "#e8def3" };

export function SalonCard({ s, lang }: { s: Salon; lang: Locale }) {
  const t = getDict(lang);
  const min = Math.min(...s.services.map((x) => x.price));
  return (
    <Link
      href={`/${lang}/salons/${s.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-line overflow-hidden hover:shadow-[0_10px_30px_-12px_rgba(201,79,112,.35)] transition-shadow"
    >
      <div className="h-28 relative flex items-end p-4" style={{ background: typeColor[s.type] }}>
        <span className="font-display text-3xl text-plum leading-none">{s.name}</span>
        <span className="absolute top-3 end-3 text-[11px] bg-white/80 rounded-full px-2.5 py-0.5">
          {t[s.type]}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <PinIcon className="w-4 h-4" /> {wilayaName(s.wilaya, lang)}
        </span>
        <p className="text-sm line-clamp-2">{s.bio[lang]}</p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <Rating value={s.rating} count={s.reviews} lang={lang} />
          <span className="text-sm">
            <span className="text-muted text-xs">{t.from} </span>
            <span className="text-rose-deep font-semibold num">{price(min, lang)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
