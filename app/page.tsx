import Link from "next/link";

import { ArrowRight, Sparkles } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import {
  computeAsphaltEstimate,
  formatCurrency,
  formatDecimal,
  type CalculatorInput
} from "@/lib/calculator/formulas";
import { regionPricing, type RegionKey } from "@/lib/calculator/regional-prices";
import { buildMetadata, faqSchema, organizationSchema, webAppSchema, webSiteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Asphalt Calculator - Estimate Costs & Coverage",
  description: "Free asphalt calculator to estimate costs and coverage. Get quick pricing for driveway, parking lot, and road projects in seconds.",
  path: "/"
});

const faqs = [
  {
    question: "How accurate is this asphalt calculator?",
    answer:
      "It is a planning estimate, not a contractor quote. It is useful for budgeting, comparing material options, and checking whether a bid is in a reasonable range."
  },
  {
    question: "What is included in the cost estimate?",
    answer:
      "The calculator estimates asphalt tonnage, material cost, and a broad installed range. It does not guarantee site preparation, drainage, base repair, permits, or special access work."
  },
  {
    question: "Why does thickness change the price so much?",
    answer:
      "Thickness directly changes the amount of asphalt needed. A 3 inch surface uses about 50% more asphalt than a 2 inch surface over the same area."
  },
  {
    question: "When is the best time to pave asphalt?",
    answer:
      "Spring, summer, and early fall are usually better because asphalt compacts and cures more reliably in warmer weather. Cold-weather paving can be harder in northern climates."
  },
  {
    question: "Should I get contractor quotes after using the calculator?",
    answer:
      "Yes. Use the estimate as a baseline, then compare two or three local quotes with the same thickness, base prep, and cleanup assumptions."
  },
  {
    question: "Can I share the result?",
    answer: "Yes. Use the share link button in the calculator to copy a URL with your current inputs."
  }
];

const relatedCalculators = [
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway cost calculator",
    text: "Price out a standard driveway with tons and installed cost."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Focus only on material quantity and coverage per ton."
  },
  {
    href: "/asphalt-vs-concrete-driveway-cost-calculator",
    title: "Asphalt vs concrete",
    text: "See the rough cost gap between the two materials."
  },
  {
    href: "/driveway-cost-calculator",
    title: "Driveway cost calculator",
    text: "Compare asphalt, concrete, and gravel in one place."
  }
] as const;

const specPoints = [
  "145 lb/ft³ density",
  "7% waste default",
  "Region-based pricing",
  "Copyable estimate link"
] as const;

const howItWorks = [
  {
    title: "Measure the area",
    text:
      "Enter the square footage you want to cover. For a rectangular driveway, multiply length by width. For irregular shapes, break the area into smaller rectangles and add them together."
  },
  {
    title: "Choose thickness",
    text:
      "Most residential asphalt driveways use 2 to 3 inches of compacted asphalt. Thicker sections use more material but can be better for heavier use."
  },
  {
    title: "Pick a region",
    text:
      "Material and labor prices change by market. Choosing the closest region gives you a more useful first-pass range than a single national average."
  }
] as const;

const costFactors = [
  {
    title: "Thickness",
    text:
      "Thickness is one of the biggest cost drivers because it changes tonnage directly. A thin overlay may be fine for a stable surface, while a full driveway often needs a thicker section."
  },
  {
    title: "Project size",
    text:
      "Larger jobs often have a better cost per square foot because equipment, delivery, and crew setup are spread across more area. Small repair jobs can feel expensive because of minimum charges."
  },
  {
    title: "Region",
    text:
      "Labor rates, haul distance, local asphalt plant access, and seasonal demand all affect the final price. Dense metro areas and short paving seasons usually push bids higher."
  },
  {
    title: "Base condition",
    text:
      "Asphalt is only as reliable as the base underneath it. Soft soil, drainage issues, or a failing old driveway can add grading, stone, compaction, or removal work."
  },
  {
    title: "Access and cleanup",
    text:
      "Tight access, long hauls, difficult staging, or extra cleanup can add labor time. Make sure contractor quotes spell out what is included."
  }
] as const;

const regionCards: Array<{ key: RegionKey; title: string; states: string; text: string }> = [
  {
    key: "northeast",
    title: "Northeast",
    states: "NY, PA, NJ, MA, CT",
    text:
      "Cold winters, shorter paving seasons, and higher labor rates can raise installed prices. Urban jobs may also have access and scheduling costs."
  },
  {
    key: "south",
    title: "South",
    states: "FL, GA, NC, TN, VA",
    text:
      "Longer paving seasons often help keep costs steadier, though coastal markets and busy metro areas can still run above the regional baseline."
  },
  {
    key: "midwest",
    title: "Midwest",
    states: "OH, IL, MI, IN, WI",
    text:
      "Many Midwest markets sit near the national middle band. Local plant access and straightforward suburban driveways can keep estimates practical."
  },
  {
    key: "west",
    title: "West",
    states: "CA, WA, CO, AZ, OR",
    text:
      "Western pricing varies widely. Coastal cities, mountain access, and long haul distance can raise quotes, while interior markets may be more moderate."
  }
];

