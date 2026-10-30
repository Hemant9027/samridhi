import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Leaf,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { CTASection } from "@/components/cta-section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import {
  FaqSearchableAccordion,
  type FaqItem,
} from "@/components/faq-accordion";
import { getCategoryCounts, getPublishedProducts } from "@/lib/products";
import { site, siteImages } from "@/lib/site";

const homeFaqs: FaqItem[] = [
  {
    question: "What products does Samridhi Ayurved & Nutraceutical offer?",
    answer:
      "The public catalogue includes Ayurvedic proprietary products in syrup and oil formats — including Samortho Syrup, Hyperzyme Syrup, Samliv+ Z Syrup, Samdiaba and Samortho Oil. The current range appears on the Products page.",
  },
  {
    question: "Where can I find usage directions for a product?",
    answer:
      "Directions for use, dosage and warnings are printed on each product's physical label and leaflet. Always read the label before use, and consult a registered medical practitioner for advice suited to you.",
  },
  {
    question: "How can retailers or distributors work with the company?",
    answer:
      "Use the dedicated Distributor Enquiry form to share your business details, location and product interests. The team will respond to genuine trade enquiries.",
  },
  {
    question: "Is the information on this website medical advice?",
    answer:
      "No. This website provides general product information only. It is not a substitute for professional medical advice, diagnosis or treatment. Please read the Disclaimer for details.",
  },
];

export default function HomePage() {
  const published = getPublishedProducts();
  const featured = published
    .filter((p) => p.verificationStatus === "listing_verified")
    .slice(0, 3);
  const categories = getCategoryCounts();

  return (
    <>
      <HeroSection />

      {/* Category navigation */}
      <section
        aria-labelledby="categories-heading"
        className="border-y border-ivory-300 bg-ivory-50"
      >
        <div className="container-site py-14 sm:py-16">
          <SectionHeading
            eyebrow="The range"
            title="Browse by product category"
            lead="Every category below is drawn from the company's current public catalogue."
          />
          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-3">
            {categories.map((c) => (
              <StaggerItem key={c.category}>
                <Link
                  href={`/products?category=${encodeURIComponent(c.category)}`}
                  className="card group flex items-center justify-between gap-4 p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span>
                    <span className="font-serif text-lg font-semibold text-charcoal-950 transition-colors group-hover:text-forest-800">
                      {c.category}
                    </span>
                    <span className="mt-1 block text-sm text-charcoal-500">
                      {c.count} product{c.count === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 text-forest-700 transition-colors group-hover:border-forest-700 group-hover:bg-forest-800 group-hover:text-ivory-50">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Featured products */}
      <section
        aria-labelledby="featured-heading"
        className="container-site py-16 sm:py-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured"
            title="From the product shelf"
            lead="Records marked “listing verified” are corroborated by the public sources cited on each product page."
          />
          <Reveal delay={0.1}>
            <Link href="/products" className="btn btn-outline btn-sm">
              View all products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.slug}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Brand introduction */}
      <section aria-labelledby="brand-heading" className="texture-dark">
        <div className="container-site grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-forest-800">
              <Image
                src={siteImages.botanicals}
                alt="Illustrative Unsplash photograph of green botanicals"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="About the brand"
              title="A Samridhi promise: honest products, clearly labelled"
              lead="“Samridhi” comes from Sanskrit and speaks of prosperity and abundance. Samridhi Ayurved & Nutraceutical is a sole proprietorship based in Saharanpur, Uttar Pradesh, marketing Ayurvedic proprietary formulations in syrup, oil and granule formats."
            >
              <ul className="mt-7 space-y-4 text-left">
                {[
                  {
                    icon: BadgeCheck,
                    text: `The Samridhi mark is registered with the Trade Marks Registry (№ ${site.trademark.number}, Class 5 — Ayurved & nutraceutical products).`,
                  },
                  {
                    icon: PackageCheck,
                    text: "The range is listed on public pharmacy and trade platforms including 1mg and IndiaMART.",
                  },
                  {
                    icon: ClipboardList,
                    text: "Every published product record on this site cites the public source it was verified against.",
                  },
                ].map((f) => (
                  <li key={f.text} className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-800 text-forest-300">
                      <f.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-forest-200">
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Link href="/about" className="btn btn-ghost-light">
                  More about the company
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </SectionHeading>
          </div>
        </div>
      </section>

      {/* Quality pointers */}
      <section
        aria-labelledby="quality-heading"
        className="container-site py-16 sm:py-20"
      >
        <SectionHeading
          align="center"
          eyebrow="Quality first"
          title="Transparency you can check"
          lead="Rather than unverifiable badges, the company publishes what can be checked — registrations, sources and label information."
        />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Registered brand",
              text: `Trade mark № ${site.trademark.number} (Class 5) is registered for Ayurvedic and nutraceutical products, per the public Trade Marks Registry record.`,
            },
            {
              icon: ClipboardList,
              title: "Label-led information",
              text: "Composition, pack size, batch and usage directions are governed by the physical product label — this website never overrides it.",
            },
            {
              icon: Leaf,
              title: "Cited product data",
              text: "Ingredient and pack information shown here links back to public listings, so buyers can verify it independently.",
            },
          ].map((f) => (
            <StaggerItem key={f.title}>
              <div className="card h-full p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-charcoal-950">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  {f.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-10 text-center">
          <Link href="/quality" className="btn btn-outline btn-sm">
            Read the quality approach
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* Enquiry band */}
      <section
        aria-labelledby="enquiry-heading"
        className="border-y border-ivory-300 bg-ivory-50"
      >
        <div className="container-site grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2
              id="enquiry-heading"
              className="font-serif text-3xl font-semibold leading-tight text-charcoal-950 sm:text-4xl"
            >
              Looking to stock the range, or have a product question?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal-600">
              Customers, retailers, stockists and wholesale buyers are welcome.
              Send an enquiry and the team will respond with the information you
              need.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="flex flex-col gap-3 sm:flex-row lg:justify-end"
          >
            <Link href="/contact" className="btn btn-primary">
              <MessageSquareText className="h-4 w-4" aria-hidden />
              Send an enquiry
            </Link>
            <Link href="/distributor-enquiry" className="btn btn-outline">
              Become a distributor
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ preview */}
      <section
        aria-labelledby="faq-heading"
        className="container-site py-16 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            lead="Straight, factual answers — no health claims. For anything personal or medical, please consult a qualified practitioner."
          >
            <div className="mt-6">
              <Link href="/faq" className="btn btn-outline btn-sm">
                All FAQs
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </SectionHeading>
          <Reveal delay={0.1}>
            <FaqSearchableAccordion items={homeFaqs} searchable={false} />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
