import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, BookOpen, MapPinned } from "lucide-react";

import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { regionPricing, stateBuckets } from "@/lib/calculator/regional-prices";
import { formatCurrency } from "@/lib/calculator/formulas";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "U.S. asphalt prices by state group, with regional cost bands, quote checks, tonnage tips, and links to related calculators.";

export const metadata = buildMetadata({
  title: "U.S. Asphalt Prices by State | Regional Pricing Guide",
  description: pageDescription,
  path: "/asphalt-prices-by-state"
});

const quickNav = [
  { label: "State bands", href: "#state-bands" },
  { label: "Why prices vary", href: "#why-vary" },
  { label: "How to use", href: "#how-to-use" },
  { label: "Related tools", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const faqs = [
  {
    question: "Are these exact state prices?",
    answer: "No. They are broad planning bands grouped by region so you have a quick starting point."
  },
  {
    question: "Why not use ZIP code pricing?",
    answer: "ZIP-level pricing needs live local data. This first version stays simple and honest."
  },
  {
    question: "When should I get a real quote?",
    answer: "Once the project size and surface type are known, ask a local contractor to inspect the site."
  },
  {
    question: "Should I use state prices or the calculator first?",
    answer: "Use both. The state page gives a regional band, and the calculator turns your actual area into tonnage and cost."
  },
  {
    question: "How do I calculate total cost for my state?",
    answer:
      "First calculate tonnage with the main calculator or the tonnage page. Then multiply by your state group's price per ton and add labor or prep if you need a full project budget."
  },
  {
    question: "Can I use this with a blacktop calculator?",
    answer:
      "Yes. Blacktop is another common name for asphalt, so the same regional pricing logic applies."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "U.S. Asphalt Prices by State", href: "/asphalt-prices-by-state" }];

const whyPricesVary = [
  {
    title: "Labor and season",
    text:
      "Short paving seasons and busy local markets can raise bids because crews have less flexible scheduling."
  },
  {
    title: "Haul distance",
    text:
      "Asphalt is time-sensitive. The farther the plant is from the project, the more delivery and timing can affect price."
  },
  {
    title: "Base and drainage",
    text:
      "A state price band cannot see your driveway. Soft base, poor drainage, and removal work can move the final quote."
  },
  {
    title: "Access",
    text:
      "Easy suburban access is different from a tight city driveway, long rural lane, or steep site with limited staging room."
  }
] as const;

const relatedPages = [
  {
    href: "/#calculator",
    title: "Main asphalt calculator",
    text: "Go back to the main page for tonnage and pricing together."
  },
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost calculator",
    text: "Turn your actual square footage into tonnage and a rough installed range."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Check the material quantity before you compare regional prices."
  },
  {
    href: "/asphalt-cost-guide",
    title: "Asphalt cost guide",
    text: "Understand the price factors that state averages cannot see."
  },
  {
    href: "/asphalt-contractor-guide",
    title: "Asphalt contractor guide",
    text: "Use the regional band to ask better questions when bids come in."
  }
] as const;

export default function AsphaltPricesByStatePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Prices by State",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-prices-by-state`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <MapPinned className="h-3.5 w-3.5" />
              Broad state-level bands
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              U.S. Asphalt Prices by State
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              This page groups U.S. states into practical pricing bands so you can start with a realistic range before
              a local bid. Outside the U.S., use the tonnage calculator and enter your local price per ton or tonne.
            </p>
          </div>

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <section id="state-bands" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpen className="h-4 w-4" />
                State bands
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">Use your state group as a starting point</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                These are broad planning ranges, not live local quotes. They are useful when you want to know whether
                your first estimate is in the right neighborhood before you call local contractors.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stateBuckets.map((bucket) => {
                const pricing = regionPricing[bucket.region];

                return (
                  <Card key={bucket.label} className="border-zinc-200">
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-lg font-semibold text-zinc-950">{bucket.label}</p>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{pricing.note}</p>
                      </div>

                      <div className="space-y-2 text-sm text-zinc-600">
                        <p>
                          Material: {formatCurrency(pricing.asphaltMaterialLow)} - {formatCurrency(pricing.asphaltMaterialHigh)} per ton
                        </p>
                        <p>
                          Installed: {formatCurrency(pricing.asphaltInstalledLow)} - {formatCurrency(pricing.asphaltInstalledHigh)} per ton
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bucket.states.map((state) => (
                          <span key={state} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
                            {state}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Use this page", "To get a rough regional range when you do not yet have a local quote."],
              ["Use the calculator", "To turn your square footage into tonnage and project cost."],
              ["Use a contractor bid", "To confirm the real number once the site has been inspected."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section id="why-vary" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Why asphalt prices vary by state</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                State-level pricing changes because paving is local. Plant access, labor rates, weather windows,
                delivery distance, and site prep all affect the number before the asphalt even reaches the driveway.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {whyPricesVary.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="how-to-use" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How to use these bands</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Use the state group as a starting point, then enter your actual square footage in the main
                  calculator or tonnage page.
                </p>
                <p>When you compare bids, keep thickness, prep scope, and cleanup assumptions the same.</p>
                <p>
                  If a quote is far outside the band, do not reject it immediately. Ask what is included. The difference
                  may be removal, base repair, drainage, access, or a thicker asphalt section.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Open driveway calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Read the cost guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Best use</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Treat these prices as a broad market check. A real local bid should still confirm base condition,
                  drainage, access, and current material availability.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="related-tools" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Use state prices with these tools</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                The state band is only one piece. These pages help you calculate quantity, estimate driveway cost, and
                compare written quotes.
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

          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Back to the calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
