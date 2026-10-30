import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getPublishedProducts } from "@/lib/products";
import { ProductExplorer } from "@/components/product-explorer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = pageMetadata({
  title: "Products — Ayurvedic syrups, oils & granules",
  description:
    "Browse the Samridhi catalogue of Ayurvedic proprietary products — herbal syrups, oils and granules — with source-verified product information.",
  path: "/products",
});

function ExplorerFallback() {
  return (
    <div aria-busy="true" aria-label="Loading product catalogue">
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <div className="hidden lg:block">
          <div className="h-72 animate-pulse rounded-xl border border-ivory-300 bg-ivory-200/70" />
        </div>
        <div>
          <div className="h-11 animate-pulse rounded-lg border border-ivory-300 bg-ivory-200/70" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl border border-ivory-300 bg-ivory-200/70"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const published = getPublishedProducts();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-12">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Products" }]} />
          <div className="mt-6">
            <SectionHeading
              eyebrow="Catalogue"
              title="The Samridhi product range"
              lead="Every record below is tied to the company's public catalogue. Items still being confirmed with the company are marked “under review” and never carry invented details."
            />
          </div>
        </div>
      </section>

      <section className="container-site py-12 sm:py-14">
        {published.length === 0 ? (
          <div className="card mx-auto max-w-lg px-8 py-14 text-center">
            <h2 className="font-serif text-xl font-semibold text-charcoal-950">
              The catalogue is being updated
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              Product records are currently being verified with the company. Please
              check back soon or contact us for the current range.
            </p>
          </div>
        ) : (
          <Suspense fallback={<ExplorerFallback />}>
            <ProductExplorer products={published} />
          </Suspense>
        )}
      </section>

      <CTASection
        title="Need the full trade catalogue?"
        lead="Retailers, stockists and distributors can request current availability, pack configurations and trade terms directly from the company."
      />
    </>
  );
}
