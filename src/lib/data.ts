/**
 * Données de démonstration (phase 1).
 * À l'étape suivante, ces données viendront de Supabase (voir supabase/schema.sql).
 */

export type Tr = { fr: string; ar: string };

export type Visual =
  | "lipstick"
  | "foundation"
  | "mascara"
  | "palette"
  | "perfume"
  | "serum"
  | "cream"
  | "polish"
  | "shampoo"
  | "lotion"
  | "brush";

export type Category = { slug: string; name: Tr; visual: Visual; tint: string };

export type Shop = {
  id: string;
  slug: string;
  name: string;
  wilaya: number;
  city: string;
  rating: number;
  reviews: number;
  verified: boolean;
  bio: Tr;
  since: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  shopId: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  visual: Visual;
  tint: string;
  bg: string;
  shades?: { name: string; hex: string }[];
  desc: Tr;
};

export type SalonType = "women" | "men" | "mixed";

export type Salon = {
  id: string;
  slug: string;
  name: string;
  type: SalonType;
  wilaya: number;
  address: string;
  rating: number;
  reviews: number;
  bio: Tr;
  /** Index 0 = dimanche … 6 = samedi. null = fermé. Heures "HH:MM". */
  hours: ([string, string] | null)[];
  services: { id: string; name: Tr; price: number; minutes: number }[];
};

export const categories: Category[] = [
  { slug: "maquillage", name: { fr: "Maquillage", ar: "مكياج" }, visual: "lipstick", tint: "#f7d6dc" },
  { slug: "soins-visage", name: { fr: "Soins de la peau", ar: "العناية بالبشرة" }, visual: "serum", tint: "#d5ece6" },
  { slug: "cheveux", name: { fr: "Cheveux", ar: "الشعر" }, visual: "shampoo", tint: "#f1dccb" },
  { slug: "parfums", name: { fr: "Parfums", ar: "عطور" }, visual: "perfume", tint: "#f6d3cf" },
  { slug: "soins-corps", name: { fr: "Soins du corps", ar: "العناية بالجسم" }, visual: "lotion", tint: "#efe6d6" },
  { slug: "ongles", name: { fr: "Ongles", ar: "الأظافر" }, visual: "polish", tint: "#e6dcf3" },
];

export const shops: Shop[] = [
  {
    id: "s1", slug: "glow-beauty", name: "Glow Beauty", wilaya: 26, city: "Médéa",
    rating: 4.8, reviews: 312, verified: true, since: 2021,
    bio: {
      fr: "Boutique de soins et de maquillage au centre-ville de Médéa. Produits d'origine, conseils personnalisés.",
      ar: "متجر للعناية والمكياج في وسط مدينة المدية. منتجات أصلية ونصائح شخصية.",
    },
  },
  {
    id: "s2", slug: "rose-cosmetiques", name: "Rose Cosmétiques", wilaya: 16, city: "Bab Ezzouar",
    rating: 4.7, reviews: 540, verified: true, since: 2019,
    bio: {
      fr: "Grandes marques de maquillage importées, livrées partout en Algérie.",
      ar: "أشهر علامات المكياج المستوردة، مع التوصيل لكل الجزائر.",
    },
  },
  {
    id: "s3", slug: "lina-beauty", name: "Lina Beauty", wilaya: 31, city: "Oran",
    rating: 4.6, reviews: 188, verified: true, since: 2022,
    bio: {
      fr: "Spécialiste du maquillage des yeux et des palettes.",
      ar: "متخصصة في مكياج العيون والباليتات.",
    },
  },
  {
    id: "s4", slug: "nour-parfums", name: "Nour Parfums", wilaya: 25, city: "Constantine",
    rating: 4.9, reviews: 421, verified: true, since: 2018,
    bio: {
      fr: "Parfums de marque et eaux de toilette, emballage cadeau offert.",
      ar: "عطور أصلية وماء تواليت، مع تغليف هدية مجاني.",
    },
  },
  {
    id: "s5", slug: "bella-nails", name: "Bella Nails", wilaya: 9, city: "Blida",
    rating: 4.5, reviews: 96, verified: false, since: 2024,
    bio: {
      fr: "Vernis, gels et accessoires pour ongles.",
      ar: "طلاء أظافر، جل وإكسسوارات الأظافر.",
    },
  },
  {
    id: "s6", slug: "atlas-bio", name: "Atlas Bio", wilaya: 19, city: "Sétif",
    rating: 4.7, reviews: 233, verified: true, since: 2020,
    bio: {
      fr: "Huiles naturelles algériennes, savons et soins du corps.",
      ar: "زيوت طبيعية جزائرية، صابون ومنتجات العناية بالجسم.",
    },
  },
];

