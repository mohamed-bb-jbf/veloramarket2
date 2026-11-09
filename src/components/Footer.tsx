import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { categories } from "@/lib/data";
import { Logo } from "./Header";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <footer className="bg-ink text-cream/70 mt-16">
      <div className="wrap py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm max-w-xs">{t.footerText}</p>
        </div>
        <div>
          <h3 className="text-cream text-sm font-medium mb-3">{t.categories}</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${lang}/categorie/${c.slug}`} className="hover:text-rose">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-cream text-sm font-medium mb-3">Velora</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/salons`} className="hover:text-rose">{t.salons}</Link></li>
            <li><Link href={`/${lang}/vendre`} className="hover:text-rose">{t.sellerSpace}</Link></li>
            <li><Link href={`/${lang}/vendre#salon`} className="hover:text-rose">{t.salonSpace}</Link></li>
            <li><Link href={`/${lang}/compte`} className="hover:text-rose">{t.accountTitle}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display italic text-2xl text-rose leading-snug">
            {lang === "ar" ? "جمالك، أولويتنا" : "Votre beauté, notre priorité"}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap py-5 text-xs flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Velora Market. {t.rights}</span>
          <span>🇩🇿 Algérie · DZD</span>
        </div>
      </div>
    </footer>
  );
}
