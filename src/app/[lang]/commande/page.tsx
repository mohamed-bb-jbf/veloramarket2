import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = { robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="wrap py-8">
      <h1 className="font-display text-4xl md:text-5xl mb-6">{getDict(lang).checkoutTitle}</h1>
      <CheckoutForm lang={lang} />
    </div>
  );
}