const mistakes = [
  {
    title: "Using one national average",
    text:
      "A single price per square foot can be misleading. A driveway in a high-cost metro area may not price like the same driveway in a lower-cost suburban market."
  },
  {
    title: "Forgetting base preparation",
    text:
      "The asphalt layer is only one part of the project. Removal, stone base, grading, compaction, and drainage work can move the final bid more than the asphalt itself."
  },
  {
    title: "Measuring too quickly",
    text:
      "A small measurement error can turn into a big budget miss. Recheck length and width, include flares or parking pads, and leave a waste allowance."
  },
  {
    title: "Comparing unlike quotes",
    text:
      "One contractor may include removal and cleanup while another only prices the new asphalt. Compare thickness, prep scope, warranty, and cleanup before choosing."
  },
  {
    title: "Picking only the lowest number",
    text:
      "A very low quote can mean thinner asphalt, skipped prep, or unclear cleanup. A good bid should explain the work, not just show a low total."
  }
] as const;

const reasons = [
  {
    title: "Fast planning",
    text:
      "You can test square footage, thickness, waste, and region in seconds instead of waiting for a first callback."
  },
  {
    title: "Clear assumptions",
    text:
      "The calculator shows tonnage, material range, installed range, density, and waste so the estimate is easier to understand."
  },
  {
    title: "No signup",
    text:
      "Use the tool without entering an email address or personal details. It is built for quick early-stage planning."
  },
  {
    title: "Useful before quotes",
    text:
      "A baseline estimate helps you ask better questions and spot bids that seem unusually high or unusually low."
  }
] as const;

const exampleProjects: Array<{
  title: string;
  project: string;
  input: CalculatorInput;
  note: string;
}> = [
  {
    title: "Residential driveway",
    project: "1,000 sq ft, 2 inch asphalt surface, Northeast pricing",
    input: { areaSqFt: 1000, thicknessInches: 2, wastePercent: 7, region: "northeast" },
    note:
      "This is a useful baseline for a city or suburban driveway where labor and scheduling costs can run higher."
  },
  {
    title: "Larger driveway or pad",
    project: "2,000 sq ft, 3 inch asphalt surface, Midwest pricing",
    input: { areaSqFt: 2000, thicknessInches: 3, wastePercent: 7, region: "midwest" },
    note:
      "The larger area uses more tonnage, but the project may be easier to compare across multiple contractor bids."
  },
  {
    title: "Small repair area",
    project: "500 sq ft, 1.5 inch overlay, West pricing",
    input: { areaSqFt: 500, thicknessInches: 1.5, wastePercent: 7, region: "west" },
    note:
      "Small jobs can still have minimum charges, so use the estimate as a material and planning check rather than a final bid."
  }
];

const nextSteps = [
  {
    href: "/asphalt-cost-guide",
    title: "Read the detailed cost guide",
    text:
      "Learn what should be included in a quote and how prep work, base condition, and thickness affect the number."
  },
  {
    href: "/asphalt-vs-concrete-driveway-cost-calculator",
    title: "Compare asphalt with concrete",
    text:
      "Check whether asphalt still makes sense when you compare it with concrete and gravel for the same project size."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Check pricing by state group",
    text:
      "Use broad regional bands to understand why the same driveway can cost more in one market than another."
  }
] as const;

