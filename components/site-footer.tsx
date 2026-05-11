import Link from "next/link";
import type { Route } from "next";

import { siteConfig } from "@/lib/site";

const toolLinks = [
  { href: "/asphalt-driveway-cost-calculator", label: "Driveway cost" },
  { href: "/asphalt-tonnage-calculator", label: "Tonnage" },
  { href: "/asphalt-vs-concrete-driveway-cost-calculator", label: "Asphalt vs concrete" },
  { href: "/asphalt-cost-guide", label: "Cost guide" },
  { href: "/asphalt-prices-by-state", label: "State pricing" },
  { href: "/asphalt-contractor-guide", label: "Contractor guide" }
] as const;

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-zinc-950">{siteConfig.name}</p>
            <p className="max-w-md text-sm leading-6 text-zinc-600">
              {siteConfig.description} Planning numbers only. Final pricing still depends on local labor, access,
              materials, and site conditions.
            </p>
          </div>

          <nav aria-label="Tools" className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Tools</p>
            <div className="grid gap-2 text-sm">
              {toolLinks.map((item) => (
                <Link key={item.href} href={item.href as Route} className="text-zinc-700 transition-colors hover:text-zinc-950">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer" className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Legal</p>
            <div className="grid gap-2 text-sm">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href as Route} className="text-zinc-700 transition-colors hover:text-zinc-950">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
