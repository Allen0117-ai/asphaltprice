import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for Asphalt Calculator, including scope, limits, ownership, and updates.",
  path: "/terms"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Terms of Use", href: "/terms" }];

export default function TermsPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Terms of Use</h1>
          <p className="text-sm text-zinc-500">Last updated: May 11, 2026</p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Use of the site</h2>
            <p className="text-base leading-7 text-zinc-600">
              This site is for planning and educational use only. You may use it to estimate asphalt quantity, compare
              rough project costs, and review general paving guidance. Do not use it as a substitute for a contractor
              quote, engineering advice, or legal advice.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              You receive a limited, non-exclusive, non-transferable license to use the site for personal or internal
              planning purposes. You may not misuse the site, interfere with its operation, scrape it at scale, or present
              its estimates as guaranteed pricing.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Estimates and limits</h2>
            <p className="text-base leading-7 text-zinc-600">
              All estimates are approximate. Final pricing can change with job size, access, prep work, labor, materials,
              waste, local rules, and site conditions. You are responsible for checking your inputs and confirming the
              final scope with a qualified local professional before work begins.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Content ownership</h2>
            <p className="text-base leading-7 text-zinc-600">
              The layout, text, calculator logic, and other site content are owned by Asphalt Calculator or its licensors
              unless stated otherwise. You may not copy or reuse site content in a way that breaks the law or misleads
              users.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Changes to these terms</h2>
            <p className="text-base leading-7 text-zinc-600">
              We may update these terms from time to time. If we make a material change, we may revise the date on this
              page and update the text here without separate notice.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Applicable law</h2>
            <p className="text-base leading-7 text-zinc-600">
              These terms are written for a U.S.-focused website. Unless local consumer law requires a different result,
              they are intended to be governed by the laws of the United States and the state where the site operator is
              established, without regard to conflict of law rules.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
