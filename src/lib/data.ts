/**
 * Données de démonstration.
 * Photos : Unsplash (licence libre). Remplacées par les vraies boutiques quand elles s'inscrivent.
 */

export type Tr = { fr: string; ar: string };

export type Category = { slug: string; name: Tr; img: string };

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
  name: Tr;
  brand: string;
  category: string;
  shopId: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  img: string;
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
  img: string;
  gallery: string[];
  bio: Tr;
  /** Index 0 = dimanche … 6 = samedi. null = fermé. Heures "HH:MM". */
  hours: ([string, string] | null)[];
  services: { id: string; name: Tr; price: number; minutes: number }[];
};

const i = (n: string) => `/img/${n}.jpg`;

export const categories: Category[] = [
  { slug: "maquillage", name: { fr: "Maquillage", ar: "مكياج" }, img: i("cat-maquillage") },
  { slug: "soins-visage", name: { fr: "Soins de la peau", ar: "العناية بالبشرة" }, img: i("cat-soins-visage") },
  { slug: "cheveux", name: { fr: "Cheveux", ar: "الشعر" }, img: i("cat-cheveux") },
  { slug: "parfums", name: { fr: "Parfums", ar: "عطور" }, img: i("cat-parfums") },
  { slug: "soins-corps", name: { fr: "Soins du corps", ar: "العناية بالجسم" }, img: i("cat-soins-corps") },
  { slug: "ongles", name: { fr: "Ongles", ar: "الأظافر" }, img: i("cat-ongles") },
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
    id: "p1", name: { fr: "Rouge à lèvres Pop Lip Colour", ar: "أحمر شفاه Pop Lip Colour" }, brand: "Clinique", category: "maquillage", shopId: "s2",
    price: 3200, oldPrice: 3600, rating: 4.8, reviews: 211, stock: 24, img: i("p-lipstick"),
    shades: [{ name: "Cherry Pop", hex: "#c8102e" }, { name: "Love Pop", hex: "#e0457b" }, { name: "Poppy Pop", hex: "#e2452c" }],
    desc: {
      fr: "Couleur intense et base lissante en un seul geste. Tenue 8 heures, fini satiné.",
      ar: "لون قوي مع قاعدة مُنعِّمة في حركة واحدة. يدوم 8 ساعات بلمسة ساتان.",
    },
  },
  {
    id: "p2", name: { fr: "Palette fards à paupières 35 teintes", ar: "باليت ظلال العيون 35 لوناً" }, brand: "Morphe", category: "maquillage", shopId: "s3",
    price: 4900, rating: 4.9, reviews: 154, stock: 7, img: i("p-palette"),
    desc: {
      fr: "35 teintes chaudes, mates et irisées, très pigmentées.",
      ar: "35 لوناً دافئاً بين مطفي ولامع، بتصبّغ عالٍ.",
    },
  },
  {
    id: "p3", name: { fr: "Kit teint : poudre, blush et anticernes", ar: "طقم البشرة: بودرة، بلاشر وكونسيلر" }, brand: "Bobbi Brown", category: "maquillage", shopId: "s2",
    price: 7800, rating: 4.7, reviews: 63, stock: 5, img: i("p-teint"),
    desc: {
      fr: "L'essentiel pour un teint unifié : poudre compacte, blush, anticernes et palette nude.",
      ar: "كل ما تحتاجينه لبشرة موحدة: بودرة مضغوطة، أحمر خدود، كونسيلر وباليت نيود.",
    },
  },
  {
    id: "p4", name: { fr: "Set pinceaux visage et essentiels", ar: "طقم فرش الوجه والأساسيات" }, brand: "Bobbi Brown", category: "maquillage", shopId: "s1",
    price: 5600, rating: 4.6, reviews: 41, stock: 9, img: i("p-kit"),
    desc: {
      fr: "Deux pinceaux en poils doux, rouge à lèvres et poudre de finition.",
      ar: "فرشاتان بشعيرات ناعمة، أحمر شفاه وبودرة تثبيت.",
    },
  },
  {
    id: "p5", name: { fr: "Palette Nude 8 teintes", ar: "باليت نيود 8 ألوان" }, brand: "Lina Pro", category: "maquillage", shopId: "s3",
    price: 2400, rating: 4.5, reviews: 98, stock: 30, img: i("p-nude"),
    desc: {
      fr: "Des beiges aux bruns profonds, pour le maquillage de tous les jours.",
      ar: "من البيج إلى البني الغامق، لمكياج كل يوم.",
    },
  },
  {
    id: "p6", name: { fr: "Crème hydratante visage 50 ml", ar: "كريم مرطب للوجه 50 مل" }, brand: "Curology", category: "soins-visage", shopId: "s1",
    price: 2900, rating: 4.7, reviews: 87, stock: 22, img: i("p-creme"),
    desc: {
      fr: "Texture gel-crème, hydrate 24 h sans laisser de film gras.",
      ar: "قوام جل كريمي، يرطب 24 ساعة دون أثر دهني.",
    },
  },
  {
    id: "p7", name: { fr: "Sérum éclat à l'huile de rose", ar: "سيروم الإشراق بزيت الورد" }, brand: "Atlas Bio", category: "soins-visage", shopId: "s6",
    price: 2200, rating: 4.9, reviews: 187, stock: 14, img: i("p-serum"),
    desc: {
      fr: "Quelques gouttes le soir pour une peau souple et lumineuse au réveil.",
      ar: "بضع قطرات في المساء لبشرة ناعمة ومشرقة في الصباح.",
    },
  },
  {
    id: "p8", name: { fr: "Coffret soins du visage, 6 produits", ar: "علبة العناية بالوجه، 6 منتجات" }, brand: "Origins", category: "soins-visage", shopId: "s1",
    price: 12500, oldPrice: 14000, rating: 4.8, reviews: 36, stock: 4, img: i("p-coffret"),
    desc: {
      fr: "Nettoyant, masque, crème de jour, contour des yeux et deux soins ciblés.",
      ar: "غسول، قناع، كريم نهاري، كريم محيط العين ومنتجان للعناية المركزة.",
    },
  },
  {
    id: "p9", name: { fr: "Routine 3 étapes : nettoyant, hydratant, soin", ar: "روتين 3 خطوات: غسول، مرطب وعلاج" }, brand: "Curology", category: "soins-visage", shopId: "s2",
    price: 6900, rating: 4.6, reviews: 52, stock: 11, img: i("p-routine"),
    desc: {
      fr: "La routine complète pour peaux mixtes, matin et soir.",
      ar: "روتين كامل للبشرة المختلطة، صباحاً ومساءً.",
    },
  },
  {
    id: "p10", name: { fr: "Shampooing fortifiant au bambou", ar: "شامبو مقوٍّ بالخيزران" }, brand: "Maui Moisture", category: "cheveux", shopId: "s2",
    price: 2600, rating: 4.7, reviews: 140, stock: 26, img: i("p-shampoo"),
    desc: {
      fr: "Sans sulfates ni silicones. Renforce les cheveux fins et cassants.",
      ar: "بدون كبريتات ولا سيليكون. يقوي الشعر الرقيق والمتقصف.",
    },
  },
  {
    id: "p11", name: { fr: "Masque capillaire réparateur", ar: "قناع إصلاح الشعر" }, brand: "Act+Acre", category: "cheveux", shopId: "s1",
    price: 3400, rating: 4.8, reviews: 74, stock: 13, img: i("p-masque"),
    desc: {
      fr: "Répare les longueurs abîmées par la chaleur et la coloration.",
      ar: "يصلح الشعر التالف من الحرارة والصبغة.",
    },
  },
  {
    id: "p12", name: { fr: "Sèche-cheveux pro et set de brosses", ar: "مجفف شعر احترافي مع طقم فرش" }, brand: "Studio Pro", category: "cheveux", shopId: "s2",
    price: 8900, rating: 4.5, reviews: 58, stock: 6, img: i("p-brosses"),
    desc: {
      fr: "Sèche-cheveux 2200 W, fer à boucler, brosse plate et peigne.",
      ar: "مجفف شعر 2200 واط، مكواة تجعيد، فرشاة مسطحة ومشط.",
    },
  },
  {
    id: "p13", name: { fr: "N°5 Eau de Parfum 100 ml", ar: "N°5 ماء عطر 100 مل" }, brand: "Chanel", category: "parfums", shopId: "s4",
    price: 38000, rating: 4.9, reviews: 119, stock: 3, img: i("p-n5"),
    desc: {
      fr: "Le floral aldéhydé le plus célèbre. Flacon d'origine, scellé.",
      ar: "أشهر عطر زهري ألدهيدي. قارورة أصلية مختومة.",
    },
  },
  {
    id: "p14", name: { fr: "Coco Noir Eau de Parfum 50 ml", ar: "Coco Noir ماء عطر 50 مل" }, brand: "Chanel", category: "parfums", shopId: "s4",
    price: 31000, rating: 4.8, reviews: 67, stock: 4, img: i("p-coco"),
    desc: {
      fr: "Pamplemousse, rose et patchouli. Sillage du soir.",
      ar: "جريب فروت، ورد وباتشولي. عطر للسهرات.",
    },
  },
  {
    id: "p15", name: { fr: "Bleu Eau de Parfum homme 100 ml", ar: "Bleu ماء عطر للرجال 100 مل" }, brand: "Chanel", category: "parfums", shopId: "s4",
    price: 34000, oldPrice: 36500, rating: 4.9, reviews: 203, stock: 5, img: i("p-bleu"),
    desc: {
      fr: "Boisé aromatique : agrumes, encens et cèdre.",
      ar: "خشبي عطري: حمضيات، بخور وأرز.",
    },
  },
  {
    id: "p16", name: { fr: "Extrait de parfum Ambre Doré 100 ml", ar: "عطر مركز Ambre Doré 100 مل" }, brand: "Maison Nour", category: "parfums", shopId: "s4",
    price: 9500, rating: 4.7, reviews: 88, stock: 12, img: i("p-ambre"),
    desc: {
      fr: "Ambre, vanille et oud léger. Création de la maison, tenue 10 heures.",
      ar: "عنبر، فانيليا وعود خفيف. من ابتكار الدار، يدوم 10 ساعات.",
    },
  },
  {
    id: "p17", name: { fr: "Lait corporel nourrissant 200 ml", ar: "حليب مغذٍّ للجسم 200 مل" }, brand: "Atlas Bio", category: "soins-corps", shopId: "s6",
    price: 1800, rating: 4.8, reviews: 140, stock: 28, img: i("p-lotion"),
    desc: {
      fr: "Beurre de karité et amande douce. Pénètre vite, sans coller.",
      ar: "زبدة الشيا واللوز الحلو. يُمتص بسرعة دون لزوجة.",
    },
  },
  {
    id: "p18", name: { fr: "Huile d'argan pure 50 ml", ar: "زيت أرغان صافٍ 50 مل" }, brand: "Atlas Bio", category: "soins-corps", shopId: "s6",
    price: 1900, rating: 4.9, reviews: 302, stock: 45, img: i("p-argan"),
    desc: {
      fr: "Pressée à froid. Pour le visage, les cheveux et les ongles.",
      ar: "معصور على البارد. للوجه والشعر والأظافر.",
    },
  },
  {
    id: "p19", name: { fr: "Gommage corps au sucre et karité", ar: "مقشر الجسم بالسكر والشيا" }, brand: "Atlas Bio", category: "soins-corps", shopId: "s6",
    price: 1500, rating: 4.6, reviews: 85, stock: 33, img: i("p-gommage"),
    desc: {
      fr: "Exfolie en douceur et laisse la peau satinée.",
      ar: "يقشر بلطف ويترك البشرة ناعمة.",
    },
  },
  {
    id: "p20", name: { fr: "Vernis longue tenue", ar: "طلاء أظافر يدوم طويلاً" }, brand: "Bella Nails", category: "ongles", shopId: "s5",
    price: 650, rating: 4.5, reviews: 58, stock: 60, img: i("p-vernis-rouge"),
    shades: [{ name: "Rouge Cerise", hex: "#b3122f" }, { name: "Rose Poudré", hex: "#e8a0a8" }, { name: "Nude", hex: "#dcbca6" }, { name: "Lilas", hex: "#b9a3d6" }],
    desc: {
      fr: "Brillance miroir, séchage rapide, tenue 7 jours.",
      ar: "لمعان قوي، يجف بسرعة ويدوم 7 أيام.",
    },
  },
  {
    id: "p21", name: { fr: "Vernis gel Noir Onyx", ar: "طلاء جل أسود Onyx" }, brand: "Bella Nails", category: "ongles", shopId: "s5",
    price: 900, rating: 4.4, reviews: 22, stock: 0, img: i("p-vernis-noir"),
    desc: {
      fr: "Gel semi-permanent, à sécher sous lampe UV/LED.",
      ar: "جل شبه دائم، يجف تحت مصباح UV/LED.",
    },
  },
];

