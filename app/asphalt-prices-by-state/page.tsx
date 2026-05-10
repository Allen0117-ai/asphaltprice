import Link from "next/link";

import { MapPinned, ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { regionPricing, stateBuckets } from "@/lib/calculator/regional-prices";
import { formatCurrency } from "@/lib/calculator/formulas";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Prices by State",
  description: "Broad asphalt price bands by state group for a first-pass estimate.",
  path: "/asphalt-prices-by-state"
});

const faqs = [
  {
    question: "Are these exact state prices?",
    answer: "No. They are broad planning bands grouped by region so you have a quick starting point."
  },
  {
    question: "Why not use ZIP code pricing?",
    answer: "ZIP-level pricing needs live local data. This first version stays simple and honest."
  },
  {
    question: "When should I get a real quote?",
    answer: "Once the project size and surface type are known, ask a local contractor to inspect the site."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Prices by State", href: "/asphalt-prices-by-state" }];

export default function AsphaltPricesByStatePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Prices by State",
            description: siteConfig.description,
            url: `${siteConfig.url}/asphalt-prices-by-state`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <MapPinned className="h-3.5 w-3.5" />
              Broad state-level bands
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Prices by State</h1>
            <p className="text-lg leading-8 text-zinc-600">
              This page groups states into practical pricing bands so you can start with a realistic range before you
              get into a real local bid.
            </p>
          </div>

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

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Use this page", "To get a rough regional range when you do not yet have a local quote."],
              ["Use the calculator", "To turn your square footage into tonnage and project cost."],
              ["Use a contractor bid", "To confirm the real number once the site has been inspected."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How to use these bands</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Use the state group as a starting point, then enter your actual square footage in the calculator.</p>
                <p>When you compare bids, keep thickness, prep scope, and cleanup assumptions the same.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Open driveway calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Read the cost guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Best use</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Treat these prices as a broad market check. A real local bid should still confirm base condition,
                  drainage, access, and current material availability.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <Card key={item.question} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.question}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Back to the calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
