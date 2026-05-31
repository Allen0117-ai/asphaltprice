import Link from "next/link";
import type { Route } from "next";

import { ArrowRight, BookOpen, Calculator, ClipboardCheck, MapPin } from "lucide-react";

import { AsphaltCalculator, type CalculatorMode } from "@/components/calculator/asphalt-calculator";
import { FaqAccordion } from "@/components/content/faq-accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { breadcrumbSchema, faqSchema, webAppSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { CalculatorInput, InputMode } from "@/lib/calculator/formulas";

type CalculatorDefaults = Partial<CalculatorInput> & {
  inputMode?: InputMode;
  projectScope?: "new-install" | "overlay" | "replacement";
};

type PageLink = {
  href: string;
  title: string;
  text: string;
};

type InfoCard = {
  title: string;
  text: string;
};

type DetailSection = {
  title: string;
  text: string;
  items: readonly InfoCard[];
};

type ExampleRow = {
  label: string;
  scope: string;
  estimate: string;
};

export type CalculatorLandingPageConfig = {
  title: string;
  eyebrow: string;
  description: string;
  path: string;
  schemaName: string;
  calculatorMode: CalculatorMode;
  calculatorDefaults: CalculatorDefaults;
  breadcrumbs: readonly PageLink[];
  highlights: readonly InfoCard[];
  sections: readonly DetailSection[];
  quoteChecks: readonly string[];
  exampleRows?: readonly ExampleRow[];
  relatedPages: readonly PageLink[];
  faqs: readonly { question: string; answer: string }[];
};

export function CalculatorLandingPage({ config }: { config: CalculatorLandingPageConfig }) {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(config.breadcrumbs.map((item) => ({ label: item.title, href: item.href }))),
          webAppSchema({
            name: config.schemaName,
            description: config.description,
            url: `${siteConfig.url}${config.path}`
          }),
          faqSchema(config.faqs)
        ]}
      />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-9">
          <div className="max-w-3xl space-y-4">
            <Breadcrumbs items={config.breadcrumbs.map((item) => ({ label: item.title, href: item.href }))} />
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-950">
              <Calculator className="h-3.5 w-3.5" />
              {config.eyebrow}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">{config.title}</h1>
            <p className="text-lg leading-8 text-zinc-600">{config.description}</p>
          </div>

          <AsphaltCalculator mode={config.calculatorMode} defaultValues={config.calculatorDefaults} />

          <section className="grid gap-4 md:grid-cols-3">
            {config.highlights.map((item) => (
              <Card key={item.title} className="border-zinc-200 bg-zinc-50">
                <CardContent className="space-y-2">
                  <p className="text-base font-medium text-zinc-950">{item.title}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {config.sections.map((section) => (
            <section key={section.title} className="space-y-5">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                  <BookOpen className="h-4 w-4" />
                  Guide
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{section.text}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {section.items.map((item) => (
                  <Card key={item.title} className="border-zinc-200">
                    <CardContent className="space-y-2">
                      <p className="text-base font-medium text-zinc-950">{item.title}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          {config.exampleRows?.length ? (
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <MapPin className="h-4 w-4" />
                Example ranges
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-200">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-zinc-50 text-xs uppercase tracking-[0.14em] text-zinc-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Project</th>
                      <th className="px-4 py-3 font-medium">Scope</th>
                      <th className="px-4 py-3 font-medium">Planning range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {config.exampleRows.map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-3 font-medium text-zinc-950">{row.label}</td>
                        <td className="px-4 py-3 text-zinc-600">{row.scope}</td>
                        <td className="px-4 py-3 text-zinc-600">{row.estimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <ClipboardCheck className="h-4 w-4" />
                Quote checklist
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Before you trust a paving number</h2>
              <ul className="space-y-2 text-sm leading-6 text-zinc-600">
                {config.quoteChecks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="space-y-3">
                <p className="text-base font-medium text-zinc-950">Best next step</p>
                <p className="text-sm leading-6 text-zinc-600">
                  Copy the calculator result, then ask two or three local suppliers or paving contractors to quote the same size, thickness, and scope.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">Related asphalt tools</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Use these pages when you need a different cost unit, local price band, or driveway-specific estimate.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {config.relatedPages.map((item) => (
                <Link key={item.href} href={item.href as Route}>
                  <Card className="h-full border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-zinc-50">
                    <CardContent className="space-y-3">
                      <p className="text-base font-medium text-zinc-950">{item.title}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700">
                        Open page
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">FAQ</h2>
            <FaqAccordion items={config.faqs} defaultOpenIndex={0} />
          </section>
        </div>
      </section>
    </>
  );
}
