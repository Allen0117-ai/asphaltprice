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
    "Measure length, width, compacted depth, and the supplier's compacted density to estimate asphalt millings in tons and cubic yards. The same method can be used for reclaimed asphalt pavement (RAP) or crushed asphalt when the supplier provides a suitable density. Because recycled material varies, confirm the scale-ticket weight, truck capacity, and recommended installed depth before ordering. This estimate covers material quantity, not base design, drainage, or final pavement performance.",
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
      text: "Estimate order weight and finished compacted volume from the planned area and depth."
    },
    {
      title: "Local density input",
      text: "Use a supplier-provided compacted density; loose material needs a different conversion."
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
          text: "Enter the finished depth and compacted density. Add an extra material allowance only where appropriate; ask the supplier how it accounts for losses."
        },
        {
          title: "Confirm ticket weight",
          text: "Ask whether the supplier sells by ton or loose yard, and request a compacted density and delivery conversion for the actual material."
        }
      ]
    },
    {
      title: "Compacted volume versus delivered volume",
      text: "The calculator multiplies finished compacted volume by compacted density to estimate tons. The cubic yards shown are the finished layer, not the loose volume in a truck. Ask the supplier for its loose bulk density or delivered-load conversion. The extra allowance is applied to weight; do not add a separate compaction factor without checking whether it is already included.",
      items: [
        { title: "Finished volume", text: "Length × width × compacted depth ÷ 27 gives compacted cubic yards when all dimensions are in feet." },
        { title: "Delivery and price", text: "Ask for the material price per ton, loose volume or truck capacity, minimum order, delivery fee, tax, and whether spreading and rolling are included." }
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
    "Ask for compacted density and a separate loose-volume conversion; a scale ticket alone is weight, not density.",
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
      answer: "Multiply area by finished depth and compacted density to estimate weight, then add an allowance for losses. Finished compacted cubic yards are not loose truck volume; ask the supplier for the conversion."
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
      answer: "Tons measure weight; cubic yards measure volume. Ask whether a yard is loose or compacted and get the matching conversion from the supplier."
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
