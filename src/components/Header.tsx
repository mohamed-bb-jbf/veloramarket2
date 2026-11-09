"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { BagIcon, LotusIcon, SearchIcon } from "./icons";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2" dir="ltr">
      <LotusIcon className="w-8 h-8 text-rose" />
      <span className={`font-display text-2xl leading-none ${light ? "text-cream" : "text-ink"}`}>
        Velora <span className="text-rose-soft/80 font-sans text-sm tracking-[.25em] uppercase">Market</span>
      </span>
    </span>
  );
}

export default function Header({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { count } = useCart();
  const path = usePathname() || `/${lang}`;
  const other: Locale = lang === "fr" ? "ar" : "fr";
  const switched = path.replace(/^\/(fr|ar)(?=\/|$)/, `/${other}`);

  const nav = [
    { href: `/${lang}/categories`, label: t.categories },
    { href: `/${lang}/salons`, label: t.salons },
    { href: `/${lang}/vendre`, label: t.sellCta },
  ];

  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 bg-plum text-cream border-b border-white/5">
        <div className="wrap flex items-center gap-4 h-16">
          <Link href={`/${lang}`} aria-label="Velora Market" className="shrink-0">
            <Logo />
          </Link>

          <form action={`/${lang}/recherche`} className="hidden md:flex flex-1 max-w-md relative" role="search">
            <SearchIcon className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3.5 text-cream/50" />
            <input
              id="header-search"
              name="q"
              placeholder={t.search}
              className="w-full rounded-full bg-white/8 border border-white/10 py-2.5 ps-10 pe-4 text-sm placeholder:text-cream/45 focus:outline-none focus:border-rose"
            />
          </form>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-cream/80">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`hover:text-rose transition-colors ${path.startsWith(n.href) ? "text-rose" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2">
            <Link
              href={switched}
              hrefLang={other}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-rose hover:text-rose"
            >
              {other === "ar" ? "العربية" : "Français"}
            </Link>
            <Link
              href={`/${lang}/panier`}
              className="relative p-2 hover:text-rose"
              aria-label={`${t.cart} (${count})`}
            >
              <BagIcon className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-0.5 -end-0.5 min-w-5 h-5 px-1 rounded-full bg-rose text-[11px] font-semibold grid place-items-center num">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        <form action={`/${lang}/recherche`} className="md:hidden wrap pb-3 relative" role="search">
          <SearchIcon className="w-4 h-4 absolute top-[calc(50%-6px)] -translate-y-1/2 start-[max(30px,calc(env(safe-area-inset-left,0px)+14px))] text-cream/50" />
          <input
            id="header-search-mobile"
            name="q"
            placeholder={t.search}
            className="w-full rounded-full bg-white/8 border border-white/10 py-2.5 ps-10 pe-4 text-sm placeholder:text-cream/45 focus:outline-none focus:border-rose"
          />
        </form>
      </header>
      <div className="bg-rose-soft/60 text-plum text-xs text-center py-1.5 px-4">{t.demo}</div>
    </>
  );
}
