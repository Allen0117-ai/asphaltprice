import Link from "next/link";

import { BookOpenCheck, CalendarDays, ShieldCheck } from "lucide-react";

import { ContentCredentials } from "@/components/content/content-credentials";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { aboutPageSchema, buildMetadata, breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Meet the Asphalt Calculator editorial team and learn how we review formulas, regional planning ranges, sources, corrections, and estimate limitations.";

export const metadata = buildMetadata({
  title: "About the Asphalt Calculator Editorial Team",
  description: pageDescription,
  path: "/about"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "About", href: "/about" }];

const trustCards = [
  {
    title: "Estimate-first guidance",
    text: "The site is built to help homeowners and property managers prepare for quotes, not replace a local contractor inspection.",
    icon: ShieldCheck
  },
  {
    title: "Clear price assumptions",
    text: "Regional numbers use broad planning bands, standard density assumptions, and visible warnings where local pricing can change.",
    icon: BookOpenCheck
  },
  {
    title: "Updated as data improves",
    text: "Pages are reviewed when formulas, source data, price notes, or documented corrections change.",
    icon: CalendarDays
  }
] as const;

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          aboutPageSchema({ name: "About Asphalt Calculator", description: pageDescription, path: "/about" }),
          organizationSchema({ name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}${siteConfig.icon}` })
        ]}
      />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <Breadcrumbs items={breadcrumbs} />
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">About Asphalt Calculator</h1>
            <p className="text-base leading-7 text-zinc-600">
              Asphalt Calculator is an independent planning tool for asphalt, blacktop, and tarmac estimates. It helps
              you turn area, thickness, waste, and local price assumptions into a rough number before you compare real
              contractor or supplier quotes.
            </p>
          </div>

          <ContentCredentials path="/about" />

          <div className="grid gap-4 md:grid-cols-3">
            {trustCards.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="border-zinc-200">
                  <CardContent className="space-y-3">
                    <Icon className="h-5 w-5 text-amber-600" />
                    <p className="text-base font-medium text-zinc-950">{item.title}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Who writes and reviews the content</h2>
            <p className="text-base leading-7 text-zinc-600">
              Pages are prepared and reviewed by the Asphalt Calculator Editorial Team. We are not a licensed engineering
              firm, paving contractor, or material supplier. We keep formulas consistent, label assumptions clearly,
              separate material prices from installed prices, and explain the limits of every estimate.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              We link to public sources when a statement relies on an outside fact, and we label broad planning ranges so
              you can replace them with current local quotes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">How the estimates work</h2>
            <p className="text-base leading-7 text-zinc-600">
              Tonnage estimates use a planning asphalt density and the project dimensions you enter. Cost estimates add
              broad material or installed price ranges. U.S. pages use U.S. defaults, while metric users in Canada, the
              UK, and other markets can enter local prices per tonne where that is how suppliers quote.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              For formula details, source links, and regional-price limits, see the{" "}
              <Link href="/methodology" className="font-medium text-amber-800 underline underline-offset-4">
                data and methodology page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">What the site does not do</h2>
            <p className="text-base leading-7 text-zinc-600">
              The site does not provide final bids, engineering advice, or contractor approval. Real prices can change
              because of base repair, drainage, truck access, haul distance, minimum charges, permits, seasonality, and
              local labor.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              The site also does not sell leads or rank local contractors. A listed planning range should never be read
              as an endorsement, guarantee, engineering design, or instruction to skip a site inspection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Corrections and updates</h2>
            <p className="text-base leading-7 text-zinc-600">
              If you spot a pricing issue, unclear explanation, or calculator problem, send a note through the contact
              page. Useful corrections include location, unit type, whether the price is material-only or installed,
              and what work was included in the quote.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              Every correction is checked for unit type, date, location, and scope before it changes a public assumption.
              If evidence is incomplete, we may clarify the wording without treating one quote as a regional average.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
