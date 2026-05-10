import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for Asphalt Price Calculator.",
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
          <p className="text-base leading-7 text-zinc-600">
            This website is for planning and educational use only. It does not provide legal, financial, or contractor
            advice.
          </p>
          <p className="text-base leading-7 text-zinc-600">
            Estimates are approximate. Always confirm final scope and price with a qualified local professional before you
            start work.
          </p>
        </div>
      </section>
    </>
  );
}
