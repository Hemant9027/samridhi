import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { getPublishedProducts } from "@/lib/products";

export default function NotFound() {
  const suggestions = getPublishedProducts().slice(0, 3);
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700">
        <Compass className="h-7 w-7" aria-hidden />
      </span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-olive-600">
        Error 404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal-950 sm:text-5xl">
        This page has wandered off the path
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-600">
        The page you were looking for does not exist or may have moved. Here are
        some useful places to go instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/products" className="btn btn-outline">
          Browse products
        </Link>
      </div>
      {suggestions.length > 0 ? (
        <div className="mt-12 w-full max-w-xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-olive-600">
            Popular products
          </h2>
          <ul className="mt-4 divide-y divide-ivory-300 rounded-xl border border-ivory-300 bg-ivory-50">
            {suggestions.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex items-center justify-between px-5 py-3.5 text-left text-sm font-medium text-charcoal-800 transition-colors hover:bg-forest-100/50 hover:text-forest-800"
                >
                  {p.name}
                  <ArrowRight className="h-4 w-4 text-charcoal-400" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
