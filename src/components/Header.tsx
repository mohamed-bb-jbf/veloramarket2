"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { BagIcon, LotusIcon, SearchIcon, UserIcon } from "./icons";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5" dir="ltr">
      <LotusIcon className="w-8 h-8 text-rose" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.7rem] text-cream leading-none">Velora</span>
        <span className="text-[9px] tracking-[.42em] uppercase text-gold ps-0.5">Market</span>
      </span>
    </span>
  );
}

export default function Header({ lang, demo }: { lang: Locale; demo: boolean }) {
  const t = getDict(lang);
  const { count } = useCart();
  const path = usePathname() || `/${lang}`;
  const other: Locale = lang === "fr" ? "ar" : "fr";
  const switched = path.replace(/^\/(fr|ar)(?=\/|$)/, `/${other}`);

  const nav = [
    { href: `/${lang}/categories`, label: t.categories },
    { href: `/${lang}/salons`, label: t.salons },
    { href: `/${lang}/vendre`, label: t.sellerSpace },
  ];

  return (
    <>
      <div className="bg-ink text-cream/70 text-xs border-b border-white/10">
        <div className="wrap flex items-center justify-between gap-4 h-9">
          <span className="truncate">{t.topBar}</span>
          <span className="flex items-center gap-4 shrink-0">
            <Link href={`/${lang}/inscription/boutique`} className="hidden sm:inline hover:text-rose">
              {t.registerShop}
            </Link>
            <Link href={`/${lang}/inscription/salon`} className="hidden sm:inline hover:text-rose">
              {t.registerSalon}
            </Link>
            <Link href={switched} hrefLang={other} className="text-gold hover:text-rose font-medium">
              {other === "ar" ? "العربية" : "Français"}
            </Link>
          </span>
        </div>
      </div>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 bg-ink/95 backdrop-blur text-cream">
        <div className="wrap flex items-center gap-6 h-[68px]">
          <Link href={`/${lang}`} aria-label="Velora Market" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-cream/75">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`py-2 border-b transition-colors hover:text-cream ${path.startsWith(n.href) ? "text-cream border-rose" : "border-transparent"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <form action={`/${lang}/recherche`} className="hidden md:block flex-1 max-w-sm ms-auto relative" role="search">
            <SearchIcon className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-cream/50" />
            <input
              id="header-search"
              name="q"
              placeholder={t.search}
              className="w-full bg-transparent border-b border-white/25 py-2 ps-9 pe-2 text-sm placeholder:text-cream/45 focus:outline-none focus:border-rose"
            />
          </form>

          <div className="ms-auto md:ms-0 flex items-center gap-1">
            <Link href={`/${lang}/recherche`} className="md:hidden p-2 hover:text-rose" aria-label={t.searchBtn}>
              <SearchIcon className="w-6 h-6" />
            </Link>
            <Link href={`/${lang}/compte`} className="hidden md:block p-2 hover:text-rose" aria-label={t.account}>
              <UserIcon className="w-6 h-6" />
            </Link>
            <Link href={`/${lang}/panier`} className="relative p-2 hover:text-rose" aria-label={`${t.cart} (${count})`}>
              <BagIcon className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute top-0 -end-0.5 min-w-5 h-5 px-1 rounded-full bg-rose text-[11px] font-semibold grid place-items-center num">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      {demo && <div className="bg-rose-soft text-plum text-xs text-center py-1.5 px-4">{t.demo}</div>}
    </>
  );
}
