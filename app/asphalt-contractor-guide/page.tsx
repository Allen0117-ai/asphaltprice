import Link from "next/link";

import { ArrowRight, CheckCircle2, ClipboardList, FileQuestion, TriangleAlert } from "lucide-react";

import { ComparisonTable } from "@/components/content/comparison-table";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription = "Learn how to compare asphalt contractor quotes, spot red flags, and ask better paving questions.";

export const metadata = buildMetadata({
  title: "Asphalt Contractor Guide",
  description: pageDescription,
  path: "/asphalt-contractor-guide"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Contractor Guide", href: "/asphalt-contractor-guide" }];

const quoteChecks = [
  {
    title: "Thickness and tonnage",
    text:
      "A good quote should state the planned asphalt thickness and explain whether that number is compacted thickness or loose placement thickness."
  },
  {
    title: "Base preparation",
    text:
      "Ask whether the price includes removal, grading, stone base, compaction, and drainage work. These items can change the final cost more than the asphalt layer."
  },
  {
    title: "Cleanup and access",
    text:
      "Confirm who handles debris, old asphalt, edges, staging, and cleanup. Tight access or long haul distance should be mentioned before work starts."
  }
] as const;

const redFlags = [
  "The bid does not list thickness or prep work.",
  "The contractor asks for full payment before work begins.",
  "The quote is far lower than the others without explaining why.",
  "Cleanup, edges, drainage, or warranty terms are vague.",
  "The contractor pressures you to decide immediately."
] as const;

const questions = [
  "What thickness are you installing after compaction?",
  "What base work is included in this price?",
  "Will you remove old asphalt or pave over it?",
  "How will you handle drainage and low spots?",
  "What cleanup is included after the job is done?",
  "Is there a written warranty, and what does it cover?"
] as const;

const hiringStages = [
  {
    title: "Before you call",
    text: "Measure the area, take a few photos, and write down drainage problems, cracks, soft spots, and access limits."
  },
  {
    title: "During the site visit",
    text: "Ask the contractor to explain prep work, compacted thickness, edges, drainage, cleanup, timing, and payment terms."
  },
  {
    title: "Before you sign",
    text: "Compare written scope first, then compare price. A bid without details is not ready to approve."
  }
] as const;

const bidComparisonRows = [
  {
    item: "Thickness",
    good: "Lists compacted asphalt thickness.",
    warning: "Only says thin overlay or new asphalt."
  },
  {
    item: "Base prep",
    good: "Explains grading, stone, compaction, and soft-area repair.",
    warning: "Prep work is missing or marked as extra."
  },
  {
    item: "Removal",
    good: "States whether old asphalt is removed, hauled away, or paved over.",
    warning: "Old surface plan is unclear."
  },
  {
    item: "Drainage",
    good: "Mentions slope, low spots, water direction, and edges.",
    warning: "Water problems are ignored."
  },
  {
    item: "Payment",
    good: "Uses a written deposit, milestone, or completion schedule.",
    warning: "Requires full payment before work starts."
  }
] as const;

const faqs = [
  {
    question: "Should I get more than one asphalt quote?",
    answer: "Yes. Two or three quotes make it easier to compare scope, thickness, prep work, and pricing."
  },
  {
    question: "Is the cheapest asphalt contractor the best choice?",
    answer: "Not always. A low bid can be fine, but only if it includes the same thickness, prep work, cleanup, and warranty as the other quotes."
  },
  {
    question: "What should I compare first?",
    answer: "Compare thickness, base preparation, removal, drainage, cleanup, and warranty before comparing the total price."
  }
];

export default function AsphaltContractorGuidePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Contractor Guide",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-contractor-guide`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Quote review guide
            </div>
            <h1 className="text-4xl font-semibold text-zinc-950 sm:text-5xl">Asphalt Contractor Guide</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this guide after you run the asphalt calculator and before you choose a paving contractor. The goal
              is simple: compare quotes fairly, understand what each bid includes, and avoid surprises after the crew
              arrives.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {hiringStages.map((item, index) => (
              <Card key={item.title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-amber-700">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quoteChecks.map((item) => (
              <Card key={item.title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <ClipboardList className="h-4 w-4" />
                Quote comparison
              </div>
              <h2 className="text-2xl font-semibold text-zinc-950">How to compare asphalt bids</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Start by making sure every contractor is pricing the same project. If one quote includes removal,
                  grading, and cleanup while another only includes the new asphalt layer, the totals are not comparable.
                </p>
                <p>
                  Ask each contractor to write down the planned thickness, base prep, drainage assumptions, cleanup
                  scope, and warranty. Once the scope is clear, you can compare the total price with more confidence.
                </p>
                <p>
                  Your calculator estimate is useful here because it gives you a neutral baseline. If a bid is much
                  higher or lower than your planning range, ask what changed before you accept or reject it.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Open asphalt calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Read the cost guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-5 w-5 text-amber-600" />
                  <p className="text-base font-medium text-zinc-950">Red flags to watch</p>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                  {redFlags.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
              <FileQuestion className="h-4 w-4" />
              Bid comparison worksheet
            </div>
            <h2 className="text-2xl font-semibold text-zinc-950">What a clear quote should include</h2>
            <ComparisonTable
              rowLabel="Bid item"
              columns={[
                { key: "good", label: "Good quote" },
                { key: "warning", label: "Warning sign" }
              ]}
              rows={bidComparisonRows.map((row) => ({
                label: row.item,
                cells: {
                  good: row.good,
                  warning: row.warning
                }
              }))}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-950">Questions to ask before hiring</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                You do not need to be an asphalt expert to ask smart questions. These basics help you understand the
                scope and make sure the quote covers the work you actually need.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {questions.map((item) => (
                <div key={item} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-600">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-950">Common questions</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>
    </>
  );
}
