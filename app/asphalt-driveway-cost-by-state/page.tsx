import Link from "next/link";

import { MapPinned, WalletCards } from "lucide-react";

import { ContentCredentials } from "@/components/content/content-credentials";
import { DirectAnswer } from "@/components/content/direct-answer";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { regionPricing, stateBuckets } from "@/lib/calculator/regional-prices";
import { formatCurrency } from "@/lib/calculator/formulas";
import { articleSchema, buildMetadata, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo";

const path = "/asphalt-driveway-cost-by-state";

const pageDescription =
  "Compare asphalt driveway costs by state group, with regional material and installed price ranges, local cost factors, and practical quote checks.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Cost by State | Regional Guide",
  description: pageDescription,
  path
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
          articleSchema({ name: "Asphalt Driveway Cost by State", description: pageDescription, path }),
          webPageSchema({ name: "Asphalt Driveway Cost by State", description: pageDescription, path }),
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

          <ContentCredentials path={path} />

          <DirectAnswer question="Why does asphalt driveway cost change by state?">
            <p>
              Asphalt driveway costs vary with labor, hauling, weather, and jobsite conditions. A state does not have
              one universal price. Use the state group as a starting range, then compare written quotes for the same
              compacted thickness, base work, drainage, removal, and cleanup. Projects near an asphalt plant with a
              stable base can cost less, while difficult access or repairs can raise the total.
            </p>
          </DirectAnswer>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["How to use the ranges", "Compare them with a current local quote after the site is measured."],
              ["Material or installed", "Check whether the price covers asphalt only, delivery, or the complete job."],
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

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How to use a regional band on a real driveway</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-zinc-200"><CardContent className="space-y-2"><p className="font-medium text-zinc-950">1. Calculate quantity</p><p className="text-sm leading-6 text-zinc-600">Use measured area, compacted depth, and waste to estimate tons.</p></CardContent></Card>
              <Card className="border-zinc-200"><CardContent className="space-y-2"><p className="font-medium text-zinc-950">2. Label the price</p><p className="text-sm leading-6 text-zinc-600">Separate plant pickup, delivered material, and installed work.</p></CardContent></Card>
              <Card className="border-zinc-200"><CardContent className="space-y-2"><p className="font-medium text-zinc-950">3. Match the scope</p><p className="text-sm leading-6 text-zinc-600">Compare base, removal, drainage, thickness, cleanup, and warranty.</p></CardContent></Card>
            </div>
            <p className="text-sm leading-7 text-zinc-600">
              The bands are explained in detail on the <Link href="/methodology" className="font-medium text-amber-800 underline underline-offset-4">data and methodology page</Link>.
              Replace them with a current local price whenever possible.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Quote comparison checklist by scope</h2>
            <p className="text-xs text-zinc-500 sm:hidden">Swipe the table left or right to see every column.</p>
            <div className="overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-[0.14em] text-zinc-500"><tr><th className="px-4 py-3 font-medium">Line item</th><th className="px-4 py-3 font-medium">Quote A</th><th className="px-4 py-3 font-medium">Quote B</th><th className="px-4 py-3 font-medium">Why it matters</th></tr></thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-600">
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Compacted thickness</td><td className="px-4 py-3">Write value</td><td className="px-4 py-3">Write value</td><td className="px-4 py-3">Changes tonnage and durability</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Base and drainage</td><td className="px-4 py-3">Included?</td><td className="px-4 py-3">Included?</td><td className="px-4 py-3">Often the largest hidden difference</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Removal and cleanup</td><td className="px-4 py-3">Included?</td><td className="px-4 py-3">Included?</td><td className="px-4 py-3">Adds hauling and crew time</td></tr>
                </tbody>
              </table>
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
