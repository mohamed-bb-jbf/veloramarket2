import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/** Redirige "/" et les liens sans langue vers /fr ou /ar selon le navigateur. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const accept = req.headers.get("accept-language") || "";
  const lang = /^ar\b/i.test(accept.trim()) ? "ar" : defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
