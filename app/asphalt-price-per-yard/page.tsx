import Link from "next/link";

import { Cuboid, Scale } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Convert asphalt price per yard into tons, tonnes, and project cost with simple planning notes for asphalt, blacktop, and tarmac.";

export const metadata = buildMetadata({
  title: "Asphalt Price Per Yard | Tons, Tonnes & Cost Guide",
  description: pageDescription,
  path: "/asphalt-price-per-yard"
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
      "Asphalt is commonly discussed by ton for material planning, but some people search by cubic yard when comparing volume, truck loads, or excavation math."
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
          webAppSchema({
            name: "Asphalt Price Per Yard Guide",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-price-per-yard`
          }),
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
              Use this page to convert yards into tons before comparing supplier or contractor prices.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Quick rule", "One cubic yard of asphalt is roughly 2 tons at common planning density."],
              ["Updated", "Content last reviewed May 2026 for unit clarity and quote comparison."],
              ["Estimate only", "Mix type and compaction can change the actual weight per cubic yard."]
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

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={faqs} />
          </section>
        </div>
      </section>
    </>
  );
}
