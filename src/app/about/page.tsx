import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { fullAddress, site, siteImages } from "@/lib/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = pageMetadata({
  title: "About Us — the company behind the Samridhi brand",
  description:
    "Samridhi Ayurved & Nutraceutical is a sole proprietorship in Saharanpur, Uttar Pradesh, marketing Ayurvedic proprietary syrups, oils and granules under the registered Samridhi trademark.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "About Us" }]}
          />
          <div className="mt-6">
            <SectionHeading
              eyebrow="About us"
              title="Rooted in Ayurveda, built on verifiable facts"
              lead="Everything stated on this page can be checked against the public records cited at the bottom."
            />
          </div>
        </div>
      </section>

      <section className="container-site py-14 sm:py-18">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-950 sm:text-3xl">
              The company
            </h2>
            <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-charcoal-700">
              <p>
                {site.name} is a {site.legalStatus.toLowerCase()} based in
                Saharanpur, Uttar Pradesh, India. The firm markets Ayurvedic
                proprietary products and nutraceutical preparations under the{" "}
                <strong className="font-semibold text-charcoal-900">
                  Samridhi
                </strong>{" "}
                brand — a word drawn from Sanskrit that speaks of prosperity and
                well-being.
              </p>
              <p>
                The product range spans familiar, everyday formats — herbal
                syrups, topical oils and granules — distributed through retail,
                wholesale and online pharmacy channels. The firm&rsquo;s
                products appear on public platforms such as the 1mg pharmacy
                marketplace and the IndiaMART trade directory.
              </p>
              <p>
                {" "}
                {site.proprietorNote} The brand name is the subject of trade
                mark application № {site.trademark.number} (
                {site.trademark.classInfo}), filed on{" "}
                {site.trademark.applicationDate} and now recorded as{" "}
                {site.trademark.status.toLowerCase()} with the Trade Marks
                Registry.
              </p>
            </div>

            <dl className="mt-9 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: MapPin,
                  term: "Location",
                  detail: fullAddress(),
                },
                {
                  icon: Building2,
                  term: "Legal status",
                  detail: "Sole proprietorship (per public trade records)",
                },
                {
                  icon: BadgeCheck,
                  term: "Trade mark",
                  detail: `№ ${site.trademark.number} · Class 5 · ${site.trademark.status}`,
                },
                {
                  icon: ArrowRight,
                  term: "Focus",
                  detail: "Ayurvedic proprietary products & nutraceuticals",
                },
              ].map((f) => (
                <div key={f.term} className="card p-5">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive-600">
                    <f.icon className="h-4 w-4" aria-hidden />
                    {f.term}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-charcoal-800">
                    {f.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.25rem] border border-ivory-300 shadow-[var(--shadow-card)]">
              <Image
                src={siteImages.botanicals}
                alt="Illustrative Unsplash photograph of green botanicals"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-charcoal-500">
              Illustrative botanical imagery.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product focus */}
      <section
        aria-labelledby="focus-heading"
        className="border-y border-ivory-300 bg-ivory-50"
      >
        <div className="container-site py-14 sm:py-18">
          <SectionHeading
            eyebrow="What the company markets"
            title="An Ayurvedic & nutraceutical focus"
            lead="The registered Class 5 trademark covers Ayurvedic and nutraceutical products. The current public catalogue spans syrup and oil formats."
          />
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              {
                title: "Ayurvedic syrups",
                text: "Liquid proprietary formulations such as Samortho Syrup, Hyperzyme Syrup, Samliv+ Z Syrup and Samdiaba.",
              },
              {
                title: "Ayurvedic oils",
                text: "Topical preparations such as Samortho Oil, the oil companion in the Samortho range.",
              },
            ].map((f) => (
              <StaggerItem key={f.title}>
                <div className="card h-full p-6">
                  <h3 className="font-serif text-xl font-semibold text-charcoal-950">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {f.text}
                  </p>
                  <Link
                    href="/products"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800"
                  >
                    Browse products
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Sources / verification */}
      <section
        aria-labelledby="sources-heading"
        className="container-site py-14 sm:py-18"
      >
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Transparency"
            title="Sources for the facts on this page"
            lead="This company profile avoids unverifiable claims of history, scale or certification. The statements above are drawn from the following public records:"
          />
          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-3">
              {[
                {
                  label: `Trade Marks Registry record — mark № ${site.trademark.number} (Class 5), proprietor and address`,
                  url: site.trademark.sourceUrl,
                },
                {
                  label:
                    "1mg marketer page — Samridhi Ayurved and Nutraceutical product listings and marketer address",
                  url: site.listings.onemg,
                },
                {
                  label:
                    "IndiaMART supplier profile — business nature (wholesale/retail), proprietorship status and product listings",
                  url: site.listings.indiamart,
                },
              ].map((s) => (
                <li key={s.url} className="card flex items-start gap-3 p-4">
                  <ExternalLink
                    className="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                    aria-hidden
                  />
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-charcoal-800 underline-offset-4 hover:text-forest-700 hover:underline"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-sand-300 bg-sand-100 p-4 text-sm leading-relaxed text-charcoal-700">
              Details still awaiting client confirmation — founding year, team
              size, manufacturing arrangements, licences and certifications —
              are deliberately omitted from this website until the company
              verifies them. Nothing here should be taken to imply such claims.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
