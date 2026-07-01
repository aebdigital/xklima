import {
  AirVent,
  BriefcaseBusiness,
  Calculator,
  Download,
  Fan,
  FileText,
  Home,
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
  Snowflake,
  ThermometerSun,
  Wrench
} from "lucide-react";

export type ProductCategory = "Klimatizácie" | "Tepelné čerpadlá" | "Vzduchotechnika";

export type ProductVariant = {
  label: string;
  powerKw: number;
  areaM2: string;
  installHint: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  short: string;
  image: string;
  heroImage: string;
  powerKw: number;
  maxM2: number;
  tags: string[];
  badges: string[];
  variants: ProductVariant[];
  specs: Record<string, string>;
  highlights: string[];
  useCases: string[];
};

export const phone = "+421 907 443 448";
export const cleanPhone = "+421907443448";
export const email = "info@xklima.sk";

export const navItems = [
  { label: "Klimatizácie", href: "/products" },
  { label: "Referencie", href: "/references" },
  { label: "Kariéra", href: "/career" },
  { label: "Montáž/servis", href: "/montaz-servis" },
  { label: "Na stiahnutie", href: "/downloads" },
  { label: "Kontakt", href: "/contact" }
];

export const services = [
  {
    title: "Klimatizácie",
    href: "/products",
    icon: Snowflake,
    image: "/images/aeb/service1.jpg",
    text: "Split, multisplit aj komerčné riešenia pre byty, kancelárie, gastro a výrobné priestory."
  },
  {
    title: "Vzduchotechnika",
    href: "/montaz-servis",
    icon: AirVent,
    image: "/images/aeb/service2.jpg",
    text: "Návrh, dodávka a montáž vetrania, rekuperácie a technických rozvodov."
  },
  {
    title: "Chladenie",
    href: "/references",
    icon: Fan,
    image: "/images/aeb/service3.jpg",
    text: "Chladiace boxy, technológie a servis chladiarenských okruhov pre prevádzky."
  },
  {
    title: "Tepelné čerpadlá",
    href: "/products?category=Tepeln%C3%A9%20%C4%8Derpadl%C3%A1",
    icon: ThermometerSun,
    image: "/images/aeb/service4.jpg",
    text: "Úsporné riešenia vykurovania a ohrevu vody pre rodinné domy aj firmy."
  }
];

