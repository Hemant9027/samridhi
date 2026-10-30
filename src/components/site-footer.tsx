import Link from "next/link";
import { MapPin } from "lucide-react";
import { fullAddress, site } from "@/lib/site";
import { getCategoryCounts } from "@/lib/products";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const categories = getCategoryCounts();

  return (
    <footer className="texture-dark text-ivory-100">
      <div className="container-site py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="ring-1 ring-forest-600" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold text-ivory-50">Samridhi</span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-forest-300">
                  Ayurved &amp; Nutraceutical
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-forest-200">
              Ayurvedic and nutraceutical products marketed from Saharanpur,
              Uttar Pradesh, under the registered Samridhi brand.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-forest-300/80">
              Trade mark № {site.trademark.number} · {site.trademark.classInfo} ·{" "}
              {site.trademark.status}
            </p>
          </div>

          <nav aria-label="Footer — company">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-forest-300">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["About us", "/about"],
                ["Products", "/products"],
                ["Quality", "/quality"],
                ["FAQ", "/faq"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-forest-200 transition-colors hover:text-ivory-50">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — products">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-forest-300">
              Products
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.category}>
                  <Link
                    href={`/products?category=${encodeURIComponent(c.category)}`}
                    className="text-forest-200 transition-colors hover:text-ivory-50"
                  >
                    {c.category}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/distributor-enquiry"
                  className="text-forest-200 transition-colors hover:text-ivory-50"
                >
                  Distributor enquiries
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-forest-300">
              Reach us
            </h2>
            <address className="mt-4 flex items-start gap-2.5 text-sm not-italic leading-relaxed text-forest-200">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest-300" aria-hidden />
              <span>{fullAddress()}</span>
            </address>
            <p className="mt-3 text-xs leading-relaxed text-forest-300/80">
              The quickest way to reach the team is the{" "}
              <Link href="/contact" className="underline underline-offset-2 hover:text-ivory-50">
                enquiry form
              </Link>
              . Verified phone and e-mail details will be published here once the
              company confirms them.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-forest-800 pt-6 text-xs text-forest-300/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-ivory-50">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ivory-50">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-ivory-50">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
