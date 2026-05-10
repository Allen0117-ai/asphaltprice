import Link from "next/link";

import { ArrowRight, Home } from "lucide-react";

import { AsphaltCalculator } from "@/components/calculator/asphalt-calculator";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Driveway Cost Calculator",
  description: "Estimate driveway cost for asphalt, concrete, and gravel in one simple tool.",
  path: "/driveway-cost-calculator"
});

const faqs = [
  {
    question: "What does this page cover?",
    answer: "It compares common driveway material options so you can see a rough budget band."
  },
  {
    question: "Why keep gravel in the mix?",
    answer: "Gravel gives you a lower-cost option when you are still deciding on the final surface."
  },
  {
    question: "Is the estimate final?",
    answer: "No. It is a planning number. A contractor still needs to inspect the site before giving a quote."
  }
];

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Driveway Cost Calculator", href: "/driveway-cost-calculator" }];

export default function DrivewayCostPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webAppSchema({
            name: "Driveway Cost Calculator",
            description: siteConfig.description,
            url: `${siteConfig.url}/driveway-cost-calculator`
          }),
          faqSchema(faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Home className="h-3.5 w-3.5" />
              Driveway budget planning
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Driveway Cost Calculator</h1>
            <p className="text-lg leading-8 text-zinc-600">
              This page gives you a simple driveway budget range across asphalt, concrete, and gravel so you can pick a
              direction before you talk to a contractor.
            </p>
          </div>

          <AsphaltCalculator mode="driveway" defaultValues={{ areaSqFt: 800, thicknessInches: 3, wastePercent: 7, region: "national" }} />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Asphalt", "Usually the best balance of upfront cost and finished look."],
              ["Concrete", "Often higher upfront, but a common choice for a longer-term finish."],
              ["Gravel", "The lowest-cost option when you need a simple surface now."]
            ].map(([title, text]) => (
              <Card key={title} className="border-zinc-200">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Common questions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <Card key={item.question} className="border-zinc-200">
                  <CardContent className="space-y-2">
                    <p className="text-base font-medium text-zinc-950">{item.question}</p>
                    <p className="text-sm leading-6 text-zinc-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Link href="/asphalt-cost-guide" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
            Read the cost guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
