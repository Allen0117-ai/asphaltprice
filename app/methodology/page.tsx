import Link from "next/link";

import { BarChart3, Calculator, RefreshCw, ShieldCheck } from "lucide-react";

import { AsphaltFormulaFigure } from "@/components/content/asphalt-formula-figure";
import { ContentCredentials } from "@/components/content/content-credentials";
import { DirectAnswer } from "@/components/content/direct-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { methodologySources } from "@/lib/content-meta";
import { buildMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";

const path = "/methodology";
const pageDescription =
  "Read the data sources, density assumption, formulas, regional price limitations, review process, and correction policy used by Asphalt Calculator.";

export const metadata = buildMetadata({
  title: "Asphalt Calculator Data & Methodology",
  description: pageDescription,
  path
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Data & Methodology", href: path }
];

const methodCards = [
  {
    title: "Quantity first",
    text: "The calculator converts area and compacted thickness into volume, then converts volume into weight with a planning density.",
    icon: Calculator
  },
  {
    title: "Local price wins",
    text: "A current supplier or contractor price is more useful than a broad regional starting range.",
    icon: BarChart3
  },
  {
    title: "Visible limitations",
    text: "Mix density, base work, access, drainage, minimum charges, and labor can change the final price.",
    icon: ShieldCheck
  },
  {
    title: "Review and correct",
    text: "Sources and assumptions are reviewed when calculation methods change, public indicators move materially, or a documented correction is received.",
    icon: RefreshCw
  }
] as const;

export default function MethodologyPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({ name: "Asphalt Calculator Data & Methodology", description: pageDescription, path })
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Transparency</p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Data, formula, and review methodology
            </h1>
            <p className="text-lg leading-8 text-zinc-600">
              This page explains the inputs, assumptions, sources, and limits behind the estimates, including how broad
              regional ranges differ from current local quotes.
            </p>
          </div>

          <ContentCredentials path={path} />

          <DirectAnswer question="How does Asphalt Calculator create an estimate?">
            <p>
              Asphalt Calculator starts with the dimensions you enter, converts compacted thickness into feet, and
              multiplies the volume by a density of 145 pounds per cubic foot. It converts the result to U.S. short tons
              or metric tonnes, then adds the waste allowance you choose. Cost results use either your local price or a
              broad regional starting range. Confirm the actual mix, quantity, price, delivery, and site work with a
              supplier or contractor before ordering material.
            </p>
          </DirectAnswer>

          <div className="grid gap-4 sm:grid-cols-2">
            {methodCards.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-3">
                    <Icon className="h-5 w-5 text-amber-700" />
                    <h2 className="text-lg font-semibold text-zinc-950">{item.title}</h2>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <AsphaltFormulaFigure />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Quantity formula and density</h2>
            <div className="space-y-4 text-base leading-7 text-zinc-600">
              <p>
                For imperial inputs, the core formula is square feet × thickness in feet × density in pounds per cubic
                foot ÷ 2,000. The result is short tons before waste. Metric inputs are converted consistently and shown
                in tonnes. Waste is applied after the base quantity so the percentage is shown separately and can be adjusted.
              </p>
              <p>
                The 145 lb/ft³ value is deliberately labeled as a planning density. The Federal Highway Administration
                gives an example of a limestone-aggregate asphalt mixture with a compacted density of 147 lb/ft³ and
                notes that density can differ significantly with aggregate and compaction. That evidence supports using
                a nearby round value for early math, but it does not make 145 correct for every mix. A supplier mix
                design, scale ticket, or project specification should replace the default when available.
              </p>
              <p>
                Coverage values such as square feet per ton are rearrangements of the same formula. They are not separate
                measurements. If thickness or density changes, coverage changes too. Read every coverage estimate alongside
                its thickness and density assumptions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">How regional price bands should be used</h2>
            <div className="space-y-4 text-base leading-7 text-zinc-600">
              <p>
                The regional material and installed bands are broad planning assumptions. They help distinguish
                material-only costs from installed work, but they are not a substitute for current local supplier prices
                or contractor bids.
              </p>
              <p>
                Public sources are used as context, not as a direct price-per-ton conversion. The Bureau of Labor
                Statistics Producer Price Index tracks changes in producer selling prices, including paving mixtures and
                blocks, but an index is not a retail quote. The Energy Information Administration publishes regional
                on-highway diesel prices, which help explain why trucking pressure can change delivered cost, but diesel
                alone cannot determine a paving bid. Local material availability, crew rates, project size, and site
                conditions still dominate the final number.
              </p>
              <p>
                If you have a fresh local price, enter it. Ask whether that number is plant pickup, delivered material,
                or fully installed work. Then keep the same area, compacted thickness, removal, base, drainage, edging,
                and cleanup scope when comparing quotes.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Primary references</h2>
            <ul className="space-y-3 text-sm leading-6 text-zinc-600">
              {methodologySources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    rel="noreferrer"
                    className="font-medium text-amber-800 underline decoration-amber-300 underline-offset-4"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-6 text-zinc-500">
              Sources were last checked August 5, 2026. They support the physical assumptions and market context used on
              the site; local quotes remain the best basis for a project budget.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-zinc-950 p-6 text-white">
            <h2 className="text-2xl font-semibold">Corrections and review policy</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
              <p>
                A useful correction includes the page URL, location, unit, date, whether the number is material-only,
                delivered, or installed, and the scope included. Private contact details and unverified promotional
                claims are not published as evidence.
              </p>
              <p>
                Send documented corrections to{" "}
                <a href="mailto:hello@asphaltprice.com" className="font-medium text-amber-300 underline underline-offset-4">
                  hello@asphaltprice.com
                </a>
                , or use the <Link href="/contact" className="font-medium text-amber-300 underline underline-offset-4">contact page</Link>.
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
