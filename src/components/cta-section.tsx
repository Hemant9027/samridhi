import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function CTASection({
  title = "Partner with Samridhi",
  lead = "Retailers, distributors, stockists and wholesale buyers — tell us about your business and the products you are interested in, and the team will get back to you.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="texture-dark">
      <div className="container-site py-16 sm:py-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-olive-300!">
              <Handshake className="h-4 w-4" aria-hidden />
              Trade &amp; distribution
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] text-ivory-50 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-forest-200 sm:text-lg">{lead}</p>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/distributor-enquiry" className="btn bg-ivory-50 text-forest-900 hover:bg-ivory-200">
              Distributor enquiry
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Contact us
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
