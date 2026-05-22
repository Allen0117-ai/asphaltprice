import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Calculator, Layers3, ShieldCheck } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Estimate tar and chip driveway cost with square footage, surface scope, prep work, and comparison notes for asphalt driveways.";

export const metadata = buildMetadata({
  title: "Tar and Chip Driveway Cost Calculator | Estimate Method",
  description: pageDescription,
  path: "/tar-and-chip-driveway-cost-calculator"
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
              Use this page to estimate a tar and chip driveway by square footage and quote scope. It also helps you
              compare chip seal with a hot mix asphalt driveway.
            </p>
          </div>

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
                Use these pages to compare tar and chip with asphalt and other driveway surfaces.
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
