import { siteImages } from "@/lib/site";

/**
 * Single structured source of truth for the product catalogue.
 *
 * Editorial rules
 * ───────────────
 * 1. Only information confirmed by a cited public source is published.
 *    Every record carries `sources` so a reviewer can audit each claim.
 * 2. `verificationStatus`:
 *      • "listing_verified" — product name and at least one attribute were
 *        confirmed on a cited public listing (1mg / IndiaMART).
 *      • "needs_review"     — name appears in brand listings shared for review,
 *        but no public attribute data could be confirmed. These records render
 *        with an explicit under-verification notice and are excluded from the
 *        sitemap and search indexing.
 * 3. No prices are shown (marketplace prices go stale), no dosage directions
 *    are republished from marketplace copy (only the physical label is
 *    authoritative), and no therapeutic claims are invented.
 * 4. To add / edit / unpublish: change the record below and redeploy. The
 *    `products` table in src/db/schema.ts mirrors this shape for a future
 *    admin dashboard migration.
 */

export type ProductCategory =
  | "Ayurvedic Syrups"
  | "Ayurvedic Oils"
  | "Granules & Powders";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Ayurvedic Syrups",
  "Ayurvedic Oils",
  "Granules & Powders",
];

export type VerificationStatus = "listing_verified" | "needs_review";

export interface ProductSource {
  label: string;
  url: string;
}

export interface Product {
  name: string;
  slug: string;
  brand: "Samridhi";
  category: ProductCategory;
  /** Dosage / physical form, e.g. "Syrup". */
  form: string;
  /** One-line factual descriptor (no claims). */
  tagline: string;
  /** Factual paragraph; claims only with attribution. */
  summary: string;
  /** Verified pack sizes, or null when unconfirmed. */
  packSizes: string[] | null;
  /** Verified ingredients with the note of where they were listed. */
  ingredients: string[] | null;
  ingredientsNote: string | null;
  /** Extra verified facts worth listing (e.g. alternate forms). */
  listingNotes: string[];
  manufacturerNote: string | null;
  image: string;
  imageAlt: string;
  sources: ProductSource[];
  verificationStatus: VerificationStatus;
  published: boolean;
  /** Only content-complete products are indexed. */
  indexable: boolean;
}

const MARKETER_LINE =
  "Marketed by Samridhi Ayurved & Nutraceutical, 3/7713, Sukhupura, Beri Bagh, Saharanpur, Uttar Pradesh 247001, India.";

export const STANDARD_USAGE_NOTE =
  "Directions for use, dosage and warnings are printed on the product label and leaflet. Always read the label carefully before use and consult a registered medical practitioner for guidance suited to you.";

export const STANDARD_STORAGE_NOTE =
  "Store in a cool, dry place away from direct sunlight and keep out of the reach of children — as directed on the pack.";

