import { DrivewayProjectCostCalculator } from "@/components/calculator/driveway-project-cost-calculator";
import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const path = "/asphalt-driveway-replacement-cost-calculator";
const pageDescription =
  "Estimate asphalt driveway replacement cost with editable removal, base repair, paving, and fixed-cost assumptions before comparing contractor quotes.";

export const metadata = buildMetadata({
  title: "Asphalt Driveway Replacement Cost Calculator",
  description: pageDescription,
  path
});

const config: CalculatorLandingPageConfig = {
  title: "Asphalt Driveway Replacement Cost Calculator",
  eyebrow: "Full tear-out cost breakdown",
  description: pageDescription,
  directAnswerQuestion: "How much does it cost to replace an asphalt driveway?",
  directAnswer:
    "Asphalt driveway replacement cost depends on the measured area plus the work below the surface: removal and disposal of old asphalt, damaged-base repair, new paving, access, and any fixed local charges. Enter local rates to build a planning estimate, then ask contractors to price the same written scope. It is not a live price quote or a substitute for a site inspection.",
  path,
  schemaName: "Asphalt Driveway Replacement Cost Calculator",
  calculatorMode: "driveway",
  calculatorDefaults: { areaSqFt: 600, thicknessInches: 3, wastePercent: 0, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: path, title: "Driveway Replacement Cost", text: "Driveway Replacement Cost" }
  ],
  highlights: [
    { title: "Full scope", text: "Plan removal, disposal, localized base repair, new asphalt, and fixed charges in one worksheet." },
    { title: "Use local rates", text: "Replace the example rates with figures from written local quotes." },
    { title: "Quote-ready", text: "Use the same area and scope with each contractor to make totals easier to compare." }
  ],
  sections: [
    {
      title: "What full driveway replacement includes",
      text: "Replacement is more than putting a new layer on top. A complete scope states what is removed, what is repaired underneath, and what new surface will be installed.",
      items: [
        { title: "Removal and disposal", text: "Old asphalt must be broken up, loaded, and hauled away; make sure the quote says whether this is included." },
        { title: "Base repair", text: "Soft spots, settlement, and failed edges may need repair before fresh asphalt can hold up." },
        { title: "New paving", text: "Confirm the specified compacted thickness, paving area, edge treatment, and cleanup." }
      ]
    },
    {
      title: "When replacement can make more sense than resurfacing",
      text: "An overlay can be useful when the existing surface and base are sound. Replacement is often the clearer scope when damage comes from beneath the old surface.",
      items: [
        { title: "Widespread cracking", text: "Many connected cracks can be a sign that the old pavement needs more than a cosmetic top layer." },
        { title: "Movement or low spots", text: "Settlement and standing-water areas should be inspected before any new asphalt covers them." },
        { title: "Repeated patching", text: "If repairs keep returning, compare a complete replacement scope with another short-term patch cycle." }
      ]
    }
  ],
  exampleRows: [
    { label: "Compact driveway", scope: "600 sq ft; removal, repair, and paving rates entered above", estimate: "Use current local removal, base-repair, and paving rates to build a budget." },
    { label: "Two-car driveway", scope: "800 sq ft; 20% spot-base repair assumption", estimate: "Add disposal, access, and repair allowances after a site visit." },
    { label: "Long driveway", scope: "1,500 sq ft; full replacement planning scope", estimate: "Confirm hauling, grading, drainage, and fixed fees in the written scope." }
  ],
  quoteChecks: [
    "Ask whether the old asphalt will be removed and where it will be disposed of.",
    "Confirm the compacted thickness of the new asphalt, not just the loose depth delivered.",
    "Ask which base repairs, grading, drainage fixes, edges, and cleanup are included.",
    "Use the same measured square footage and written scope when comparing two or three bids."
  ],
  relatedPages: [
    { href: "/asphalt-driveway-resurfacing-cost-calculator", title: "Driveway resurfacing cost", text: "Compare a new overlay scope when the existing base may still be sound." },
    { href: "/asphalt-driveway-cost-calculator", title: "Driveway cost calculator", text: "Estimate a general asphalt driveway project and tonnage." },
    { href: "/driveway-cost-calculator", title: "Driveway cost comparison", text: "Compare asphalt with other driveway surface options." },
    { href: "/asphalt-cost-guide", title: "Asphalt cost guide", text: "Learn the basic cost factors to discuss with a contractor." },
    { href: "/asphalt-driveway-thickness", title: "Driveway thickness guide", text: "Check compacted asphalt, base, drainage, and traffic considerations." },
    { href: "/driveway-sealing-cost-calculator", title: "Driveway sealing cost", text: "Compare maintenance with replacement when the pavement is still serviceable." }
  ],
  faqs: [
    { question: "What is included in asphalt driveway replacement?", answer: "A full scope can include old asphalt removal, disposal, base repair, grading, new paving, edges, cleanup, and any fixed charges listed in the quote." },
    { question: "Is replacing a driveway different from resurfacing it?", answer: "Yes. Replacement removes the old surface and can address the base, while resurfacing usually adds a new layer over a sound existing driveway." },
    { question: "Why can I change the calculator rates?", answer: "Removal, repair, paving, and fixed charges vary by site and contractor. Enter the rates shown in written local quotes." },
    { question: "Can a contractor price replacement from square footage alone?", answer: "Square footage starts the estimate, but access, disposal, base condition, drainage, and the required thickness need a site review for a final bid." },
    { question: "Is this calculator a final contractor quote?", answer: "No. The result helps you compare the same scope across quotes. A local contractor still needs to inspect the driveway." }
  ]
};

export default function AsphaltDrivewayReplacementCostCalculatorPage() {
  return <CalculatorLandingPage config={config} calculator={<DrivewayProjectCostCalculator mode="replacement" />} includeFaqSchema={false} showAsphaltFormula={false} />;
}
