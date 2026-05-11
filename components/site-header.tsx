import Link from "next/link";
import type { Route } from "next";

import { Calculator } from "lucide-react";

import { SiteSearch } from "@/components/search/site-search";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/asphalt-driveway-cost-calculator", label: "Driveway cost" },
  { href: "/asphalt-tonnage-calculator", label: "Tonnage" },
  { href: "/asphalt-vs-concrete-driveway-cost-calculator", label: "Asphalt vs concrete" },
  { href: "/asphalt-cost-guide", label: "Cost guide" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 text-zinc-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-950 text-white shadow-sm">
            <Calculator className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{siteConfig.name}</span>
            <span className="block text-xs text-zinc-500">Driveways, overlays, and small paving jobs</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as Route} className="transition-colors hover:text-zinc-950">
              {item.label}
            </Link>
          ))}
          <SiteSearch />
          <Link
            href="/#calculator"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Get estimate
          </Link>
        </nav>
      </div>
    </header>
  );
}
