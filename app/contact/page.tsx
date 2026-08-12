import { Mail } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, contactPageSchema } from "@/lib/seo";

const pageDescription =
  "Contact Asphalt Calculator to report a formula issue, submit a documented pricing correction, ask a methodology question, or share website feedback.";

export const metadata = buildMetadata({
  title: "Contact the Asphalt Calculator Editorial Team",
  description: pageDescription,
  path: "/contact"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }];

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          contactPageSchema({
            name: "Contact the Asphalt Calculator Editorial Team",
            description: pageDescription,
            path: "/contact"
          })
        ]}
      />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Contact</h1>
          <p className="text-base leading-7 text-zinc-600">
            For feedback, corrections, or partnership questions, reach out by email.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Who runs this site</h2>
            <p className="text-base leading-7 text-zinc-600">
              Asphalt Calculator is operated as an independent planning tool for homeowners, property managers, and
              small paving projects. We focus on simple asphalt quantity and cost estimates, not contractor brokerage or
              final bid pricing.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Helpful correction details</h2>
            <p className="text-base leading-7 text-zinc-600">
              Include the page URL, city or region, quote date, unit type, and whether the number covers plant pickup,
              delivery, or installation. If possible, list the compacted thickness, base work, removal, drainage, and
              cleanup included. These details make it easier to compare your quote with the assumptions shown on the page.
            </p>
          </div>

          <Card className="border-zinc-200">
            <CardContent className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-600" />
              <a href="mailto:hello@asphaltprice.com" className="text-sm font-medium text-zinc-950">
                hello@asphaltprice.com
              </a>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">What to send</h2>
            <p className="text-base leading-7 text-zinc-600">
              Useful messages include pricing corrections, broken links, calculator issues, and suggestions for clearer
              paving guidance. If you are asking about a specific project, please do not send sensitive personal or
              financial details.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
