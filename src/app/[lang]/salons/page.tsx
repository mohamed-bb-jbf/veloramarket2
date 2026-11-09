import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { salons, type SalonType } from "@/lib/data";
import { wilayas } from "@/lib/wilayas";
import { SalonCard } from "@/components/cards";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { title: t.salonTitle, description: t.salonText, alternates: { canonical: `/${lang}/salons` } };
}

export default async function Salons({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ type?: string; w?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const { type = "", w = "" } = await searchParams;
  const list = salons.filter((s) => (!type || s.type === type) && (!w || String(s.wilaya) === w));
  const types: ("" | SalonType)[] = ["", "women", "men", "mixed"];
  const usedWilayas = [...new Set(salons.map((s) => s.wilaya))].sort((a, b) => a - b);

  const href = (nt: string, nw: string) => {
    const q = new URLSearchParams();
    if (nt) q.set("type", nt);
    if (nw) q.set("w", nw);
    const s = q.toString();
    return `/${lang}/salons${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <section className="bg-plum text-cream">
        <div className="wrap py-10 space-y-2">
          <h1 className="font-display text-4xl md:text-6xl">{t.salonTitle}</h1>
          <p className="text-cream/70 max-w-xl">{t.salonText}</p>
        </div>
      </section>
      <div className="wrap py-8 space-y-6">
        <div className="flex flex-wrap gap-2 items-center">
          {types.map((ty) => (
            <Link
              key={ty || "all"}
              href={href(ty, w)}
              className={`rounded-full px-4 py-1.5 text-sm border ${type === ty ? "bg-plum text-cream border-plum" : "bg-white border-line hover:border-rose"}`}
            >
              {ty ? t[ty] : t.all}
            </Link>
          ))}
          <span className="w-px h-6 bg-line mx-1" />
          <Link
            href={href(type, "")}
            className={`rounded-full px-4 py-1.5 text-sm border ${!w ? "bg-rose text-white border-rose" : "bg-white border-line"}`}
          >
            {t.allWilayas}
          </Link>
          {usedWilayas.map((code) => {
            const name = wilayas.find((x) => x[0] === code)!;
            return (
              <Link
                key={code}
                href={href(type, String(code))}
                className={`rounded-full px-4 py-1.5 text-sm border ${w === String(code) ? "bg-rose text-white border-rose" : "bg-white border-line hover:border-rose"}`}
              >
                {lang === "ar" ? name[2] : name[1]}
              </Link>
            );
          })}
        </div>
        {list.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((s) => <SalonCard key={s.id} s={s} lang={lang} />)}
          </div>
        ) : (
          <p className="bg-white rounded-2xl border border-line p-8 text-center text-muted">{t.noResults}</p>
        )}
      </div>
    </>
  );
}
