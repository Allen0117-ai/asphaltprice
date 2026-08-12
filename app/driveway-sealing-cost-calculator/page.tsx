import { DrivewaySealingCostCalculator } from "@/components/calculator/driveway-sealing-cost-calculator";
import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const pageDescription =
  "Driveway sealing cost calculator for estimating sealer gallons, preparation, crack repair, labor, and sealcoating costs with your local rates.";

export const metadata = buildMetadata({
  title: "Driveway Sealing Cost Calculator | Sealcoating",
  description: pageDescription,
  path: "/driveway-sealing-cost-calculator"
});

const config: CalculatorLandingPageConfig = {
  title: "Driveway Sealing Cost Calculator",
  eyebrow: "Sealer, preparation, and labor planning",
  description: pageDescription,
  directAnswerQuestion: "How much does driveway sealing cost?",
  directAnswer:
    "Driveway sealing cost depends on area, coats, product coverage, surface preparation, crack repair, and local labor. Enter the coverage printed on the sealer label and your local prices to estimate gallons and compare like-for-like quotes. Sealcoating protects sound asphalt; repair potholes, major cracks, drainage problems, and base failure first.",
  path: "/driveway-sealing-cost-calculator",
  schemaName: "Driveway Sealing Cost Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: {},
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    {
      href: "/driveway-sealing-cost-calculator",
      title: "Driveway Sealing Cost Calculator",
      text: "Driveway Sealing Cost Calculator"
    }
  ],
  highlights: [
    {
      title: "Editable local rates",
      text: "Replace the sealer, labor, and preparation inputs with prices from your supplier or contractor."
    },
    {
      title: "Gallons and total cost",
      text: "See the sealer quantity first, then review material, preparation, labor, and crack-repair allowances."
    },
    {
      title: "Repair before sealing",
      text: "Use sealcoat to protect sound asphalt, not as a substitute for structural repair or drainage work."
    }
  ],
  sections: [
    {
      title: "What a driveway sealing estimate should include",
      text:
        "A clear estimate separates the coating itself from the work needed to make the surface ready for it. This makes local quotes easier to compare.",
      items: [
        {
          title: "Sealer coverage",
          text: "Check the product label because texture, dilution, and the number of coats change the gallons required."
        },
        {
          title: "Surface preparation",
          text: "Cleaning, edging, oil-spot treatment, and drying time can be part of the sealcoating scope."
        },
        {
          title: "Crack repair",
          text: "List crack filling separately so it is clear whether the quote covers minor sealing or larger repair work."
        }
      ]
    },
    {
      title: "When sealcoating is the right choice",
      text:
        "Sealcoating can refresh and protect an asphalt driveway that is still stable. It does not add structural strength to a driveway with deeper failures.",
      items: [
        {
          title: "Sound pavement",
          text: "Choose sealing when the driveway has light weathering and only limited, repairable cracking."
        },
        {
          title: "Resurfacing need",
          text: "Consider an overlay when the surface is worn beyond a coating but the base is still dependable."
        },
        {
          title: "Replacement need",
          text: "Plan replacement when base movement, widespread cracking, standing water, or potholes keep returning."
        }
      ]
    }
  ],
  exampleRows: [
    { label: "One-car driveway", scope: "About 400-600 sq ft", estimate: "Check minimum service charges and the product coverage label." },
    { label: "Two-car driveway", scope: "About 700-1,000 sq ft", estimate: "Compare one-coat and two-coat scope using the same preparation work." },
    { label: "Long or shared drive", scope: "1,200+ sq ft", estimate: "Confirm crack repair, cleaning, and access are all included." }
  ],
  quoteChecks: [
    "Ask for the number of sealcoating coats and the product coverage rate used in the quote.",
    "Confirm whether cleaning, edging, crack filling, and oil-spot treatment are included.",
    "Compare the same driveway area and surface condition across every quote.",
    "Ask what repair is needed before sealing if there are potholes, standing water, or widespread cracks."
  ],
  relatedPages: [
    {
      href: "/asphalt-driveway-cost-calculator",
      title: "Asphalt driveway cost",
      text: "Plan a new driveway or larger paving project."
    },
    {
      href: "/asphalt-driveway-replacement-cost-calculator",
      title: "Driveway replacement cost",
      text: "Compare sealing with full replacement planning."
    },
    {
      href: "/asphalt-driveway-resurfacing-cost-calculator",
      title: "Driveway resurfacing cost",
      text: "Estimate an overlay when sealing is not enough."
    }
  ],
  faqs: [
    {
      question: "How do I calculate driveway sealing cost?",
      answer: "Multiply driveway length by width, estimate gallons from the product coverage and coats, then add preparation, labor, crack repair, and waste using local rates."
    },
    {
      question: "How many gallons of sealer do I need?",
      answer: "Divide the driveway area by the product coverage per gallon for each coat, then add an allowance for waste. Always use the coverage printed on the specific product label."
    },
    {
      question: "Is driveway sealing the same as sealcoating?",
      answer: "Usually, yes. Driveway sealing, asphalt sealing, and sealcoating commonly describe applying a protective coating to an existing asphalt surface."
    },
    {
      question: "Can sealcoating fix cracks or potholes?",
      answer: "No. Fill appropriate cracks and repair potholes first. Sealcoating protects the surface but does not repair a failed base or structural asphalt damage."
    },
    {
      question: "Should I seal or resurface my driveway?",
      answer: "Seal a stable driveway with light weathering. Consider resurfacing when the asphalt surface is worn but the base remains sound; use replacement planning for widespread failure."
    }
  ]
};

export default function DrivewaySealingCostCalculatorPage() {
  return (
    <CalculatorLandingPage
      config={config}
      calculator={<DrivewaySealingCostCalculator />}
      includeFaqSchema={false}
      showAsphaltFormula={false}
    />
  );
}
