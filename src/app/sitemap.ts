import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getPublishedProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/products", priority: 0.9 },
    { path: "/quality", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/distributor-enquiry", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/disclaimer", priority: 0.4 },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.priority,
  }));

  // Only content-complete (indexable) products are advertised to crawlers.
  const productRoutes: MetadataRoute.Sitemap = getPublishedProducts()
    .filter((p) => p.indexable)
    .map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes];
}
