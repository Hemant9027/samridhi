import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/reveal";

export function LegalShell({
  title,
  updated,
  intro,
  path,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <section className="border-b border-ivory-300 bg-ivory-50">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title }]} />
          <Reveal className="mt-6 max-w-3xl">
            <h1 className="font-serif text-3xl font-semibold tracking-[-0.01em] text-charcoal-950 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">{intro}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-olive-600">
              {updated}
            </p>
          </Reveal>
        </div>
      </section>
      <section className="container-site py-12 sm:py-14">
        <div className="legal-body prose-measure">{children}</div>
      </section>
    </>
  );
}
