import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Scale, BookOpen } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { AsphaltUnitConverter } from "@/components/calculator/asphalt-unit-converter";
import { ContentCredentials } from "@/components/content/content-credentials";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema, webPageSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Calculate asphalt tons, tonnes, density, cubic-yard weight, and square-yards-to-tons conversions for paving material planning.";

export const metadata = buildMetadata({
  title: "Asphalt Tonnage & Density Calculator | Yards to Tons",
  description: pageDescription,
  path: "/asphalt-tonnage-calculator"
});

const quickNav = [
  { label: "Measure area", href: "#measure" },
  { label: "Pick thickness", href: "#thickness" },
  { label: "Add waste", href: "#extra" },
  { label: "Ton vs tonne", href: "#units" },
  { label: "Weight converter", href: "#weight" },
  { label: "Related tools", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const faqs = [
  {
    question: "How accurate is the tonnage estimate?",
    answer:
      "The calculation is useful for early ordering, but the actual weight can change with the asphalt mix and compaction. Confirm the density and order quantity with the supplier."
  },
  {
    question: "Why does tonnage matter?",
    answer: "Tonnage helps you order the right amount of material and compare supplier quotes without guessing."
  },
  {
    question: "What density does this use?",
    answer: "It uses 145 lb/ft³, which is a standard planning density for quick estimates."
  },
  {
    question: "Should I add waste?",
    answer: "Yes. A small waste allowance helps cover cuts, handling, and small site losses."
  },
  {
    question: "What is the difference between tons and tonnes?",
    answer: "A U.S. ton is 2,000 lb. A metric tonne is 1,000 kg, about 2,204 lb. Use the unit your supplier or contractor quotes."
  },
  {
    question: "How much asphalt is in a ton?",
    answer:
      "At the planning density used on this site, one ton covers about 83 square feet at 2 inches or about 55 square feet at 3 inches before waste."
  },
  {
    question: "What is tons per cubic yard for asphalt?",
    answer:
      "One cubic yard is roughly 2 tons at this planning density, though the exact weight changes with the mix and compaction."
  },
  {
    question: "How much does a cubic yard of asphalt weigh?",
    answer:
      "At the default density of 145 lb/ft³, one cubic yard weighs about 3,915 lb, or 1.96 U.S. short tons. Change the density when your mix design gives a better value."
  },
  {
    question: "How do I convert square yards of asphalt to tons?",
    answer:
      "Multiply square yards by 9 to get square feet, multiply by compacted depth in feet and density in lb/ft³, then divide by 2,000. The unit converter uses the same calculation."
  },
  {
    question: "Can I use this as a blacktop calculator?",
    answer:
      "Yes. Blacktop is another common name for asphalt, so the same tonnage formula works for both terms."
  },
  {
    question: "Can I use this as a tarmac calculator?",
    answer:
      "Yes. Tarmac is a common term in the UK and other markets. Use Metric for tonnes or Imperial for tons, then compare the result with your local supplier quote."
  },
  {
    question: "Can Canadian projects use this calculator?",
    answer:
      "Yes. Canada may use either tons or metric tonnes depending on the supplier, so match the calculator unit to the written quote."
  },
  {
    question: "Is this a final order quantity?",
    answer:
      "No. Treat it as a planning estimate. Ask the supplier or contractor to confirm density, truck load size, waste, and compaction before ordering."
  }
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Tonnage Calculator", href: "/asphalt-tonnage-calculator" }
];

const planningTips = [
  {
    title: "Start with finished area",
    text:
      "Measure the area you plan to pave, not the rough lot size. For odd shapes, split the project into simple rectangles and add them together."
  },
  {
    title: "Use the thickness you actually want",
    text:
      "Thin overlays and full-depth asphalt do not need the same amount of material. The extra inch or two is where the tonnage changes quickly."
  },
  {
    title: "Leave room for the real world",
    text:
      "Corners, trimming, small corrections, and the last bit left in the truck all eat into a perfect calculation. A buffer makes the order more realistic."
  }
] as const;

const relatedPages = [
  {
    href: "/#calculator",
    title: "Main asphalt calculator",
    text: "Calculate tonnage and cost from your actual project dimensions."
  },
  {
    href: "/asphalt-cost-guide",
    title: "Asphalt cost guide",
    text: "Read the pricing basics before you turn the tonnage into a budget."
  },
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost calculator",
    text: "See a rough installed range for a driveway using the same area."
  },
  {
    href: "/how-much-asphalt-do-i-need",
    title: "How much asphalt do I need?",
    text: "Use the same estimator in a plain-language how-to format."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Asphalt prices by state",
    text: "Check broad regional price bands after you know your quantity."
  },
  {
    href: "/hot-mix-asphalt-cost-per-ton",
    title: "Hot mix asphalt cost per ton",
    text: "Use the tonnage result with a material price quote."
  },
  {
    href: "/asphalt-millings-calculator",
    title: "Asphalt millings calculator",
    text: "Use a dedicated density range for recycled asphalt pavement and millings."
  },
  {
    href: "/asphalt-cost-per-square-foot",
    title: "Asphalt cost per square foot",
    text: "Convert material and installed estimates into a square-foot view."
  }
] as const;

export default function AsphaltTonnagePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Tonnage Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-tonnage-calculator`
          }),
          webPageSchema({ name: "Asphalt Tonnage Calculator", description: pageDescription, path: "/asphalt-tonnage-calculator" }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Scale className="h-3.5 w-3.5" />
              Tonnage first
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Tonnage & Density Calculator</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Calculate asphalt or tarmac tons and tonnes, then convert cubic yards or square yards using an editable
              density. Coverage and waste stay visible so the result is easier to check.
            </p>
          </div>

          <ContentCredentials path="/asphalt-tonnage-calculator" />

          <AsphaltCalculator mode="tonnage" defaultValues={{ areaSqFt: 600, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <section className="grid gap-4 md:grid-cols-3">
            {[
              ["Check the mix", "The calculator uses a density estimate. Your supplier can confirm the right value for the mix you are buying."],
              ["Match the unit", "Use U.S. tons or metric tonnes to match the supplier's order."],
              ["Allow for waste", "Curves, cuts, and fixed truck loads may require a small allowance."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Use case", "Ordering material or checking a supplier or contractor quote."],
              ["Formula", "Area × thickness × density, then add a waste allowance."],
              ["Next step", "Use the same area in the driveway cost calculator to see a pricing range."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section id="measure" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpen className="h-4 w-4" />
                Measure first
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Start with the finished area</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  The calculator works best when you enter the area you actually plan to cover. A rough lot size can
                  push the result too high, while a missing parking pad or flare can push it too low.
                </p>
                <p>
                  If the project is irregular, break it into smaller rectangles or simple shapes, add those together,
                  and then let the calculator do the rest.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Measure the paved area</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Include parking pads, flares, and other paved sections before placing an order.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="thickness" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Pick the thickness you really need</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Thickness is the part of the estimate that can move fastest. A thin overlay, a normal driveway, and a
                heavier-duty section will all use different amounts of asphalt even when the square footage is the same.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {planningTips.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="extra" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How much extra asphalt to buy</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  A perfect order leaves no room for the small things that happen on site. Waste allowance helps cover
                  cuts, rounding, handling loss, and the small amount of material that never lands exactly where you
                  expected.
                </p>
                <p>
                  Simple jobs often need only a light buffer. Projects with curves, edges, or spot repairs usually need
                  a little more so you do not run short halfway through the work.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Allow for site conditions</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Add a small allowance for odd shapes or fixed truck loads, then confirm the final quantity with the supplier.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="units" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Scale className="h-4 w-4" />
                Units
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Ton vs tonne</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Most U.S. asphalt work is discussed in tons. Metric markets often use tonnes for asphalt or tarmac.
                  Keep the unit consistent when you compare a calculator result with a quote so you do not read the
                  number too high or too low.
                </p>
                <p>
                  If you are not sure which unit a supplier used, ask them to write it out plainly before you place an
                  order.
                </p>
                <p>
                  In Canada, quotes can appear in short tons or metric tonnes. In the UK, the same type of project may
                  be described as tarmac and priced by tonne. Match the wording before comparing numbers.
                </p>
                <p>
                  At the planning density used here, one cubic yard of asphalt is roughly 2 tons, so tonnage and
                  coverage are worth checking before you order. This is the quick tons per cubic yard shortcut.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Match the quote unit</p>
                <p className="text-sm leading-6 text-zinc-600">
                  The calculator is only useful if the unit matches the quote. This is the easiest number to double-check before you buy.
                </p>
              </CardContent>
            </Card>
          </section>

          <AsphaltUnitConverter />

          <section id="related-tools" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related calculators</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                After calculating the tonnage, use these tools to check pricing and compare project costs.
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

          <section id="faq" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </section>

          <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Need the cost range too?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
