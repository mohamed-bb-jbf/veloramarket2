import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { ScissorsIcon, StoreIcon } from "@/components/icons";

const copy = {
  fr: {
    title: "Vendez et recevez des rendez-vous sur Velora",
    intro: "Inscription gratuite. Velora prend une commission uniquement quand vous vendez ou quand un rendez-vous est honoré.",
    seller: "Boutiques de beauté",
    sellerSteps: [
      "Créez votre compte vendeuse et le profil de votre boutique.",
      "Publiez vos produits avec photos, prix, teintes et stock.",
      "Recevez les commandes, appelez la cliente pour confirmer, puis expédiez.",
      "Encaissez à la livraison. Velora facture sa commission chaque mois.",
    ],
    salon: "Salons de coiffure et de beauté",
    salonSteps: [
      "Créez le profil du salon : adresse, photos, horaires.",
      "Ajoutez vos prestations avec leur prix et leur durée.",
      "Acceptez ou refusez les demandes de rendez-vous depuis votre tableau de bord.",
    ],
  },
  ar: {
    title: "بيعي واستقبلي المواعيد على Velora",
    intro: "التسجيل مجاني. تأخذ Velora عمولة فقط عندما تبيعين أو عندما يتم الموعد.",
    seller: "متاجر التجميل",
    sellerSteps: [
      "أنشئي حساب بائعة وصفحة متجرك.",
      "انشري منتجاتك بالصور والأسعار والألوان والكمية.",
      "استقبلي الطلبات، اتصلي بالزبونة للتأكيد، ثم أرسلي الطلب.",
      "استلمي المبلغ عند التوصيل. تحسب Velora عمولتها كل شهر.",
    ],
    salon: "صالونات الحلاقة والتجميل",
    salonSteps: [
      "أنشئي صفحة الصالون: العنوان، الصور، أوقات العمل.",
      "أضيفي خدماتك مع السعر والمدة.",
      "اقبلي أو ارفضي طلبات المواعيد من لوحة التحكم.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: copy[lang].title, description: copy[lang].intro, alternates: { canonical: `/${lang}/vendre` } };
}

export default async function Sell({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const c = copy[lang];
  const blocks = [
    { id: "boutique", title: c.seller, steps: c.sellerSteps, Icon: StoreIcon, cta: t.registerShop },
    { id: "salon", title: c.salon, steps: c.salonSteps, Icon: ScissorsIcon, cta: t.registerSalon },
  ];
  return (
    <>
      <section className="bg-ink text-cream">
        <div className="wrap py-12 space-y-3">
          <h1 className="font-display text-4xl md:text-6xl max-w-3xl">{c.title}</h1>
          <p className="text-cream/70 max-w-xl">{c.intro}</p>
        </div>
      </section>
      <div className="wrap py-10 grid md:grid-cols-2 gap-5">
        {blocks.map(({ id, title, steps, Icon, cta }) => (
          <section id={id} key={id} className="card p-6 flex flex-col gap-5 scroll-mt-24">
            <h2 className="font-display text-3xl flex items-center gap-3">
              <Icon className="w-8 h-8 text-rose" /> {title}
            </h2>
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-rose-soft text-rose-deep grid place-items-center text-sm font-semibold shrink-0 num">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <Link href={`/${lang}/inscription/${id}`} className="btn btn-rose mt-auto">
              {cta}
            </Link>
          </section>
        ))}
      </div>
    </>
  );
}
