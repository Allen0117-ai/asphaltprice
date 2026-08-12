import Link from "next/link";

import { Cuboid, Scale } from "lucide-react";

import { AsphaltFormulaFigure } from "@/components/content/asphalt-formula-figure";
import { ContentCredentials } from "@/components/content/content-credentials";
import { DirectAnswer } from "@/components/content/direct-answer";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { articleSchema, buildMetadata, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo";

const path = "/asphalt-price-per-yard";

const pageDescription =
  "Convert asphalt price per yard into tons, tonnes, and project cost with simple planning notes for asphalt, blacktop, and tarmac.";

export const metadata = buildMetadata({
  title: "Asphalt Price Per Yard | Tons, Tonnes & Cost Guide",
  description: pageDescription,
  path
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Price Per Yard", href: "/asphalt-price-per-yard" }];

const faqs = [
  {
    question: "How many tons are in a cubic yard of asphalt?",
    answer:
      "At the planning density used on this site, one cubic yard of asphalt is roughly 2 tons. The exact weight changes by mix and compaction."
  },
  {
    question: "Is asphalt usually sold by yard or ton?",
    answer:
      "Asphalt is commonly discussed by ton for material planning, while cubic yards can help when comparing volume, truck loads, or excavation work."
  },
  {
    question: "Can I convert price per yard to price per ton?",
    answer:
      "Yes for planning. If one cubic yard is about 2 tons, divide the price per cubic yard by 2 to estimate price per ton."
  },
  {
    question: "Does this work for tarmac?",
    answer:
      "Yes as a rough conversion method, but UK tarmac quotes often use metric tonnes or square metres, so match the contractor unit before comparing."
  }
];

export default function AsphaltPricePerYardPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({ name: "Asphalt Price Per Yard Guide", description: pageDescription, path }),
          webPageSchema({ name: "Asphalt Price Per Yard Guide", description: pageDescription, path }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Cuboid className="h-3.5 w-3.5" />
              Yard to ton conversion
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Price Per Yard</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Asphalt is usually easier to price by ton, but cubic yards are useful when you are thinking in volume.
              Convert yards into tons before comparing supplier or contractor prices.
            </p>
          </div>

          <ContentCredentials path={path} />

          <DirectAnswer question="How do I convert asphalt price per yard to price per ton?">
            <p>
              Asphalt is normally easier to order and price by weight, but a cubic-yard figure can be converted for
              early planning. This site uses a rounded rule of about two short tons per cubic yard, based on a planning
              density near 145 pounds per cubic foot. Multiply cubic yards by two to estimate tons, or divide a quoted
              price per cubic yard by two to estimate price per ton. The rule is not a supplier guarantee. Actual weight
              changes with aggregate, mix design, temperature, air voids, moisture, and compaction, and a loose truck
              volume is not the same as compacted pavement volume. Before ordering, ask the plant to confirm the mix
              density, sales unit, minimum load, and whether the quote includes delivery. For a real project, area and
              compacted thickness produce a better quantity estimate than guessing cubic yards. Use the tonnage
              calculator, then confirm the final order with the supplier.
            </p>
          </DirectAnswer>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Quick rule", "One cubic yard of asphalt is roughly 2 tons at common planning density."],
              ["Why it varies", "Mix type and compaction can change the actual weight per cubic yard."],
              ["Before ordering", "Confirm the mix, weight, and delivery terms with the supplier."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Simple conversion</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Estimated tons = cubic yards × 2.</p>
                <p>Estimated price per ton = price per cubic yard ÷ 2.</p>
                <p>
                  This is good for early planning, but a real supplier quote should confirm the mix, truck minimum,
                  density, and whether the number includes delivery.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <Scale className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Need the exact material amount?</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Use the tonnage calculator with your area and thickness so the estimate matches the project shape.
                </p>
                <Link href="/asphalt-tonnage-calculator" className="inline-flex text-sm font-medium text-amber-700">
                  Open tonnage calculator
                </Link>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Worked conversion examples</h2>
            <p className="text-xs text-zinc-500 sm:hidden">Swipe the table left or right to see every column.</p>
            <div className="overflow-x-auto rounded-lg border border-zinc-200">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-[0.14em] text-zinc-500">
                  <tr><th className="px-4 py-3 font-medium">Starting value</th><th className="px-4 py-3 font-medium">Planning conversion</th><th className="px-4 py-3 font-medium">Use</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-600">
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">1 cubic yard</td><td className="px-4 py-3">About 2 short tons</td><td className="px-4 py-3">Quick volume-to-weight check</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">5 cubic yards</td><td className="px-4 py-3">About 10 short tons</td><td className="px-4 py-3">Small project planning</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-zinc-950">Quoted price per yard</td><td className="px-4 py-3">Divide by about 2</td><td className="px-4 py-3">Approximate price per ton</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-7 text-zinc-600">
              These examples all depend on the same density assumption. Read why the value is approximate on the{" "}
              <Link href="/methodology" className="font-medium text-amber-800 underline underline-offset-4">data and methodology page</Link>.
            </p>
          </section>

          <AsphaltFormulaFigure />

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Why a yard-based quote needs extra care</h2>
            <p className="text-sm leading-7 text-zinc-600">
              Excavation and aggregate work often use cubic yards, while hot mix asphalt is commonly sold by weight.
              Ask whether “yard” means a measured loose volume, a truck body estimate, or a calculated compacted volume.
              Then confirm the material type, density, delivery, minimum load, and tax. A written weight ticket is more
              precise than a generic two-tons-per-yard shortcut.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={faqs} />
          </section>
        </div>
      </section>
    </>
  );
}
