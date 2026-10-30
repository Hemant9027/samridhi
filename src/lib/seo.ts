import type { Metadata } from "next";
import { fullAddress, site, siteImages, siteUrl } from "@/lib/site";
import type { Product } from "@/lib/products";

const DEFAULT_OG = siteImages.hero;

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
  image?: string;
}): Metadata {
  const url = `${siteUrl()}${input.path}`;
  const image = input.image ?? DEFAULT_OG;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.indexable === false ? { index: false, follow: true } : undefined,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: image, width: 1600, height: 1000, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

/** Organization JSON-LD — only verified facts. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl(),
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.lines.join(", "),
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl(),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl()}${item.path}`,
    })),
  };
}

/**
 * Product JSON-LD — deliberately excludes offers, prices, ratings and reviews
 * until genuine, eligible data exists.
 */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    description: product.summary,
    image: [new URL(product.image, siteUrl()).toString()],
    category: product.category,
    brand: { "@type": "Brand", name: "Samridhi" },
    manufacturer: {
      "@type": "Organization",
      name: site.name,
      address: fullAddress(),
    },
  };
}
