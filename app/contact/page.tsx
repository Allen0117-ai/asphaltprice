import { Mail } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Asphalt Price Calculator.",
  path: "/contact"
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }];

export default function ContactPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Contact</h1>
          <p className="text-base leading-7 text-zinc-600">
            For feedback, corrections, or partnership questions, reach out by email.
          </p>
          <Card className="border-zinc-200">
            <CardContent className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-600" />
              <a href="mailto:hello@asphaltprice.com" className="text-sm font-medium text-zinc-950">
                hello@asphaltprice.com
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