export const products: Product[] = [
  {
    id: "p1", name: "Fond de teint Infaillible 24H", brand: "L'Oréal Paris", category: "maquillage", shopId: "s2",
    price: 1850, rating: 4.8, reviews: 124, stock: 18, visual: "foundation", tint: "#d9a77e", bg: "#f8e4e2",
    shades: [
      { name: "120 Vanilla", hex: "#f1cdb3" },
      { name: "200 Golden Sand", hex: "#dcae8a" },
      { name: "260 Golden Sun", hex: "#b77b55" },
      { name: "300 Amber", hex: "#c98e66" },
    ],
    desc: {
      fr: "Fond de teint longue tenue, fini mat naturel. Résiste à la chaleur et à la transpiration pendant 24 heures.",
      ar: "كريم أساس يدوم طويلاً بلمسة مطفية طبيعية. يقاوم الحرارة والتعرق لمدة 24 ساعة.",
    },
  },
  {
    id: "p2", name: "Mascara Lash Paradise", brand: "L'Oréal Paris", category: "maquillage", shopId: "s2",
    price: 1650, rating: 4.7, reviews: 98, stock: 25, visual: "mascara", tint: "#c98f8a", bg: "#f6e1e4",
    desc: {
      fr: "Volume intense et cils allongés, brosse en fibres douces.",
      ar: "كثافة عالية ورموش أطول، بفرشاة من ألياف ناعمة.",
    },
  },
  {
    id: "p3", name: "Fond de teint Fit Me", brand: "Maybelline", category: "maquillage", shopId: "s1",
    price: 1850, rating: 4.3, reviews: 76, stock: 12, visual: "foundation", tint: "#c99470", bg: "#f5e6e3",
    shades: [
      { name: "115 Ivory", hex: "#efcfb5" },
      { name: "128 Warm Nude", hex: "#d8a985" },
      { name: "220 Natural Beige", hex: "#c8946d" },
    ],
    desc: {
      fr: "Texture légère qui unifie le teint et laisse respirer la peau.",
      ar: "قوام خفيف يوحد لون البشرة ويتركها تتنفس.",
    },
  },
  {
    id: "p4", name: "Rouge à lèvres mat Soft Matte", brand: "NYX", category: "maquillage", shopId: "s3",
    price: 1200, oldPrice: 1450, rating: 4.8, reviews: 211, stock: 40, visual: "lipstick", tint: "#9e2a3a", bg: "#f8dfe3",
    shades: [
      { name: "Cannes", hex: "#9e2a3a" },
      { name: "Stockholm", hex: "#c47a72" },
      { name: "Abu Dhabi", hex: "#b65a5f" },
    ],
    desc: {
      fr: "Crème à lèvres mate et confortable, couleur intense en un seul passage.",
      ar: "أحمر شفاه كريمي مطفي ومريح، لون قوي من أول تمريرة.",
    },
  },
  {
    id: "p5", name: "Palette Nude Obsessions", brand: "Huda Beauty", category: "maquillage", shopId: "s3",
    price: 3900, rating: 4.9, reviews: 154, stock: 7, visual: "palette", tint: "#b4614a", bg: "#f3e2db",
    desc: {
      fr: "9 teintes mates et irisées pour un maquillage des yeux du jour au soir.",
      ar: "9 ألوان مطفية ولامعة لمكياج العيون من النهار إلى المساء.",
    },
  },
  {
    id: "p6", name: "Pinceaux visage, set de 5", brand: "Velvet Tools", category: "maquillage", shopId: "s1",
    price: 2400, rating: 4.4, reviews: 41, stock: 15, visual: "brush", tint: "#d48a95", bg: "#f8e5e8",
    desc: {
      fr: "Poils synthétiques doux pour fond de teint, poudre et blush.",
      ar: "شعيرات صناعية ناعمة لكريم الأساس والبودرة وأحمر الخدود.",
    },
  },
  {
    id: "p7", name: "Crème hydratante visage", brand: "Avène", category: "soins-visage", shopId: "s1",
    price: 1250, rating: 4.7, reviews: 63, stock: 22, visual: "cream", tint: "#8fc9c4", bg: "#e2f1ee",
    desc: {
      fr: "Hydratation 24 h pour peaux sensibles, sans parfum.",
      ar: "ترطيب لمدة 24 ساعة للبشرة الحساسة، بدون عطر.",
    },
  },
  {
    id: "p8", name: "Sérum anti-âge à l'acide hyaluronique", brand: "The Ordinary", category: "soins-visage", shopId: "s1",
    price: 2800, rating: 4.9, reviews: 187, stock: 9, visual: "serum", tint: "#e0b04f", bg: "#f6eedb",
    desc: {
      fr: "Repulpe la peau et atténue les ridules. Quelques gouttes matin et soir.",
      ar: "يملأ البشرة ويخفف الخطوط الدقيقة. بضع قطرات صباحاً ومساءً.",
    },
  },
  {
    id: "p9", name: "Masque visage à l'argile", brand: "Garnier", category: "soins-visage", shopId: "s6",
    price: 1100, rating: 4.6, reviews: 52, stock: 30, visual: "cream", tint: "#c9b79a", bg: "#efe9de",
    desc: {
      fr: "Purifie les pores en 10 minutes, pour peaux mixtes à grasses.",
      ar: "ينقي المسام في 10 دقائق، للبشرة المختلطة والدهنية.",
    },
  },
  {
    id: "p10", name: "Shampooing réparateur", brand: "Kérastase", category: "cheveux", shopId: "s2",
    price: 4200, rating: 4.8, reviews: 88, stock: 11, visual: "shampoo", tint: "#7a4a2c", bg: "#f2e3d6",
    desc: {
      fr: "Pour cheveux abîmés et colorés. Nourrit sans alourdir.",
      ar: "للشعر التالف والمصبوغ. يغذي دون أن يثقل الشعر.",
    },
  },
  {
    id: "p11", name: "Huile d'argan pure 100 ml", brand: "Atlas Bio", category: "cheveux", shopId: "s6",
    price: 1900, rating: 4.9, reviews: 302, stock: 45, visual: "serum", tint: "#c58b2b", bg: "#f4e7d2",
    desc: {
      fr: "Pressée à froid. Pour les cheveux, le visage et les ongles.",
      ar: "معصور على البارد. للشعر والوجه والأظافر.",
    },
  },
  {
    id: "p12", name: "Eau de parfum Rose Velours 50 ml", brand: "Maison Nour", category: "parfums", shopId: "s4",
    price: 6500, oldPrice: 7200, rating: 4.9, reviews: 119, stock: 6, visual: "perfume", tint: "#e79aa6", bg: "#f9e2e5",
    desc: {
      fr: "Rose de Damas, musc blanc et vanille. Tenue 8 heures.",
      ar: "ورد دمشقي، مسك أبيض وفانيليا. يدوم 8 ساعات.",
    },
  },
  {
    id: "p13", name: "Eau de toilette Ambre Doux 100 ml", brand: "Maison Nour", category: "parfums", shopId: "s4",
    price: 5400, rating: 4.7, reviews: 67, stock: 10, visual: "perfume", tint: "#d8a25a", bg: "#f6eadb",
    desc: {
      fr: "Ambre, oud léger et bergamote. Mixte.",
      ar: "عنبر، عود خفيف وبرغموت. للجنسين.",
    },
  },
  {
    id: "p14", name: "Lotion corporelle karité", brand: "Atlas Bio", category: "soins-corps", shopId: "s6",
    price: 1450, rating: 4.8, reviews: 140, stock: 28, visual: "lotion", tint: "#ef8f6b", bg: "#fbe5dc",
    desc: {
      fr: "Beurre de karité et huile d'amande douce. Peau nourrie toute la journée.",
      ar: "زبدة الشيا وزيت اللوز الحلو. بشرة مغذاة طوال اليوم.",
    },
  },
  {
    id: "p15", name: "Gommage corps au savon noir", brand: "Atlas Bio", category: "soins-corps", shopId: "s6",
    price: 950, rating: 4.6, reviews: 85, stock: 33, visual: "cream", tint: "#5b4a3a", bg: "#ece4da",
    desc: {
      fr: "Savon noir traditionnel à l'huile d'olive, pour le hammam.",
      ar: "صابون أسود تقليدي بزيت الزيتون، للحمام.",
    },
  },
  {
    id: "p16", name: "Vernis gel Rose Poudré", brand: "Bella Nails", category: "ongles", shopId: "s5",
    price: 650, rating: 4.5, reviews: 58, stock: 60, visual: "polish", tint: "#e8a0a8", bg: "#f8e3e6",
    shades: [
      { name: "Rose Poudré", hex: "#e8a0a8" },
      { name: "Rouge Cerise", hex: "#b3243b" },
      { name: "Nude", hex: "#dcbca6" },
      { name: "Lilas", hex: "#b9a3d6" },
    ],
    desc: {
      fr: "Tenue 2 semaines, séchage sous lampe UV/LED.",
      ar: "يدوم أسبوعين، يجف تحت مصباح UV/LED.",
    },
  },
  {
    id: "p17", name: "Kit manucure 7 pièces", brand: "Bella Nails", category: "ongles", shopId: "s5",
    price: 1300, rating: 4.3, reviews: 22, stock: 0, visual: "brush", tint: "#b9a3d6", bg: "#eee7f6",
    desc: {
      fr: "Coupe-ongles, lime, repousse-cuticules et trousse.",
      ar: "قلامة، مبرد، دافع الجلد الزائد وحقيبة.",
    },
  },
  {
    id: "p18", name: "Blush poudre Pêche", brand: "Essence", category: "maquillage", shopId: "s1",
    price: 750, rating: 4.4, reviews: 47, stock: 20, visual: "palette", tint: "#f0a58f", bg: "#fbe6e0",
    desc: {
      fr: "Bonne mine naturelle, se travaille facilement au pinceau.",
      ar: "إشراقة طبيعية، سهل التطبيق بالفرشاة.",
    },
  },
];