export const products: Product[] = [
  {
    slug: "aux-c-smart-crystal",
    name: "AUX C-Smart Crystal",
    brand: "AUX",
    category: "Klimatizácie",
    short: "Tichá nástenná klimatizácia s Wi-Fi ovládaním a dobrým pomerom výkonu k cene.",
    image: "/images/products/aux-c-smart-white.webp",
    heroImage: "/images/cases/hero-living-room.webp",
    powerKw: 3.5,
    maxM2: 42,
    tags: ["Wi-Fi", "Do bytu", "Kúrenie", "Tichý režim"],
    badges: ["Najžiadanejšia", "A++", "R32"],
    variants: [
      { label: "2.6 kW", powerKw: 2.6, areaM2: "do 25 m2", installHint: "spálňa, detská izba, menšia kancelária" },
      { label: "3.5 kW", powerKw: 3.5, areaM2: "do 42 m2", installHint: "obývačka, obchod, otvorená kancelária" },
      { label: "5.3 kW", powerKw: 5.3, areaM2: "do 65 m2", installHint: "väčší priestor alebo členitejší byt" }
    ],
    specs: {
      "Chladenie": "2.6 - 5.3 kW",
      "Vykurovanie": "2.9 - 5.6 kW",
      "Hlučnosť": "od 19 dB",
      "Ovládanie": "Wi-Fi aplikácia",
      "Záruka": "podľa servisného režimu"
    },
    highlights: ["Rýchla dostupnosť", "Tichý nočný režim", "Dobrá voľba pre rozumný rozpočet"],
    useCases: ["Byty", "Menšie kancelárie", "Prenájmy"]
  },
  {
    slug: "toshiba-shorai-curve",
    name: "Toshiba Shorai Curve",
    brand: "Toshiba",
    category: "Klimatizácie",
    short: "Elegantná klíma pre domácnosti, kde záleží na tichu, účinnosti a čistom dizajne.",
    image: "/images/products/toshiba-shorai-curve.png",
    heroImage: "/images/aeb/hero1.jpg",
    powerKw: 3.5,
    maxM2: 45,
    tags: ["A++", "Filtrácia", "Tichý chod", "Dizajn"],
    badges: ["Premium", "R32", "Tichá"],
    variants: [
      { label: "2.5 kW", powerKw: 2.5, areaM2: "do 24 m2", installHint: "spálňa alebo pracovňa" },
      { label: "3.5 kW", powerKw: 3.5, areaM2: "do 45 m2", installHint: "denná zóna a obývacia izba" },
      { label: "5.0 kW", powerKw: 5, areaM2: "do 58 m2", installHint: "veľký otvorený priestor" }
    ],
    specs: {
      "Chladenie": "2.5 - 5.0 kW",
      "Energetika": "A++ / A+",
      "Hlučnosť": "od 19 dB",
      "Filter": "Ultra Pure filter",
      "Ovládanie": "voliteľné Wi-Fi"
    },
    highlights: ["Čistý oblý dizajn", "Vhodná do spální", "Stabilný výkon pri kúrení"],
    useCases: ["Rodinné domy", "Spálne", "Dizajnové interiéry"]
  },
  {
    slug: "samsung-premiere",
    name: "Samsung Première",
    brand: "Samsung",
    category: "Klimatizácie",
    short: "Moderná jednotka s inteligentnými režimami, filtráciou a dobrým vzduchovým komfortom.",
    image: "/images/products/samsung-premiere.png",
    heroImage: "/images/cases/office.webp",
    powerKw: 3.5,
    maxM2: 40,
    tags: ["Wi-Fi", "AI režim", "Filter", "SmartThings"],
    badges: ["Smart", "A++", "Novinka"],
    variants: [
      { label: "2.5 kW", powerKw: 2.5, areaM2: "do 25 m2", installHint: "spálňa, pracovňa" },
      { label: "3.5 kW", powerKw: 3.5, areaM2: "do 40 m2", installHint: "obývacia izba, menší showroom" },
      { label: "5.0 kW", powerKw: 5, areaM2: "do 55 m2", installHint: "väčšia denná miestnosť" }
    ],
    specs: {
      "Chladenie": "2.5 - 5.0 kW",
      "Ovládanie": "SmartThings",
      "Filter": "4-in-1 filtrácia",
      "Režimy": "AI Energy Mode",
      "Farba": "biela alebo tmavá podľa série"
    },
    highlights: ["Inteligentné režimy", "Silná filtrácia", "Vhodná do smart domácnosti"],
    useCases: ["Moderné byty", "Kancelárie", "Smart domácnosti"]
  },
  {
    slug: "daikin-perfera",
    name: "Daikin Perfera",
    brand: "Daikin",
    category: "Klimatizácie",
    short: "Overená prémiová voľba pre klientov, ktorí chcú vyšší komfort a účinnosť.",
    image: "/images/products/aux-c-smart-white.webp",
    heroImage: "/images/aeb/hero2.jpg",
    powerKw: 4.2,
    maxM2: 55,
    tags: ["Premium", "Kúrenie", "Wi-Fi", "Nízka spotreba"],
    badges: ["Top komfort", "A+++", "Bluevolution"],
    variants: [
      { label: "2.5 kW", powerKw: 2.5, areaM2: "do 26 m2", installHint: "spálňa alebo menší byt" },
      { label: "3.5 kW", powerKw: 3.5, areaM2: "do 43 m2", installHint: "denná zóna" },
      { label: "4.2 kW", powerKw: 4.2, areaM2: "do 55 m2", installHint: "väčší rodinný dom alebo kancelária" }
    ],
    specs: {
      "Chladenie": "2.5 - 4.2 kW",
      "Energetika": "až A+++",
      "Hlučnosť": "od 19 dB",
      "Ovládanie": "Wi-Fi podľa konfigurácie",
      "Servis": "ročná údržba odporúčaná"
    },
    highlights: ["Prémiová účinnosť", "Výborný tepelný komfort", "Dobrá voľba aj na prikurovanie"],
    useCases: ["Rodinné domy", "Byty", "Náročné interiéry"]
  },
  {
    slug: "mitsubishi-hr",
    name: "Mitsubishi MSZ-HR",
    brand: "Mitsubishi",
    category: "Klimatizácie",
    short: "Praktická spoľahlivá jednotka pre každodenné chladenie a nenápadnú montáž.",
    image: "/images/products/aux-c-smart-white.webp",
    heroImage: "/images/aeb/service1.jpg",
    powerKw: 3.5,
    maxM2: 38,
    tags: ["Spoľahlivá", "Kompaktná", "Do bytu", "Servis"],
    badges: ["Praktická", "A++", "R32"],
    variants: [
      { label: "2.5 kW", powerKw: 2.5, areaM2: "do 24 m2", installHint: "samostatná izba" },
      { label: "3.5 kW", powerKw: 3.5, areaM2: "do 38 m2", installHint: "bytová denná zóna" },
      { label: "5.0 kW", powerKw: 5, areaM2: "do 54 m2", installHint: "väčší priestor s vyššou záťažou" }
    ],
    specs: {
      "Chladenie": "2.5 - 5.0 kW",
      "Hlučnosť": "od 21 dB",
      "Chladivo": "R32",
      "Ovládanie": "IR ovládač, Wi-Fi voliteľné",
      "Montáž": "štandardná split inštalácia"
    },
    highlights: ["Kompaktné rozmery", "Jednoduchý servis", "Dobrý pomer ceny a životnosti"],
    useCases: ["Byty", "Menšie prevádzky", "Servisné výmeny"]
  },
  {
    slug: "toshiba-estia-r290",
    name: "Toshiba ESTIA Bi-Bloc R290",
    brand: "Toshiba",
    category: "Tepelné čerpadlá",
    short: "Vzduch-voda tepelné čerpadlo pre vykurovanie, chladenie a ohrev vody.",
    image: "/images/products/toshiba-estia.png",
    heroImage: "/images/cases/rd-house.webp",
    powerKw: 11,
    maxM2: 180,
    tags: ["R290", "A+++", "Vykurovanie", "Ohrev vody"],
    badges: ["Tepelné čerpadlo", "A+++", "R290"],
    variants: [
      { label: "8 kW", powerKw: 8, areaM2: "do 120 m2", installHint: "novostavba alebo zateplený dom" },
      { label: "11 kW", powerKw: 11, areaM2: "do 160 m2", installHint: "rodinný dom so štandardnou stratou" },
      { label: "14 kW", powerKw: 14, areaM2: "do 210 m2", installHint: "väčší dom alebo vyššia tepelná strata" }
    ],
    specs: {
      "Typ": "vzduch-voda",
      "Chladivo": "R290",
      "Výstupná voda": "až 70 °C",
      "Prevádzka": "vykurovanie, chladenie, TÚV",
      "Ovládanie": "dotykový displej, Wi-Fi podľa konfigurácie"
    },
    highlights: ["Ekologické chladivo R290", "Vhodné aj pre rekonštrukcie", "Komplexný návrh s hydraulikou"],
    useCases: ["Rodinné domy", "Rekonštrukcie", "Nízkoenergetické stavby"]
  }
];

