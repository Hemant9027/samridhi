import type { Metadata } from "next";
import { Building2, FileText, PackageCheck } from "lucide-react";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getPublishedProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { DistributorEnquiryForm } from "@/components/distributor-form";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Distributor & Wholesale Enquiries — partner with Samridhi",
  description:
    "Retailers, distributors, stockists and wholesale buyers: register your interest in the Samridhi Ayurved & Nutraceutical range through the trade enquiry form.",
  path: "/distributor-enquiry",
});

export default function DistributorEnquiryPage() {
  const productNames = getPublishedProducts().map((p) => p.name);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Distributor Enquiries", path: "/distributor-enquiry" },
        ])}
      />

      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Distributor Enquiries" }]}
          />
          <div className="mt-6">
            <SectionHeading
              eyebrow="Trade & wholesale"
              title="Stock the Samridhi range"
              lead="The company already supplies through retail, wholesale and online pharmacy channels. If you would like to discuss stocking the range, introduce your business below."
            />
          </div>
        </div>
      </section>

      <section className="container-site py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <div className="space-y-5">
              <StaggerGroup className="space-y-4">
                {[
                  {
                    icon: Building2,
                    title: "Who this is for",
                    text: "Distributors, stockists, retail pharmacies, Ayurvedic clinics, wholesale buyers and online sellers interested in the range.",
                  },
                  {
                    icon: PackageCheck,
                    title: "What you can request",
                    text: "Current availability, pack configurations, product documentation and trade terms — directly from the company.",
                  },
                  {
                    icon: FileText,
                    title: "What happens next",
                    text: "Your enquiry is recorded with your business details and product interests, then reviewed by the team. Genuine trade enquiries receive a response on the contact details you provide.",
                  },
                ].map((f) => (
                  <StaggerItem key={f.title}>
                    <div className="card p-6">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                        <f.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h2 className="mt-3.5 font-serif text-lg font-semibold text-charcoal-950">
                        {f.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal-600">{f.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <p className="rounded-xl border border-sand-300 bg-sand-100 p-5 text-sm leading-relaxed text-charcoal-700">
                Margins, minimum order quantities and territory arrangements are
                commercial matters discussed case-by-case — they are not published
                here and no figure quoted anywhere on this site should be treated as
                an offer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal-950">
                Trade enquiry form
              </h2>
              <p className="mt-1.5 text-sm text-charcoal-600">
                Fields marked <span aria-hidden className="text-clay-600">*</span> are required.
              </p>
              <div className="mt-6">
                <DistributorEnquiryForm products={productNames} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