export const products: Product[] = [
  {
    name: "Samortho Syrup",
    slug: "samortho-syrup",
    brand: "Samridhi",
    category: "Ayurvedic Syrups",
    form: "Syrup",
    tagline: "Ayurvedic proprietary syrup from the Samortho range",
    summary:
      "Samortho Syrup is an Ayurvedic proprietary formulation marketed by Samridhi Ayurved & Nutraceutical. It is listed on the 1mg pharmacy marketplace in the bone-and-joint care segment in 200 ml and 450 ml packs.",
    packSizes: ["200 ml bottle", "450 ml bottle"],
    ingredients: ["Maharashnadi Kwath", "Giloy", "Trikatu", "Ajwain", "Mulethi"],
    ingredientsNote:
      "Key ingredients as published on the 1mg product listing for Samortho Syrup.",
    listingNotes: [
      "A matching tablet form (“Samortho Syrup & Tablet”) appears in the company’s IndiaMART wholesale catalogue.",
    ],
    manufacturerNote:
      "The 1mg listing records the manufacturer as “Samridhi Ayurved & Nutraceuticals, Sonepat (Haryana)”; the IndiaMART wholesale listing records “RSK”. Label details govern.",
    image: "/images/products/samortho-syrup.webp",
    imageAlt: "Samridhi Samortho Syrup bottle",
    sources: [
      {
        label: "1mg — Samridhi Samortho Syrup (200 ml)",
        url: "https://www.1mg.com/otc/samridhi-samortho-syrup-otc760183",
      },
      {
        label: "1mg — Samridhi Samortho Syrup (450 ml)",
        url: "https://www.1mg.com/otc/samridhi-samortho-syrup-otc760184",
      },
      {
        label: "IndiaMART — Samortho Syrup & Tablet",
        url: "https://www.indiamart.com/samridhi-ayurved/other-products.html",
      },
    ],
    verificationStatus: "listing_verified",
    published: true,
    indexable: true,
  },
  {
    name: "Samortho Oil",
    slug: "samortho-oil",
    brand: "Samridhi",
    category: "Ayurvedic Oils",
    form: "Oil",
    tagline: "Topical oil from the Samortho range",
    summary:
      "Samortho Oil belongs to the Samortho range associated with the Samridhi brand in public product listings. Its pack sizes and composition are currently being confirmed with the company.",
    packSizes: null,
    ingredients: null,
    ingredientsNote: null,
    listingNotes: [],
    manufacturerNote: null,
    image: "/images/products/samortho-oil.webp",
    imageAlt: "Samridhi Samortho Oil bottle",
    sources: [],
    verificationStatus: "needs_review",
    published: true,
    indexable: false,
  },
  {
    name: "Samliv+ Z Syrup",
    slug: "samliv-z-syrup",
    brand: "Samridhi",
    category: "Ayurvedic Syrups",
    form: "Syrup",
    tagline: "Ayurvedic proprietary syrup under the Samridhi brand",
    summary:
      "Samliv+ Z Syrup is marketed under the Samridhi brand and appears in the brand’s public product listings. Detailed composition and pack information are being confirmed with the company.",
    packSizes: null,
    ingredients: null,
    ingredientsNote: null,
    listingNotes: [],
    manufacturerNote: null,
    image: "/images/products/samliv-z.webp",
    imageAlt: "Samridhi Samliv+ Z Syrup bottle",
    sources: [],
    verificationStatus: "needs_review",
    published: true,
    indexable: false,
  },
  {
    name: "Hyperzyme Syrup",
    slug: "hyperzyme-syrup",
    brand: "Samridhi",
    category: "Ayurvedic Syrups",
    form: "Syrup",
    tagline: "Ayurvedic proprietary syrup in a 200 ml pack",
    summary:
      "Hyperzyme Syrup is an Ayurvedic proprietary formulation marketed under the Samridhi brand. It has been listed on the 1mg marketplace in a 200 ml bottle, where the marketplace catalogued it under Ayurvedic liver care. “Hyperzyme” and “Hyperzyme Syrup” seen in brand listings refer to the same product.",
    packSizes: ["200 ml bottle"],
    ingredients: null,
    ingredientsNote: null,
    listingNotes: [],
    manufacturerNote: null,
    image: "/images/products/hyperzyme-syrup.webp",
    imageAlt: "Samridhi Hyperzyme Syrup box and bottle",
    sources: [
      {
        label: "1mg — Ayurveda category listing including Samridhi Hyperzyme Syrup",
        url: "https://www.1mg.com/categories/ayurveda/liver-care-53?filter=true&pageNumber=24",
      },
    ],
    verificationStatus: "listing_verified",
    published: true,
    indexable: true,
  },
  {
    name: "Samdiaba",
    slug: "samdiaba",
    brand: "Samridhi",
    category: "Ayurvedic Syrups",
    form: "Syrup",
    tagline: "Ayurvedic proprietary preparation under the Samridhi brand",
    summary:
      "Samdiaba appears in the brand listings associated with Samridhi Ayurved & Nutraceutical. Its format, composition and pack sizes are currently being confirmed with the company.",
    packSizes: null,
    ingredients: null,
    ingredientsNote: null,
    listingNotes: [],
    manufacturerNote: null,
    image: "/images/products/samdiaba.webp",
    imageAlt: "Samridhi Samdiaba container",
    sources: [],
    verificationStatus: "needs_review",
    published: true,
    indexable: false,
  },
];

/* ── Helpers ───────────────────────────────────────────────────────── */

export function getPublishedProducts(): Product[] {
  return products.filter((p) => p.published);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.published && p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  const sameCategory = getPublishedProducts().filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = getPublishedProducts().filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function getCategoryCounts(): { category: ProductCategory; count: number }[] {
  const published = getPublishedProducts();
  return PRODUCT_CATEGORIES.map((category) => ({
    category,
    count: published.filter((p) => p.category === category).length,
  })).filter((c) => c.count > 0);
}

export { MARKETER_LINE };
