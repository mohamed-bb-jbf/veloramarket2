import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/fr/panier", "/ar/panier", "/fr/commande", "/ar/commande", "/fr/compte", "/ar/compte"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
