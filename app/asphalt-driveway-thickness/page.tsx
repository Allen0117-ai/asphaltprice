import Link from "next/link";

import { Layers3, Ruler, ShieldCheck, TriangleAlert } from "lucide-react";

import { ComparisonTable } from "@/components/content/comparison-table";
import { ContentCredentials } from "@/components/content/content-credentials";
import { DirectAnswer } from "@/components/content/direct-answer";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { articleSchema, buildMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";

const path = "/asphalt-driveway-thickness";

const pageDescription =
  "Learn how thick an asphalt driveway should be, what affects compacted thickness, and how to plan a driveway quote around base, soil, drainage, and vehicle load.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Thickness Guide | Plan the Right Depth",
  description: pageDescription,
  path
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Asphalt Driveway Thickness", href: path }];

const thicknessRows = [
  {
    label: "Light residential use",
    cells: {
      startingPoint: "A 2–3 inch compacted asphalt layer is a common residential planning starting point.",
      check: "Confirm the base is firm, well-drained, and designed for the site."
    }
  },
  {
    label: "Heavier vehicles",
    cells: {
      startingPoint: "More structure may be needed when trucks, RVs, trailers, or repeated delivery vehicles use the surface.",
      check: "Ask for a site-specific pavement section, including base and asphalt layers."
    }
  },
  {
    label: "Weak soil or drainage problems",
    cells: {
      startingPoint: "Extra asphalt alone may not solve movement, rutting, or water damage.",
      check: "Address grading, drainage, subgrade, and base repair before deciding thickness."
    }
  }
] as const;

const faqs = [
  {
    question: "How thick should an asphalt driveway be?",
    answer:
      "For early residential planning, 2–3 inches of compacted asphalt is a common starting point. The right section depends on the base, soil, drainage, climate, and vehicles that will use it."
  },
  {
    question: "Is 2 inches of asphalt enough for a driveway?",
    answer:
      "It can be part of a suitable residential design on a sound, well-prepared base with light vehicle use. It is not a universal answer, so confirm the compacted thickness and the base work with the contractor."
  },
  {
    question: "Does a thicker asphalt layer fix a weak driveway base?",
    answer:
      "Not reliably. A weak, wet, or poorly drained base can still move under a thicker surface. Repairing the subgrade, drainage, and base is often the more important step."
  },
  {
    question: "Is loose asphalt thickness the same as compacted thickness?",
    answer:
      "No. Contractors place asphalt loose and compact it afterward, so ask every bidder to state the finished compacted thickness when comparing quotes."
  },
  {
    question: "Do trucks need a thicker driveway?",
    answer:
      "Often, yes. Repeated heavy loads can require a stronger pavement section. The needed design should account for the vehicle load, turning areas, soil, and base—not only the top asphalt layer."
  }
] as const;

export default function AsphaltDrivewayThicknessPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({ name: "Asphalt Driveway Thickness Guide", description: pageDescription, path }),
          webPageSchema({ name: "Asphalt Driveway Thickness Guide", description: pageDescription, path })
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Ruler className="h-3.5 w-3.5" />
              Driveway planning guide
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Asphalt Driveway Thickness Guide</h1>
            <p className="text-lg leading-8 text-zinc-600">
              Use this guide to ask better questions about driveway depth, compacted thickness, base preparation, and
              the loads your driveway needs to carry.
            </p>
          </div>

          <ContentCredentials path={path} />

          <DirectAnswer question="How thick should an asphalt driveway be?">
            <p>
              A 2–3 inch compacted asphalt layer is a common residential planning starting point, not a universal
              specification. The correct driveway thickness depends on the soil and subgrade, base depth and quality,
              drainage, climate, and expected vehicles. A driveway used only by passenger cars can need a different
              pavement section from one used by delivery trucks, RVs, or trailers. Ask the contractor to state the
              finished compacted thickness and the complete base design in writing. Local specifications and a qualified
              pavement engineer take priority over general online guidance.
            </p>
          </DirectAnswer>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Start with the whole section", "The asphalt surface is only one part of a driveway. Soil, base, and drainage carry the load underneath it."],
              ["Compare compacted thickness", "A useful quote says what the asphalt measures after compaction, not only what is placed loose."],
              ["Match the design to use", "Vehicle weight, turning, and repeated loads can change the pavement section more than driveway size alone."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
              <Layers3 className="h-4 w-4" />
              Planning ranges, not a design specification
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What changes driveway thickness</h2>
            <ComparisonTable
              caption="Use the same site assumptions when comparing bids."
              rowLabel="Driveway condition"
              columns={[
                { key: "startingPoint", label: "Planning approach" },
                { key: "check", label: "What to confirm" }
              ]}
              rows={thicknessRows}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">The base and drainage matter first</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  Pavement thickness works as a system. Stable, properly compacted base material helps spread vehicle
                  loads, while drainage helps keep water from weakening the soil below. A surface layer cannot make up
                  for a soft base or water that has nowhere to go.
                </p>
                <p>
                  Before adding asphalt, look for standing water, pumping soil, edge breakage, low spots, and deep
                  cracks. These are clues that a contractor may need to repair the underlying structure instead of
                  simply paving over the problem.
                </p>
              </div>
            </div>
            <Card className="border-amber-200 bg-amber-50/60">
              <CardContent className="space-y-3">
                <TriangleAlert className="h-5 w-5 text-amber-700" />
                <p className="text-base font-medium text-zinc-950">Use official and local requirements</p>
                <p className="text-sm leading-6 text-zinc-600">
                  The Asphalt Institute&apos;s guidance for private driveways is a helpful technical reference, but it
                  does not replace local requirements or a site-specific design.
                </p>
                <a
                  href="https://www.asphaltinstitute.org/wp-content/uploads/CL-11-Ful-Depth-Asphalt-for-Private-Driveways.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-medium text-amber-800 underline underline-offset-4"
                >
                  Read the Asphalt Institute private driveway PDF
                </a>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How to compare asphalt thickness quotes</h2>
            <div className="space-y-3 text-sm leading-7 text-zinc-600">
              <p>
                Ask each contractor to separate removal, subgrade repair, base installation, drainage work, and final
                compacted asphalt thickness. A lower price can describe a smaller scope rather than a better deal.
              </p>
              <p>
                It also helps to calculate the approximate material quantity before you compare bids. That does not
                replace the contractor&apos;s plan, but it makes it easier to spot a quote that uses a very different
                thickness assumption.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/asphalt-tonnage-calculator" className="text-sm font-medium text-amber-800 underline underline-offset-4">Estimate asphalt tonnage</Link>
              <Link href="/asphalt-driveway-cost-calculator" className="text-sm font-medium text-amber-800 underline underline-offset-4">Estimate driveway cost</Link>
              <Link href="/asphalt-contractor-guide" className="text-sm font-medium text-amber-800 underline underline-offset-4">Compare contractor quotes</Link>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
              <ShieldCheck className="h-4 w-4" />
              Before you approve the work
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">A simple driveway thickness checklist</h2>
            <ul className="grid gap-3 text-sm leading-6 text-zinc-600 sm:grid-cols-2">
              {["Finished compacted asphalt thickness is written into the quote.", "The contractor explains what base work and compaction are included.", "Drainage and low spots are addressed before paving.", "Heavy vehicles and turning areas are disclosed during the site visit.", "Local specifications or engineering requirements are followed where they apply.", "The price includes removal, edges, cleanup, and any repairs clearly."].map((item) => (
                <li key={item} className="rounded-lg border border-zinc-200 bg-white p-4">{item}</li>
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
