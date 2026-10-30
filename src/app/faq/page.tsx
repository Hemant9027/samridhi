import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import {
  FaqSearchableAccordion,
  type FaqItem,
} from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — product, ordering & trade questions",
  description:
    "Frequently asked questions about Samridhi Ayurved & Nutraceutical products, availability, distributor enquiries and how to reach the company.",
  path: "/faq",
});

const faqGroups: { title: string; items: FaqItem[] }[] = [
  {
    title: "The product catalogue",
    items: [
      {
        question: "What products does Samridhi Ayurved & Nutraceutical market?",
        answer:
          "The public catalogue includes Ayurvedic proprietary syrups (Samortho Syrup, Hyperzyme Syrup, Samliv+ Z Syrup and Samdiaba) and a topical oil (Samortho Oil). The current range is listed on the Products page.",
      },
      {
        question: "How accurate is the product information on this website?",
        answer:
          "Only information corroborated by a cited public source is published, and each product page lists its sources. Products still being confirmed are clearly marked “under review” and carry no invented details.",
      },
      {
        question:
          "Where can I find ingredients, pack sizes and directions for use?",
        answer:
          "The physical product label and leaflet are the authoritative sources for composition, directions, dosage and warnings. This website shows listed key ingredients only where a cited public listing documents them.",
      },
      {
        question: "Are “Hyperzyme” and “Hyperzyme Syrup” different products?",
        answer:
          "No. Brand listings use both names for the same product; this catalogue lists it once as Hyperzyme Syrup.",
      },
      {
        question: "Are prices shown on this website?",
        answer:
          "No. Prices vary by pack, seller and time, so the company does not publish prices here. Availability and current MRP should be checked with your retailer or directly with the company.",
      },
    ],
  },
  {
    title: "Buying & availability",
    items: [
      {
        question: "Where are the products available?",
        answer:
          "Products have been listed on public platforms including the 1mg pharmacy marketplace and the IndiaMART trade directory, and are supplied through retail and wholesale channels. For current availability near you, send an enquiry.",
      },
      {
        question: "Is every listed product currently manufactured?",
        answer:
          "Listings on marketplaces do not guarantee that a product is currently in production. Items marked “under review” are being confirmed with the company — please enquire before relying on availability.",
      },
      {
        question: "Can I request details for a specific product?",
        answer:
          "Yes. Use the enquiry button on any product page — it pre-fills the contact form with that product so the team knows exactly what you are asking about.",
      },
    ],
  },
  {
    title: "Trade & distribution",
    items: [
      {
        question: "How do I become a distributor or stockist?",
        answer:
          "Submit the Distributor Enquiry form with your business name, location, business type and product interests. The team reviews genuine trade enquiries and responds directly.",
      },
      {
        question: "Are dealer margins or minimum order quantities published?",
        answer:
          "No. Commercial terms are discussed individually and are not published on this website. No figure on this site should be treated as a trade offer.",
      },
      {
        question: "Can I request product documentation for my trade file?",
        answer:
          "Yes — trade partners can request available label proofs and documentation through the distributor enquiry form.",
      },
    ],
  },
  {
    title: "Contacting the company",
    items: [
      {
        question: "Where is the company located?",
        answer: `${site.name} is based at ${site.address.lines.join(", ")}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}, India. This address is corroborated by the public trademark record and marketplace listings.`,
      },
      {
        question: "Is there a phone number or email I can use?",
        answer:
          "No phone number or e-mail address has been verified against public records yet, so none is published. The contact form is the official channel until the company confirms further details.",
      },
      {
        question: "How quickly will the team respond?",
        answer:
          "The team reviews incoming enquiries and responds to genuine requests. A specific response-time commitment will be published once the company confirms it.",
      },
    ],
  },
  {
    title: "Health & safety",
    items: [
      {
        question:
          "Can the website tell me which product is right for my condition?",
        answer:
          "No. This website provides general product information only and cannot advise on individual health conditions. Please consult a registered medical practitioner or qualified Ayurvedic physician.",
      },
      {
        question:
          "Are Ayurvedic products a replacement for prescribed treatment?",
        answer:
          "No. Information on this website is not medical advice and Ayurvedic products should not replace prescribed treatment without your physician's guidance. See the Disclaimer page for the full statement.",
      },
    ],
  },
];

export default function FaqPage() {
  const allItems = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
          <div className="mt-6">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              lead={`${allItems.length} factual answers about the catalogue, availability, trade enquiries and how to reach the company. Nothing here is medical advice.`}
            />
          </div>
        </div>
      </section>

      <section className="container-site py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqGroups.map((group) => (
            <Reveal key={group.title}>
              <h2 className="font-serif text-2xl font-semibold text-charcoal-950">
                {group.title}
              </h2>
              <div className="mt-5">
                <FaqSearchableAccordion
                  items={group.items}
                  searchable={false}
                />
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="card p-6 text-center sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-charcoal-950">
                Still have a question?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal-600">
                Search did not help? Send your question through the contact form
                and the team will respond.
              </p>
              <Link href="/contact" className="btn btn-primary btn-sm mt-5">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
