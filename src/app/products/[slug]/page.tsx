import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Info,
  Leaf,
  MessageSquareText,
  Package,
  Pill,
  ShieldAlert,
  Thermometer,
} from "lucide-react";
import {
  getProductBySlug,
  getPublishedProducts,
  getRelatedProducts,
  MARKETER_LINE,
  STANDARD_STORAGE_NOTE,
  STANDARD_USAGE_NOTE,
} from "@/lib/products";
import { pageMetadata, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/json-ld";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} — ${product.form} · Samridhi`,
    description: product.summary.slice(0, 155),
    path: `/products/${product.slug}`,
    image: product.image,
    indexable: product.indexable,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);
  const unverified = product.verificationStatus === "needs_review";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          ...(product.indexable ? [productJsonLd(product)] : []),
        ]}
      />

      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: product.name },
            ]}
          />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal className="relative">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.25rem] border border-ivory-300 bg-ivory-200 shadow-[var(--shadow-card)]">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-charcoal-500">
                Illustrative visual — the actual pack and label may differ.
              </p>
            </Reveal>

            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-forest-100 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-forest-800">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-sand-200 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-charcoal-700">
                    {product.form}
                  </span>
                  {unverified ? null : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-forest-800 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ivory-50">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                      Listing verified
                    </span>
                  )}
                </div>
                <h1 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.01em] text-charcoal-950 sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-3 text-lg text-charcoal-600">{product.tagline}.</p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-700">
                  {product.summary}
                </p>
              </Reveal>

              {unverified ? (
                <Reveal delay={0.08}>
                  <div className="mt-7 flex items-start gap-3.5 rounded-xl border border-sand-300 bg-sand-100 p-5">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" aria-hidden />
                    <div>
                      <h2 className="text-sm font-bold text-charcoal-900">
                        Product details under verification
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal-700">
                        Composition, pack sizes and label information for this product
                        are being confirmed with the company. Until then, please refer
                        to the physical product label or{" "}
                        <Link
                          href={`/contact?topic=product&product=${product.slug}`}
                          className="font-semibold text-forest-700 underline underline-offset-2"
                        >
                          request details from the team
                        </Link>
                        . Nothing on this page should be treated as a complete product
                        description.
                      </p>
                    </div>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.12}>
                <div className="mt-8 space-y-6">
                  {product.packSizes ? (
                    <div>
                      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                        <Package className="h-4 w-4" aria-hidden />
                        Available packs
                      </h2>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {product.packSizes.map((size) => (
                          <li
                            key={size}
                            className="rounded-lg border border-ivory-300 bg-ivory-50 px-3.5 py-2 text-sm font-medium text-charcoal-800"
                          >
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {product.ingredients ? (
                    <div>
                      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                        <Leaf className="h-4 w-4" aria-hidden />
                        Listed key ingredients
                      </h2>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {product.ingredients.map((ing) => (
                          <li
                            key={ing}
                            className="rounded-lg border border-forest-200 bg-forest-100/60 px-3.5 py-2 text-sm font-medium text-forest-800"
                          >
                            {ing}
                          </li>
                        ))}
                      </ul>
                      {product.ingredientsNote ? (
                        <p className="mt-2.5 text-xs leading-relaxed text-charcoal-500">
                          {product.ingredientsNote}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {product.listingNotes.length > 0 ? (
                    <ul className="space-y-1.5 text-sm text-charcoal-600">
                      {product.listingNotes.map((note) => (
                        <li key={note} className="flex items-start gap-2">
                          <span
                            aria-hidden
                            className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-olive-500"
                          />
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-ivory-300 bg-ivory-50 p-5">
                      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                        <Pill className="h-4 w-4" aria-hidden />
                        Directions for use
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-charcoal-700">
                        {STANDARD_USAGE_NOTE}
                      </p>
                    </div>
                    <div className="rounded-xl border border-ivory-300 bg-ivory-50 p-5">
                      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                        <Thermometer className="h-4 w-4" aria-hidden />
                        Storage
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-charcoal-700">
                        {STANDARD_STORAGE_NOTE}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-ivory-300 bg-ivory-50 p-5">
                    <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                      <ShieldAlert className="h-4 w-4" aria-hidden />
                      Marketer &amp; manufacturer
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-charcoal-700">
                      {MARKETER_LINE}
                    </p>
                    {product.manufacturerNote ? (
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                        {product.manufacturerNote}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                        The manufacturer named on the physical pack governs; check the
                        label of your pack for the current statement.
                      </p>
                    )}
                  </div>

                  {product.sources.length > 0 ? (
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                        Information sources
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {product.sources.map((s) => (
                          <li key={s.url}>
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 underline-offset-4 hover:underline"
                            >
                              {s.label}
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={`/contact?topic=product&product=${product.slug}`}
                      className="btn btn-primary"
                    >
                      <MessageSquareText className="h-4 w-4" aria-hidden />
                      Enquire about this product
                    </Link>
                    <Link href="/distributor-enquiry" className="btn btn-outline">
                      Trade enquiry
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="container-site py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2
              id="related-heading"
              className="font-serif text-2xl font-semibold text-charcoal-950 sm:text-3xl"
            >
              Related products
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800"
            >
              View all products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      ) : null}
    </>
  );
}
