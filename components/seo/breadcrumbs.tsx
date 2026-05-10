import type { Route } from "next";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({
  items,
  className
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className ? `text-sm text-zinc-500 ${className}` : "text-sm text-zinc-500"}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" /> : null}
              {isLast ? (
                <span className="font-medium text-zinc-950" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href as Route} className="transition-colors hover:text-zinc-950">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
