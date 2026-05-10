import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Asphalt Price Calculator.",
  path: "/privacy"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy" }];

export default function PrivacyPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Privacy Policy</h1>
          <p className="text-base leading-7 text-zinc-600">
            This site does not require an account. If analytics, ads, or contact forms are added later, this page should
            be updated to match the live setup.
          </p>
          <p className="text-base leading-7 text-zinc-600">
            Right now the calculator works in your browser. The page inputs are used only to generate the estimate you
            see on screen.
          </p>
        </div>
      </section>
    </>
  );
}
