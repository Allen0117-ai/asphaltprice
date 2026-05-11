import Link from "next/link";

import { ArrowRight, Home, Layers3, Scale } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Estimate driveway cost for asphalt, concrete, and gravel, then compare material tradeoffs before asking for quotes.";

export const metadata = buildMetadata({
  title: "Driveway Cost Calculator",
  description: pageDescription,
  path: "/driveway-cost-calculator"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Driveway Cost Calculator", href: "/driveway-cost-calculator" }];

const quickNav = [
  { label: "Calculator", href: "#calculator" },
  { label: "Material comparison", href: "#materials" },
  { label: "Planning factors", href: "#planning" },
  { label: "Quote tips", href: "#quotes" },
  { label: "Related tools", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const materials = [
  {
    title: "Asphalt",
    text: "A practical balance of upfront cost, finished look, and repairability for many residential driveways."
  },
  {
    title: "Concrete",
    text: "Often higher upfront, but common when homeowners want a lighter surface and a longer-term finish."
  },
  {
    title: "Gravel",
    text: "Usually the lowest-cost option, but it needs more ongoing grading, edging, and replenishment."
  }
] as const;

const planningFactors = [
  {
    title: "Size and shape",
    text: "Long drives, wide parking pads, turnarounds, and curved edges can change the budget even when the material stays the same."
  },
  {
    title: "Base and drainage",
    text: "A driveway that needs grading, stone base, drainage correction, or old surface removal will cost more than a simple surface install."
  },
  {
    title: "How finished it needs to feel",
    text: "Gravel can solve a budget problem, asphalt gives a paved surface, and concrete is often chosen when the finish matters most."
  }
] as const;

const faqs = [
  {
    question: "What does this page cover?",
    answer: "It compares common driveway material options so you can see a rough budget band before asking for quotes."
  },
  {
    question: "Why keep gravel in the mix?",
    answer: "Gravel gives you a lower-cost baseline when you are still deciding on the final surface."
  },
  {
    question: "Is the estimate final?",
    answer: "No. It is a planning number. A contractor still needs to inspect the site before giving a final quote."
  },
  {
    question: "What should I compare in real bids?",
    answer: "Compare thickness, base work, drainage, cleanup, warranty, and access assumptions before comparing only the total."
  }
];

export default function DrivewayCostPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Driveway Cost Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Home className="h-3.5 w-3.5" />
              Driveway budget planning
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Driveway Cost Calculator</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Compare asphalt, concrete, and gravel driveway costs with one set of measurements. Use the range as a
              planning baseline before you talk to local contractors.
            </p>
          </div>

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <div id="calculator" className="scroll-mt-24">
            <AsphaltCalculator mode="driveway" defaultValues={{ areaSqFt: 800, thicknessInches: 3, wastePercent: 7, region: "national" }} />
          </div>

          <section id="materials" className="scroll-mt-24 grid gap-4 md:grid-cols-3">
            {materials.map((item) => (
              <Card key={item.title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section id="planning" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Plan the driveway budget around the site</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Material is only one part of the number. The same driveway can price differently if the base, drainage,
                shape, or finish expectation changes.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {planningFactors.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="quotes" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Use the estimate to compare quotes</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Ask each contractor to price the same area, thickness, base prep, and cleanup scope.</p>
                <p>A lower number is not always better if it skips base repair, drainage, or edge work.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Read the cost guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-contractor-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Contractor quote checklist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <Scale className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Compare the full scope</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Driveway cost is not just surface material. Prep work, drainage, access, and local labor can move the
                  real bid up or down.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="related-tools" className="scroll-mt-24 border-y border-zinc-200 bg-zinc-50 px-4 py-8">
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/asphalt-driveway-cost-calculator" className="rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300">
                <Layers3 className="h-5 w-5 text-amber-600" />
                <p className="mt-3 text-base font-medium text-zinc-950">Asphalt driveway cost</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Focus only on asphalt driveway pricing.</p>
              </Link>
              <Link href="/asphalt-vs-concrete-driveway-cost-calculator" className="rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300">
                <Layers3 className="h-5 w-5 text-amber-600" />
                <p className="mt-3 text-base font-medium text-zinc-950">Asphalt vs concrete</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Compare the two common paved driveway choices.</p>
              </Link>
              <Link href="/asphalt-prices-by-state" className="rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300">
                <Layers3 className="h-5 w-5 text-amber-600" />
                <p className="mt-3 text-base font-medium text-zinc-950">Prices by state</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Use broad regional price bands as a market check.</p>
              </Link>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </section>
        </div>
      </section>
    </>
  );
}
