import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildMetadata, breadcrumbSchema, webPageSchema } from "@/lib/seo";

const path = "/privacy";
const pageDescription =
  "Read how Asphalt Calculator handles calculator inputs, contact emails, cookies, analytics, data sharing, and privacy requests when you use the website.";

export const metadata = buildMetadata({
  title: "Asphalt Calculator Privacy Policy and Data Use",
  description: pageDescription,
  path
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Privacy Policy", href: "/privacy" }];

export default function PrivacyPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({ name: "Asphalt Calculator Privacy Policy", description: pageDescription, path })
        ]}
      />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Privacy Policy</h1>
          <p className="text-sm text-zinc-500">Last updated: August 5, 2026</p>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Overview</h2>
            <p className="text-base leading-7 text-zinc-600">
              Asphalt Calculator is a public website that helps estimate asphalt quantity and rough project cost. You do
              not need an account to use the calculator.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Information you enter</h2>
            <p className="text-base leading-7 text-zinc-600">
              Calculator inputs such as area, thickness, region, and waste allowance are used to show the result on the
              page. The calculator is designed to work in your browser. We do not ask for your name, address, phone
              number, payment details, or project documents to use the tool.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Email and contact</h2>
            <p className="text-base leading-7 text-zinc-600">
              If you email us, we receive the information you choose to include, such as your email address, message, and
              any details needed to answer your question. We use that information to reply, fix site issues, review
              corrections, and handle partnership or support requests.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Analytics, ads, and cookies</h2>
            <p className="text-base leading-7 text-zinc-600">
              This site does not currently use account tracking, contact forms, advertising scripts, or cookie-based tools.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Data sharing</h2>
            <p className="text-base leading-7 text-zinc-600">
              We do not sell personal information. We may share information only when needed to operate the website,
              respond to your request, comply with law, prevent abuse, or protect the site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Your rights</h2>
            <p className="text-base leading-7 text-zinc-600">
              Depending on where you live, you may have the right to request access, correction, deletion, or a copy of
              personal information we hold about you. You may also ask us not to use your contact information for future
              replies, unless we need to keep limited records for security, legal, or operational reasons.
            </p>
            <p className="text-base leading-7 text-zinc-600">
              If privacy laws such as the California Consumer Privacy Act, the GDPR, or similar local rules apply to
              your request, we will handle it according to those requirements after verifying the request as needed.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-950">Contact</h2>
            <p className="text-base leading-7 text-zinc-600">
              For privacy questions or data requests, email{" "}
              <a href="mailto:hello@asphaltprice.com" className="font-medium text-zinc-950 underline underline-offset-4">
                hello@asphaltprice.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
