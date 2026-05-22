import Link from "next/link";
import type { Route } from "next";

import { siteConfig } from "@/lib/site";

const toolLinks = [
  { href: "/asphalt-driveway-cost-calculator", label: "Driveway cost" },
  { href: "/asphalt-tonnage-calculator", label: "Tonnage" },
  { href: "/parking-lot-paving-cost-calculator", label: "Parking lot cost" },
  { href: "/blacktop-driveway-cost-estimator", label: "Blacktop cost" },
  { href: "/tarmac-driveway-cost-calculator", label: "Tarmac cost" },
  { href: "/asphalt-vs-concrete-driveway-cost-calculator", label: "Asphalt vs concrete" }
] as const;

const guideLinks = [
  { href: "/asphalt-cost-guide", label: "Cost guide" },
  { href: "/asphalt-cost-per-square-foot", label: "Cost per sq ft" },
  { href: "/hot-mix-asphalt-cost-per-ton", label: "Hot mix per ton" },
  { href: "/asphalt-prices-by-state", label: "State pricing" },
  { href: "/asphalt-price-per-ton-near-me", label: "Price per ton near me" },
  { href: "/asphalt-driveway-cost-by-state", label: "Driveway cost by state" },
  { href: "/tar-and-chip-driveway-cost-calculator", label: "Tar and chip cost" },
  { href: "/how-much-asphalt-do-i-need", label: "How much asphalt" },
  { href: "/asphalt-contractor-guide", label: "Contractor guide" }
] as const;

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-zinc-950">{siteConfig.name}</p>
            <p className="max-w-md text-sm leading-6 text-zinc-600">
              {siteConfig.description} Planning numbers only. Final pricing still depends on local labor, access,
              materials, and site conditions.
            </p>
            <p className="text-sm leading-6 text-zinc-500">
              Questions or corrections?{" "}
              <a
                href="mailto:hello@asphaltprice.com"
                className="font-medium text-zinc-700 transition-colors hover:text-zinc-950"
              >
                hello@asphaltprice.com
              </a>
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

          <nav aria-label="Guides" className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Guides</p>
            <div className="grid gap-2 text-sm">
              {guideLinks.map((item) => (
                <Link key={item.href} href={item.href as Route} className="text-zinc-700 transition-colors hover:text-zinc-950">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Legal" className="space-y-3">
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
