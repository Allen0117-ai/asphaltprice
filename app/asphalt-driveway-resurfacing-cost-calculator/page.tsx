import { DrivewayProjectCostCalculator } from "@/components/calculator/driveway-project-cost-calculator";
import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const path = "/asphalt-driveway-resurfacing-cost-calculator";
const pageDescription =
  "Estimate asphalt driveway resurfacing cost with editable preparation, spot repair, overlay paving, and fixed costs before comparing contractor quotes.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Resurfacing Cost Calculator",
  description: pageDescription,
  path
});

const config: CalculatorLandingPageConfig = {
  title: "Asphalt Driveway Resurfacing Cost Calculator",
  eyebrow: "Overlay cost breakdown",
  description: pageDescription,
  directAnswerQuestion: "How much does asphalt driveway resurfacing cost?",
  directAnswer:
    "Asphalt driveway resurfacing cost is driven by driveway area, preparation or light milling, localized repairs, overlay thickness, access, and fixed local charges. The estimate separates those cost drivers so you can compare like-for-like scopes. Resurfacing may cost less than full replacement when the existing pavement and base are still sound, but it cannot correct serious drainage, settlement, or base failure without added work.",
  path,
  schemaName: "Asphalt Driveway Resurfacing Cost Calculator",
  calculatorMode: "driveway",
  calculatorDefaults: { areaSqFt: 600, thicknessInches: 1.5, wastePercent: 0, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: path, title: "Driveway Resurfacing Cost", text: "Driveway Resurfacing Cost" }
  ],
  highlights: [
    { title: "Overlay-specific", text: "Plan preparation, spot repair, and a new asphalt overlay without assuming a full tear-out." },
    { title: "Clear comparisons", text: "See which part of the planning total comes from prep, repair, paving, and fixed costs." },
    { title: "Use local figures", text: "Replace the example rates with figures from written local quotes." }
  ],
  sections: [
    {
      title: "What a resurfacing scope should cover",
      text: "A useful resurfacing quote explains how the existing surface will be prepared, where repairs are needed, and how the overlay will meet edges and transitions.",
      items: [
        { title: "Preparation or milling", text: "Light milling or other prep can help manage transitions at garages, sidewalks, and drainage points." },
        { title: "Spot repair", text: "Localized failed areas may need repair before an overlay is installed over the surrounding pavement." },
        { title: "Overlay paving", text: "Ask for the compacted overlay thickness and how seams, edges, and drainage flow will be handled." }
      ]
    },
    {
      title: "Check whether resurfacing fits the driveway",
      text: "Resurfacing is not a universal fix. It is most useful when the existing driveway remains stable and the new layer will not trap water or create bad transitions.",
      items: [
        { title: "Sound foundation", text: "A stable base and mostly serviceable pavement give an overlay the best chance to perform well." },
        { title: "Water management", text: "Standing water, poor drainage, or low areas should be addressed before a new surface hides the problem." },
        { title: "Edge and height checks", text: "Review garage thresholds, curbs, walks, and drainage paths before adding asphalt height." }
      ]
    }
  ],
  exampleRows: [
    { label: "Compact driveway", scope: "600 sq ft; prep, repair, and overlay rates entered above", estimate: "Use local preparation, repair, and overlay rates for a budget." },
    { label: "Two-car driveway", scope: "800 sq ft; 10% localized repair assumption", estimate: "Confirm drainage and transitions during the site visit." },
    { label: "Long driveway", scope: "1,500 sq ft; resurfacing planning scope", estimate: "Access and preparation can change the scope and final price." }
  ],
  quoteChecks: [
    "Ask whether preparation includes cleaning, crack repair, leveling, or light milling where needed.",
    "Confirm the compacted overlay thickness and how the new surface meets garage doors, walks, and curbs.",
    "Ask how low spots, drainage issues, and failed areas will be handled before the overlay is placed.",
    "Compare written scopes, not just total prices, using the same driveway measurements."
  ],
  relatedPages: [
    { href: "/asphalt-driveway-replacement-cost-calculator", title: "Driveway replacement cost", text: "Use a full tear-out scope when the old surface or base may be failing." },
    { href: "/asphalt-driveway-cost-calculator", title: "Driveway cost calculator", text: "Estimate a general asphalt driveway project and tonnage." },
    { href: "/driveway-cost-calculator", title: "Driveway cost comparison", text: "Compare asphalt with other driveway surface options." },
    { href: "/asphalt-cost-guide", title: "Asphalt cost guide", text: "Learn the cost factors to check before comparing paving bids." },
    { href: "/asphalt-driveway-thickness", title: "Driveway thickness guide", text: "Review overlay thickness, base, drainage, and traffic considerations." },
    { href: "/driveway-sealing-cost-calculator", title: "Driveway sealing cost", text: "Compare a maintenance coating with a structural overlay." }
  ],
  faqs: [
    { question: "What is asphalt driveway resurfacing?", answer: "Resurfacing usually means preparing an existing asphalt driveway, repairing localized issues, and paving a new asphalt overlay over a sound base." },
    { question: "Is resurfacing cheaper than replacing a driveway?", answer: "It can be, because it usually avoids full removal and disposal. It is only the right option when the existing driveway and base remain suitable for an overlay." },
    { question: "Does resurfacing fix drainage problems?", answer: "Not by itself. A contractor should inspect low spots, water flow, and transitions before an overlay is installed." },
    { question: "Why does resurfacing need spot repair?", answer: "Failed or weak areas can continue moving under a new overlay, so a quote should state how those locations will be repaired." },
    { question: "Is this resurfacing cost calculator a final quote?", answer: "No. A contractor must inspect the existing pavement, base, drainage, and access before giving a final quote." }
  ]
};

export default function AsphaltDrivewayResurfacingCostCalculatorPage() {
  return <CalculatorLandingPage config={config} calculator={<DrivewayProjectCostCalculator mode="resurfacing" />} includeFaqSchema={false} showAsphaltFormula={false} />;
}
