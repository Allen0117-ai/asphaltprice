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
  "Estimate asphalt price per ton near me with U.S. state price bands, California notes, quote checks, tonnage tips, and contractor questions.";

export const metadata = buildMetadata({
  title: "Asphalt Price Per Ton Near Me | U.S. State Pricing Guide",
  description: pageDescription,
  path: "/asphalt-prices-by-state"
});

const quickNav = [
  { label: "State bands", href: "#state-bands" },
  { label: "Price notes", href: "#price-notes" },
  { label: "Why prices vary", href: "#why-vary" },
  { label: "Contractor quotes", href: "#contractor-quotes" },
  { label: "How to use", href: "#how-to-use" },
  { label: "Related tools", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const faqs = [
  {
    question: "How do I find asphalt price per ton near me?",
    answer:
      "Use your state or region in the table as a starting range, then ask two or three nearby asphalt plants or paving contractors for the current material price per ton and delivered or installed price."
  },
  {
    question: "Is asphalt price per ton near me the same as the installed driveway price?",
    answer:
      "No. Material price per ton usually covers asphalt mix only. Installed pricing can include trucking, labor, equipment, base repair, removal, grading, cleanup, and contractor overhead."
  },
  {
    question: "Are these exact state prices?",
    answer: "No. They are broad planning bands grouped by region so you have a quick starting point before you request local quotes."
  },
  {
    question: "Why not use ZIP code pricing?",
    answer: "ZIP-level pricing needs live local plant and contractor data. This page stays simple and transparent by showing estimated regional bands."
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
  },
  {
    question: "Can Canadian or UK visitors use this page?",
    answer:
      "Yes, but treat the U.S. table as a comparison only. In Canada, ask for local asphalt price per tonne. In the UK, tarmac and asphalt pricing is usually quoted locally by tonne, square metre, or installed job."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "U.S. Asphalt Prices by State", href: "/asphalt-prices-by-state" }];

const whyPricesVary = [
  {
    title: "Local plant pricing",
    text:
      "The closest asphalt plant can change the number quickly. A search for asphalt price per ton near me should always be checked against current plant or contractor pricing."
  },
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

const priceNotes = [
  {
    title: "Updated for planning",
    text:
      "Price bands on this page are maintained as planning estimates and were last reviewed in May 2026."
  },
  {
    title: "Source and estimate basis",
    text:
      "Ranges are based on regional paving cost patterns, contractor quote comparisons, material-versus-installed differences, and typical haul and labor adjustments."
  },
  {
    title: "California and high-cost markets",
    text:
      "California, coastal metro areas, and tight urban jobs often land toward the high side because labor, trucking, access, and environmental requirements can be more expensive."
  },
  {
    title: "Canada, UK, tonne, and tarmac terms",
    text:
      "If you are outside the U.S., keep the same method but replace per ton with local per tonne pricing. UK visitors may see tarmac used as the everyday word for asphalt surfacing."
  }
] as const;

const localPriceSteps = [
  {
    title: "Start with your state band",
    text: "Use the region card to get a rough material and installed price range before you call anyone."
  },
  {
    title: "Calculate tons needed",
    text: "Use your actual area, thickness, and waste allowance so the price is tied to a real quantity."
  },
  {
    title: "Call nearby suppliers",
    text: "Ask for material-only, delivered, and installed pricing because each number means something different."
  }
] as const;

const contractorQuestions = [
  "Is this quote for material only, delivered asphalt, or fully installed asphalt?",
  "What asphalt mix, thickness, and compacted depth are included?",
  "Does the price include base repair, grading, drainage, removal, trucking, cleanup, and permits?",
  "How far is the asphalt plant from the job, and can haul time affect the price?",
  "Is the quote valid this week only, or does it include a price hold?"
] as const;

const relatedPages = [
  {
    href: "/asphalt-cost-calculator",
    title: "Asphalt cost calculator",
    text: "Estimate material and installed cost with project type included."
  },
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
              Asphalt Price Per Ton Near Me by State
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              This page groups U.S. states into practical pricing bands so you can estimate asphalt price per ton near
              me before a local bid. Outside the U.S., use the tonnage calculator and enter your local price per ton or
              tonne. Canada and UK visitors can also use the same method for asphalt, blacktop, or tarmac planning.
            </p>
          </div>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)]">
            <Card className="border-zinc-950 bg-zinc-950">
              <CardContent className="space-y-3">
                <p className="text-sm font-medium text-amber-300">Quick answer</p>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Asphalt price per ton near me usually starts with local material price, then delivery and installation.
                </h2>
                <p className="text-sm leading-6 text-zinc-300">
                  Use the state band as a planning range only. The real local number should come from a nearby asphalt
                  plant or paving contractor because haul distance, minimum load, season, and site prep can change the quote.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {localPriceSteps.map((item) => (
                <Card key={item.title} className="border-zinc-200 bg-zinc-50">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

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
                your first estimate is in the right neighborhood before you call local contractors or nearby asphalt
                plants.
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
                          Material price: {formatCurrency(pricing.asphaltMaterialLow)} - {formatCurrency(pricing.asphaltMaterialHigh)} per ton
                        </p>
                        <p>
                          Installed price: {formatCurrency(pricing.asphaltInstalledLow)} - {formatCurrency(pricing.asphaltInstalledHigh)} per ton
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
            <div className="overflow-hidden rounded-lg border border-zinc-200">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-[0.14em] text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Region</th>
                    <th className="px-4 py-3 font-medium">Material per ton</th>
                    <th className="px-4 py-3 font-medium">Installed per ton</th>
                    <th className="px-4 py-3 font-medium">Use this for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {stateBuckets.map((bucket) => {
                    const pricing = regionPricing[bucket.region];

                    return (
                      <tr key={bucket.label}>
                        <td className="px-4 py-3 font-medium text-zinc-950">{bucket.label}</td>
                        <td className="px-4 py-3 text-zinc-600">
                          {formatCurrency(pricing.asphaltMaterialLow)} - {formatCurrency(pricing.asphaltMaterialHigh)}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {formatCurrency(pricing.asphaltInstalledLow)} - {formatCurrency(pricing.asphaltInstalledHigh)}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">{pricing.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

          <section id="price-notes" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Price update, source, and estimate notes</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                The numbers below are meant for early budgeting, not as a promise of today&apos;s local plant rate. For a
                true asphalt price per ton near me, confirm the current number with local suppliers or paving
                contractors.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {priceNotes.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

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

          <section id="contractor-quotes" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Ask local contractors before you lock the budget</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  A state average can tell you if a quote looks reasonable. A contractor can tell you what your actual
                  driveway, parking area, or private road needs.
                </p>
                <p>
                  For the cleanest comparison, ask every contractor to quote the same thickness, prep work, asphalt
                  mix, and cleanup scope.
                </p>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Questions to ask</p>
                <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                  {contractorQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
                <p>
                  For California and other high-cost regions, start near the upper half of the regional band until a
                  local contractor confirms the current price.
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
