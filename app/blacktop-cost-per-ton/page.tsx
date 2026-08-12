import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Blacktop cost per ton guide and calculator for material quantity, driveway cost, installed range, and local paving quote checks.";

export const metadata = buildMetadata({
  title: "Blacktop Cost Per Ton | Calculator & Quote Guide",
  description: pageDescription,
  path: "/blacktop-cost-per-ton"
});

const config: CalculatorLandingPageConfig = {
  title: "Blacktop Cost Per Ton",
  eyebrow: "Blacktop material pricing",
  description: pageDescription,
  directAnswerQuestion: "What does blacktop cost per ton include?",
  directAnswer:
    "Blacktop cost per ton usually refers to the asphalt mix, not a finished driveway. Multiply the quantity needed by a current local material rate, then add delivery and site work. Before comparing prices, confirm whether each quote is for plant pickup, delivered material, or installation and whether it uses U.S. short tons or metric tonnes.",
  path: "/blacktop-cost-per-ton",
  schemaName: "Blacktop Cost Per Ton Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: { areaSqFt: 700, thicknessInches: 3, wastePercent: 7, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: "/blacktop-cost-per-ton", title: "Blacktop Cost Per Ton", text: "Blacktop Cost Per Ton" }
  ],
  highlights: [
    {
      title: "Same material math",
      text: "For most residential driveways, blacktop and asphalt use the same quantity and price method."
    },
    {
      title: "Per-ton focus",
      text: "Useful when a supplier or contractor gives you a material price per ton."
    },
    {
      title: "Installed cost check",
      text: "Material price is not the same as a complete driveway quote."
    }
  ],
  sections: [
    {
      title: "How blacktop cost per ton works",
      text:
        "Blacktop cost per ton is mainly a material number. It helps you check whether the quantity makes sense, but the full job still needs labor, equipment, base prep, and cleanup.",
      items: [
        {
          title: "Material price",
          text: "Estimated tons × your quoted price per ton = material subtotal. Keep delivery and installation separate."
        },
        {
          title: "Delivery",
          text: "Haul distance, minimum loads, and timing can change delivered material cost."
        },
        {
          title: "Installed price",
          text: "A complete driveway bid includes labor, equipment, compaction, and site work."
        }
      ]
    },
    {
      title: "When per-ton pricing is useful",
      text:
        "Per-ton pricing is useful when comparing supplier numbers, checking contractor math, or estimating material for a driveway, patch, or small paving job.",
      items: [
        {
          title: "Driveway planning",
          text: "Check how many tons a 2-car driveway might need before you compare quotes."
        },
        {
          title: "Patch or repair",
          text: "Small jobs may still have minimum charges even if the tonnage is low."
        },
        {
          title: "Bid review",
          text: "Use tonnage to sanity-check whether a written quote matches the project size."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "400 sq ft driveway", scope: "3 in with waste", estimate: "Good for a small-driveway material check." },
    { label: "800 sq ft driveway", scope: "3 in with waste", estimate: "Common residential estimate size." },
    { label: "1,200 sq ft pad", scope: "3-4 in with waste", estimate: "Check both per-ton and installed pricing." }
  ],
  quoteChecks: [
    "Ask whether the quoted blacktop price is plant pickup, delivered, or installed.",
    "Confirm the mix, compacted thickness, and quantity in tons.",
    "Ask whether trucking, base prep, removal, and cleanup are included.",
    "Do not compare material-only pricing with full installed bids."
  ],
  relatedPages: [
    {
      href: "/asphalt-driveway-cost-calculator",
      title: "Blacktop driveway cost",
      text: "Estimate a full asphalt or blacktop driveway job."
    },
    {
      href: "/hot-mix-asphalt-cost-per-ton",
      title: "Hot mix cost per ton",
      text: "Compare hot mix asphalt material pricing."
    },
    {
      href: "/asphalt-prices-by-state",
      title: "Price per ton near me",
      text: "Use local asphalt quote checks."
    },
    {
      href: "/asphalt-contractor-guide",
      title: "Contractor quote guide",
      text: "Check scope, thickness, base work, and exclusions before choosing a bid."
    }
  ],
  faqs: [
    {
      question: "Is blacktop cost per ton different from asphalt cost per ton?",
      answer: "For most residential driveways, blacktop and asphalt use the same estimating method. Local mix and supplier pricing still matter."
    },
    {
      question: "Is per-ton price the final driveway cost?",
      answer: "No. Per-ton price usually covers material. Full driveway cost includes labor, equipment, base prep, trucking, and cleanup."
    },
    {
      question: "How many tons of blacktop do I need?",
      answer: "It depends on area and compacted thickness. Enter those values in the calculator to estimate tons."
    },
    {
      question: "Should I enter a custom price?",
      answer: "Yes if you have a current local supplier or contractor number per ton."
    }
  ]
};

export default function BlacktopCostPerTonPage() {
  return <CalculatorLandingPage config={config} />;
}