const week = (open: string, close: string, closedDays: number[]): ([string, string] | null)[] =>
  Array.from({ length: 7 }, (_, d) => (closedDays.includes(d) ? null : [open, close]));

export const salons: Salon[] = [
  {
    id: "c1", slug: "salon-yasmine", name: "Salon Yasmine", type: "women", wilaya: 26,
    address: "Rue Ben Khedda, Médéa", rating: 4.9, reviews: 204,
    img: i("s-yasmine"), gallery: [i("s-yasmine-2"), i("s-salon")],
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
    img: i("s-barber"), gallery: [i("s-barber-2")],
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
    img: i("s-lilia"), gallery: [i("s-lilia-2"), i("s-oil")],
    bio: {
      fr: "Institut de beauté : soins du visage, épilation et massages.",
      ar: "معهد تجميل: العناية بالوجه، إزالة الشعر والتدليك.",
    },
    hours: week("09:30", "19:00", [5]),
    services: [
      { id: "l1", name: { fr: "Soin du visage", ar: "تنظيف البشرة" }, price: 3000, minutes: 60 },
      { id: "l2", name: { fr: "Masque à l'argile", ar: "قناع الطين" }, price: 1800, minutes: 30 },
      { id: "l3", name: { fr: "Massage relaxant", ar: "تدليك استرخائي" }, price: 4000, minutes: 60 },
      { id: "l4", name: { fr: "Épilation sourcils", ar: "تحديد الحواجب" }, price: 300, minutes: 15 },
    ],
  },
  {
    id: "c4", slug: "studio-chic", name: "Studio Chic", type: "mixed", wilaya: 25,
    address: "Cité Daksi, Constantine", rating: 4.6, reviews: 92,
    img: i("s-chic"), gallery: [],
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
    img: i("s-setif"), gallery: [i("s-setif-2")],
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
    id: "c6", slug: "nails-bar-blida", name: "Nails Bar Blida", type: "women", wilaya: 9,
    address: "Centre-ville, Blida", rating: 4.9, reviews: 211,
    img: i("s-nails"), gallery: [],
    bio: {
      fr: "Onglerie : manucure, vernis gel et pose de faux ongles.",
      ar: "صالون أظافر: مانيكير، طلاء جل وتركيب الأظافر.",
    },
    hours: week("10:00", "18:00", [5, 6]),
    services: [
      { id: "h1", name: { fr: "Manucure simple", ar: "مانيكير بسيط" }, price: 1000, minutes: 30 },
      { id: "h2", name: { fr: "Pose vernis gel", ar: "طلاء جل" }, price: 1500, minutes: 45 },
      { id: "h3", name: { fr: "Faux ongles", ar: "أظافر اصطناعية" }, price: 3500, minutes: 90 },
    ],
  },
];

export const getShop = (id: string) => shops.find((s) => s.id === id);
export const getShopBySlug = (slug: string) => shops.find((s) => s.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getSalon = (slug: string) => salons.find((s) => s.slug === slug);
