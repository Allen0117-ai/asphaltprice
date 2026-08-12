import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Estimate tarmac tonnes and cost from square metres, compacted thickness, waste, and a local price per tonne, with metric driveway planning guidance.";

export const metadata = buildMetadata({
  title: "Tarmac Calculator | Tonnes, Area & Cost",
  description: pageDescription,
  path: "/tarmac-calculator"
});

const config: CalculatorLandingPageConfig = {
  title: "Tarmac Calculator",
  eyebrow: "Metric tarmac planning",
  description: pageDescription,
  directAnswerQuestion: "How do I calculate tonnes of tarmac?",
  directAnswer:
    "Measure the finished area in square metres and enter the compacted depth in millimetres. The calculator converts the volume to metric tonnes and includes a waste allowance for the project shape and access. Use a current local price per tonne, then confirm the material, delivery, base work, drainage, and cleanup included in the quote.",
  path: "/tarmac-calculator",
  schemaName: "Tarmac Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: { areaSqM: 60, thicknessMillimeters: 65, unitSystem: "metric", wastePercent: 7, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: "/tarmac-calculator", title: "Tarmac Calculator", text: "Tarmac Calculator" }
  ],
  highlights: [
    {
      title: "Metric first",
      text: "Use square metres, millimetres, and tonnes when your local quote is metric."
    },
    {
      title: "UK wording",
      text: "In the UK, tarmac is a common name for this type of surfacing."
    },
    {
      title: "Local price ready",
      text: "Enter your local price per tonne for a better material estimate."
    }
  ],
  sections: [
    {
      title: "How to use a tarmac calculator",
      text:
        "Enter the paved area, compacted thickness, and waste allowance. If you have a supplier or contractor price per tonne, enter it as a custom material price.",
      items: [
        {
          title: "Square metres",
          text: "Measure the finished area and include parking pads, widening, or turnarounds."
        },
        {
          title: "Millimetres",
          text: "Use the compacted depth from the quote, not the loose material depth."
        },
        {
          title: "Tonnes",
          text: "The calculator converts quantity so you can compare with metric supplier quotes."
        }
      ]
    },
    {
      title: "Tarmac quote differences",
      text:
        "A tarmac quote can mean material, delivery, or a full installed job. Compare material prices per tonne, and compare installed work per square metre or as a complete job. Always check the unit and included work before comparing prices.",
      items: [
        {
          title: "Material only",
          text: "Useful for quantity planning, but it does not include labor or base work."
        },
        {
          title: "Installed job",
          text: "Usually includes crew, equipment, laying, rolling, and finishing."
        },
        {
          title: "Extra work",
          text: "Drainage, edging, old surface removal, and base repair can change the final quote."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "Small driveway", scope: "30-45 sq m", estimate: "Good for a first quantity check." },
    { label: "Two-car driveway", scope: "45-75 sq m", estimate: "Use local price per tonne if available." },
    { label: "Long drive", scope: "75+ sq m", estimate: "Access and base work matter more." }
  ],
  quoteChecks: [
    "Confirm whether the quote uses tonnes, square metres, or a full job total.",
    "Ask for compacted depth in millimetres.",
    "Check whether base repair, drainage, edging, and cleanup are included.",
    "Use local tarmac pricing instead of U.S. state price bands."
  ],
  relatedPages: [
    {
      href: "/tarmac-driveway-cost-calculator",
      title: "Tarmac driveway cost",
      text: "Estimate tarmac installation cost for a driveway."
    },
    {
      href: "/asphalt-tonnage-calculator",
      title: "Asphalt tonnage calculator",
      text: "Check tons and tonnes from area and thickness."
    },
    {
      href: "/asphalt-cost-calculator",
      title: "Asphalt cost calculator",
      text: "Use broader asphalt pricing inputs."
    },
    {
      href: "/how-much-asphalt-do-i-need",
      title: "How much asphalt",
      text: "Read the plain formula explanation."
    }
  ],
  faqs: [
    {
      question: "Is tarmac the same as asphalt?",
      answer: "Tarmac and asphalt are often used for similar driveway surfacing work. Use the wording in your local quote."
    },
    {
      question: "How do I calculate tonnes of tarmac?",
      answer: "Use area, compacted thickness, density, and waste allowance. The calculator does the conversion for you."
    },
    {
      question: "Should I use metric units?",
      answer: "Yes if your local contractor quotes in square metres, millimetres, and tonnes."
    },
    {
      question: "Can this give a final quote?",
      answer: "No. It is a planning estimate. A local contractor still needs to inspect base condition and access."
    }
  ]
};

export default function TarmacCalculatorPage() {
  return <CalculatorLandingPage config={config} />;
}
