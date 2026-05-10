export type RegionKey = "national" | "northeast" | "south" | "midwest" | "west" | "southCentral";

type RegionPricing = {
  label: string;
  note: string;
  asphaltMaterialLow: number;
  asphaltMaterialHigh: number;
  asphaltInstalledLow: number;
  asphaltInstalledHigh: number;
  concreteInstalledLow: number;
  concreteInstalledHigh: number;
  gravelInstalledLow: number;
  gravelInstalledHigh: number;
};

export const regionOptions: Array<{ key: RegionKey; label: string; note: string }> = [
  { key: "national", label: "National average", note: "Balanced baseline for a first-pass estimate." },
  { key: "northeast", label: "Northeast", note: "Higher labor and permitting costs are common." },
  { key: "south", label: "South", note: "Often a little lower than the national average." },
  { key: "midwest", label: "Midwest", note: "Close to the national average in many markets." },
  { key: "west", label: "West", note: "Material and labor can run higher in many metro areas." },
  { key: "southCentral", label: "South Central", note: "Useful for Texas and nearby markets." }
];

export const regionPricing: Record<RegionKey, RegionPricing> = {
  national: {
    label: "National average",
    note: "A simple starting point for quick estimates.",
    asphaltMaterialLow: 90,
    asphaltMaterialHigh: 140,
    asphaltInstalledLow: 140,
    asphaltInstalledHigh: 220,
    concreteInstalledLow: 7,
    concreteInstalledHigh: 14,
    gravelInstalledLow: 2,
    gravelInstalledHigh: 5
  },
  northeast: {
    label: "Northeast",
    note: "Usually the highest cost band in this starter model.",
    asphaltMaterialLow: 105,
    asphaltMaterialHigh: 155,
    asphaltInstalledLow: 160,
    asphaltInstalledHigh: 240,
    concreteInstalledLow: 8,
    concreteInstalledHigh: 16,
    gravelInstalledLow: 2.5,
    gravelInstalledHigh: 5.5
  },
  south: {
    label: "South",
    note: "Often lower than coastal markets.",
    asphaltMaterialLow: 85,
    asphaltMaterialHigh: 130,
    asphaltInstalledLow: 130,
    asphaltInstalledHigh: 205,
    concreteInstalledLow: 7,
    concreteInstalledHigh: 13,
    gravelInstalledLow: 1.8,
    gravelInstalledHigh: 4.5
  },
  midwest: {
    label: "Midwest",
    note: "A middle-of-the-road estimate for many suburbs and smaller cities.",
    asphaltMaterialLow: 90,
    asphaltMaterialHigh: 135,
    asphaltInstalledLow: 140,
    asphaltInstalledHigh: 215,
    concreteInstalledLow: 7.5,
    concreteInstalledHigh: 14.5,
    gravelInstalledLow: 2,
    gravelInstalledHigh: 4.8
  },
  west: {
    label: "West",
    note: "Higher land, labor, and logistics costs are common in this band.",
    asphaltMaterialLow: 100,
    asphaltMaterialHigh: 150,
    asphaltInstalledLow: 155,
    asphaltInstalledHigh: 235,
    concreteInstalledLow: 8,
    concreteInstalledHigh: 15.5,
    gravelInstalledLow: 2.2,
    gravelInstalledHigh: 5
  },
  southCentral: {
    label: "South Central",
    note: "A practical middle band for Texas, Oklahoma, and nearby markets.",
    asphaltMaterialLow: 88,
    asphaltMaterialHigh: 132,
    asphaltInstalledLow: 135,
    asphaltInstalledHigh: 210,
    concreteInstalledLow: 7.2,
    concreteInstalledHigh: 13.5,
    gravelInstalledLow: 1.9,
    gravelInstalledHigh: 4.7
  }
};

type StateBucket = {
  region: RegionKey;
  label: string;
  states: string[];
};

export const stateBuckets: StateBucket[] = [
  {
    region: "northeast",
    label: "Northeast",
    states: ["Connecticut", "Delaware", "Maine", "Maryland", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"]
  },
  {
    region: "south",
    label: "South",
    states: [
      "Alabama",
      "Arkansas",
      "Florida",
      "Georgia",
      "Kentucky",
      "Louisiana",
      "Mississippi",
      "North Carolina",
      "South Carolina",
      "Tennessee",
      "Virginia",
      "West Virginia",
      "District of Columbia"
    ]
  },
  {
    region: "midwest",
    label: "Midwest",
    states: ["Illinois", "Indiana", "Iowa", "Kansas", "Michigan", "Minnesota", "Missouri", "Nebraska", "North Dakota", "Ohio", "South Dakota", "Wisconsin"]
  },
  {
    region: "southCentral",
    label: "South Central",
    states: ["Oklahoma", "Texas"]
  },
  {
    region: "west",
    label: "West",
    states: ["Alaska", "Arizona", "California", "Colorado", "Hawaii", "Idaho", "Montana", "Nevada", "New Mexico", "Oregon", "Utah", "Washington", "Wyoming"]
  }
];
