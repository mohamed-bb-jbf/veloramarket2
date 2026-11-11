import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { UserIcon } from "@/components/icons";

export const metadata: Metadata = { robots: { index: false } };

export default async function Account({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const rows = [t.myOrders, t.myBookings, t.favorites];
  return (
    <div className="wrap py-8 max-w-2xl">
      <h1 className="font-display text-4xl md:text-5xl mb-6">{t.accountTitle}</h1>
      <div className="card p-6 flex items-center gap-4">
        <span className="w-16 h-16 rounded-full bg-rose-soft grid place-items-center text-rose-deep">
          <UserIcon className="w-8 h-8" />
        </span>
        <p className="text-sm text-muted">{t.accountSoon}</p>
      </div>
      <ul className="mt-4 card divide-y divide-line">
        {rows.map((r) => (
          <li key={r} className="px-5 py-4 flex justify-between text-muted">
            {r} <span aria-hidden="true">›</span>
          </li>
        ))}
        <li>
          <Link href={`/${lang}/vendre`} className="px-5 py-4 flex justify-between hover:text-rose-deep">
            {t.sellerSpace} / {t.salonSpace} <span aria-hidden="true">›</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
