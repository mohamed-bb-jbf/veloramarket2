"use client";

import Link from "next/link";
import { getProduct, getShop, type Product } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { deliveryFee, FREE_DELIVERY_FROM, price } from "@/lib/format";
import { useCart, type CartItem } from "./CartProvider";
import ProductVisual from "./ProductVisual";
import { TrashIcon } from "./icons";

export type Line = CartItem & { p: Product };

/** Regroupe le panier par boutique : chaque boutique livre et facture sa propre livraison. */
export function useGroupedCart() {
  const { items } = useCart();
  const groups = new Map<string, Line[]>();
  for (const i of items) {
    const p = getProduct(i.productId)!;
    groups.set(p.shopId, [...(groups.get(p.shopId) ?? []), { ...i, p }]);
  }
  const list = [...groups.entries()].map(([shopId, lines]) => {
    const sub = lines.reduce((n, l) => n + l.qty * l.p.price, 0);
    return { shop: getShop(shopId)!, lines, sub, fee: deliveryFee(sub) };
  });
  const subtotal = list.reduce((n, g) => n + g.sub, 0);
  const fees = list.reduce((n, g) => n + g.fee, 0);
  return { groups: list, subtotal, fees, total: subtotal + fees };
}

export function Totals({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { subtotal, fees, total } = useGroupedCart();
  return (
    <dl className="space-y-2 text-sm num">
      <div className="flex justify-between"><dt className="text-muted">{t.subtotal}</dt><dd>{price(subtotal, lang)}</dd></div>
      <div className="flex justify-between">
        <dt className="text-muted">{t.delivery}</dt>
        <dd className={fees ? "" : "text-ok"}>{fees ? price(fees, lang) : t.free}</dd>
      </div>
      <div className="flex justify-between text-base font-semibold border-t border-line pt-3">
        <dt>{t.total}</dt><dd className="text-plum">{price(total, lang)}</dd>
      </div>
    </dl>
  );
}

export default function CartView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { setQty, remove } = useCart();
  const { groups } = useGroupedCart();

  if (!groups.length)
    return (
      <div className="bg-white rounded-2xl border border-line p-10 text-center space-y-4">
        <p className="text-muted">{t.emptyCart}</p>
        <Link href={`/${lang}/categories`} className="btn btn-rose">{t.continueShopping}</Link>
      </div>
    );

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
      <div className="space-y-4 min-w-0">
        {groups.map(({ shop, lines, sub, fee }) => (
          <section key={shop.id} className="bg-white rounded-2xl border border-line">
            <header className="flex justify-between items-center px-4 py-3 border-b border-line text-sm">
              <Link href={`/${lang}/boutique/${shop.slug}`} className="font-medium hover:text-rose-deep">{shop.name}</Link>
              <span className="text-muted text-xs num">
                {fee ? `${t.freeFrom} ${price(FREE_DELIVERY_FROM, lang)} · ${price(sub, lang)}` : `${t.delivery} : ${t.free}`}
              </span>
            </header>
            <ul className="divide-y divide-line">
              {lines.map((l) => (
                <li key={l.productId + (l.shade ?? "")} className="flex gap-3 p-4">
                  <Link href={`/${lang}/produit/${l.p.id}`} className="w-20 h-20 rounded-xl shrink-0 relative" style={{ background: l.p.bg }}>
                    <ProductVisual visual={l.p.visual} tint={l.p.tint} className="absolute inset-2" />
                  </Link>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs text-muted">{l.p.brand}</p>
                    <p className="text-sm leading-snug" dir="auto">{l.p.name}</p>
                    {l.shade && <p className="text-xs text-muted">{t.color} : {l.shade}</p>}
                    <p className="text-rose-deep font-semibold text-sm num">{price(l.p.price, lang)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => remove(l.productId, l.shade)} aria-label={t.remove} className="text-muted hover:text-rose-deep p-1">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <div className="flex items-center border border-line rounded-full text-sm">
                      <button className="w-8 h-8" onClick={() => setQty(l.productId, l.shade, l.qty - 1)} aria-label="-1">−</button>
                      <span className="w-6 text-center num">{l.qty}</span>
                      <button className="w-8 h-8" onClick={() => setQty(l.productId, l.shade, l.qty + 1)} aria-label="+1">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <aside className="bg-white rounded-2xl border border-line p-5 space-y-5 lg:sticky lg:top-24">
        <Totals lang={lang} />
        <Link href={`/${lang}/commande`} className="btn btn-rose w-full">{t.checkout}</Link>
        <p className="text-xs text-muted">{t.codNotice}</p>
      </aside>
    </div>
  );
}
