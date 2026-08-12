import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, BookOpen, CircleDollarSign, Layers3, Scale, TriangleAlert } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { ContentCredentials } from "@/components/content/content-credentials";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { articleSchema, buildMetadata, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo";

const path = "/asphalt-cost-guide";

const pageDescription =
  "Asphalt cost guide with U.S. pricing notes, formulas, waste tips, quote checks, and advice for using local ton or tonne prices.";

export const metadata = buildMetadata({
  title: "Asphalt Cost Guide | Pricing, Formula & Quote Tips",
  description: pageDescription,
  path
});

const quickNav = [
  { label: "Formula", href: "#formula" },
  { label: "Asphalt basics", href: "#basics" },
  { label: "Common types", href: "#types" },
  { label: "Price factors", href: "#price-factors" },
  { label: "Estimate check", href: "#estimator" },
  { label: "Extra to buy", href: "#extra" },
  { label: "Ton vs tonne", href: "#units" },
  { label: "Related tools", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const faqs = [
  {
    question: "Why does asphalt pricing vary so much?",
    answer: "Site access, prep work, haul distance, local labor, and the thickness of the asphalt all change the final number."
  },
  {
    question: "Is a low estimate bad?",
    answer: "Not always. It can be fine for early planning, but check whether the quote includes base repair, cleanup, and the right thickness."
  },
  {
    question: "How much extra asphalt should I plan for?",
    answer: "A small waste allowance is smart. Straightforward jobs often use a modest buffer, while irregular shapes and tight edges need more room."
  },
  {
    question: "Should I ask for more than one bid?",
    answer: "Yes. A few quotes make it easier to spot a number that is too high, too low, or missing important work."
  },
  {
    question: "How do I calculate asphalt costs?",
    answer:
      "Start with tonnage, then multiply by the price per ton or tonne. Add labor, prep, and cleanup for the full project cost."
  },
  {
    question: "What is the asphalt formula for tonnage?",
    answer:
      "The planning formula is area × thickness × density ÷ 2000. This site uses 145 lb/ft³ as the base density for quick estimates."
  },
  {
    question: "How much does asphalt cost per ton?",
    answer:
      "The price changes by region and project scope, but the tonnage calculator and state pricing page give you a better planning range than a single national average."
  },
  {
    question: "Is blacktop the same as asphalt?",
    answer:
      "Yes. Blacktop is another common name for asphalt, so the same formula and pricing logic apply to both."
  },
  {
    question: "Can I use this cost guide outside the U.S.?",
    answer:
      "Yes for quantity planning. The default price ranges are U.S.-based, so outside the U.S. use the calculator with your local price per ton or tonne."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Cost Guide", href: "/asphalt-cost-guide" }];

const asphaltBasics = [
  {
    title: "Asphalt is the surface, not the whole job",
    text:
      "The blacktop layer matters, but the base underneath usually decides how long the driveway holds up. Soft base, poor drainage, or bad grading can make a cheap surface fail early."
  },
  {
    title: "Thickness changes material fast",
    text:
      "A thicker surface uses more tons over the same square footage. That is why a small change from 2 inches to 3 inches can move the estimate noticeably."
  },
  {
    title: "Installed price includes more than material",
    text:
      "Material-only pricing is just the asphalt. Installed pricing also reflects labor, equipment, haul distance, setup time, edges, cleanup, and local demand."
  }
] as const;

const formulaCards = [
  {
    title: "Calculate tons needed",
    text:
      "Start with area and thickness, then use the density-based tonnage formula. That gives you a planning number before you compare quotes."
  },
  {
    title: "Calculate material cost",
    text: "Multiply the estimated tons by a current local material price per ton or tonne, then keep delivery separate."
  },
  {
    title: "Check the installed quote",
    text: "Add preparation, base repair, labor, equipment, access, cleanup, and other project work before comparing final totals."
  }
] as const;

const asphaltTypes = [
  {
    title: "New driveway",
    text:
      "A new install usually includes grading, compacted base, and a fresh asphalt layer. This is the cleanest scope to price, but site prep can still change the bid."
  },
  {
    title: "Overlay or resurfacing",
    text:
      "An overlay adds asphalt over an existing surface. It can be cost-effective when the base is still sound, but it should not hide drainage or structural problems."
  },
  {
    title: "Repair before paving",
    text:
      "Some projects need soft spots cut out, cracks handled, or edges rebuilt before the final layer goes down. Those repairs belong in the quote."
  }
] as const;

const priceFactors = [
  "Compacted thickness and total square footage",
  "Base repair, grading, drainage, or old surface removal",
  "Truck access, staging room, haul distance, and cleanup",
  "Local labor rates, seasonality, and asphalt plant availability"
] as const;

const relatedPages = [
  {
    href: "/#calculator",
    title: "Main asphalt calculator",
    text: "Calculate tonnage and cost from your actual project dimensions."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Use this when you only need the material quantity before pricing the job."
  },
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost calculator",
    text: "Turn driveway size, thickness, waste, and region into a rough installed range."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Asphalt prices by state",
    text: "Check broad regional price bands before comparing local bids."
  },
  {
    href: "/asphalt-contractor-guide",
    title: "Asphalt contractor guide",
    text: "Use this after the estimate to compare quote scope and red flags."
  },
  {
    href: "/asphalt-driveway-replacement-cost-calculator",
    title: "Driveway replacement cost",
    text: "Calculate tear-out, base repair, and new asphalt as a separate project scope."
  },
  {
    href: "/asphalt-driveway-resurfacing-cost-calculator",
    title: "Driveway resurfacing cost",
    text: "Price preparation, spot repair, and a new asphalt overlay."
  },
  {
    href: "/driveway-sealing-cost-calculator",
    title: "Driveway sealing cost",
    text: "Estimate sealer gallons, preparation, labor, and crack-repair allowance."
  },
  {
    href: "/asphalt-millings-calculator",
    title: "Asphalt millings calculator",
    text: "Estimate recycled asphalt tons, yards, coverage, and material cost."
  }
] as const;

export default function AsphaltCostGuidePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({ name: "Asphalt Cost Guide", description: pageDescription, path }),
          webPageSchema({ name: "Asphalt Cost Guide", description: pageDescription, path }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <CircleDollarSign className="h-3.5 w-3.5" />
              Pricing guide
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Cost Guide</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Total asphalt cost equals the tons needed multiplied by your local material rate, plus delivery,
              preparation, and installation. This guide explains each part so you can compare quotes on the same scope.
            </p>
            <p className="text-sm leading-6 text-zinc-600">
              Default price examples are U.S.-based. For Canada, the UK, or other markets, use the calculator with
              Metric if needed and enter your local supplier price per ton or tonne.
            </p>
          </div>

          <ContentCredentials path={path} />

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <section id="formula" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Scale className="h-4 w-4" />
                Formula and terms
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">How to calculate asphalt and read coverage</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Use area, compacted thickness, and density to estimate the tons of asphalt your project needs. The
                formula is area × thickness × density ÷ 2000, with 145 lb/ft³ as the base density.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {formulaCards.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              [
                "Typical cost drivers",
                "Thickness, driveway size, base condition, grading, haul distance, and local crew availability."
              ],
              [
                "What to watch for",
                "A price that looks too neat can miss base repair, access issues, cleanup, or a thinner asphalt layer."
              ],
              ["Next step", "Use the range to prepare for contractor quotes."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section id="basics" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpen className="h-4 w-4" />
                Asphalt basics
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">What an asphalt price is really covering</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Asphalt pricing starts with the amount of material, but the job is bigger than the black surface you
                see at the end. A useful estimate should connect area, thickness, base condition, region, waste, and
                installation scope.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {asphaltBasics.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="types" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Layers3 className="h-4 w-4" />
                Common project types
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">Not every asphalt job should be priced the same way</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Two projects can have the same square footage and still need different budgets. New work, overlays,
                and repairs use different prep assumptions, so compare quotes by scope before comparing the total.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {asphaltTypes.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-amber-700">
              <Link href="/asphalt-driveway-replacement-cost-calculator">Calculate full driveway replacement</Link>
              <Link href="/asphalt-driveway-resurfacing-cost-calculator">Calculate asphalt resurfacing</Link>
              <Link href="/driveway-sealing-cost-calculator">Compare sealing before replacement</Link>
            </div>
          </section>

          <section id="price-factors" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What changes the quote</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Thickness has the biggest effect because it directly changes the tonnage. A small driveway with a
                  thick build can use more asphalt than a larger, thin overlay.
                </p>
                <p>
                  Base repair can add a surprising amount if the old surface is failing. Driveways with tight access
                  or long haul distance can also cost more than the same size pad in an easy location.
                </p>
              </div>
              <ul className="grid gap-2 text-sm leading-6 text-zinc-600 sm:grid-cols-2">
                {priceFactors.map((item) => (
                  <li key={item} className="rounded-lg border border-zinc-200 bg-white p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <TriangleAlert className="h-5 w-5 text-amber-600" />
                <p className="text-base font-medium text-zinc-950">Account for site work</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Heavy prep, drainage correction, or removal work can raise the project cost above the initial range.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="estimator" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Estimate your project</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Enter the area, thickness, waste allowance, and region to estimate the material quantity and project
                cost.
              </p>
            </div>
            <AsphaltCalculator mode="asphalt" defaultValues={{ areaSqFt: 700, thicknessInches: 3, wastePercent: 7, region: "national" }} />
          </section>

          <section id="extra" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How much extra asphalt to buy</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Do not plan an asphalt order down to the last pound. A waste allowance covers small measuring errors,
                  curved edges, trimming around drains, material left in the truck, and handling loss during placement.
                </p>
                <p>
                  Simple rectangular jobs can often use a modest buffer. Irregular driveways, narrow sections, or work
                  with many edges usually deserve more room because the crew has less margin for exact placement.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Practical rule</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Use the waste field in the calculator as a planning buffer, then ask the contractor or supplier how
                  they round orders for your local plant and truck size.
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
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Ton vs tonne in asphalt estimates</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  In the United States, most asphalt quotes use tons. Some spec sheets, suppliers, or non-US references
                  use tonnes. The words are close, but they are not the same unit, so do not mix them when comparing
                  paperwork.
                </p>
                <p>
                  If a supplier sends a quote in tonnes, ask whether they mean metric tonnes and have them convert the
                  order before you compare it with a contractor bid written in tons.
                </p>
                <p>
                  At the planning density used here, one cubic yard of asphalt is roughly 2 tons. That is a useful
                  shortcut when you are checking coverage or comparing a blacktop calculator result with a supplier
                  quote.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Quick check</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Keep the unit consistent from the calculator result to the supplier quote. That one check prevents
                  many early budgeting mistakes.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="related-tools" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related tools</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Explore quantity, driveway budget, regional pricing, and contractor-quote tools for your project.
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

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What a good quote should spell out</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Look for a clear thickness, base prep, access note, and cleanup line so you know what the number covers.</p>
                <p>If one bid is far lower than the others, check whether it skipped repair work or used a thinner build-up.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Check driveway cost
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-prices-by-state" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  See state pricing bands
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Ask for these line items</p>
                <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                  <li>Thickness and tonnage</li>
                  <li>Base repair or grading work</li>
                  <li>Access, haul distance, and cleanup</li>
                  <li>Material-only and installed pricing</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="faq" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </section>

          <Link href={"/asphalt-vs-concrete-driveway-cost-calculator" as Route} className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Compare against concrete
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