function rangeLabel(low: number, high: number) {
  return `${formatCurrency(low)} - ${formatCurrency(high)}`;
}

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={[
          webSiteSchema({
            name: siteConfig.name,
            url: siteConfig.url
          }),
          organizationSchema({
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/icon`
          }),
          webAppSchema({
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pt-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              For driveways, overlays, and small lots
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Asphalt Calculator
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Estimate asphalt tonnage, material cost, and installed cost for a driveway, pad, or small paving job
              without waiting for a quote. Enter the area, choose a thickness, select a region, and use the result as
              a practical starting point before you talk with local contractors.
            </p>
            <div className="max-w-5xl rounded-2xl border border-zinc-200 bg-white px-4 py-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {specPoints.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AsphaltCalculator mode="asphalt" />
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Build the estimate from three inputs</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
              The calculator turns simple project details into a rough asphalt budget. It uses square footage,
              thickness, standard asphalt density, a waste allowance, and broad regional pricing. The result is not a
              final bid, but it gives you a clear number to use when planning, comparing options, or reviewing quotes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <Card key={item.title} className="border-zinc-200">
                <CardContent className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step {index + 1}</p>
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">What changes the price</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Factors that affect asphalt cost</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                Asphalt cost is not just one number. It shifts with thickness, area, waste, local market conditions,
                base prep, access, and how much labor the crew needs to spend on the site. Understanding those factors
                helps you compare contractor bids more fairly.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-600">
                <strong className="font-semibold text-zinc-950">Want to understand cost factors in detail?</strong>{" "}
                <Link href="/asphalt-cost-guide" className="font-medium text-amber-700 hover:text-amber-800">
                  Read our complete asphalt cost guide
                </Link>{" "}
                to see how each factor changes the number and what to ask before accepting a quote.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {costFactors.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Regional pricing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Average asphalt costs by region</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Asphalt pricing changes across the United States because labor, weather, haul distance, and plant access
              are different in every market. The bands below use broad regional assumptions from the calculator. For a
              more detailed regional view, see our{" "}
              <Link href="/asphalt-prices-by-state" className="font-medium text-amber-700 hover:text-amber-800">
                asphalt prices by state
              </Link>{" "}
              page.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {regionCards.map((item) => {
              const pricing = regionPricing[item.key];

              return (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-lg font-semibold text-zinc-950">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">{item.states}</p>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-600">
                      <p>
                        Material: {formatCurrency(pricing.asphaltMaterialLow)} - {formatCurrency(pricing.asphaltMaterialHigh)} per ton
                      </p>
                      <p>
                        Installed: {formatCurrency(pricing.asphaltInstalledLow)} - {formatCurrency(pricing.asphaltInstalledHigh)} per ton
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Avoid budget misses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Common cost estimation mistakes</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
              Many asphalt budgets go wrong before a contractor ever visits the site. The most common problems are
              simple: using a generic average, missing prep work, measuring too quickly, or comparing bids that do not
              include the same scope.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-600">
              <strong className="font-semibold text-zinc-950">Need help reviewing quotes?</strong>{" "}
              <Link href="/asphalt-contractor-guide" className="font-medium text-amber-700 hover:text-amber-800">
                Our asphalt contractor guide
              </Link>{" "}
              shows what to ask, what to compare, and which red flags to watch before you hire a paving crew.
            </p>
          </div>

          <div className="space-y-4">
            {mistakes.map((item) => (
              <Card key={item.title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Why use this tool</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">A clearer starting point before you request bids</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              A contractor still needs to inspect the site before giving a final number, but a calculator helps you
              prepare. You can see how thickness affects cost, how much asphalt the project might need, and whether a
              quote seems close to the planning range.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((item) => (
              <Card key={item.title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Examples</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Real-world asphalt estimate examples</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              These examples show how the same formula changes with area, thickness, and region. Use them as a quick
              sanity check, then enter your own project details in the calculator above.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {exampleProjects.map((item) => {
              const estimate = computeAsphaltEstimate(item.input);

              return (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-lg font-semibold text-zinc-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">{item.project}</p>
                    </div>
                    <div className="space-y-2 rounded-md bg-zinc-50 p-4 text-sm text-zinc-700">
                      <p>Asphalt needed: {formatDecimal(estimate.tons)} tons</p>
                      <p>Material range: {rangeLabel(estimate.materialLow, estimate.materialHigh)}</p>
                      <p>Installed range: {rangeLabel(estimate.installedLow, estimate.installedHigh)}</p>
                    </div>
                    <p className="text-sm leading-6 text-zinc-600">{item.note}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Related calculators</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Start with the one that fits your project</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedCalculators.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-white">
                  <CardContent className="space-y-3">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                      Open calculator
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Frequently asked questions</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                These answers cover the most common questions people ask before they compare asphalt paving quotes.
                They are meant to keep the estimate practical and easy to use.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => (
                <Card key={item.question} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.question}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Next steps</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">What to do after you get an estimate</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Once you have a planning number, compare it with local bids and make sure every quote uses the same
              assumptions. Thickness, base prep, drainage, cleanup, and warranty details matter as much as the total
              price.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {nextSteps.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-white">
                  <CardContent className="space-y-3">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-600">
            <p className="font-semibold uppercase tracking-[0.2em] text-zinc-500">Disclaimer</p>
            <p className="mt-3">
              This tool gives a planning estimate only. Local market prices, base prep, haul distance, drainage,
              access, and crew availability can move the real quote up or down. Use the calculator as a starting point,
              then confirm the final number with a local paving professional.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
