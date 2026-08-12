import Link from "next/link";
import type { Route } from "next";

import { siteConfig } from "@/lib/site";

const toolLinks = [
  { href: "/asphalt-cost-calculator", label: "Asphalt cost calculator" },
  { href: "/asphalt-driveway-cost-calculator", label: "Driveway cost" },
  { href: "/asphalt-driveway-replacement-cost-calculator", label: "Replacement cost" },
  { href: "/asphalt-driveway-resurfacing-cost-calculator", label: "Resurfacing cost" },
  { href: "/driveway-sealing-cost-calculator", label: "Driveway sealing" },
  { href: "/asphalt-millings-calculator", label: "Asphalt millings" },
  { href: "/asphalt-tonnage-calculator", label: "Tonnage" },
  { href: "/asphalt-paving-cost-calculator", label: "Paving cost" },
  { href: "/asphalt-road-cost-calculator", label: "Private road cost" },
  { href: "/parking-lot-paving-cost-calculator", label: "Parking lot cost" },
  { href: "/blacktop-cost-per-ton", label: "Blacktop per ton" },
  { href: "/tarmac-calculator", label: "Tarmac calculator" },
  { href: "/tarmac-driveway-cost-calculator", label: "Tarmac cost" },
  { href: "/asphalt-vs-concrete-driveway-cost-calculator", label: "Asphalt vs concrete" }
] as const;

const guideLinks = [
  { href: "/asphalt-cost-guide", label: "Cost guide" },
  { href: "/asphalt-driveway-thickness", label: "Driveway thickness" },
  { href: "/asphalt-millings-vs-gravel", label: "Millings vs gravel" },
  { href: "/asphalt-cost-per-square-foot", label: "Cost per sq ft" },
  { href: "/hot-mix-asphalt-cost-per-ton", label: "Hot mix per ton" },
  { href: "/asphalt-prices-by-state", label: "Price per ton near me" },
  { href: "/asphalt-driveway-cost-by-state", label: "Driveway cost by state" },
  { href: "/tar-and-chip-driveway-cost-calculator", label: "Tar and chip cost" },
  { href: "/how-much-asphalt-do-i-need", label: "How much asphalt" },
  { href: "/asphalt-contractor-guide", label: "Contractor guide" }
] as const;

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Data & methodology" },
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
              {siteConfig.description} Use the results for early budgeting; final pricing depends on local labor,
              access, materials, and site conditions.
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
            <p className="text-sm leading-6 text-zinc-500">
              Reviewed by the{" "}
              <Link href="/about" className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4">
                Asphalt Calculator Editorial Team
              </Link>
              . Read our{" "}
              <Link href="/methodology" className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4">
                data and methodology
              </Link>
              .
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
