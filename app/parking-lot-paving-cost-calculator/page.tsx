import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Building2, ClipboardCheck, Truck } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Estimate parking lot paving cost with asphalt tonnage, square footage, thickness, waste, and quote-scope checks.";

export const metadata = buildMetadata({
  title: "Parking Lot Paving Cost Calculator | Asphalt Estimate",
  description: pageDescription,
  path: "/parking-lot-paving-cost-calculator"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Parking Lot Paving Cost Calculator", href: "/parking-lot-paving-cost-calculator" }
];

const faqs = [
  {
    question: "How do I estimate parking lot paving cost?",
    answer:
      "Measure the paved square footage, choose the asphalt thickness, estimate tons, then compare material, delivery, base work, striping, and installed labor."
  },
  {
    question: "Is a parking lot estimate different from a driveway estimate?",
    answer:
      "Yes. Parking lots often need heavier traffic planning, drainage, base repair, ADA layout, striping, and more staging than a simple driveway."
  },
  {
    question: "What thickness should I use for a parking lot?",
    answer:
      "Light-duty lots often start around 3 inches of compacted asphalt, while heavier traffic areas may need more. Ask a paving contractor to confirm the section."
  },
  {
    question: "Should striping be included in the paving quote?",
    answer:
      "Usually yes for a finished parking lot. Ask whether layout, striping, wheel stops, ADA markings, and cleanup are included."
  },
  {
    question: "Is this a final contractor price?",
    answer:
      "No. It is a planning estimate. Final price depends on site access, base condition, drainage, local labor, asphalt plant distance, and project timing."
  }
];

const quoteItems = [
  "Square footage and compacted asphalt thickness",
  "Base repair, grading, drainage, and soft spot correction",
  "Material-only, delivered, and fully installed price",
  "Striping, ADA markings, cleanup, and traffic control",
  "Minimum mobilization charges and work schedule"
] as const;

const relatedPages = [
  {
    href: "/asphalt-cost-per-square-foot",
    title: "Asphalt cost per square foot",
    text: "Convert a parking lot estimate into a square-foot budget range."
  },
  {
    href: "/hot-mix-asphalt-cost-per-ton",
    title: "Hot mix asphalt cost per ton",
    text: "Check the material unit before comparing paving bids."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Focus only on tons, tonnes, coverage, and waste."
  },
  {
    href: "/asphalt-contractor-guide",
    title: "Contractor quote checklist",
    text: "Review scope before choosing a paving contractor."
  }
] as const;

export default function ParkingLotPavingCostCalculatorPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Parking Lot Paving Cost Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/parking-lot-paving-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Building2 className="h-3.5 w-3.5" />
              Parking lot planning
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Parking Lot Paving Cost Calculator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Estimate asphalt tonnage and paving cost for a small parking lot, access area, or commercial pad before
              you ask contractors for bids.
            </p>
          </div>

          <AsphaltCalculator
            mode="asphalt"
            defaultValues={{ areaSqFt: 10000, thicknessInches: 3, wastePercent: 8, region: "national" }}
          />

          <section className="grid gap-4 md:grid-cols-3">
            {[
              ["Updated", "Content last reviewed May 2026 for parking lot quote planning."],
              ["Estimate only", "A contractor still needs to inspect base condition, drainage, access, and traffic needs."],
              ["Best use", "Good for small lots, business parking areas, access pads, and private paved yards."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <ClipboardCheck className="h-4 w-4" />
                Quote scope
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What a parking lot paving quote should include</h2>
              <p className="text-sm leading-7 text-zinc-600">
                Parking lot work is not just asphalt by the ton. A useful bid should explain the base, drainage,
                thickness, striping, access, and cleanup so you can compare contractors fairly.
              </p>
              <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                {quoteItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <Truck className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Watch haul distance</p>
                <p className="text-sm leading-6 text-zinc-600">
                  A lot that sits far from the asphalt plant can cost more because trucks, crew time, and hot-mix
                  timing all matter.
                </p>
                <Link href="/asphalt-price-per-ton-near-me" className="inline-flex text-sm font-medium text-amber-700">
                  Check local price planning
                </Link>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related parking lot cost pages</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Use these pages to check unit price, tonnage, square-foot cost, and contractor scope before comparing bids.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedPages.map((item) => (
                <Link key={item.href} href={item.href as Route}>
                  <Card className="h-full border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-zinc-50">
                    <CardContent className="space-y-3">
                      <p className="text-base font-medium text-zinc-950">{item.title}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                        Open page
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </section>
        </div>
      </section>
    </>
  );
}
