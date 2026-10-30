import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock3 } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const verified = product.verificationStatus === "listing_verified";
  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-200">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ivory-50/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-forest-800 backdrop-blur-sm">
          {product.form}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-olive-600">
          <span>{product.category}</span>
          <span aria-hidden className="text-charcoal-400">·</span>
          {verified ? (
            <span className="inline-flex items-center gap-1 text-forest-600">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              Listing verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-charcoal-500">
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              Under review
            </span>
          )}
        </div>
        <h3 className="mt-2.5 font-serif text-xl font-semibold text-charcoal-950 transition-colors group-hover:text-forest-800">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-charcoal-600">
          {product.tagline}.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700">
          View details
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
