import { CalculatorLandingPage, type CalculatorLandingPageConfig } from "@/components/content/calculator-landing-page";
import { buildMetadata } from "@/lib/seo";

const path = "/asphalt-road-cost-calculator";
const pageDescription =
  "Estimate private asphalt road cost, tonnage, and surface paving ranges while keeping base, drainage, earthwork, engineering, and permits visible.";

export const metadata = buildMetadata({
  title: "Asphalt Road Cost Calculator | Private Roads",
  description: pageDescription,
  path
});

const config: CalculatorLandingPageConfig = {
  title: "Private Asphalt Road Cost Calculator",
  eyebrow: "Private roads and access lanes",
  description: pageDescription,
  directAnswerQuestion: "How do I estimate the cost of paving a private asphalt road?",
  directAnswer:
    "Measure the paved road area, enter the planned compacted asphalt thickness, and use a current local material rate when available. The calculator estimates asphalt tonnage plus broad material and installation ranges for early planning. It does not price the complete road structure: subgrade work, aggregate base, drainage, culverts, earthwork, engineering, permits, traffic control, shoulders, and utility work must be reviewed separately by qualified local professionals.",
  path,
  schemaName: "Private Asphalt Road Cost Calculator",
  calculatorMode: "asphalt",
  calculatorDefaults: { areaSqFt: 10000, thicknessInches: 4, wastePercent: 10, region: "national" },
  breadcrumbs: [
    { href: "/", title: "Home", text: "Home" },
    { href: path, title: "Asphalt Road Cost Calculator", text: "Asphalt Road Cost Calculator" }
  ],
  highlights: [
    {
      title: "Private-road scope",
      text: "Use the estimate for a private road, farm lane, shared access road, or long paved drive—not a public highway bid."
    },
    {
      title: "Surface cost first",
      text: "Calculate asphalt area and tonnage before adding the base, drainage, earthwork, and project-specific requirements."
    },
    {
      title: "Editable local price",
      text: "Replace the broad default range with a current plant, supplier, or contractor price whenever one is available."
    }
  ],
  sections: [
    {
      title: "What this private road estimate covers",
      text:
        "The calculator provides a transparent first-pass estimate for the asphalt surface. It converts the paved area and compacted thickness into volume and tonnage, applies the waste allowance you choose, and shows material and installation ranges. Use it to prepare questions and compare written scopes—not to approve construction without a site review.",
      items: [
        {
          title: "Paved surface area",
          text: "Measure the full finished width and length, including turnouts, aprons, parking areas, and widened curves that will receive asphalt."
        },
        {
          title: "Compacted asphalt",
          text: "Enter the compacted surface thickness shown in the proposed pavement section, not the loose depth placed before rolling."
        },
        {
          title: "Material and paving",
          text: "The estimate helps compare asphalt quantity, local material rates, and broad paving cost before other civil work is added."
        }
      ]
    },
    {
      title: "Road costs that need a separate line item",
      text:
        "A road can fail even when the asphalt quantity is correct. The ground, base, water movement, access, and design requirements often decide the real project scope. Ask every bidder to separate these items so a low surface-only number is not mistaken for a complete road price.",
      items: [
        {
          title: "Subgrade and aggregate base",
          text: "Excavation, unsuitable-soil removal, geotextile, aggregate depth, grading, and compaction are not determined by surface square footage alone."
        },
        {
          title: "Drainage and earthwork",
          text: "Ditches, culverts, crowns, slopes, shoulders, erosion control, and cut-and-fill quantities require a site-specific review."
        },
        {
          title: "Engineering and permits",
          text: "Public access, fire-apparatus needs, steep grades, utilities, environmental rules, and local permits may require professional design or approval."
        }
      ]
    },
    {
      title: "How to compare private road paving quotes",
      text:
        "Give each contractor the same measured area and ask them to state the same scope. A useful quote identifies the pavement section, mix, compacted thickness, base preparation, drainage work, mobilization, haul distance, shoulders, cleanup, and exclusions. Compare those details before comparing the final total.",
      items: [
        {
          title: "Match the pavement section",
          text: "One quote may include a stronger base or more asphalt than another. Confirm every layer and compacted depth in writing."
        },
        {
          title: "Separate allowances",
          text: "Keep uncertain earthwork, drainage, unsuitable soil, rock, and utility work visible instead of hiding them inside one square-foot rate."
        },
        {
          title: "Confirm mobilization",
          text: "Long haul distance, limited truck access, small production runs, and multiple paving days can change the delivered and installed price."
        }
      ]
    }
  ],
  exampleRows: [
    {
      label: "Private access road",
      scope: "10,000 sq ft surface; editable thickness and local price",
      estimate: "Add base, drainage, earthwork, shoulders, and permits as separate quote lines."
    },
    {
      label: "Farm or service lane",
      scope: "Measured lane plus turnouts and equipment areas",
      estimate: "Confirm expected vehicle loads, subgrade, aggregate base, and drainage before paving."
    },
    {
      label: "Shared residential road",
      scope: "Full paved width, aprons, curves, and common access areas",
      estimate: "Check ownership, maintenance responsibilities, fire access, utilities, and local approvals."
    }
  ],
  quoteChecks: [
    "Confirm the full pavement section: prepared subgrade, aggregate base, asphalt layers, and compacted thicknesses.",
    "Ask whether drainage, culverts, ditches, shoulders, erosion control, and earthwork are included or excluded.",
    "Check the asphalt mix, estimated tons, plant distance, trucking, mobilization, compaction testing, and cleanup.",
    "Ask a qualified local contractor or engineer whether traffic loads, grades, soil, utilities, and permits change the design.",
    "Use the same measured area and written scope when comparing two or three bids."
  ],
  relatedPages: [
    {
      href: "/asphalt-paving-cost-calculator",
      title: "Asphalt paving cost calculator",
      text: "Estimate a smaller parking pad, lane, or general paving project."
    },
    {
      href: "/asphalt-tonnage-calculator",
      title: "Asphalt tonnage calculator",
      text: "Focus on surface quantity, density, coverage, and unit conversions."
    },
    {
      href: "/asphalt-millings-vs-gravel",
      title: "Asphalt millings vs gravel",
      text: "Compare two unbound access-road surface options before choosing full asphalt."
    },
    {
      href: "/asphalt-contractor-guide",
      title: "Contractor quote guide",
      text: "Compare written scope, thickness, drainage, payment terms, and warning signs."
    }
  ],
  faqs: [
    {
      question: "Can I use this calculator for a public road or highway?",
      answer: "No. It is an early budgeting tool for private roads and access lanes. Public-road design, traffic loads, safety requirements, testing, engineering, and procurement need qualified local professionals."
    },
    {
      question: "Does the estimate include the aggregate base and earthwork?",
      answer: "No. The calculator focuses on asphalt quantity and broad paving ranges. Ask for subgrade preparation, aggregate base, excavation, unsuitable-soil removal, drainage, and earthwork as separate items."
    },
    {
      question: "How do I calculate the paved road area?",
      answer: "Multiply finished paved length by average paved width, then add turnouts, aprons, parking areas, and widened curves. Break irregular shapes into smaller areas and add them together."
    },
    {
      question: "What asphalt thickness should a private road use?",
      answer: "There is no single thickness for every road. Vehicle loads, soil, base strength, climate, drainage, mix, and local standards affect the pavement section. Ask a qualified contractor or engineer to confirm it."
    },
    {
      question: "Why can two asphalt road quotes be very different?",
      answer: "One quote may include more base, drainage, earthwork, mobilization, trucking, shoulders, testing, or permits. Compare the written pavement section and exclusions before comparing totals."
    }
  ]
};

export default function AsphaltRoadCostCalculatorPage() {
  return <CalculatorLandingPage config={config} includeFaqSchema={false} />;
}
