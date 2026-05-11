import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "Disclaimer for Asphalt Calculator, including estimate limits, price data, and affiliate disclosure.",
  path: "/disclaimer"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Disclaimer", href: "/disclaimer" }];

export default function DisclaimerPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Disclaimer</h1>
          <p className="text-sm text-zinc-500">Last updated: May 11, 2026</p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Estimate limits</h2>
            <p className="text-base leading-7 text-zinc-600">
              All numbers on this site are estimates only. The real price can change because of site access, materials,
              prep work, labor, waste, haul distance, and local market conditions.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              The calculator is meant to help you prepare for conversations with suppliers or contractors. It does not
              create a quote, bid, warranty, or promise that any contractor will perform work at the displayed price.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Price data</h2>
            <p className="text-base leading-7 text-zinc-600">
              Regional price ranges are meant for planning and comparison. They may not match every local quote, and they
              should not be treated as a final bid or contract price.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              The ranges use broad regional assumptions, standard asphalt density, typical waste allowances, and general
              material and installed-cost bands. Local plant pricing, fuel costs, minimum job charges, disposal fees,
              permits, seasonality, and base repairs can move your final number up or down.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Not contractor advice</h2>
            <p className="text-base leading-7 text-zinc-600">
              This site does not provide contractor, legal, or engineering advice. Always confirm the final scope,
              materials, and installation plan with a qualified local professional before starting work.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              If your project involves drainage problems, public access, commercial traffic, permits, or structural
              concerns, ask a licensed professional to review the site before relying on any budget estimate.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Affiliate disclosure</h2>
            <p className="text-base leading-7 text-zinc-600">
              If affiliate links, sponsored placements, or other paid referrals are added later, this page will be updated
              with a clear disclosure before those links go live.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
