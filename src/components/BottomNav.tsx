"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { BagIcon, GridIcon, HomeIcon, ScissorsIcon, UserIcon } from "./icons";

export default function BottomNav({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const path = usePathname() || "";
  const { count } = useCart();
  const items = [
    { href: `/${lang}`, label: t.home, Icon: HomeIcon, exact: true },
    { href: `/${lang}/categories`, label: t.categories, Icon: GridIcon },
    { href: `/${lang}/salons`, label: t.salons, Icon: ScissorsIcon },
    { href: `/${lang}/panier`, label: t.cart, Icon: BagIcon, badge: count },
    { href: `/${lang}/compte`, label: t.account, Icon: UserIcon },
  ];
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink text-cream/70 border-t border-white/10 pb-[env(safe-area-inset-bottom,0px)] ps-[env(safe-area-inset-left,0px)] pe-[env(safe-area-inset-right,0px)]"
      aria-label="Navigation"
    >
      <ul className="grid grid-cols-5 h-16">
        {items.map(({ href, label, Icon, exact, badge }) => {
          const active = exact ? path === href : path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`h-full flex flex-col items-center justify-center gap-1 text-[11px] ${active ? "text-rose" : ""}`}
              >
                <span className="relative">
                  <Icon className="w-5 h-5" />
                  {!!badge && (
                    <span className="absolute -top-1.5 -end-2 min-w-4 h-4 px-1 rounded-full bg-rose text-cream text-[10px] grid place-items-center num">
                      {badge}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
