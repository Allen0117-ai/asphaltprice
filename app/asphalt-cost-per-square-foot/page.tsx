import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Calculator, CircleDollarSign, Ruler } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Estimate asphalt cost per square foot for driveways, pads, and small paving jobs using area, thickness, tonnage, and quote scope.";

export const metadata = buildMetadata({
  title: "Asphalt Cost Per Square Foot | Driveway & Paving Guide",
  description: pageDescription,
  path: "/asphalt-cost-per-square-foot"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Cost Per Square Foot", href: "/asphalt-cost-per-square-foot" }
];

const faqs = [
  {
    question: "How do I estimate asphalt cost per square foot?",
    answer:
      "Divide the full installed estimate by the paved square footage. For material-only math, calculate tons first and multiply by the quoted price per ton."
  },
  {
    question: "Why do square-foot asphalt prices vary so much?",
    answer:
      "Thickness, base repair, drainage, labor, haul distance, access, and project size can all change the installed price per square foot."
  },
  {
    question: "Is cost per square foot better than cost per ton?",
    answer:
      "Cost per square foot is easier for comparing finished projects. Cost per ton is better for checking material quantity and supplier pricing."
  },
  {
    question: "Can I use this for parking lots?",
    answer:
      "Yes for early planning, but parking lots may also need striping, ADA markings, traffic control, and heavier base work."
  },
  {
    question: "Is this a final paving price?",
    answer:
      "No. Treat it as a planning guide. A contractor should inspect the site before giving a final installed price."
  }
];

const formulas = [
  {
    title: "Installed cost per square foot",
    text: "Full installed quote divided by paved square footage."
  },
  {
    title: "Material cost per square foot",
    text: "Tons needed multiplied by price per ton, then divided by square footage."
  },
  {
    title: "Why thickness matters",
    text: "A thicker asphalt section uses more tons over the same square footage."
  }
] as const;

const relatedPages = [
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Driveway cost calculator",
    text: "Estimate a residential driveway with installed pricing."
  },
  {
    href: "/parking-lot-paving-cost-calculator",
    title: "Parking lot paving cost",
    text: "Use square-foot pricing for a small lot or commercial pad."
  },
  {
    href: "/hot-mix-asphalt-cost-per-ton",
    title: "Hot mix cost per ton",
    text: "Check the material unit behind the square-foot price."
  },
  {
    href: "/asphalt-cost-guide",
    title: "Asphalt cost guide",
    text: "Understand the cost drivers before comparing bids."
  }
] as const;

export default function AsphaltCostPerSquareFootPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Cost Per Square Foot Guide",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-cost-per-square-foot`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <CircleDollarSign className="h-3.5 w-3.5" />
              Square-foot pricing
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Asphalt Cost Per Square Foot
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this page to connect square-foot pricing with asphalt tonnage, thickness, and installed quote scope
              for driveways, pads, and small paving jobs.
            </p>
          </div>

          <AsphaltCalculator mode="asphalt" defaultValues={{ areaSqFt: 1000, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <section className="grid gap-4 md:grid-cols-3">
            {formulas.map((item) => (
              <Card key={item.title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Calculator className="h-4 w-4" />
                Unit conversion
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Use square-foot pricing carefully</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Square-foot pricing is useful because it matches the way many homeowners and small property owners
                  think about the job. It can still hide big differences in thickness and base repair.
                </p>
                <p>
                  For a clean comparison, ask each contractor to quote the same paved area, compacted thickness, base
                  prep, drainage scope, cleanup, and warranty.
                </p>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <Ruler className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Best quick check</p>
                <p className="text-sm leading-6 text-zinc-600">
                  If one quote is much cheaper per square foot, check whether it uses a thinner asphalt layer or skips
                  repair work.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related square-foot cost pages</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                These pages help you move between square footage, tonnage, per-ton price, and full quote scope.
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
