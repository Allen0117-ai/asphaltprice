import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";

import { SiteSearch } from "@/components/search/site-search";
import { siteConfig } from "@/lib/site";

const primaryNavItems = [
  { href: "/#calculator", label: "Calculator" },
  { href: "/asphalt-driveway-cost-calculator", label: "Driveway cost" },
  { href: "/asphalt-tonnage-calculator", label: "Tonnage" },
  { href: "/asphalt-prices-by-state", label: "State pricing" },
  { href: "/how-much-asphalt-do-i-need", label: "How much asphalt" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6 lg:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-zinc-950">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 shadow-sm">
            <Image src={siteConfig.icon} alt="" aria-hidden="true" width={40} height={40} className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-semibold">{siteConfig.name}</span>
            <span className="hidden text-xs text-zinc-500 sm:block">Driveways, overlays, and small paving jobs</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="order-3 hidden items-center justify-center gap-4 text-sm text-zinc-600 lg:order-none lg:flex lg:gap-6">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className="transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <SiteSearch compact />
          <Link
            href="/#calculator"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            Get estimate
          </Link>
        </div>
      </div>
    </header>
  );
}