export const references = [
  {
    title: "Nový výrobný závod SPINEA",
    place: "Haniska pri Prešove",
    type: "Priemysel",
    image: "/images/aeb/ref1.jpg",
    text: "Komplexné chladenie a klimatizácia výrobných a administratívnych priestorov."
  },
  {
    title: "Administratívna budova Telegrafia",
    place: "Košice",
    type: "Administratíva",
    image: "/images/aeb/ref2.jpg",
    text: "Návrh a realizácia komfortného chladenia pre kancelárske zóny."
  },
  {
    title: "Penzión Zlatý Hýľ",
    place: "Hýľov",
    type: "Hotely a wellness",
    image: "/images/aeb/ref3.jpg",
    text: "Klimatizácia izieb a prevádzkových častí s dôrazom na tichú prevádzku."
  },
  {
    title: "Zimný štadión Crow Aréna",
    place: "Košice",
    type: "Šport",
    image: "/images/aeb/ref4.jpg",
    text: "Technologické riešenia pre priestory so zvýšenými nárokmi na výkon."
  },
  {
    title: "Sklad liekov Medical Group",
    place: "Košice Šaca",
    type: "Obchod",
    image: "/images/aeb/ref5.jpg",
    text: "Chladenie a servis pre skladovanie citlivého sortimentu."
  },
  {
    title: "Vinárstvo Chateau Grand Bari",
    place: "Košice",
    type: "Reštaurácie",
    image: "/images/aeb/ref6.jpg",
    text: "Klimatizácia a chladenie prevádzkových priestorov pre gastro a víno."
  }
];

