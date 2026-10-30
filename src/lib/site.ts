/**
 * Central site configuration.
 *
 * Verification notes
 * ──────────────────
 * • The postal address is corroborated by two independent public sources:
 *   the Trade Marks Registry record for mark № 4658771 (Class 5) and the
 *   marketer details printed on the 1mg product listings.
 * • No official phone number, e-mail address or business hours were found in
 *   any verifiable public source. They are intentionally omitted — the site
 *   routes enquiries through the on-site forms until the client supplies them.
 * • `phone`, `email` below stay `null` until the client verifies values.
 */

export const site = {
  name: "Samridhi Ayurved & Nutraceutical",
  shortName: "Samridhi",
  tagline: "Ayurvedic & nutraceutical wellness, rooted in tradition",
  description:
    "Samridhi Ayurved & Nutraceutical is a Saharanpur (Uttar Pradesh, India) based proprietorship marketing Ayurvedic proprietary products — herbal syrups, oils and granules — under the Samridhi brand.",
  legalStatus: "Sole proprietorship",
  proprietorNote:
    "Public trademark and trade-directory records list Ashish Rohella as proprietor of the firm.",
  address: {
    lines: ["3/7713, Sukhupura, Beri Bagh"],
    city: "Saharanpur",
    state: "Uttar Pradesh",
    postalCode: "247001",
    country: "India",
  },
  phone: null as string | null,
  email: null as string | null,
  businessHours: null as string | null,
  trademark: {
    number: "4658771",
    classInfo: "Class 5 — Ayurved & Nutraceutical Products",
    applicationDate: "16 September 2020",
    status: "Registered",
    sourceUrl: "https://www.quickcompany.in/trademarks/4658771-samridhi-ayurved-nutraceutical",
  },
  listings: {
    onemg: "https://www.1mg.com/marketer/samridhi-ayurved-and-nutraceutical-84751",
    indiamart: "https://www.indiamart.com/samridhi-ayurved/",
  },
} as const;

export const siteImages = {
  hero: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1600&q=85",
  botanicals: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85",
  quality: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=85",
  productSyrup: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85",
  productOil: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
  productHerbs: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85",
  productGranules: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=85",
} as const;

export function fullAddress(): string {
  const a = site.address;
  return `${a.lines.join(", ")}, ${a.city}, ${a.state} ${a.postalCode}, ${a.country}`;
}

/** Absolute canonical origin for metadata / sitemap. */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products", dropdown: true },
  { href: "/quality", label: "Quality" },
  { href: "/contact", label: "Contact" },
] as const;
