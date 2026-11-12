import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, BookOpen, MapPinned } from "lucide-react";

import { ContentCredentials } from "@/components/content/content-credentials";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { StickySectionNav } from "@/components/content/sticky-section-nav";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { articleSchema, buildMetadata, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo";
import { stateBuckets } from "@/lib/calculator/regional-prices";

const path = "/asphalt-prices-by-state";

const pageDescription =
  "Find published asphalt price examples and learn how to request comparable local material, delivery, and paving quotes.";

export const metadata = buildMetadata({
  title: "Asphalt Price Per Ton Near Me | U.S. State Pricing Guide",
  description: pageDescription,
  path
});

const quickNav = [
  { label: "State groups", href: "#state-bands" },
  { label: "Price examples", href: "#price-examples" },
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
      "Search for asphalt plants or paving contractors in your city or county. Ask two or three for current quotes, specifying whether you need plant pickup, delivery, or installation."
  },
  {
    question: "Is asphalt price per ton near me the same as the installed driveway price?",
    answer:
      "No. Material price per ton usually covers asphalt mix only. Installed pricing can include trucking, labor, equipment, base repair, removal, grading, cleanup, and contractor overhead."
  },
  {
    question: "Are these exact state prices?",
    answer: "No. The state groups are geographic navigation, not state-specific prices. The published examples below apply only to their stated locations, dates, and scopes."
  },
  {
    question: "Why not use ZIP code pricing?",
    answer: "Reliable ZIP-level pricing needs current local plant and contractor data that we do not have. Ask nearby suppliers for a quote for your project."
  },
  {
    question: "When should I get a real quote?",
    answer: "Once the project size and surface type are known, ask a local contractor to inspect the site."
  },
  {
    question: "Should I use state prices or the calculator first?",
    answer: "Use the calculator to estimate tonnage, then ask local suppliers or contractors for current prices. Its default cost ranges are assumptions, not verified local quotes."
  },
  {
    question: "How do I calculate total cost for my state?",
    answer:
      "Estimate tonnage with the calculator, then multiply by a current material quote. Ask for delivery and installation separately, including any preparation work."
  },
  {
    question: "Can I use this with a blacktop calculator?",
    answer:
      "Yes. Blacktop is another common name for asphalt; confirm the mix and local price with your supplier."
  },
  {
    question: "What is the price of blacktop per ton?",
    answer:
      "Blacktop generally refers to asphalt paving mix. Ask a local supplier for the mix and quantity you need; pickup, delivery, and installation are different scopes."
  },
  {
    question: "Can Canadian or UK visitors use these estimates?",
    answer:
      "The quote checklist can help, but the price examples are U.S.-specific. In Canada, ask for local pricing per tonne; in the UK, ask whether the quote is per tonne, square metre, or installed job."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "U.S. Asphalt Prices by State", href: "/asphalt-prices-by-state" }];

const whyPricesVary = [
  {
    title: "Local plant pricing",
    text:
      "The closest asphalt plant can change the number quickly. Confirm current pricing with a nearby plant or paving contractor."
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
      "A published material price cannot account for your driveway. Soft base, poor drainage, and removal work can move the final quote."
  },
  {
    title: "Access",
    text:
      "Easy suburban access is different from a tight city driveway, long rural lane, or steep site with limited staging room."
  }
] as const;

const localPriceSteps = [
  { title: "1. Estimate the quantity", text: "Measure the area and compacted depth; use the calculator to estimate tons." },
  { title: "2. Find local providers", text: "Search for asphalt plants or paving contractors in your city or county. Confirm they serve your location and project size." },
  { title: "3. Compare written quotes", text: "Ask two or three providers for the same mix, quantity, location, and scope. Separate pickup, delivery, and installation." }
] as const;

const contractorQuestions = [
  "What mix and compacted thickness are included?",
  "What is the material price per ton, and is there a minimum load or small-order charge?",
  "What are delivery, fuel, tax, and other fees?",
  "For installation, are removal, base repair, grading, drainage, and cleanup included?",
  "How long is the quote valid, and when can the work be done?"
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
    text: "Calculate tonnage and cost from your actual project dimensions."
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
    text: "Understand the factors that change a local quote."
  },
  {
    href: "/asphalt-contractor-guide",
    title: "Asphalt contractor guide",
    text: "Ask better questions when bids come in."
  },
  {
    href: "/blacktop-cost-per-ton",
    title: "Blacktop cost per ton",
    text: "Use the dedicated blacktop terminology guide before comparing material quotes."
  },
  {
    href: "/asphalt-driveway-replacement-cost-calculator",
    title: "Driveway replacement cost",
    text: "Consider removal, base repair, and new paving when requesting quotes."
  },
  {
    href: "/asphalt-driveway-resurfacing-cost-calculator",
    title: "Driveway resurfacing cost",
    text: "Estimate prep, localized repair, and an overlay when the base is still serviceable."
  }
] as const;

