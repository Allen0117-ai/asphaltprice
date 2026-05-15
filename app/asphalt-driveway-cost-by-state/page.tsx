import Link from "next/link";

import { MapPinned, WalletCards } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { regionPricing, stateBuckets } from "@/lib/calculator/regional-prices";
import { formatCurrency } from "@/lib/calculator/formulas";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Compare asphalt driveway cost by state group, including material ranges, installed ranges, and quote checks.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Cost by State | Regional Guide",
  description: pageDescription,
  path: "/asphalt-driveway-cost-by-state"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Driveway Cost by State", href: "/asphalt-driveway-cost-by-state" }
];

const faqs = [
  {
    question: "Why does asphalt driveway cost change by state?",
    answer:
      "Labor, asphalt plant access, haul distance, weather season, local demand, and base repair needs all change the final driveway quote."
  },
  {
    question: "Should I use material price or installed price?",
    answer:
      "Use material price for asphalt-only planning. Use installed price when you need a driveway budget that includes labor and equipment."
  },
  {
    question: "Are these exact state prices?",
    answer:
      "No. They are regional planning ranges. Always confirm the current local number with nearby paving contractors."
  },
  {
    question: "Can this help in Canada or the UK?",
    answer:
      "Yes as a planning approach. Use local prices per tonne in Canada or the UK, and remember UK quotes may use the word tarmac."
  }
];

export default function AsphaltDrivewayCostByStatePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Driveway Cost by State",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-driveway-cost-by-state`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <MapPinned className="h-3.5 w-3.5" />
              Regional driveway pricing
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Driveway Cost by State</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use these state groups to estimate whether a driveway quote looks reasonable before you compare local
              contractor bids. The ranges are planning estimates, not final offers.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Updated", "Content last reviewed May 2026 for state-level driveway cost planning."],
              ["Estimate only", "Installed driveway prices still need a site inspection and local quote."],
              ["Scope matters", "Base repair, removal, drainage, thickness, and access can change the final price."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">State driveway cost bands</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stateBuckets.map((bucket) => {
                const pricing = regionPricing[bucket.region];

                return (
                  <Card key={bucket.label} className="border-zinc-200">
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-lg font-semibold text-zinc-950">{bucket.label}</p>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{pricing.note}</p>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-600">
                        <p>
                          Material: {formatCurrency(pricing.asphaltMaterialLow)} - {formatCurrency(pricing.asphaltMaterialHigh)} per ton
                        </p>
                        <p>
                          Installed: {formatCurrency(pricing.asphaltInstalledLow)} - {formatCurrency(pricing.asphaltInstalledHigh)} per ton
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bucket.states.map((state) => (
                          <span key={state} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
                            {state}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <Card className="border-zinc-200">
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <WalletCards className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Need a driveway-specific estimate?</p>
                <p className="text-sm leading-6 text-zinc-600">Use your area, thickness, waste, and region in the calculator.</p>
              </div>
              <Link href="/asphalt-driveway-cost-calculator" className="text-sm font-medium text-amber-700">
                Open driveway calculator
              </Link>
            </CardContent>
          </Card>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={faqs} />
          </section>
        </div>
      </section>
    </>
  );
}
