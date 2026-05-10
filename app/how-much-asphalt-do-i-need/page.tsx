import Link from "next/link";

import { ArrowRight, Weight } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "How Much Asphalt Do I Need?",
  description: "Figure out how many tons of asphalt you need for a driveway or paving project.",
  path: "/how-much-asphalt-do-i-need"
});

const faqs = [
  {
    question: "What should I measure first?",
    answer: "Start with the finished square footage, then choose the thickness you want to build."
  },
  {
    question: "Why does waste matter?",
    answer: "Waste gives you a safer number for cuts, handling, and small site loss."
  },
  {
    question: "Can I reuse the same estimate later?",
    answer: "Yes. Copy the link button and keep the exact numbers you used."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "How Much Asphalt Do I Need?", href: "/how-much-asphalt-do-i-need" }];

export default function HowMuchAsphaltPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "How Much Asphalt Do I Need?",
            description: siteConfig.description,
            url: `${siteConfig.url}/how-much-asphalt-do-i-need`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Weight className="h-3.5 w-3.5" />
              Tonnage and coverage
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">How Much Asphalt Do I Need?</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Enter the area and thickness, and the calculator will show the tonnage plus the coverage per ton so the
              number is easier to sanity-check.
            </p>
          </div>

          <AsphaltCalculator mode="tonnage" defaultValues={{ areaSqFt: 500, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Measure the area", "Use the finished size, not the rough site footprint."],
              ["Pick thickness", "Thin overlays and full-depth work will give different totals."],
              ["Add a buffer", "A little waste is normal and helps avoid short ordering."]
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
            See the cost estimate next
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
