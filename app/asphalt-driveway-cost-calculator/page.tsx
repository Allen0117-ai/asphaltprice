import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, BookOpen, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Estimate asphalt driveway cost, tonnage, and installed range with U.S. default pricing or your local price per ton or tonne.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Cost Calculator | Estimate Installed Cost",
  description: pageDescription,
  path: "/asphalt-driveway-cost-calculator"
});

const quickNav = [
  { label: "What it covers", href: "#covers" },
  { label: "Driveway types", href: "#types" },
  { label: "Price drivers", href: "#drivers" },
  { label: "Quote checklist", href: "#checklist" },
  { label: "Related pages", href: "#related-tools" },
  { label: "FAQ", href: "#faq" }
] as const;

const quickNavSections = quickNav.map((item) => ({ id: item.href, label: item.label }));

const faqs = [
  {
    question: "When was this calculator content last updated?",
    answer:
      "The page content was last reviewed in May 2026. Prices still vary by city, season, fuel cost, and contractor availability."
  },
  {
    question: "What does this page estimate?",
    answer: "It estimates material and installed cost for a typical asphalt driveway project using a simple pricing model."
  },
  {
    question: "Why is the result a range?",
    answer: "Driveway prices move with labor, prep work, and site access, so a range is more honest than a single number."
  },
  {
    question: "Can I use it for a parking pad?",
    answer: "Yes. Enter the pad area and thickness you expect, then use the range as a planning number."
  },
  {
    question: "Should I compare it with the tonnage calculator?",
    answer: "Yes. The tonnage page helps you check the material quantity before you compare installed pricing."
  },
  {
    question: "Can I use this driveway calculator outside the U.S.?",
    answer:
      "Yes for quantity planning. Default price ranges are U.S.-based, so outside the U.S. enter your local price per ton or tonne."
  },
  {
    question: "Is asphalt called tarmac in the UK?",
    answer:
      "Many UK homeowners say tarmac for a driveway surface. This calculator can still help, but use local tarmac pricing and metric tonnes when you compare quotes."
  },
  {
    question: "What should I ask a contractor before hiring?",
    answer:
      "Ask what thickness is included, whether the base will be repaired, how drainage is handled, what unit price is used, and whether cleanup is included."
  }
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Asphalt Driveway Cost Calculator", href: "/asphalt-driveway-cost-calculator" }
];

const drivewayTypes = [
  {
    title: "New driveway",
    text:
      "A new build often needs grading and base prep before the asphalt goes down. It is the cleanest fit for a full driveway estimate."
  },
  {
    title: "Overlay",
    text:
      "An overlay works when the existing surface is still serviceable. It can be a good value, but the base still needs a careful look."
  },
  {
    title: "Repair and resurface",
    text:
      "If the old driveway has soft spots or broken edges, the quote should include repair work before the new layer is installed."
  }
] as const;

const priceDrivers = [
  {
    title: "Thickness",
    text: "More thickness means more asphalt, so this is one of the clearest ways the quote moves up."
  },
  {
    title: "Base condition",
    text: "A weak or uneven base adds grading, stone, patching, or removal work before the new surface can be installed."
  },
  {
    title: "Access and haul distance",
    text: "If the crew has to work around tight access, staging limits, or a long material haul, labor time can climb."
  },
  {
    title: "Region",
    text: "Local labor rates, weather, asphalt plant access, and seasonal demand all change the pricing band."
  }
] as const;

const relatedPages = [
  {
    href: "/asphalt-cost-guide",
    title: "Asphalt cost guide",
    text: "Read the plain-language breakdown behind the number."
  },
  {
    href: "/asphalt-tonnage-calculator",
    title: "Asphalt tonnage calculator",
    text: "Check the material quantity before you look at the full cost."
  },
  {
    href: "/asphalt-prices-by-state",
    title: "Asphalt prices by state",
    text: "Use broad regional bands to sanity-check the estimate."
  },
  {
    href: "/asphalt-contractor-guide",
    title: "Asphalt contractor guide",
    text: "Compare quote scope and ask better questions before you hire."
  },
  {
    href: "/blacktop-driveway-cost-estimator",
    title: "Blacktop driveway cost estimator",
    text: "Use the same estimator with the wording many homeowners search."
  },
  {
    href: "/asphalt-cost-per-square-foot",
    title: "Asphalt cost per square foot",
    text: "Translate the installed range into a square-foot comparison."
  },
  {
    href: "/tar-and-chip-driveway-cost-calculator",
    title: "Tar and chip driveway cost",
    text: "Compare asphalt with a chip seal driveway option."
  }
] as const;

export default function AsphaltDrivewayCostPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Asphalt Driveway Cost Calculator",
            description: pageDescription,
            url: `${siteConfig.url}/asphalt-driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Sparkles className="h-3.5 w-3.5" />
              Driveway pricing in one place
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Asphalt Driveway Cost Calculator
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Enter the size of the driveway, pick a thickness, and get a rough material and installed range you can
              use before asking for a quote.
            </p>
            <p className="text-sm leading-6 text-zinc-600">
              Default pricing uses broad U.S. ranges. If you are outside the U.S., enter your local asphalt or tarmac
              price per ton or tonne for a better material estimate.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1">
                <MapPin className="h-3.5 w-3.5" />
                Region aware
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Estimate only
              </span>
            </div>
          </div>

          <AsphaltCalculator mode="asphalt" defaultValues={{ areaSqFt: 800, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <StickySectionNav sections={quickNavSections} className="mt-2" />

          <section className="grid gap-4 md:grid-cols-3">
            {[
              ["Updated", "Content last reviewed May 2026 for planning clarity and quote-comparison language."],
              ["Estimate only", "Use this as a budget starting point. A contractor still needs to inspect the base, drainage, and access."],
              ["US, Canada, UK", "U.S. quotes often use tons, Canada may use tons or tonnes, and UK quotes often say tarmac and tonnes."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Use it for", "Driveways, access pads, small lots, and resurfacing planning."],
              ["Good starting point", "Helps you compare contractor bids without guessing the size."],
              ["Still needed later", "A real quote should confirm base prep, grading, access, and cleanup."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section id="covers" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpen className="h-4 w-4" />
                What it covers
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">A driveway quote should read like a plan, not a guess</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>
                  This calculator is for the common driveway questions people ask first: how much will it take, what
                  is the rough installed range, and whether a contractor number looks reasonable.
                </p>
                <p>
                  The result is only a starting point, but it gives you a better way to compare bids because the area
                  and thickness are already fixed before the conversation starts.
                </p>
              </div>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Good first pass</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Use the calculator to get a number, then bring that number into a contractor quote with the same
                  square footage and the same thickness.
                </p>
              </CardContent>
            </Card>
          </section>

          <section id="types" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common driveway types</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Two driveways can have the same footprint and still need a different budget. These are the common
                scopes most homeowners compare.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {drivewayTypes.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="drivers" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What changes the driveway price</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                If two quotes do not match, the cause is usually one of these four things: thickness, base condition,
                access, or region. That is why a range is more useful than a single number.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {priceDrivers.map((item) => (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="checklist" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What a good quote should include</h2>
              <div className="space-y-3 text-sm leading-7 text-zinc-600">
                <p>Look for a clear thickness, base prep, access note, and cleanup line so you know what the number covers.</p>
                <p>
                  If one bid is far lower than the others, check whether it skipped repair work or used a thinner build-up. The
                  cheapest number is not always the most complete one.
                </p>
                <p>
                  For a cleaner comparison, ask every contractor to quote the same area, same thickness, same base
                  repair assumptions, and the same material unit: ton, tonne, asphalt, or tarmac.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Read the cost guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/asphalt-contractor-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                  Compare contractor quotes
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

          <section id="related-tools" className="scroll-mt-24 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Use the driveway calculator with these pages</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                The calculator gives you the number. These pages help you explain it, compare it, or check whether the range
                still makes sense in your region.
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

          <Link href="/asphalt-tonnage-calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Need only the tonnage?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
