import type { Locale } from "./i18n";

export function price(amount: number, lang: Locale) {
  const n = new Intl.NumberFormat("fr-DZ").format(amount).replace(/ | /g, " ");
  return lang === "ar" ? `${n} د.ج` : `${n} DA`;
}

/** Livraison gratuite à partir de ce montant (par boutique). */
export const FREE_DELIVERY_FROM = 5000;
export const DELIVERY_FEE = 500;

export function deliveryFee(subtotal: number) {
  return subtotal >= FREE_DELIVERY_FROM || subtotal === 0 ? 0 : DELIVERY_FEE;
}
