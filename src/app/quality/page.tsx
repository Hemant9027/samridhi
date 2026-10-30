import Image from "next/image";
import type { Metadata } from "next";
import {
  ClipboardCheck,
  FileText,
  FlaskConical,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site, siteImages } from "@/lib/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = pageMetadata({
  title: "Quality & Manufacturing — our approach",
  description:
    "How Samridhi Ayurved & Nutraceutical approaches quality: registered branding, label-led transparency, source-cited product data and manufacturing arrangements governed by product labels.",
  path: "/quality",
});

export default function QualityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Quality", path: "/quality" },
        ])}
      />

      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Quality" }]}
          />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionHeading
              eyebrow="Quality & manufacturing"
              title="Fewer claims. More proof."
              lead="Quality pages often trade in vague badges and borrowed certificates. This one does not: it states only what is documented today, and marks unfinished areas honestly."
            />
            <Reveal delay={0.1} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-ivory-300 shadow-[var(--shadow-card)]">
                <Image
                  src={siteImages.quality}
                  alt="Illustrative Unsplash photograph of wellness products; not company premises"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-charcoal-500">
                Illustrative visual — not a photograph of company premises.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-site py-14 sm:py-18">
        <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Registered brand accountability",
              text: `The Samridhi mark (№ ${site.trademark.number}, Class 5) is registered for Ayurvedic and nutraceutical products, tying every pack to a single accountable brand owner.`,
            },
            {
              icon: FileText,
              title: "Label-led disclosure",
              text: "As required for Ayurvedic products marketed in India, packs carry statutorily required particulars — composition, batch number, manufacturing and expiry dates, MRP and marketer details. This website defers to the label in every case.",
            },
            {
              icon: ClipboardCheck,
              title: "Source-cited information",
              text: "Ingredients and pack sizes shown on this website are reproduced only where a public listing documents them, and each product page links to that listing for independent checking.",
            },
            {
              icon: FlaskConical,
              title: "Classical Ayurvedic formulations",
              text: "The Samortho Syrup listing includes ingredients such as Maharashnadi Kwath, giloy, trikatu, ajwain and mulethi.",
            },
            {
              icon: Handshake,
              title: "Manufacturing arrangements",
              text: "Samridhi Ayurved & Nutraceutical is recorded publicly as the marketer of the range; public listings identify manufacturers on individual product labels. This site does not claim company-owned manufacturing premises.",
            },
            {
              icon: ShieldCheck,
              title: "No borrowed credibility",
              text: "You will not find unverified certification logos, licence numbers or endorsements here. When the client confirms GMP certifications, licences or test reports, they will be published on this page.",
            },
          ].map((f) => (
            <StaggerItem key={f.title}>
              <div className="card h-full p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-serif text-xl font-semibold leading-snug text-charcoal-950">
                  {f.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  {f.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12">
          <div className="rounded-xl border border-sand-300 bg-sand-100 p-6 sm:p-7">
            <h2 className="font-serif text-lg font-semibold text-charcoal-950">
              Awaiting client confirmation
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-charcoal-700">
              The following will be added here once documentary proof is
              supplied and reviewed — never before: manufacturing licences, GMP
              / ISO certificates, in-house or third-party testing protocols, and
              quality personnel details. Trade partners who require these
              documents today can request them through the distributor enquiry
              form.
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Need quality documentation for your trade file?"
        lead="Distributors and stockists can request available licences, label proofs and product documentation through the trade enquiry form."
      />
    </>
  );
}
