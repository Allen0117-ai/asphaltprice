import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Home, Ruler, ShieldCheck } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Estimate blacktop driveway cost with square footage, thickness, tonnage, waste, and quote checks for residential paving.";

export const metadata = buildMetadata({
  title: "Blacktop Driveway Cost Estimator | Cost Guide",
  description: pageDescription,
  path: "/blacktop-driveway-cost-estimator"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blacktop Driveway Cost Estimator", href: "/blacktop-driveway-cost-estimator" }
];

const faqs = [
  {
    question: "Is blacktop the same as asphalt?",
    answer:
      "For most homeowner searches, blacktop and asphalt refer to the same driveway paving material, so the same estimating method works."
  },
  {
    question: "How do I estimate blacktop driveway cost?",
    answer:
      "Enter the driveway area, thickness, waste allowance, and region. Then compare the material range and installed range with local contractor quotes."
  },
  {
    question: "What makes a blacktop driveway quote higher?",
    answer:
      "Old surface removal, weak base, drainage repair, tight access, thicker asphalt, and small-job minimum charges can all increase the final price."
  },
  {
    question: "Should I use price per ton or price per square foot?",
    answer:
      "Use both if possible. Per ton checks the material quantity, while per square foot is easier for comparing installed driveway quotes."
  },
  {
    question: "Is this a final bid?",
    answer:
      "No. It is a planning number. A contractor still needs to inspect base condition, slope, drainage, and access before giving a final bid."
  }
];

const relatedPages = [
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost calculator",
    text: "Use the main driveway page for asphalt wording and more quote detail."
  },
  {
    href: "/asphalt-cost-per-square-foot",
    title: "Asphalt cost per square foot",
    text: "Compare installed quotes in the unit homeowners usually see."
  },
  {
    href: "/asphalt-price-per-ton-near-me",
    title: "Asphalt price per ton near me",
    text: "Check local material pricing before calling contractors."
  },
  {
    href: "/driveway-cost-calculator",
    title: "Driveway cost calculator",
    text: "Compare blacktop with concrete and gravel options."
  }
] as const;

export default function BlacktopDrivewayCostEstimatorPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Blacktop Driveway Cost Estimator",
            description: pageDescription,
            url: `${siteConfig.url}/blacktop-driveway-cost-estimator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Home className="h-3.5 w-3.5" />
              Blacktop driveway planning
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Blacktop Driveway Cost Estimator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Estimate blacktop driveway tonnage and installed cost before you compare paving bids. Use the result as
              a starting point, then confirm the scope with a local contractor.
            </p>
          </div>

          <AsphaltCalculator mode="driveway" defaultValues={{ areaSqFt: 800, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <section className="grid gap-4 md:grid-cols-3">
            {[
              ["Same estimating method", "Blacktop and asphalt driveway searches usually use the same paving math."],
              ["Best quote unit", "Compare both per-ton material cost and installed cost per square foot."],
              ["Updated", "Content last reviewed May 2026 for residential driveway planning."]
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
                <Ruler className="h-4 w-4" />
                Measurement
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Measure the whole driveway area</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Include the main driveway, flare, turnaround, and parking pad if they will be paved in the same job.
                  Small missing areas can make the quote comparison feel confusing later.
                </p>
                <p>
                  After you calculate the size, ask each contractor to quote the same thickness, same base repair, and
                  same cleanup scope.
                </p>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Do not compare only totals</p>
                <p className="text-sm leading-6 text-zinc-600">
                  A cheaper blacktop quote may skip removal, base repair, edge work, drainage, or cleanup. Compare the
                  written scope before choosing.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related blacktop cost pages</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Use these pages when you need asphalt wording, square-foot pricing, local ton pricing, or material comparison.
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
