import Link from "next/link";

import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Cost Calculator",
  description: "Estimate asphalt driveway cost by area, thickness, and region. Get a quick tonnage and pricing range.",
  path: "/asphalt-driveway-cost-calculator"
});

const faqs = [
  {
    question: "What does this page estimate?",
    answer: "It estimates material and installed cost for a typical asphalt driveway project using a simple pricing model."
  },
  {
    question: "Why is the result a range?",
    answer: "Driveway prices move with labor, prep work, and site access, so a range is more honest than a single number."
  },
  {
    question: "Can I use it for a parking pad?",
    answer: "Yes. Enter the pad area and thickness you expect, then use the range as a planning number."
  }
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Driveway Cost Calculator", href: "/asphalt-driveway-cost-calculator" }
];

export default function AsphaltDrivewayCostPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Driveway Cost Calculator",
            description: siteConfig.description,
            url: `${siteConfig.url}/asphalt-driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Sparkles className="h-3.5 w-3.5" />
              Driveway pricing in one place
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Asphalt Driveway Cost Calculator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Enter the size of the driveway, pick a thickness, and get a rough material and installed range you can
              use before asking for a quote.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1">
                <MapPin className="h-3.5 w-3.5" />
                Region aware
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Estimate only
              </span>
            </div>
          </div>

          <AsphaltCalculator mode="asphalt" defaultValues={{ areaSqFt: 800, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Use it for", "Driveways, access pads, small lots, and resurfacing planning."],
              ["Good starting point", "Helps you compare contractor bids without guessing the size."],
              ["Still needed later", "A real quote should confirm base prep, grading, and access."]
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

          <Link href="/asphalt-tonnage-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Need only the tonnage?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