export default function AsphaltPricesByStatePage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({ name: "Asphalt Prices by State", description: pageDescription, path }),
          webPageSchema({ name: "Asphalt Prices by State", description: pageDescription, path }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <MapPinned className="h-3.5 w-3.5" />
              Local pricing guide
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Asphalt Price Per Ton Near Me by State
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              Find your state group, see what published prices actually cover, and prepare a request for local suppliers or contractors. Prices depend on the mix, quantity, delivery, and work required.
            </p>
          </div>

          <ContentCredentials path={path} />

          <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)]">
            <Card className="border-zinc-950 bg-zinc-950">
              <CardContent className="space-y-3">
                <p className="text-sm font-medium text-amber-300">Quick answer</p>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Get a local price for your actual project.
                </h2>
                <p className="text-sm leading-6 text-zinc-300">
                  Public price lists and bids offer examples, not current quotes for your address. Ask local providers
                  separately for plant pickup, delivered material, and installation.
                </p>
                <a href="#contractor-quotes" className="inline-flex font-medium text-amber-300 underline underline-offset-4">
                  See the quote request template
                </a>
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

          <section id="state-bands" className="scroll-mt-44 space-y-5">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpen className="h-4 w-4" /> State groups
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">Find your state</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                These groups organize the states geographically; they do not represent verified state prices.
                Search for plants and contractors in your city or county and confirm their service area.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stateBuckets.map((bucket) => (
                <Card key={bucket.label} className="border-zinc-200">
                  <CardContent className="space-y-4">
                    <h3 className="text-lg font-semibold text-zinc-950">{bucket.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {bucket.states.map((state) => (
                        <span key={state} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">{state}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="price-examples" className="scroll-mt-44 space-y-5">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Published price examples</h2>
              <p className="text-sm leading-7 text-zinc-600">
                Checked November 10, 2026. These examples show how prices and scopes differ; they are not state averages
                or guaranteed current offers. Availability, order size, taxes, and delivery can change your price.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-zinc-200"><CardContent className="space-y-3">
                <h3 className="font-semibold text-zinc-950">Vermont: plant pickup</h3>
                <p className="text-sm leading-6 text-zinc-600">Pike Industries lists $80–$89 per ton for standard 3/8-inch surface mix at its listed Vermont plants, effective April 1, 2026. Prices are at the plant and subject to change.</p>
                <a className="text-sm font-medium text-amber-800 underline underline-offset-4" href="https://pikeindustries.com/wp-content/uploads/2025/04/2026-HMA-Price-Cards-VT.pdf">View Pike&apos;s 2026 price card</a>
              </CardContent></Card>
              <Card className="border-zinc-200"><CardContent className="space-y-3">
                <h3 className="font-semibold text-zinc-950">Grayson County, Texas: delivered bids</h3>
                <p className="text-sm leading-6 text-zinc-600">The county&apos;s 2026 bid tab lists $91–$109.75 per ton for hot mix/hot lay delivered to its Sherman precinct from three bidders. Public bids have their own terms and are not residential quotes.</p>
                <a className="text-sm font-medium text-amber-800 underline underline-offset-4" href="https://www.co.grayson.tx.us/page/open/3539/0/2026-03%20ASPHALT%20MATERIALS%20BID%20TABULATION%20-%20STATUS%20CLOSED">View the county bid tabulation</a>
              </CardContent></Card>
            </div>
          </section>

          <section id="price-notes" className="scroll-mt-44 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">What these prices include</h2>
            <p className="max-w-3xl text-sm leading-7 text-zinc-600">
              Plant pickup, delivery, and installation are different scopes. The examples above do not establish a
              nationwide or state-wide range. Our calculator&apos;s default regional cost inputs are planning assumptions;
              their original quote samples are not documented, so they should not be treated as verified current prices.
              Enter a current local material price when available. See our <Link href="/methodology" className="font-medium text-amber-800 underline underline-offset-4">methodology</Link> for the calculation and its limits.
            </p>
          </section>

          <section id="why-vary" className="scroll-mt-44 space-y-5">
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

          <section id="contractor-quotes" className="scroll-mt-44 space-y-5">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Request comparable local quotes</h2>
              <p className="text-sm leading-7 text-zinc-600">For material, contact nearby asphalt plants; for paving, contact contractors serving your area. Send the same details to two or three providers. Select and copy the template below, then replace the brackets before sending it yourself.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-zinc-200 bg-zinc-50"><CardContent className="space-y-3">
                <h3 className="font-semibold text-zinc-950">Quote request template</h3>
                <div className="select-text whitespace-pre-line rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-700">{`Hello, I would like a quote for an asphalt project in [city / ZIP code].

Project: [driveway, road, or other]
Area: [square feet or length × width]
Compacted asphalt thickness: [inches, if known]
Estimated quantity: [tons, if known]
Existing surface and preparation needed: [details or unknown]
Requested scope: [plant pickup / delivery / installation]
Preferred timing: [date or flexible]

Please itemize the mix and material price per ton, minimum order, delivery and other fees. For installation, please include preparation, removal, base work, drainage, and cleanup, or identify exclusions. How long is the quote valid?`}</div>
                <Link href="/#calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">Estimate your asphalt quantity <ArrowRight className="h-4 w-4" /></Link>
              </CardContent></Card>
              <Card className="border-zinc-200"><CardContent className="space-y-3">
                <h3 className="font-semibold text-zinc-950">Before comparing quotes</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                  {contractorQuestions.map((question) => <li key={question}>{question}</li>)}
                </ul>
                <p className="text-sm leading-6 text-zinc-600">A delivered material quote is not an installed price. Ask a contractor to inspect the site before relying on a full project budget.</p>
              </CardContent></Card>
            </div>
          </section>

          <section id="how-to-use" className="scroll-mt-44 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Use your quote in the calculator</h2>
            <p className="max-w-3xl text-sm leading-7 text-zinc-600">Enter your measured area and compacted thickness, then enter the supplier&apos;s material price per ton. The custom price estimates material only; the installed range remains a separate default assumption. Confirm quantity and scope before ordering; delivery, base work, and other charges may be separate.</p>
            <Link href="/#calculator" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">Open the calculator <ArrowRight className="h-4 w-4" /></Link>
          </section>

          <section id="related-tools" className="scroll-mt-44 space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Tools for quantity and total cost</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Use your measured area, asphalt thickness, and written quote scope with the right tool.
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

          <section id="faq" className="scroll-mt-44 space-y-4">
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
