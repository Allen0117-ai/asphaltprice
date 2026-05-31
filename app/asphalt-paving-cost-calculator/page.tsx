import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Asphalt paving cost calculator for driveways, parking pads, small lots, overlays, replacement work, tonnage, and installed price ranges.";

export const metadata = buildMetadata({
  title: "Asphalt Paving Cost Calculator | Driveway & Lot",
  description: pageDescription,
  path: "/asphalt-paving-cost-calculator"
});

const config: CalculatorLandingPageConfig = {
  title: "Asphalt Paving Cost Calculator",
  eyebrow: "Driveway and small paving jobs",
  description: pageDescription,
  path: "/asphalt-paving-cost-calculator",
  schemaName: "Asphalt Paving Cost Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: { areaSqFt: 1200, thicknessInches: 3.5, wastePercent: 8, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: "/asphalt-paving-cost-calculator", title: "Asphalt Paving Cost Calculator", text: "Asphalt Paving Cost Calculator" }
  ],
  highlights: [
    {
      title: "More than driveways",
      text: "Useful for small lots, parking pads, lanes, resurfacing, and basic paving budgets."
    },
    {
      title: "Tonnage first",
      text: "The result starts with asphalt quantity, then turns that into material and installed ranges."
    },
    {
      title: "Scope matters",
      text: "New paving, overlay, and replacement do not cost the same."
    }
  ],
  sections: [
    {
      title: "When to use this paving calculator",
      text:
        "Use this page when the project is not just a standard driveway. Parking pads, private lanes, and small paved areas need the same quantity math, but access and prep can change the installed quote.",
      items: [
        {
          title: "Driveways",
          text: "Best for residential paving when you need both tonnage and a rough installed range."
        },
        {
          title: "Parking pads",
          text: "Useful for checking whether a small parking area needs a minimum job charge."
        },
        {
          title: "Small lots",
          text: "Good for early planning before a contractor measures and writes a formal bid."
        }
      ]
    },
    {
      title: "Paving cost factors",
      text:
        "Asphalt paving cost is shaped by more than material. Base depth, drainage, compaction, access, striping, removal, and local crew demand can all change the quote.",
      items: [
        {
          title: "Base depth",
          text: "A parking area may need stronger base than a light residential driveway."
        },
        {
          title: "Compaction",
          text: "The final thickness should be compacted thickness, not just loose asphalt depth."
        },
        {
          title: "Job setup",
          text: "Small jobs can carry setup and minimum charges even when the tonnage is low."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "Parking pad", scope: "400-800 sq ft", estimate: "Watch for minimum job charges." },
    { label: "Small private lane", scope: "1,000-2,500 sq ft", estimate: "Haul distance and access can move the price." },
    { label: "Small lot", scope: "2,500+ sq ft", estimate: "Base prep and drainage become more important." }
  ],
  quoteChecks: [
    "Ask whether the bid includes grading, compaction, and base preparation.",
    "Ask whether striping, curbs, drainage, permits, or cleanup are included.",
    "Compare material tons and installed price per square foot.",
    "For parking areas, confirm expected vehicle load and compacted thickness."
  ],
  relatedPages: [
    {
      href: "/parking-lot-paving-cost-calculator",
      title: "Parking lot paving cost",
      text: "Use this for parking-lot-specific quote checks."
    },
    {
      href: "/asphalt-cost-calculator",
      title: "Asphalt cost calculator",
      text: "Use the broader cost calculator."
    },
    {
      href: "/hot-mix-asphalt-cost-per-ton",
      title: "Hot mix per ton",
      text: "Understand material unit pricing."
    },
    {
      href: "/asphalt-prices-by-state",
      title: "State pricing",
      text: "Compare broad U.S. regional bands."
    }
  ],
  faqs: [
    {
      question: "How do I estimate asphalt paving cost?",
      answer: "Start with area, thickness, and waste to estimate tons. Then compare material price and installed paving ranges."
    },
    {
      question: "Is paving cost different from driveway cost?",
      answer: "The math is similar, but parking pads and small lots may need different base prep, drainage, access, or compaction."
    },
    {
      question: "Does this work for parking lots?",
      answer: "Yes for early planning. For full parking lots, ask a contractor to confirm base design, drainage, striping, and traffic load."
    },
    {
      question: "Should I use price per ton or square foot?",
      answer: "Use both. Per ton checks material quantity, while square foot pricing helps compare installed bids."
    }
  ]
};

export default function AsphaltPavingCostCalculatorPage() {
  return <CalculatorLandingPage config={config} />;
}
