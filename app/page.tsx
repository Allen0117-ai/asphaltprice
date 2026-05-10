import Link from "next/link";

import { ArrowRight, Sparkles } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, faqSchema, organizationSchema, webAppSchema, webSiteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Calculator - Estimate Costs & Coverage",
  description: "Free asphalt calculator to estimate costs and coverage. Get quick pricing for driveway, parking lot, and road projects in seconds.",
  path: "/"
});

const faqs = [
  {
    question: "How accurate is the estimate?",
    answer:
      "It is a planning estimate, not a contractor quote. It is good for budgeting, comparing materials, and talking through scope."
  },
  {
    question: "Why does the number change when thickness changes?",
    answer: "Thicker asphalt uses more material, so tonnage and cost both go up as thickness increases."
  },
  {
    question: "Does this include labor?",
    answer:
      "The installed range includes a rough labor allowance, but final pricing still depends on local crew rates and site conditions."
  },
  {
    question: "Can I share the result?",
    answer: "Yes. Use the share link button in the calculator to copy a URL with your current inputs."
  }
];

const relatedCalculators = [
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost calculator",
    text: "Price out a standard driveway with tons and installed cost."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Focus only on material quantity and coverage per ton."
  },
  {
    href: "/asphalt-vs-concrete-driveway-cost-calculator",
    title: "Asphalt vs concrete",
    text: "See the rough cost gap between the two materials."
  },
  {
    href: "/driveway-cost-calculator",
    title: "Driveway cost calculator",
    text: "Compare asphalt, concrete, and gravel in one place."
  }
] as const;

const specPoints = [
  "145 lb/ft³ density",
  "7% waste default",
  "Region-based pricing",
  "Copyable estimate link"
] as const;

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={[
          webSiteSchema({
            name: siteConfig.name,
            url: siteConfig.url
          }),
          organizationSchema({
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/icon`
          }),
          webAppSchema({
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pt-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              For driveways, overlays, and small lots
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Asphalt Calculator
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Estimate asphalt tonnage, material cost, and installed cost for a driveway, pad, or small paving job
              without waiting for a quote.
            </p>
            <div className="max-w-5xl rounded-2xl border border-zinc-200 bg-white px-4 py-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {specPoints.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AsphaltCalculator mode="asphalt" />
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Build the estimate from three inputs</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
              Start with the area, set the thickness, and choose a region. The calculator turns those inputs into a
              tonnage figure plus a cost band.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step 1</p>
                <p className="text-base font-medium text-zinc-950">Measure the area</p>
                <p className="text-sm leading-6 text-zinc-600">Enter square footage, whether it is a driveway, pad, or path.</p>
              </CardContent>
            </Card>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step 2</p>
                <p className="text-base font-medium text-zinc-950">Pick thickness</p>
                <p className="text-sm leading-6 text-zinc-600">A thicker section means more tons and a higher budget.</p>
              </CardContent>
            </Card>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step 3</p>
                <p className="text-base font-medium text-zinc-950">Compare the range</p>
                <p className="text-sm leading-6 text-zinc-600">See a low and high estimate so you can plan with some room.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">What changes the price</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">What moves the number</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                Asphalt cost is not just one number. It shifts with thickness, waste, region, site access, base prep,
                and how much labor the crew needs to spend on the job.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Thickness", "More inches means more material and more tonnage."],
                ["Region", "Labor and haul distance move the price range up or down."],
                ["Waste", "A small buffer helps cover cuts and on-site loss."],
                ["Site work", "Grading, base repair, and access all affect the final bid."]
              ].map(([title, text]) => (
                <Card key={title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Related calculators</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Start with the one that fits your project</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedCalculators.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-white">
                  <CardContent className="space-y-3">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                      Open calculator
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Quick FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            </div>
            <div className="space-y-4">
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
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Disclaimer</p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
            This tool gives a planning estimate only. Local market prices, base prep, haul distance, and crew
            availability can move the real quote up or down.
          </p>
        </div>
      </section>
    </>
  );
}