const week = (open: string, close: string, closedDays: number[]): ([string, string] | null)[] =>
  Array.from({ length: 7 }, (_, d) => (closedDays.includes(d) ? null : [open, close]));

export const salons: Salon[] = [
  {
    id: "c1", slug: "salon-yasmine", name: "Salon Yasmine", type: "women", wilaya: 26,
    address: "Rue Ben Khedda, Médéa", rating: 4.9, reviews: 204,
    bio: {
      fr: "Coiffure, soins des cheveux et maquillage de mariée. Espace réservé aux femmes.",
      ar: "تسريحات، عناية بالشعر ومكياج العرائس. فضاء خاص بالنساء.",
    },
    hours: week("09:00", "18:00", [5]),
    services: [
      { id: "y1", name: { fr: "Brushing", ar: "براشينغ" }, price: 800, minutes: 45 },
      { id: "y2", name: { fr: "Coupe et brushing", ar: "قص وبراشينغ" }, price: 1500, minutes: 60 },
      { id: "y3", name: { fr: "Coloration", ar: "صبغة" }, price: 3500, minutes: 120 },
      { id: "y4", name: { fr: "Lissage protéiné", ar: "تمليس بالبروتين" }, price: 9000, minutes: 180 },
      { id: "y5", name: { fr: "Maquillage de mariée", ar: "مكياج عروس" }, price: 15000, minutes: 150 },
    ],
  },
  {
    id: "c2", slug: "barber-el-djazair", name: "Barber El Djazaïr", type: "men", wilaya: 16,
    address: "Didouche Mourad, Alger-Centre", rating: 4.8, reviews: 377,
    bio: {
      fr: "Coupes modernes, dégradés et taille de barbe au rasoir.",
      ar: "قصات عصرية، تدرج وتحديد اللحية بالموس.",
    },
    hours: week("10:00", "21:00", [5]),
    services: [
      { id: "b1", name: { fr: "Coupe homme", ar: "قص الشعر" }, price: 600, minutes: 30 },
      { id: "b2", name: { fr: "Dégradé", ar: "تدرج (ديغراديه)" }, price: 800, minutes: 40 },
      { id: "b3", name: { fr: "Taille de barbe", ar: "تحديد اللحية" }, price: 400, minutes: 20 },
      { id: "b4", name: { fr: "Coupe + barbe", ar: "قص + لحية" }, price: 1000, minutes: 50 },
      { id: "b5", name: { fr: "Soin visage homme", ar: "عناية بالوجه للرجال" }, price: 1500, minutes: 30 },
    ],
  },
  {
    id: "c3", slug: "institut-lilia", name: "Institut Lilia", type: "women", wilaya: 31,
    address: "Boulevard Front de Mer, Oran", rating: 4.7, reviews: 158,
    bio: {
      fr: "Institut de beauté : épilation, soins du visage, onglerie.",
      ar: "معهد تجميل: إزالة الشعر، العناية بالوجه، الأظافر.",
    },
    hours: week("09:30", "19:00", [5]),
    services: [
      { id: "l1", name: { fr: "Soin du visage", ar: "تنظيف البشرة" }, price: 3000, minutes: 60 },
      { id: "l2", name: { fr: "Pose vernis gel", ar: "طلاء جل" }, price: 1500, minutes: 45 },
      { id: "l3", name: { fr: "Faux ongles", ar: "أظافر اصطناعية" }, price: 3500, minutes: 90 },
      { id: "l4", name: { fr: "Épilation sourcils", ar: "تحديد الحواجب" }, price: 300, minutes: 15 },
    ],
  },
  {
    id: "c4", slug: "studio-chic", name: "Studio Chic", type: "mixed", wilaya: 25,
    address: "Cité Daksi, Constantine", rating: 4.6, reviews: 92,
    bio: {
      fr: "Coiffure femmes et hommes, espaces séparés.",
      ar: "حلاقة للنساء والرجال، بفضاءات منفصلة.",
    },
    hours: week("09:00", "20:00", [5]),
    services: [
      { id: "s1", name: { fr: "Coupe femme", ar: "قص شعر نسائي" }, price: 1200, minutes: 45 },
      { id: "s2", name: { fr: "Coupe homme", ar: "قص شعر رجالي" }, price: 600, minutes: 30 },
      { id: "s3", name: { fr: "Mèches", ar: "ميش" }, price: 5000, minutes: 150 },
      { id: "s4", name: { fr: "Soin kératine", ar: "كيراتين" }, price: 8000, minutes: 150 },
    ],
  },
  {
    id: "c5", slug: "le-barbier-de-setif", name: "Le Barbier de Sétif", type: "men", wilaya: 19,
    address: "Ain Fouara, Sétif", rating: 4.8, reviews: 145,
    bio: {
      fr: "Barbier traditionnel : rasage à la serviette chaude.",
      ar: "حلاق تقليدي: حلاقة بالمنشفة الساخنة.",
    },
    hours: week("08:30", "20:00", [5]),
    services: [
      { id: "t1", name: { fr: "Coupe homme", ar: "قص الشعر" }, price: 500, minutes: 30 },
      { id: "t2", name: { fr: "Rasage traditionnel", ar: "حلاقة تقليدية" }, price: 500, minutes: 30 },
      { id: "t3", name: { fr: "Coupe enfant", ar: "قص شعر للأطفال" }, price: 300, minutes: 20 },
    ],
  },
  {
    id: "c6", slug: "dar-el-hanna", name: "Dar El Henna", type: "women", wilaya: 9,
    address: "Centre-ville, Blida", rating: 4.9, reviews: 211,
    bio: {
      fr: "Henné de mariée, coiffure traditionnelle et hammam.",
      ar: "حنة العروس، تسريحات تقليدية وحمام.",
    },
    hours: week("10:00", "18:00", [5, 6]),
    services: [
      { id: "h1", name: { fr: "Henné mains", ar: "حنة اليدين" }, price: 2000, minutes: 60 },
      { id: "h2", name: { fr: "Henné de mariée", ar: "حنة العروس" }, price: 8000, minutes: 180 },
      { id: "h3", name: { fr: "Chignon", ar: "تسريحة شينيون" }, price: 2500, minutes: 60 },
    ],
  },
];

export const getShop = (id: string) => shops.find((s) => s.id === id);
export const getShopBySlug = (slug: string) => shops.find((s) => s.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getSalon = (slug: string) => salons.find((s) => s.slug === slug);
