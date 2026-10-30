import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Info, MapPin, ShieldCheck } from "lucide-react";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";
import { getProductBySlug } from "@/lib/products";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — enquiries & product questions",
  description:
    "Contact Samridhi Ayurved & Nutraceutical, Saharanpur (Uttar Pradesh) with product questions, availability requests or general enquiries through the secure form.",
  path: "/contact",
});

async function ContactFormWithParams({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const topic = typeof sp.topic === "string" ? sp.topic : undefined;
  const productSlug = typeof sp.product === "string" ? sp.product : undefined;
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  return (
    <ContactForm initialTopic={topic} initialProductName={product?.name} />
  );
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          <div className="mt-6">
            <SectionHeading
              eyebrow="Contact"
              title="Talk to the Samridhi team"
              lead="Questions about products, availability or partnerships — send an enquiry and it will be routed to the team."
            />
          </div>
        </div>
      </section>

      <section className="container-site py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Contact information panel */}
          <Reveal>
            <div className="space-y-5">
              <div className="card p-6">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                  <MapPin className="h-4 w-4" aria-hidden />
                  Registered address
                </h2>
                <address className="mt-3 text-[0.95rem] not-italic leading-relaxed text-charcoal-800">
                  {site.name}
                  <br />
                  {fullAddress()}
                </address>
              </div>

              <div className="card p-6">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  Reaching the team
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
                  Verified phone and e-mail details will be published here as soon as
                  the company confirms them. Until then, the enquiry form is the
                  official way to reach the team — genuine enquiries are reviewed and
                  answered.
                </p>
              </div>

              <div className="rounded-xl border border-forest-200 bg-forest-100/60 p-6">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  Trade &amp; wholesale
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
                  Distributors, stockists, retailers and wholesale buyers: please use
                  the{" "}
                  <Link
                    href="/distributor-enquiry"
                    className="font-semibold text-forest-700 underline underline-offset-2"
                  >
                    dedicated trade enquiry form
                  </Link>{" "}
                  so your request reaches the right person with the right details.
                </p>
              </div>

              <div className="rounded-xl border border-sand-300 bg-sand-100 p-6">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-clay-600">
                  <Info className="h-4 w-4" aria-hidden />
                  A note on medical questions
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
                  The team cannot provide medical advice, dosage recommendations for
                  individuals, or diagnosis. Please consult a registered medical
                  practitioner and always read the product label.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="card p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-950">
                Send an enquiry
              </h2>
              <p className="mt-1.5 text-sm text-charcoal-600">
                Fields marked <span aria-hidden className="text-clay-600">*</span> are required.
              </p>
              <div className="mt-6">
                <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-ivory-200" aria-busy="true" />}>
                  <ContactFormWithParams searchParams={searchParams} />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
