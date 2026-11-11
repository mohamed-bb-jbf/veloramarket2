import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { categories, products, salons, shops } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/categories",
    "/salons",
    "/vendre",
    "/inscription/boutique",
    "/inscription/salon",
    ...categories.map((c) => `/categorie/${c.slug}`),
    ...products.map((p) => `/produit/${p.id}`),
    ...shops.map((s) => `/boutique/${s.slug}`),
    ...salons.map((s) => `/salons/${s.slug}`),
  ];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${p}`])) },
    })),
  );
}
