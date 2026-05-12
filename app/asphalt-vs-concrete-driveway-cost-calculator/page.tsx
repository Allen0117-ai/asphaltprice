import Link from "next/link";

import { ArrowRight, BookOpen, Scale, SplitSquareHorizontal } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Asphalt vs concrete driveway cost calculator. Compare material, installed price, lifespan, and maintenance tradeoffs with one set of measurements.";

export const metadata = buildMetadata({
  title: "Asphalt vs Concrete Driveway Cost Calculator",
  description: pageDescription,
  path: "/asphalt-vs-concrete-driveway-cost-calculator"
});

const quickNav = [
  { label: "Cost comparison", href: "#comparison" },
  { label: "Material basics", href: "#basics" },
  { label: "Tradeoffs", href: "#tradeoffs" },
  { label: "Asphalt wins", href: "#asphalt" },
  { label: "Concrete wins", href: "#concrete" },
  { label: "Cost caveats", href: "#caveats" },
  { label: "Related pages", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const faqs = [
  {
    question: "Is asphalt always cheaper?",
    answer: "Usually yes for a first-pass driveway estimate, but the gap depends on region, site conditions, and prep work."
  },
  {
    question: "Does concrete last longer?",
    answer: "Many homeowners expect longer life from concrete, but the better choice still depends on budget, climate, maintenance, and use."
  },
  {
    question: "Why include gravel?",
    answer: "Gravel gives you a low-cost baseline so the comparison feels more useful."
  },
  {
    question: "Should I compare only upfront cost?",
    answer: "No. Also compare maintenance, drainage, repairs, and how long you plan to keep the driveway."
  }
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt vs Concrete Driveway Cost Calculator", href: "/asphalt-vs-concrete-driveway-cost-calculator" }
];

const materialBasics = [
  {
    title: "Asphalt",
    text:
      "Asphalt is usually faster to install and often lower upfront. It works well when you want a clean paved surface without the higher first cost of concrete."
  },
  {
    title: "Concrete",
    text:
      "Concrete usually costs more upfront but may appeal to homeowners who want a light-colored, rigid surface with a different long-term maintenance profile."
  },
  {
    title: "Gravel",
    text:
      "Gravel is the budget baseline. It can be useful for long drives or temporary surfaces, but it does not feel like a finished paved driveway."
  }
] as const;

const tradeoffs = [
  {
    title: "Upfront budget",
    text: "Asphalt often has the lower first cost, especially for standard residential driveways."
  },
  {
    title: "Maintenance",
    text: "Asphalt may need sealing or surface care over time, while concrete repairs can be more visible when cracks appear."
  },
  {
    title: "Climate",
    text: "Freeze-thaw cycles, heat, drainage, and snow removal habits can all affect which surface makes more sense."
  },
  {
    title: "Look and use",
    text: "Concrete gives a brighter, rigid finish. Asphalt gives a dark, flexible surface that is common for driveways and small lots."
  }
] as const;

const costCaveats = [
  {
    title: "Prep can erase the material gap",
    text: "A cheap surface is not cheap if the base needs major repair, grading, drainage, or old driveway removal."
  },
  {
    title: "Compare the same scope",
    text: "Ask each quote to use the same driveway size, thickness, base prep, edge work, and cleanup assumptions."
  },
  {
    title: "Local pricing matters",
    text: "Labor, weather, concrete availability, asphalt plant distance, and busy season demand can move the final number."
  }
] as const;

const relatedPages = [
  {
    href: "/driveway-cost-calculator",
    title: "Driveway cost calculator",
    text: "Compare asphalt, concrete, and gravel as a broader driveway budget."
  },
  {
    href: "/asphalt-driveway-cost-calculator",
    title: "Asphalt driveway calculator",
    text: "Focus only on asphalt thickness, tonnage, and installed cost."
  },
  {
    href: "/asphalt-cost-guide",
    title: "Asphalt cost guide",
    text: "Learn what changes an asphalt quote before comparing bids."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Asphalt prices by state",
    text: "Check regional asphalt pricing bands before you choose a material."
  }
] as const;

export default function AsphaltVsConcretePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt vs Concrete Driveway Cost Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-vs-concrete-driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <SplitSquareHorizontal className="h-3.5 w-3.5" />
              Side-by-side compare
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Asphalt vs Concrete Driveway Cost Calculator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use one set of measurements to see a rough range for asphalt, concrete, and gravel. It is a fast way
              to compare the tradeoff before asking for formal bids.
            </p>
          </div>

          <AsphaltCalculator mode="comparison" defaultValues={{ areaSqFt: 900, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["How to use it", "Keep the same area and compare the cost bands side by side."],
              ["Why it helps", "It gives you a plain-English answer when you are deciding between materials."],
              ["What changes it", "Access, base prep, drainage, and your local labor market."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section id="comparison" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <Scale className="h-4 w-4" />
                Cost comparison
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Compare the same driveway, not three different projects</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  The value of this page is that the area and basic assumptions stay the same while the material changes.
                  That makes the cost gap easier to understand.
                </p>
                <p>
                  If you collect contractor bids later, ask each contractor to quote the same driveway size, prep scope,
                  drainage assumptions, and cleanup. Otherwise the material comparison gets muddy fast.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Use the range as a filter</p>
                <p className="text-sm leading-6 text-zinc-600">
                  The calculator will not pick the material for you, but it helps you decide whether the extra upfront
                  cost fits the way you plan to use the driveway.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="basics" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpen className="h-4 w-4" />
                Material basics
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">What each driveway material is best for</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Asphalt, concrete, and gravel solve different problems. Cost is important, but the right answer also
                depends on maintenance, appearance, climate, and how permanent the surface needs to feel.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {materialBasics.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="tradeoffs" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">The tradeoffs that matter after price</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                A lower first cost can still be the best choice, but it should be weighed against the way the driveway
                will be used over time.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {tradeoffs.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="asphalt" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">When asphalt is usually the practical choice</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Asphalt often makes sense when the budget is important, the driveway needs to be usable quickly, or
                  the project is a standard residential install with straightforward access.
                </p>
                <p>
                  It also works well when you want a paved look but do not need concrete&apos;s higher upfront cost or
                  design options. A solid base and good drainage still matter.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Focus on asphalt cost
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Read asphalt cost guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Do not skip scope</p>
                <p className="text-sm leading-6 text-zinc-600">
                  The cheapest material can still become expensive if the base needs repair, access is difficult, or
                  drainage work is missing from the first quote.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="concrete" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">When concrete is usually worth the higher first cost</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Concrete can make sense when appearance, a lighter surface color, or a more permanent finished look
                  matters more than the lowest upfront price.
                </p>
                <p>
                  It is also worth pricing when you plan to stay in the home for a long time and want to compare the
                  full ownership picture, not just the first install number.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Best fit</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Choose concrete when the look, finish, and long-term plan justify paying more at the start.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="caveats" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Cost caveats before you choose</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                The calculator is best for a first-pass decision. Real bids can shift once a contractor checks the
                base, drainage, access, and local material costs.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {costCaveats.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="related-tools" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Continue the comparison</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Use these pages to narrow the estimate, check regional asphalt assumptions, or switch from comparison
                mode into one material.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedPages.map((item) => (
                <a key={item.href} href={item.href}>
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
                </a>
              ))}
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </section>

          <Link href="/driveway-cost-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Compare all driveway materials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
