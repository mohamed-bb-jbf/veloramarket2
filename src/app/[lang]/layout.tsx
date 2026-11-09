import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost, El_Messiri, Tajawal } from "next/font/google";
import "../globals.css";
import { dir, getDict, isLocale, locales } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const displayFr = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-fr",
});
const bodyFr = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-fr" });
const displayAr = El_Messiri({ subsets: ["arabic"], weight: ["500", "600", "700"], variable: "--font-display-ar" });
const bodyAr = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-body-ar" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${SITE_NAME} · ${t.brandTagline}`, template: `%s · ${SITE_NAME}` },
    description: t.heroText,
    alternates: { canonical: `/${lang}`, languages: { fr: "/fr", ar: "/ar" } },
    openGraph: { siteName: SITE_NAME, locale: lang === "ar" ? "ar_DZ" : "fr_DZ", type: "website" },
  };
}

export const viewport: Viewport = { themeColor: "#1d1418", viewportFit: "cover" };

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${displayFr.variable} ${bodyFr.variable} ${displayAr.variable} ${bodyAr.variable}`}
    >
      <body className="min-h-screen flex flex-col pb-[calc(64px+env(safe-area-inset-bottom,0px))] md:pb-0">
        <CartProvider>
          <Header lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
          <BottomNav lang={lang} />
        </CartProvider>
      </body>
    </html>
  );
}
