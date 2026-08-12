import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Free asphalt cost calculator for tonnage, material price, installed cost, project type, thickness, waste, and local price per ton or tonne.";

export const metadata = buildMetadata({
  title: "Asphalt Cost Calculator | Material & Installed Price",
  description: pageDescription,
  path: "/asphalt-cost-calculator"
});

const config: CalculatorLandingPageConfig = {
  title: "Asphalt Cost Calculator",
  eyebrow: "Material and installed cost",
  description: pageDescription,
  directAnswerQuestion: "How does an asphalt cost calculator estimate a project?",
  directAnswer:
    "Enter the paved area, compacted thickness, and project type to estimate the tons or tonnes needed, then see material and installed cost ranges. Choose new installation, overlay, or replacement because each involves different preparation. Local prices, drainage, base repairs, removal, access, and minimum-load charges can change the final price, so confirm the details with your supplier or contractor before ordering.",
  path: "/asphalt-cost-calculator",
  schemaName: "Asphalt Cost Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: { areaSqFt: 800, thicknessInches: 3, wastePercent: 7, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: "/asphalt-cost-calculator", title: "Asphalt Cost Calculator", text: "Asphalt Cost Calculator" }
  ],
  highlights: [
    {
      title: "Good for early budgets",
      text: "Use it before you ask for bids so every contractor is pricing the same size and thickness."
    },
    {
      title: "Local price ready",
      text: "Enter your own price per ton or tonne when you have a plant or supplier number."
    },
    {
      title: "Project scope included",
      text: "Switch between new installation, overlay, and replacement to match the work being quoted."
    }
  ],
  sections: [
    {
      title: "How asphalt cost is estimated",
      text:
        "A useful asphalt estimate starts with quantity, then adds local material price, labor, equipment, base work, and cleanup. The calculator separates material and installed ranges so the number is easier to compare.",
      items: [
        {
          title: "Material cost",
          text: "Material cost is based on tons or tonnes needed multiplied by a regional or custom unit price."
        },
        {
          title: "Installed cost",
          text: "Installed cost adds labor, paving equipment, compaction, edges, access, and basic overhead."
        },
        {
          title: "Project scope",
          text: "Overlay work is usually cheaper than full replacement, while tear-out and base repair push the price higher."
        }
      ]
    },
    {
      title: "What changes the final number",
      text:
        "Two projects with the same square footage can price very differently. The biggest changes usually come from thickness, base condition, haul distance, local demand, and whether the old surface must be removed.",
      items: [
        {
          title: "Thickness",
          text: "More compacted depth means more asphalt over the same area, so tonnage and cost rise quickly."
        },
        {
          title: "Base condition",
          text: "Soft spots, drainage problems, and weak gravel base can add prep work before paving starts."
        },
        {
          title: "Access and timing",
          text: "Tight driveways, small jobs, long haul distance, and busy paving seasons can all raise bids."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "Small driveway", scope: "400 sq ft, 2.5-3 in", estimate: "Minimum crew or delivery charges may affect the price." },
    { label: "Standard driveway", scope: "600-800 sq ft, 3 in", estimate: "A typical residential driveway size." },
    { label: "Large pad or lane", scope: "1,000+ sq ft", estimate: "Compare per-ton material and installed per-sq-ft pricing." }
  ],
  quoteChecks: [
    "Ask whether the price is material-only, delivered, or fully installed.",
    "Confirm compacted thickness, base work, removal, drainage, edging, and cleanup.",
    "Use the same square footage and project type when comparing each bid.",
    "If the quote is per ton, confirm whether it uses tons or metric tonnes."
  ],
  relatedPages: [
    {
      href: "/asphalt-driveway-cost-calculator",
      title: "Driveway cost calculator",
      text: "Use a driveway-focused version with residential quote checks."
    },
    {
      href: "/asphalt-prices-by-state",
      title: "Asphalt prices by state",
      text: "Compare broad U.S. regional price bands."
    },
    {
      href: "/asphalt-tonnage-calculator",
      title: "Tonnage calculator",
      text: "Check material quantity before pricing the job."
    },
    {
      href: "/asphalt-cost-per-square-foot",
      title: "Cost per square foot",
      text: "Translate the estimate into a homeowner-friendly unit."
    }
  ],
  faqs: [
    {
      question: "How do I calculate asphalt cost?",
      answer: "Calculate tons or tonnes needed, multiply by material price, then add installed labor, prep, equipment, and cleanup."
    },
    {
      question: "Is asphalt cost per ton the same as installed cost?",
      answer: "No. Per-ton price usually means material. Installed cost includes the crew, equipment, prep, trucking, and project overhead."
    },
    {
      question: "Why does the calculator show a range?",
      answer: "A range is more honest because local labor, access, base condition, and removal work can change the final bid."
    },
    {
      question: "Can I use this outside the U.S.?",
      answer: "Yes. Use Metric and enter your local price per tonne when your market does not quote in U.S. tons."
    }
  ]
};

export default function AsphaltCostCalculatorPage() {
  return <CalculatorLandingPage config={config} />;
}
