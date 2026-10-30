import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-charcoal-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 text-charcoal-400" aria-hidden />
              ) : null}
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className="font-medium text-charcoal-800">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-forest-700 transition-colors underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
