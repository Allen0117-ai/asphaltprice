import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Get an asphalt driveway estimate with square footage, thickness, project type, tonnage, waste, and local installed cost range.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Estimate | Cost & Tonnage",
  description: pageDescription,
  path: "/asphalt-driveway-estimate"
});

const config: CalculatorLandingPageConfig = {
  title: "Asphalt Driveway Estimate",
  eyebrow: "Residential driveway estimate",
  description: pageDescription,
  path: "/asphalt-driveway-estimate",
  schemaName: "Asphalt Driveway Estimate",
  calculatorMode: "driveway",
  calculatorDefaults: { areaSqFt: 700, thicknessInches: 3, wastePercent: 7, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: "/asphalt-driveway-estimate", title: "Asphalt Driveway Estimate", text: "Asphalt Driveway Estimate" }
  ],
  highlights: [
    {
      title: "For homeowners",
      text: "Use this before calling paving contractors so you know your rough size, tonnage, and price range."
    },
    {
      title: "Project type included",
      text: "Switch between new installation, overlay, and full replacement to match the bid you expect."
    },
    {
      title: "Best use",
      text: "Treat the result as a planning number, then confirm it with a site visit."
    }
  ],
  sections: [
    {
      title: "What a driveway estimate should include",
      text:
        "A driveway estimate should not be just one total. It should mention the area, compacted thickness, material quantity, base work, drainage, removal, cleanup, and whether the surface is new, resurfaced, or replaced.",
      items: [
        {
          title: "Area and thickness",
          text: "These two inputs decide most of the asphalt tonnage before labor is added."
        },
        {
          title: "Base and drainage",
          text: "Weak base or water problems can turn a simple overlay into a more expensive repair."
        },
        {
          title: "Removal scope",
          text: "Full tear-out costs more because the crew has to remove and haul away the old surface."
        }
      ]
    },
    {
      title: "How to compare driveway bids",
      text:
        "Ask each contractor to quote the same driveway size and the same scope. If one bid looks much cheaper, check whether it skips base repair, edging, drainage, or cleanup.",
      items: [
        {
          title: "New install",
          text: "Best for bare ground, a new build, or a driveway that needs a full base."
        },
        {
          title: "Overlay",
          text: "Best when the existing surface and base are still sound."
        },
        {
          title: "Replacement",
          text: "Best when the old asphalt is cracked, broken, or failing from underneath."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "One-car driveway", scope: "About 200-400 sq ft", estimate: "Often affected by minimum crew charges." },
    { label: "Two-car driveway", scope: "About 600-800 sq ft", estimate: "Common homeowner estimate range." },
    { label: "Long rural driveway", scope: "1,000+ sq ft", estimate: "Haul distance and access matter more." }
  ],
  quoteChecks: [
    "Ask for compacted asphalt thickness, not loose thickness.",
    "Ask whether grading, base stone, drainage, removal, and cleanup are included.",
    "Ask whether the contractor is quoting overlay or full replacement.",
    "Compare at least two quotes with the same square footage."
  ],
  relatedPages: [
    {
      href: "/asphalt-driveway-cost-calculator",
      title: "Driveway cost calculator",
      text: "Use the main driveway calculator page."
    },
    {
      href: "/blacktop-driveway-cost-estimator",
      title: "Blacktop estimator",
      text: "Use blacktop wording for the same driveway math."
    },
    {
      href: "/driveway-cost-calculator",
      title: "Driveway cost calculator",
      text: "Compare asphalt, concrete, and gravel."
    },
    {
      href: "/asphalt-contractor-guide",
      title: "Contractor guide",
      text: "Use this before hiring a paving company."
    }
  ],
  faqs: [
    {
      question: "How do I get an asphalt driveway estimate?",
      answer: "Measure the driveway area, choose thickness, select the project type, then compare the calculator result with local contractor bids."
    },
    {
      question: "What is the biggest driveway cost driver?",
      answer: "Base condition is often the biggest surprise because repair, grading, drainage, and removal can add more than material alone."
    },
    {
      question: "Is overlay cheaper than replacement?",
      answer: "Usually yes, but only when the existing driveway and base are still sound."
    },
    {
      question: "Is this a contractor quote?",
      answer: "No. It is a planning estimate. A contractor still needs to inspect the site before final pricing."
    }
  ]
};

export default function AsphaltDrivewayEstimatePage() {
  return <CalculatorLandingPage config={config} />;
}
