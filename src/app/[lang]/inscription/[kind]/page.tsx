import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales } from "@/lib/i18n";
import RegisterForm from "@/components/RegisterForm";

type P = { params: Promise<{ lang: string; kind: string }> };
const kinds = ["boutique", "salon"];

export function generateStaticParams() {
  return locales.flatMap((lang) => kinds.map((kind) => ({ lang, kind })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, kind } = await params;
  if (!isLocale(lang) || !kinds.includes(kind)) return {};
  const t = getDict(lang);
  return {
    title: kind === "salon" ? t.registerSalon : t.registerShop,
    description: kind === "salon" ? t.proSalonText : t.proShopText,
    alternates: { canonical: `/${lang}/inscription/${kind}` },
  };
}

export default async function Register({ params }: P) {
  const { lang, kind } = await params;
  if (!isLocale(lang) || !kinds.includes(kind)) notFound();
  const t = getDict(lang);
  const salon = kind === "salon";
  return (
    <>
      <section className="relative bg-ink text-cream">
        <Image
          src={salon ? "/img/s-salon.jpg" : "/img/cat-maquillage.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="wrap relative py-14 md:py-20 space-y-3">
          <p className="eyebrow">Velora Market</p>
          <h1 className="font-display text-5xl md:text-6xl">{salon ? t.registerSalon : t.registerShop}</h1>
          <p className="text-cream/75 max-w-xl">{salon ? t.proSalonText : t.proShopText}</p>
        </div>
      </section>
      <div className="wrap py-8 max-w-3xl">
        <RegisterForm lang={lang} kind={salon ? "salon" : "shop"} />
      </div>
    </>
  );
}
