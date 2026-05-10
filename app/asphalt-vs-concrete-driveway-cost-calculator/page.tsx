import Link from "next/link";

import { ArrowRight, Scale, SplitSquareHorizontal } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt vs Concrete Driveway Cost Calculator",
  description: "Compare asphalt and concrete driveway cost ranges side by side with one calculator.",
  path: "/asphalt-vs-concrete-driveway-cost-calculator"
});

const faqs = [
  {
    question: "Is asphalt always cheaper?",
    answer: "Usually yes for a first-pass driveway estimate, but the gap depends on region and site conditions."
  },
  {
    question: "Does concrete last longer?",
    answer: "Many homeowners expect longer life from concrete, but the better choice still depends on budget and use."
  },
  {
    question: "Why include gravel?",
    answer: "Gravel gives you a low-cost baseline so the comparison feels more useful."
  }
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt vs Concrete Driveway Cost Calculator", href: "/asphalt-vs-concrete-driveway-cost-calculator" }
];

export default function AsphaltVsConcretePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt vs Concrete Driveway Cost Calculator",
            description: siteConfig.description,
            url: `${siteConfig.url}/asphalt-vs-concrete-driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <SplitSquareHorizontal className="h-3.5 w-3.5" />
              Side-by-side compare
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Asphalt vs Concrete Driveway Cost Calculator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use one set of measurements to see a rough range for asphalt, concrete, and gravel. It is a fast way
              to compare the tradeoff before asking for formal bids.
            </p>
          </div>

          <AsphaltCalculator mode="comparison" defaultValues={{ areaSqFt: 900, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["How to use it", "Keep the same area and compare the cost bands side by side."],
              ["Why it helps", "It gives you a plain-English answer when you are deciding between materials."],
              ["What changes it", "Access, base prep, drainage, and your local labor market."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
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

          <Link href="/driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Compare all driveway materials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
