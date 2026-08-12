import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Calculator, Layers3, ShieldCheck } from "lucide-react";

import { TarChipCostCalculator } from "@/components/calculator/tar-chip-cost-calculator";
import { ContentCredentials } from "@/components/content/content-credentials";
import { DirectAnswer } from "@/components/content/direct-answer";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema, webPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const path = "/tar-and-chip-driveway-cost-calculator";

const pageDescription =
  "Estimate tar and chip driveway cost with square footage, surface scope, prep work, and comparison notes for asphalt driveways.";

export const metadata = buildMetadata({
  title: "Tar and Chip Driveway Cost Calculator | Estimate Method",
  description: pageDescription,
  path
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Tar and Chip Driveway Cost Calculator", href: "/tar-and-chip-driveway-cost-calculator" }
];

const faqs = [
  {
    question: "How do I estimate tar and chip driveway cost?",
    answer:
      "Measure the square footage, ask for a price per square foot for your surface scope, then add base repair, grading, drainage, and access costs."
  },
  {
    question: "Is tar and chip the same as asphalt?",
    answer:
      "No. Tar and chip, also called chip seal, uses liquid binder and stone. Asphalt driveway paving uses hot mix asphalt placed and compacted as a mat."
  },
  {
    question: "Can I use an asphalt tonnage calculator for tar and chip?",
    answer:
      "Not directly. Tar and chip is usually compared by square foot and surface scope, while asphalt tonnage uses hot mix density and thickness."
  },
  {
    question: "What should a tar and chip quote include?",
    answer:
      "Ask about base prep, binder application, stone type, number of coats, compaction, edge cleanup, drainage, and whether old surface repair is included."
  },
  {
    question: "Should I compare tar and chip with asphalt?",
    answer:
      "Yes. Compare upfront cost, surface finish, maintenance, expected life, and whether local contractors commonly install both options."
  }
];

const estimateSteps = [
  {
    title: "Measure square footage",
    text: "Length times width gives the main driveway area. Add turnarounds, flares, and parking pads."
  },
  {
    title: "Ask for scope",
    text: "Confirm one coat or multiple coats, stone type, base repair, and whether grading is included."
  },
  {
    title: "Compare full price",
    text: "Use the same area and prep assumptions when comparing tar and chip, asphalt, or gravel."
  }
] as const;

const relatedPages = [
  {
    href: "/driveway-cost-calculator",
    title: "Driveway cost calculator",
    text: "Compare driveway materials before choosing a surface."
  },
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost",
    text: "Estimate hot mix asphalt as the paved alternative."
  },
  {
    href: "/asphalt-cost-per-square-foot",
    title: "Asphalt cost per square foot",
    text: "Compare installed square-foot pricing with asphalt."
  },
  {
    href: "/asphalt-contractor-guide",
    title: "Contractor quote checklist",
    text: "Use the same quote-scope habits for any driveway surface."
  }
] as const;

export default function TarAndChipDrivewayCostCalculatorPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Tar and Chip Driveway Cost Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/tar-and-chip-driveway-cost-calculator`
          }),
          webPageSchema({ name: "Tar and Chip Driveway Cost Calculator", description: pageDescription, path }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Layers3 className="h-3.5 w-3.5" />
              Chip seal planning
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Tar and Chip Driveway Cost Calculator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Estimate a tar and chip driveway from its square footage and the work included in the quote. It also
              helps you compare chip seal with a hot mix asphalt driveway.
            </p>
          </div>

          <ContentCredentials path={path} />

          <DirectAnswer question="How do I estimate tar and chip driveway cost?">
            <p>
              Estimate tar and chip driveway cost by measuring the finished square footage and multiplying it by a
              local contractor&apos;s written price per square foot, then adding any separately quoted preparation. Unlike
              hot mix asphalt, chip seal should not be estimated with the site&apos;s asphalt tonnage formula because the
              system uses liquid binder and aggregate applied in one or more coats. Ask the contractor to identify the
              binder, stone type, number of coats, rolling, base repair, grading, drainage, mobilization, tax, and
              cleanup included in the rate. Because local conditions vary, enter the contractor&apos;s written rate instead
              of relying on a national average. Two quotes are comparable only when they cover the same area and scope. Tar
              and chip may suit a long rural drive or an existing stable base, but appearance, loose stone, contractor
              availability, maintenance, and expected service life differ from hot mix asphalt. Confirm site suitability
              with an experienced local installer.
            </p>
          </DirectAnswer>

          <TarChipCostCalculator />

          <section className="grid gap-4 md:grid-cols-3">
            {estimateSteps.map((item) => (
              <Card key={item.title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Tar and chip versus hot mix asphalt</h2>
            <p className="text-xs text-zinc-500 sm:hidden">Swipe the table left or right to see every column.</p>
            <div className="overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-[0.14em] text-zinc-500"><tr><th className="px-4 py-3 font-medium">Question</th><th className="px-4 py-3 font-medium">Tar and chip</th><th className="px-4 py-3 font-medium">Hot mix asphalt</th></tr></thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-600">
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Estimating unit</td><td className="px-4 py-3">Square foot and coat scope</td><td className="px-4 py-3">Tons plus installed scope</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Surface</td><td className="px-4 py-3">Exposed aggregate texture</td><td className="px-4 py-3">Dense compacted mat</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Quote detail</td><td className="px-4 py-3">Binder, stone, coats, rolling</td><td className="px-4 py-3">Mix, tons, thickness, compaction</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Best next check</td><td className="px-4 py-3">Local installer experience</td><td className="px-4 py-3">Plant and paving quote</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Worked quote example</h2>
            <p className="text-sm leading-7 text-zinc-600">
              For a 1,000-square-foot driveway, multiply 1,000 by the contractor&apos;s stated square-foot rate. If base
              repair is a separate fixed line item, add it after the surface calculation. Do not add an asphalt tonnage
              estimate, because chip seal uses a different material system. Keep the rate, coat count, stone, binder,
              prep, and cleanup in writing so a lower number does not hide a smaller scope.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Calculator className="h-4 w-4" />
                Estimate method
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Simple tar and chip cost formula</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Estimated cost = driveway square footage x quoted price per square foot.</p>
                <p>
                  Then add any separate line items for grading, base stone, drainage correction, edge work, or repairs.
                  Ask the contractor to write the number of coats and stone type clearly.
                </p>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Important difference</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Do not compare a chip seal square-foot quote with an asphalt tonnage quote unless both include the
                  same prep work and finished driveway area.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related driveway cost pages</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Compare tar and chip with asphalt and other driveway surfaces before requesting quotes.
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
