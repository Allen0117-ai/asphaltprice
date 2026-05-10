import Link from "next/link";

import { ArrowRight, Scale } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Tonnage Calculator",
  description: "Calculate how many tons of asphalt you need based on area, thickness, and waste allowance.",
  path: "/asphalt-tonnage-calculator"
});

const faqs = [
  {
    question: "Why does tonnage matter?",
    answer: "Tonnage helps you order the right amount of material and compare supplier quotes."
  },
  {
    question: "What density does this use?",
    answer: "It uses 145 lb/ft³, which is a standard planning density for quick estimates."
  },
  {
    question: "Should I add waste?",
    answer: "Yes. A small waste allowance gives you a safer planning number for cuts and handling loss."
  }
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Tonnage Calculator", href: "/asphalt-tonnage-calculator" }
];

export default function AsphaltTonnagePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Tonnage Calculator",
            description: siteConfig.description,
            url: `${siteConfig.url}/asphalt-tonnage-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Scale className="h-3.5 w-3.5" />
              Tonnage first
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Tonnage Calculator</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this page when you only need the tonnage number. It still shows the coverage and the waste buffer so
              the result is easier to trust.
            </p>
          </div>

          <AsphaltCalculator mode="tonnage" defaultValues={{ areaSqFt: 600, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Use case", "Ordering material, checking supplier quotes, or sanity-checking a contractor bid."],
              ["Formula", "Area × thickness × density, then add a waste allowance."],
              ["Best next step", "Use the same area again on the driveway cost calculator for a pricing range."]
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

          <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Need the cost range too?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
