import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, CircleDollarSign, Scale, Truck } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Understand hot mix asphalt cost per ton, what changes the quote, and how to compare material, delivery, and installed pricing.";

export const metadata = buildMetadata({
  title: "Hot Mix Asphalt Cost Per Ton | Price & Quote Guide",
  description: pageDescription,
  path: "/hot-mix-asphalt-cost-per-ton"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Hot Mix Asphalt Cost Per Ton", href: "/hot-mix-asphalt-cost-per-ton" }
];

const faqs = [
  {
    question: "What does hot mix asphalt cost per ton mean?",
    answer:
      "It usually refers to the material unit price for hot mix asphalt. Delivery, installation, base work, and minimum charges may be separate."
  },
  {
    question: "Is hot mix asphalt cost per ton the same everywhere?",
    answer:
      "No. Plant distance, aggregate, binder prices, fuel, local demand, and season can all move the per-ton number."
  },
  {
    question: "Should I compare material-only or installed price?",
    answer:
      "Ask for both if possible. Material-only pricing helps you check asphalt cost, while installed pricing shows the full paving scope."
  },
  {
    question: "How do I turn per-ton price into project cost?",
    answer:
      "Calculate the tons needed, multiply by the quoted price per ton, then add delivery, labor, base repair, cleanup, and any minimum charges."
  },
  {
    question: "Is hot mix different from blacktop or tarmac?",
    answer:
      "The words can overlap in everyday searches. Contractors may say asphalt, hot mix, blacktop, or tarmac depending on region and project type."
  }
];

const quoteChecks = [
  "Is the price material-only, delivered, or installed?",
  "Which mix is being quoted?",
  "Is there a minimum load or small-job charge?",
  "Does the quote include trucking, fuel surcharge, and taxes?",
  "How long is the price valid?"
] as const;

const relatedPages = [
  {
    href: "/asphalt-price-per-ton-near-me",
    title: "Asphalt price per ton near me",
    text: "Compare local quote wording and supplier scope."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Calculate the material quantity before pricing it."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Asphalt prices by state",
    text: "Use broad regional bands as a sanity check."
  },
  {
    href: "/parking-lot-paving-cost-calculator",
    title: "Parking lot paving cost",
    text: "Use the ton price inside a full lot estimate."
  }
] as const;

export default function HotMixAsphaltCostPerTonPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Hot Mix Asphalt Cost Per Ton Guide",
            description: pageDescription,
            url: `${siteConfig.url}/hot-mix-asphalt-cost-per-ton`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <CircleDollarSign className="h-3.5 w-3.5" />
              Per-ton pricing
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Hot Mix Asphalt Cost Per Ton
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this guide to understand what a hot mix asphalt per-ton quote includes, what can be missing, and how
              to compare it with a full paving estimate.
            </p>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              ["Main unit", "Hot mix asphalt is commonly priced by ton for material planning."],
              ["Scope matters", "Material-only, delivered, and installed prices are different numbers."],
              ["Updated", "Content last reviewed May 2026 for quote-comparison clarity."]
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
                <Scale className="h-4 w-4" />
                Price math
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Turn a per-ton quote into a project estimate</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>First calculate tons. Then multiply tons by the quoted hot mix asphalt cost per ton.</p>
                <p>
                  After that, add the items that are often outside a material-only quote: trucking, minimum load,
                  base repair, labor, cleanup, and striping if the project is a parking lot.
                </p>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <Truck className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Ask before comparing</p>
                <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                  {quoteChecks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related per-ton tools</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                These pages help you move from a material unit price to a more complete budget.
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
