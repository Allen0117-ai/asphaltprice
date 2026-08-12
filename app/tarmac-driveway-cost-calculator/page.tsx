import Link from "next/link";

import { Calculator, MapPinned } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { ContentCredentials } from "@/components/content/content-credentials";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema, webPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Compare tarmac driveway prices with a cost calculator for metric tonnes, square metres, local rates, and installed driveway planning.";

export const metadata = buildMetadata({
  title: "Tarmac Driveway Prices & Cost Calculator | Tonnes",
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
      "In the UK, tarmac often refers to asphalt-style driveway surfacing. Local contractors may use either term, so match the wording in your quote."
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
    question: "Can Canadian users use these estimates?",
    answer:
      "Yes. Canada may use tons or tonnes depending on the supplier, so check the quote unit and enter the local material price."
  }
];

const relatedPages = [
  { href: "/tarmac-calculator", label: "Calculate tarmac tonnes" },
  { href: "/asphalt-tonnage-calculator", label: "Check tarmac tonnes" },
  { href: "/asphalt-cost-guide", label: "Read the asphalt cost guide" },
  { href: "/asphalt-driveway-replacement-cost-calculator", label: "Price a full driveway replacement" },
  { href: "/asphalt-driveway-resurfacing-cost-calculator", label: "Price a tarmac-style overlay" }
] as const;

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
          webPageSchema({ name: "Tarmac Driveway Cost Calculator", description: pageDescription, path: "/tarmac-driveway-cost-calculator" }),
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
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Tarmac Driveway Prices & Cost Calculator</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Compare tarmac driveway prices when your quote uses metric tonnes, square metres, or a full installed
              rate. It is useful for UK, Canada, and other non-U.S. driveway planning.
            </p>
          </div>

          <ContentCredentials path="/tarmac-driveway-cost-calculator" />

          <AsphaltCalculator
            mode="asphalt"
            defaultValues={{ areaSqM: 60, thicknessMillimeters: 65, unitSystem: "metric", wastePercent: 7, region: "national" }}
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Match the unit", "Compare tonnes, tons, square metres, or complete installed prices on the same basis."],
              ["Compare the full scope", "Check whether removal, base work, edging, drainage, and cleanup are included."],
              ["Use a local rate", "Enter the current local price per tonne when you have one."]
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
                <p>
                  Convert every quote to the same basis before comparing it: cost per square metre, material price per
                  tonne, or one complete installed price with removal, base, edging, drainage, and cleanup listed.
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

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related tarmac and asphalt tools</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedPages.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium text-amber-700 transition-colors hover:bg-zinc-50">
                  {item.label}
                </Link>
              ))}
            </div>
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
