import { AsphaltMillingsCalculator } from "@/components/calculator/asphalt-millings-calculator";
import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Asphalt millings calculator for estimating tons, cubic yards, coverage, and material cost for milled asphalt, crushed asphalt, or RAP using local prices.";

export const metadata = buildMetadata({
  title: "Asphalt Millings Calculator | Tons & Cubic Yards",
  description: pageDescription,
  path: "/asphalt-millings-calculator"
});

const config: CalculatorLandingPageConfig = {
  title: "Asphalt Millings Calculator",
  eyebrow: "Milled asphalt, crushed asphalt, and RAP",
  description: pageDescription,
  directAnswerQuestion: "How much asphalt millings do I need?",
  directAnswer:
    "Measure length, width, compacted depth, and the supplier's bulk density to estimate asphalt millings in tons and cubic yards. The same method can be used for reclaimed asphalt pavement (RAP) or crushed asphalt when the supplier provides a suitable density. Because recycled material varies, confirm the scale-ticket weight, truck capacity, and recommended installed depth before ordering. This estimate covers material quantity, not base design, drainage, or final pavement performance.",
  path: "/asphalt-millings-calculator",
  schemaName: "Asphalt Millings Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: {},
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: "/asphalt-millings-calculator", title: "Asphalt Millings Calculator", text: "Asphalt Millings Calculator" }
  ],
  highlights: [
    {
      title: "Tons and cubic yards",
      text: "Estimate both common ordering units from the same planned area and compacted depth."
    },
    {
      title: "Local density input",
      text: "Use a supplier-provided density when available because millings can weigh differently after compaction."
    },
    {
      title: "Material-only estimate",
      text: "Enter your local per-ton price to plan material cost without treating it as a delivered installed quote."
    }
  ],
  sections: [
    {
      title: "How to order asphalt millings",
      text:
        "Asphalt millings, crushed asphalt, and RAP are recycled materials, so order quantity should be checked with the actual supplier rather than a one-size-fits-all conversion.",
      items: [
        {
          title: "Measure finished area",
          text: "Use the length and width of the area you want covered, including pull-offs or turning areas when they will receive millings."
        },
        {
          title: "Choose compacted depth",
          text: "Enter the planned final depth, then allow for compaction and waste so the delivered material is not short."
        },
        {
          title: "Confirm ticket weight",
          text: "Ask whether the supplier sells by ton or yard and request the material density or a recent scale-ticket weight."
        }
      ]
    },
    {
      title: "What changes a millings estimate",
      text:
        "Millings are not identical to new hot-mix asphalt. Their density, compaction behavior, and suitability depend on the material source and the project conditions.",
      items: [
        {
          title: "Material condition",
          text: "Fine, wet, or mixed reclaimed asphalt can pack differently than cleaner, well-graded millings."
        },
        {
          title: "Base and drainage",
          text: "A firm base and controlled water are still important for a driveway, lane, or parking area built with recycled asphalt."
        },
        {
          title: "Delivery and placement",
          text: "Truck capacity, stockpile location, spreading equipment, and rolling can affect the quantity and installed outcome."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "Short driveway repair", scope: "400-800 sq ft", estimate: "Confirm whether the supplier can deliver a partial load." },
    { label: "Long driveway", scope: "1,000-2,500 sq ft", estimate: "Check the planned compacted depth and rolling method." },
    { label: "Parking or access area", scope: "2,500+ sq ft", estimate: "Review drainage, base support, and truck access before ordering." }
  ],
  quoteChecks: [
    "Confirm whether the supplier prices asphalt millings by ton, cubic yard, truckload, or delivered load.",
    "Ask for a material density or scale-ticket weight instead of relying only on a generic conversion.",
    "Compare delivered quantity, spreading, grading, and compaction as separate line items.",
    "Confirm the planned finished depth, base condition, drainage work, and access for delivery trucks."
  ],
  relatedPages: [
    {
      href: "/asphalt-tonnage-calculator",
      title: "Asphalt tonnage calculator",
      text: "Estimate tons for conventional asphalt paving material."
    },
    {
      href: "/asphalt-cost-guide",
      title: "Asphalt cost guide",
      text: "Learn the main material and paving cost factors."
    },
    {
      href: "/asphalt-millings-vs-gravel",
      title: "Asphalt millings vs. gravel",
      text: "Compare recycled asphalt and gravel for a driveway project."
    }
  ],
  faqs: [
    {
      question: "How do I calculate asphalt millings?",
      answer: "Measure the area, choose a compacted depth, apply a density for the supplied material, and add an allowance for compaction and waste. The calculator converts this into tons and cubic yards."
    },
    {
      question: "Are asphalt millings and crushed asphalt the same?",
      answer: "The terms are often used for recycled asphalt material, but gradation and condition can vary by supplier. Ask what material is actually being delivered before using a density value."
    },
    {
      question: "What is RAP in an asphalt calculator?",
      answer: "RAP means reclaimed asphalt pavement. It is asphalt recovered from removed pavement and can be processed for reuse as millings or recycled asphalt material."
    },
    {
      question: "Should I order millings by tons or cubic yards?",
      answer: "Use the unit the supplier sells. Tons are weight-based, while cubic yards are volume-based, so the conversion depends on the material density."
    },
    {
      question: "Can this calculator design my millings driveway base?",
      answer: "No. It estimates material quantity. A suitable base depth, drainage plan, and compaction method depend on soil, traffic, climate, and site conditions."
    }
  ]
};

export default function AsphaltMillingsCalculatorPage() {
  return (
    <CalculatorLandingPage
      config={config}
      calculator={<AsphaltMillingsCalculator />}
      includeFaqSchema={false}
      showAsphaltFormula={false}
    />
  );
}
