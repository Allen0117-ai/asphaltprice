import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: "Disclaimer for Asphalt Price Calculator.",
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
          <p className="text-base leading-7 text-zinc-600">
            All numbers on this site are estimates. The real price may change because of site access, materials,
            preparation work, labor, and local market conditions.
          </p>
          <p className="text-base leading-7 text-zinc-600">
            Use the result as a planning tool, not as a final bid or contract price.
          </p>
        </div>
      </section>
    </>
  );
}
