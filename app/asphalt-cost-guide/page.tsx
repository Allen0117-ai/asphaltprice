import Link from "next/link";

import { ArrowRight, CircleDollarSign, TriangleAlert } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Cost Guide",
  description: "A practical guide to asphalt costs, pricing ranges, and the main things that change a bid.",
  path: "/asphalt-cost-guide"
});

const faqs = [
  {
    question: "Why does asphalt pricing vary so much?",
    answer: "Site access, prep work, haul distance, and local labor can all shift the final number."
  },
  {
    question: "Is a low estimate bad?",
    answer: "Not always. It can be fine for early planning, but a contractor still needs to inspect the site."
  },
  {
    question: "Should I ask for more than one bid?",
    answer: "Yes. A few quotes make it easier to spot a number that is too high or too low."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Cost Guide", href: "/asphalt-cost-guide" }];

export default function AsphaltCostGuidePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Cost Guide",
            description: siteConfig.description,
            url: `${siteConfig.url}/asphalt-cost-guide`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <CircleDollarSign className="h-3.5 w-3.5" />
              Pricing guide
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Cost Guide</h1>
            <p className="text-lg leading-8 text-zinc-600">
              This guide explains the rough price bands behind the calculator so the result feels easier to read and
              easier to compare with real bids.
            </p>
          </div>

          <AsphaltCalculator mode="asphalt" defaultValues={{ areaSqFt: 700, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              [
                "Typical cost drivers",
                "Thickness, driveway size, base condition, grading, haul distance, and local crew availability."
              ],
              [
                "What to watch for",
                "A price that looks too neat can miss base repair, access issues, or cleanup work."
              ],
              ["Best use of this page", "Get a quick range, then compare it with one or two real contractor quotes."]
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
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What changes the quote</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Thickness has the biggest effect because it directly changes the tonnage.</p>
                <p>Base repair can add a surprising amount to the final number if the old surface is failing.</p>
                <p>Driveways with tight access or long haul distance can cost more than the same size pad in an easy location.</p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <TriangleAlert className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Keep the estimate honest</p>
                <p className="text-sm leading-6 text-zinc-600">
                  The calculator is meant for planning. If the site needs heavy prep, the real price can move well above the first pass.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What a good quote should spell out</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Look for a clear thickness, base prep, access note, and cleanup line so you know what the number covers.</p>
                <p>If one bid is far lower than the others, check whether it skipped repair work or used a thinner build-up.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Check driveway cost
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-prices-by-state" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  See state pricing bands
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Ask for these line items</p>
                <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                  <li>Thickness and tonnage</li>
                  <li>Base repair or grading work</li>
                  <li>Access, haul distance, and cleanup</li>
                  <li>Material-only and installed pricing</li>
                </ul>
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

          <Link href="/asphalt-vs-concrete-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Compare against concrete
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
