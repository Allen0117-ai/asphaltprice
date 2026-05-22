import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, MapPin, PhoneCall } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Find a practical asphalt price per ton near me starting point, then compare local material, delivered, and installed quotes.";

export const metadata = buildMetadata({
  title: "Asphalt Price Per Ton Near Me | Local Quote Guide",
  description: pageDescription,
  path: "/asphalt-price-per-ton-near-me"
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Price Per Ton Near Me", href: "/asphalt-price-per-ton-near-me" }
];

const faqs = [
  {
    question: "How do I find asphalt price per ton near me?",
    answer:
      "Start with a regional price band, then ask local asphalt plants and paving contractors for material-only, delivered, and installed pricing."
  },
  {
    question: "Why is the local price different from a national average?",
    answer:
      "Asphalt pricing changes with plant distance, fuel, labor, season, minimum load charges, base repair, and how much prep work the job needs."
  },
  {
    question: "Is price per ton the final driveway cost?",
    answer:
      "No. Price per ton is usually material-focused. A complete driveway quote can also include removal, grading, base stone, trucking, labor, cleanup, and permits."
  },
  {
    question: "Can I use this outside the U.S.?",
    answer:
      "Yes as a method. In Canada, confirm whether the supplier uses tons or tonnes. In the UK, contractors may call the material tarmac and quote by tonne or square metre."
  }
];

const quoteChecks = [
  "Ask whether the number is material-only, delivered, or fully installed.",
  "Confirm the asphalt mix, compacted thickness, and minimum load charge.",
  "Ask if base repair, grading, drainage, removal, and cleanup are included.",
  "Get the quote date because asphalt and fuel prices can move quickly."
] as const;

const relatedPages = [
  {
    href: "/hot-mix-asphalt-cost-per-ton",
    title: "Hot mix asphalt cost per ton",
    text: "Understand the material unit behind local per-ton quotes."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Calculate how many tons you need before calling suppliers."
  },
  {
    href: "/asphalt-cost-per-square-foot",
    title: "Asphalt cost per square foot",
    text: "Compare installed quotes in a more homeowner-friendly unit."
  },
  {
    href: "/parking-lot-paving-cost-calculator",
    title: "Parking lot paving cost",
    text: "Use local per-ton pricing inside a full lot estimate."
  }
] as const;

export default function AsphaltPricePerTonNearMePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Price Per Ton Near Me Guide",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-price-per-ton-near-me`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <MapPin className="h-3.5 w-3.5" />
              Local price check
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Price Per Ton Near Me</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this page to turn a broad asphalt price into a local quote checklist. The safest number comes from
              comparing nearby plant or contractor prices for the same material, thickness, and delivery scope.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Updated", "Content last reviewed May 2026 for local asphalt quote planning."],
              ["Estimate only", "Use this as a starting point. Local suppliers and contractors set the final price."],
              ["Unit check", "U.S. quotes often use tons; Canada and the UK may use tonnes or tarmac wording."]
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
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What to ask before you trust the number</h2>
              <p className="text-sm leading-7 text-zinc-600">
                A nearby asphalt price can mean several different things. Material at the plant, delivered material,
                and installed asphalt are not the same price. Ask each supplier or contractor to write the scope clearly.
              </p>
              <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                {quoteChecks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <PhoneCall className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Best next step</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Check the state price band first, calculate tonnage second, then call local suppliers with the same
                  quantity and unit.
                </p>
                <Link href="/asphalt-prices-by-state" className="inline-flex text-sm font-medium text-amber-700">
                  See state price bands
                </Link>
              </CardContent>
            </Card>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={faqs} />
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Use local per-ton prices with these pages</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                After you have a local price, these pages help you check quantity, square-foot cost, and full paving scope.
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
        </div>
      </section>
    </>
  );
}
