import Link from "next/link";

import { CircleHelp, GitCompareArrows, Scale, TriangleAlert } from "lucide-react";

import { ComparisonTable } from "@/components/content/comparison-table";
import { ContentCredentials } from "@/components/content/content-credentials";
import { DirectAnswer } from "@/components/content/direct-answer";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { articleSchema, buildMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";

const path = "/asphalt-millings-vs-gravel";

const pageDescription =
  "Compare asphalt millings vs gravel for driveways and access roads, including cost factors, drainage, maintenance, and how to estimate the material you need.";

export const metadata = buildMetadata({
  title: "Asphalt Millings vs Gravel | Cost, Use & Maintenance",
  description: pageDescription,
  path
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Millings vs Gravel", href: path }];

const comparisonRows = [
  {
    label: "Material source",
    cells: {
      millings: "Recycled asphalt material, often produced when old pavement is milled.",
      gravel: "Crushed stone, gravel, or aggregate selected for the project and local supply."
    }
  },
  {
    label: "Surface behavior",
    cells: {
      millings: "Can bind together over time, but results vary with gradation, placement, compaction, weather, and traffic.",
      gravel: "Usually remains a loose aggregate surface that needs shaping and replenishment over time."
    }
  },
  {
    label: "Drainage",
    cells: {
      millings: "May shed more water than open gravel, so grading and drainage need close attention.",
      gravel: "Can drain well when the aggregate and base are selected and installed for drainage."
    }
  },
  {
    label: "Maintenance",
    cells: {
      millings: "May need regrading, added material, or edge repair where traffic loosens the surface.",
      gravel: "May need periodic raking, grading, weed control, and replacement where stone migrates."
    }
  },
  {
    label: "Best fit",
    cells: {
      millings: "A recycled-material option when compatible material is locally available and the site is prepared correctly.",
      gravel: "A flexible choice when drainage, easy regrading, or a known aggregate specification is the priority."
    }
  }
] as const;

const faqs = [
  {
    question: "Are asphalt millings better than gravel?",
    answer:
      "Neither material is the universal winner. Millings can suit a project that wants recycled material and a more bound surface, while gravel can suit a project that values drainage and easy reshaping. Site conditions and installation quality matter most."
  },
  {
    question: "What is the cost of asphalt millings vs gravel?",
    answer:
      "The installed cost depends on local material availability, hauling distance, required depth, site preparation, compaction, drainage work, and delivery minimums. Get comparable local quotes rather than relying on a single national price."
  },
  {
    question: "Do asphalt millings need to be compacted?",
    answer:
      "Compaction is commonly important for a stable surface, but the right process depends on the material blend, thickness, moisture, base, and equipment. Confirm the installation plan with the supplier or contractor."
  },
  {
    question: "Will asphalt millings wash away?",
    answer:
      "They can move or erode when a driveway has poor drainage, steep grades, weak edges, or unprepared base. Water control and surface shaping are important for either millings or gravel."
  },
  {
    question: "How much millings or gravel do I need?",
    answer:
      "Measure the area and planned depth first, then convert the volume to the supplier's sales unit. Use a calculator for a planning estimate and confirm the density or tons-per-yard assumption with the supplier."
  }
] as const;

export default function AsphaltMillingsVsGravelPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({ name: "Asphalt Millings vs Gravel", description: pageDescription, path }),
          webPageSchema({ name: "Asphalt Millings vs Gravel", description: pageDescription, path })
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <GitCompareArrows className="h-3.5 w-3.5" />
              Driveway material comparison
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Millings vs Gravel</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Compare recycled asphalt millings and gravel before you choose a driveway or access-road surface. The
              better choice depends on the material, drainage, base, traffic, and local installation cost.
            </p>
          </div>

          <ContentCredentials path={path} />

          <DirectAnswer question="Are asphalt millings better than gravel?">
            <p>
              Asphalt millings and gravel each work well in the right conditions; there is no universal winner.
              Millings are recycled pavement material that may form a more bound surface after correct placement and
              compaction. Gravel is a flexible aggregate surface that can be easier to reshape and can support a
              drainage-focused design. Compare the full project—base work, grading, drainage, delivery, compaction,
              and future maintenance—not just the material price.
            </p>
          </DirectAnswer>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Asphalt millings vs gravel at a glance</h2>
            <ComparisonTable
              caption="The outcome depends on the local material and how the driveway is built."
              rowLabel="Consideration"
              columns={[
                { key: "millings", label: "Asphalt millings" },
                { key: "gravel", label: "Gravel" }
              ]}
              rows={comparisonRows}
            />
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Choose by site conditions", "Steep slopes, soft soil, wet areas, and frequent turning can matter more than the name of the surface material."],
              ["Compare installed scope", "A fair quote includes delivery, spreading, grading, compaction, edge work, and any base or drainage repairs."],
              ["Plan for upkeep", "Every loose or semi-bound driveway surface needs inspection and occasional maintenance after weather and traffic."]
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
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Cost of asphalt millings vs gravel</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  The cost of asphalt millings vs gravel changes by region because both materials depend on local
                  supply, hauling distance, and truck minimums. Recycled millings can be economical when available
                  nearby, while gravel may be the practical option when a local quarry offers the right material and
                  delivery is straightforward.
                </p>
                <p>
                  Material price is only one part of the budget. Depth, excavation, base repair, drainage, spreading,
                  compaction, and access can change the installed total. Ask suppliers and contractors to quote the
                  same depth and preparation scope before deciding which material costs less for your site.
                </p>
              </div>
            </div>
            <Card className="border-amber-200 bg-amber-50/60">
              <CardContent className="space-y-3">
                <TriangleAlert className="h-5 w-5 text-amber-700" />
                <p className="text-base font-medium text-zinc-950">Avoid a price-only comparison</p>
                <p className="text-sm leading-6 text-zinc-600">
                  A lower material quote can still cost more if it needs extra hauling, base repair, drainage work, or
                  regular replacement. Compare a complete installed scope.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How to choose the right driveway surface</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["1. Check water flow", "Identify low spots, runoff paths, and soft areas before choosing a surface. Drainage needs a solution beneath and around the material."],
                ["2. Match traffic to the base", "Tell the contractor about cars, pickups, delivery trucks, trailers, and turning areas. Those loads affect depth and base design."],
                ["3. Confirm the material", "Ask what the millings or gravel contain, how it will be installed, what depth is planned, and how the contractor will compact it."]
              ].map(([title, text]) => (
                <Card key={title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
              <Scale className="h-4 w-4" />
              Plan material before requesting quotes
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Estimate quantity, then confirm locally</h2>
            <p className="max-w-3xl text-sm leading-7 text-zinc-600">
              Start with the driveway area and your planned depth. Then use the supplier&apos;s stated density or conversion
              method to check the number of tons or cubic yards. Calculators are useful for planning, but a supplier or
              contractor should confirm the final material order and installation plan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/asphalt-millings-calculator" className="text-sm font-medium text-amber-800 underline underline-offset-4">Use the asphalt millings calculator</Link>
              <Link href="/asphalt-tonnage-calculator" className="text-sm font-medium text-amber-800 underline underline-offset-4">Estimate material tonnage</Link>
              <Link href="/asphalt-road-cost-calculator" className="text-sm font-medium text-amber-800 underline underline-offset-4">Compare a full asphalt road surface</Link>
              <Link href="/asphalt-cost-guide" className="text-sm font-medium text-amber-800 underline underline-offset-4">Read the asphalt cost guide</Link>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
              <CircleHelp className="h-4 w-4" />
              Questions for a local supplier or contractor
            </div>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-600 sm:grid-cols-2">
              {["What material blend and size are you supplying?", "What installed depth do you recommend for this site?", "Does the quote include spreading, grading, and compaction?", "What base and drainage work is needed before material arrives?", "How will edges and steep areas be contained?", "What maintenance should I expect after the first season?"].map((item) => (
                <li key={item} className="rounded-md bg-white p-3">{item}</li>
              ))}
            </ul>
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