export const downloads = [
  {
    title: "Technický prehľad klimatizácií X-Klima",
    type: "PDF",
    category: "Klimatizácie",
    size: "0.1 MB",
    href: "/downloads/xklima-klimatizacie-technicky-list.pdf"
  },
  {
    title: "Servisný protokol klimatizácie",
    type: "PDF",
    category: "Servis",
    size: "0.1 MB",
    href: "/downloads/xklima-servisny-protokol.pdf"
  },
  {
    title: "Podklady pre obhliadku a dopyt",
    type: "PDF",
    category: "Dopyt",
    size: "0.1 MB",
    href: "/downloads/xklima-podklady-pre-dopyt.pdf"
  }
];

export const processSteps = [
  {
    title: "Obhliadka",
    text: "Pozrieme priestor, vedenie trás, kondenz, exteriérovú jednotku a reálnu tepelnú záťaž."
  },
  {
    title: "Návrh výkonu",
    text: "Vyberieme výkon podľa m2, orientácie, presklenia a používania miestnosti."
  },
  {
    title: "Dopytová ponuka",
    text: "Dostanete prehľadný návrh zariadenia, montáže a ďalšieho postupu."
  },
  {
    title: "Montáž a servis",
    text: "Po montáži nastavíme režimy, vysvetlíme ovládanie a odporučíme servisný interval."
  }
];

export const searchEntries = [
  ...navItems.map((item) => ({ title: item.label, href: item.href, type: "Stránka" })),
  ...products.map((product) => ({ title: product.name, href: `/products/${product.slug}`, type: product.category })),
  ...downloads.map((item) => ({ title: item.title, href: "/downloads", type: "Na stiahnutie" })),
  { title: "Cenová ponuka", href: "/calculator#quote-form", type: "Formulár" },
  { title: "Zavolajte nám", href: `tel:${cleanPhone}`, type: "Kontakt" }
];

export const footerColumns = [
  {
    title: "Produkty",
    links: [
      { label: "Klimatizácie", href: "/products" },
      { label: "Tepelné čerpadlá", href: "/products?category=Tepeln%C3%A9%20%C4%8Derpadl%C3%A1" },
      { label: "Porovnanie", href: "/products#compare" },
      { label: "Na stiahnutie", href: "/downloads" }
    ]
  },
  {
    title: "Služby",
    links: [
      { label: "Montáž", href: "/montaz-servis" },
      { label: "Servis", href: "/montaz-servis#servis" },
      { label: "Kalkulačka", href: "/calculator" },
      { label: "Referencie", href: "/references" }
    ]
  },
  {
    title: "Firma",
    links: [
      { label: "Kontakt", href: "/contact" },
      { label: "Kariéra", href: "/career" },
      { label: "Cenová ponuka", href: "/calculator#quote-form" }
    ]
  }
];

export const quickActions = [
  { label: "Zavolať", href: `tel:${cleanPhone}`, icon: Phone },
  { label: "Napísať", href: `mailto:${email}`, icon: Mail },
  { label: "Adresa", href: "/contact", icon: MapPin },
  { label: "Ponuka", href: "/calculator#quote-form", icon: Calculator }
];

export const pageLinks = [
  { title: "Domácnosti", text: "Byty, rodinné domy a rekreačné objekty.", icon: Home, href: "/products" },
  { title: "Firmy", text: "Kancelárie, sklady, gastro, výroba a servisné SLA.", icon: BriefcaseBusiness, href: "/references" },
  { title: "Servis", text: "Čistenie, revízie, diagnostika a havarijné výjazdy.", icon: LifeBuoy, href: "/montaz-servis" },
  { title: "Dokumenty", text: "Technické listy, servisné protokoly a podklady k dopytu.", icon: FileText, href: "/downloads" },
  { title: "Montáž", text: "Návrh trás, inštalácia a uvedenie do prevádzky.", icon: Wrench, href: "/montaz-servis" },
  { title: "PDF", text: "Materiály na stiahnutie pre klímy a servis.", icon: Download, href: "/downloads" }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);
}

export function uniqueBrands() {
  return Array.from(new Set(products.map((product) => product.brand))).sort();
}

export function uniqueCategories() {
  return Array.from(new Set(products.map((product) => product.category)));
}
