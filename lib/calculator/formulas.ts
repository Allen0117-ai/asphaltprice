import { regionPricing, type RegionKey } from "@/lib/calculator/regional-prices";

export type CalculatorInput = {
  areaSqFt: number;
  thicknessInches: number;
  wastePercent: number;
  region: RegionKey;
};

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

export function formatDecimal(value: number, fractionDigits = 1) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0
  }).format(value);
}

export function computeAsphaltTons(input: CalculatorInput, density = 145) {
  const wasteMultiplier = 1 + input.wastePercent / 100;
  const cubicFeet = input.areaSqFt * (input.thicknessInches / 12);
  const pounds = cubicFeet * density * wasteMultiplier;
  return pounds / 2000;
}

export function coveragePerTon(thicknessInches: number, density = 145) {
  const cubicFeetPerTon = 2000 / density;
  return cubicFeetPerTon / (thicknessInches / 12);
}

export function computeAsphaltEstimate(input: CalculatorInput) {
  const pricing = regionPricing[input.region];
  const tons = computeAsphaltTons(input);
  const materialLow = tons * pricing.asphaltMaterialLow;
  const materialHigh = tons * pricing.asphaltMaterialHigh;
  const installedLow = tons * pricing.asphaltInstalledLow;
  const installedHigh = tons * pricing.asphaltInstalledHigh;

  return {
    tons,
    coverageSqFtPerTon: coveragePerTon(input.thicknessInches),
    materialLow,
    materialHigh,
    installedLow,
    installedHigh,
    materialPerSqFtLow: materialLow / input.areaSqFt,
    materialPerSqFtHigh: materialHigh / input.areaSqFt,
    installedPerSqFtLow: installedLow / input.areaSqFt,
    installedPerSqFtHigh: installedHigh / input.areaSqFt,
    pricing
  };
}

export function computeConcreteEstimate(areaSqFt: number, region: RegionKey) {
  const pricing = regionPricing[region];
  return {
    low: areaSqFt * pricing.concreteInstalledLow,
    high: areaSqFt * pricing.concreteInstalledHigh
  };
}

export function computeGravelEstimate(areaSqFt: number, region: RegionKey) {
  const pricing = regionPricing[region];
  return {
    low: areaSqFt * pricing.gravelInstalledLow,
    high: areaSqFt * pricing.gravelInstalledHigh
  };
}

export function computeDrivewayComparison(input: CalculatorInput) {
  const asphalt = computeAsphaltEstimate(input);
  const concrete = computeConcreteEstimate(input.areaSqFt, input.region);
  const gravel = computeGravelEstimate(input.areaSqFt, input.region);

  return {
    asphalt,
    concrete,
    gravel
  };
}
