import { BookOpenCheck, CalendarDays, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Asphalt Calculator",
  description: "Learn how Asphalt Calculator creates planning estimates, regional price ranges, and asphalt cost guidance.",
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
    text: "Pages are reviewed when calculator assumptions, price notes, or Search Console query patterns show a useful improvement.",
    icon: CalendarDays
  }
] as const;

export default function AboutPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
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
            <h2 className="text-xl font-semibold text-zinc-950">How the estimates work</h2>
            <p className="text-base leading-7 text-zinc-600">
              Tonnage estimates use a planning asphalt density and the project dimensions you enter. Cost estimates add
              broad material or installed price ranges. U.S. pages use U.S. defaults, while metric users in Canada, the
              UK, and other markets can enter local prices per tonne where that is how suppliers quote.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">What the site does not do</h2>
            <p className="text-base leading-7 text-zinc-600">
              The site does not provide final bids, engineering advice, or contractor approval. Real prices can change
              because of base repair, drainage, truck access, haul distance, minimum charges, permits, seasonality, and
              local labor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Corrections and updates</h2>
            <p className="text-base leading-7 text-zinc-600">
              If you spot a pricing issue, unclear explanation, or calculator problem, send a note through the contact
              page. Useful corrections include location, unit type, whether the price is material-only or installed,
              and what work was included in the quote.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
