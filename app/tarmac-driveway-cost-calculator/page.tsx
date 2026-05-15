import Link from "next/link";

import { Calculator, MapPinned } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Tarmac driveway cost calculator for metric tonnes, local tarmac pricing, and rough driveway planning in the UK and other markets.";

export const metadata = buildMetadata({
  title: "Tarmac Driveway Cost Calculator | Tonnes & Local Price",
  description: pageDescription,
  path: "/tarmac-driveway-cost-calculator"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Tarmac Driveway Cost Calculator", href: "/tarmac-driveway-cost-calculator" }
];

const faqs = [
  {
    question: "Is tarmac the same as asphalt?",
    answer:
      "In everyday UK driveway searches, tarmac is often used for asphalt-style surfacing. Local contractors may use either term, so match the wording in your quote."
  },
  {
    question: "Should I use tons or tonnes?",
    answer:
      "Use metric tonnes if your supplier or contractor quotes in tonnes. Use tons only when the quote is written in U.S. short tons."
  },
  {
    question: "Can this calculator give a final UK tarmac quote?",
    answer:
      "No. It gives a planning estimate. A real quote still needs site access, base condition, drainage, edging, and local labor."
  },
  {
    question: "Can Canadian users use this page?",
    answer:
      "Yes. Canada may use tons or tonnes depending on the supplier, so check the quote unit and enter the local material price."
  }
];

export default function TarmacDrivewayCostCalculatorPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Tarmac Driveway Cost Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/tarmac-driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Calculator className="h-3.5 w-3.5" />
              Tarmac and tonnes
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Tarmac Driveway Cost Calculator</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this calculator for tarmac or asphalt driveway planning when your local quote uses metric tonnes or
              local installed pricing. It is useful for UK, Canada, and other non-U.S. comparisons.
            </p>
          </div>

          <AsphaltCalculator mode="asphalt" defaultValues={{ areaSqFt: 650, thicknessInches: 2.5, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Updated", "Content last reviewed May 2026 for tarmac and metric quote planning."],
              ["Estimate only", "Use local contractor pricing before making a final budget decision."],
              ["Important unit", "Match tonnes, tons, square metres, or installed job pricing before comparing quotes."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How to compare tarmac quotes</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Ask each contractor to quote the same area, same compacted thickness, same base repair, and same
                  cleanup scope. A cheap quote can look better only because important work is missing.
                </p>
                <p>
                  If your quote is per tonne, enter the local tonne price. If it is a full installed job price, use the
                  calculator result as a quantity check rather than a final bid.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <MapPinned className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Using U.S. price pages?</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Treat U.S. state bands as comparison notes only. Your local tarmac contractor sets the real price.
                </p>
                <Link href="/asphalt-tonnage-calculator" className="inline-flex text-sm font-medium text-amber-700">
                  Check tonnes first
                </Link>
              </CardContent>
            </Card>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={faqs} />
          </section>
        </div>
      </section>
    </>
  );
}
