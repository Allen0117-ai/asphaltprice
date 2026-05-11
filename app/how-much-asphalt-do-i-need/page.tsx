import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, Calculator, ClipboardCheck, PackageCheck, Ruler, Scale, Truck } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "A beginner-friendly guide to measuring, calculating, adding waste, and ordering asphalt.";

export const metadata = buildMetadata({
  title: "How Much Asphalt Do I Need?",
  description: pageDescription,
  path: "/how-much-asphalt-do-i-need"
});

const faqs = [
  {
    question: "What is the easiest way to measure a driveway?",
    answer: "Measure the paved length and width in feet. For an odd shape, split it into smaller rectangles and add the areas together."
  },
  {
    question: "How much extra asphalt should I order?",
    answer: "Most small projects use a 5% to 10% waste allowance. Use more if the shape has curves, tight corners, or awkward access."
  },
  {
    question: "Should I order from the exact calculated tons?",
    answer: "No. Treat the calculation as a planning number, then confirm the final order with the supplier or contractor before delivery."
  }
] as const;

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "How Much Asphalt Do I Need?", href: "/how-much-asphalt-do-i-need" }];

const quickNav = [
  { label: "Quick answer", href: "#quick-answer" },
  { label: "Step guide", href: "#steps" },
  { label: "Waste", href: "#waste" },
  { label: "Related tools", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const guideSteps = [
  {
    icon: Ruler,
    title: "Measure the finished area",
    text:
      "Measure only the space that will be paved. For a rectangle, multiply length by width. For an L-shape, measure each rectangle separately and add them together."
  },
  {
    icon: Scale,
    title: "Choose the asphalt thickness",
    text:
      "Thickness changes the order quickly. A light overlay may use less material, while a new driveway or damaged base often needs a thicker layer."
  },
  {
    icon: Calculator,
    title: "Convert the area into tons",
    text:
      "A plain planning formula is area in square feet times thickness in feet times 145, divided by 2,000. That gives an estimated U.S. tonnage."
  },
  {
    icon: ClipboardCheck,
    title: "Add a waste allowance",
    text:
      "Add 5% for simple rectangular work, 7% to 10% for normal driveways, and more for curves, patches, hand work, or hard truck access."
  },
  {
    icon: Truck,
    title: "Round into an order amount",
    text:
      "Suppliers may sell by the ton, truckload, or batch minimum. Round in the way your supplier requires, then keep the written quantity with your quote."
  },
  {
    icon: PackageCheck,
    title: "Check the number before delivery",
    text:
      "Before ordering, confirm area, thickness, base condition, and waste with the person doing the work. This prevents under-ordering and expensive return trips."
  }
] as const;

const wasteGuide = [
  ["5%", "Simple rectangles with easy truck access."],
  ["7% to 10%", "Most small driveways, parking pads, and homeowner projects."],
  ["10%+", "Curves, repairs, tight access, hand placement, or uncertain measurements."]
] as const;

const relatedPages = [
  {
    href: "/asphalt-tonnage-calculator",
    title: "Use the tonnage calculator",
    text: "Enter your measured area and thickness when you want the number calculated for you."
  },
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Estimate the installed cost",
    text: "Use the same area to turn quantity into a rough driveway budget."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Check regional price bands",
    text: "See whether your local quote looks low, normal, or high for your area."
  }
] as const;

export default function HowMuchAsphaltPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "How Much Asphalt Do I Need?",
            description: pageDescription,
            url: `${siteConfig.url}/how-much-asphalt-do-i-need`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Ruler className="h-3.5 w-3.5" />
              Beginner measuring guide
            </div>
            <h1 className="text-4xl font-semibold text-zinc-950 sm:text-5xl">How Much Asphalt Do I Need?</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this as a plain-English order guide: measure the paved area, choose a thickness, add waste, and turn
              the result into a safer asphalt order amount.
            </p>
          </div>

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <section id="quick-answer" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)]">
            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase text-zinc-500">Quick answer</p>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Asphalt amount starts with volume: square feet times thickness. Then convert that volume into weight
                  and add waste so the order has room for real jobsite conditions.
                </p>
                <p className="rounded-lg bg-zinc-50 p-4 font-medium text-zinc-800">
                  Area x thickness in feet x 145 lb/ft3 / 2,000 = estimated tons before waste.
                </p>
              </div>
            </div>

            <Card className="border-zinc-200 bg-zinc-950 text-white">
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold uppercase text-amber-200">Example</p>
                <p className="text-2xl font-semibold">500 sq ft at 3 inches</p>
                <p className="text-sm leading-6 text-zinc-200">
                  500 x 0.25 x 145 / 2,000 = about 9.1 tons before waste. With 7% waste, plan around 9.7 tons.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="steps" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-950">Step-by-step order guide</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {guideSteps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Card key={item.title} className="border-zinc-200">
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-800">
                          {index + 1}
                        </span>
                        <Icon className="h-5 w-5 text-zinc-700" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-zinc-950">{item.title}</p>
                        <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="waste" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-zinc-950">Choose a waste percentage</h2>
              <p className="text-sm leading-7 text-zinc-600">
                Waste is not a trick number. It covers small measuring differences, edge work, material left in the
                truck, and changes made during placement.
              </p>
              <Link href="/asphalt-tonnage-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                Open the tonnage calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {wasteGuide.map(([amount, text]) => (
                <div key={amount} className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:grid-cols-[90px_1fr]">
                  <p className="text-lg font-semibold text-zinc-950">{amount}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="related-tools" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-950">After you know the amount</h2>
            <div className="grid gap-4 md:grid-cols-3">
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
            <h2 className="text-2xl font-semibold text-zinc-950">Common questions</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </section>

          <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Estimate the project cost next
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
