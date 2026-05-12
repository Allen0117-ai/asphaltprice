import { regionPricing, type RegionKey } from "@/lib/calculator/regional-prices";

export type UnitSystem = "imperial" | "metric";
export type InputMode = "area" | "dimensions";

export type CalculatorInput = {
  areaSqFt?: number;
  areaSqM?: number;
  length?: number;
  width?: number;
  unitSystem?: UnitSystem;
  thicknessInches?: number;
  thicknessMillimeters?: number;
  wastePercent: number;
  region: RegionKey;
  customMaterialPricePerTon?: number | null;
  customMaterialPriceUnit?: "ton" | "tonne";
};

const SQFT_PER_SQM = 10.763910416709722;
const CUBIC_FEET_PER_CUBIC_METER = 35.31466672148859;
const POUNDS_PER_TON = 2000;
const POUNDS_PER_TONNE = 2204.62262185;
const MILLIMETERS_PER_INCH = 25.4;
const FEET_PER_METER = 3.280839895013123;

export function squareFeetToSquareMeters(value: number) {
  return value / SQFT_PER_SQM;
}

export function squareMetersToSquareFeet(value: number) {
  return value * SQFT_PER_SQM;
}

export function feetToMeters(value: number) {
  return value / FEET_PER_METER;
}

export function metersToFeet(value: number) {
  return value * FEET_PER_METER;
}

export function inchesToMillimeters(value: number) {
  return value * MILLIMETERS_PER_INCH;
}

export function millimetersToInches(value: number) {
  return value / MILLIMETERS_PER_INCH;
}

export function resolveAreaSqFt(input: CalculatorInput) {
  if (typeof input.areaSqFt === "number" && input.areaSqFt > 0) {
    return input.areaSqFt;
  }

  if (typeof input.areaSqM === "number" && input.areaSqM > 0) {
    return squareMetersToSquareFeet(input.areaSqM);
  }

  if (typeof input.length === "number" && typeof input.width === "number" && input.length > 0 && input.width > 0) {
    if (input.unitSystem === "metric") {
      return squareMetersToSquareFeet(input.length * input.width);
    }

    return input.length * input.width;
  }

  return 0;
}

export function resolveThicknessInches(input: CalculatorInput) {
  if (typeof input.thicknessInches === "number" && input.thicknessInches > 0) {
    return input.thicknessInches;
  }

  if (typeof input.thicknessMillimeters === "number" && input.thicknessMillimeters > 0) {
    return millimetersToInches(input.thicknessMillimeters);
  }

  return 0;
}

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
  const cubicFeet = resolveAreaSqFt(input) * (resolveThicknessInches(input) / 12);
  const pounds = cubicFeet * density * wasteMultiplier;
  return pounds / 2000;
}

export function coveragePerTon(thicknessInches: number, density = 145) {
  if (thicknessInches <= 0) {
    return 0;
  }

  const cubicFeetPerTon = 2000 / density;
  return cubicFeetPerTon / (thicknessInches / 12);
}

export function coveragePerTonne(thicknessInches: number, density = 145) {
  if (thicknessInches <= 0) {
    return 0;
  }

  const cubicFeetPerTonne = POUNDS_PER_TONNE / density;
  return cubicFeetPerTonne / (thicknessInches / 12);
}

export function computeAsphaltEstimate(input: CalculatorInput) {
  const pricing = regionPricing[input.region];
  const areaSqFt = resolveAreaSqFt(input);
  const thicknessInches = resolveThicknessInches(input);
  const cubicFeet = areaSqFt * (thicknessInches / 12);
  const cubicYards = cubicFeet / 27;
  const cubicMeters = cubicFeet / CUBIC_FEET_PER_CUBIC_METER;
  const pounds = cubicFeet * 145 * (1 + input.wastePercent / 100);
  const tons = pounds / POUNDS_PER_TON;
  const tonnes = pounds / POUNDS_PER_TONNE;
  const materialLow = tons * pricing.asphaltMaterialLow;
  const materialHigh = tons * pricing.asphaltMaterialHigh;
  const installedLow = tons * pricing.asphaltInstalledLow;
  const installedHigh = tons * pricing.asphaltInstalledHigh;
  const customMaterialPricePerTon = input.customMaterialPricePerTon && input.customMaterialPricePerTon > 0 ? input.customMaterialPricePerTon : null;
  const customMaterialPriceUnit = input.customMaterialPriceUnit ?? "ton";
  const customMaterialQuantity = customMaterialPriceUnit === "tonne" ? tonnes : tons;
  const customMaterialCost = customMaterialPricePerTon ? customMaterialQuantity * customMaterialPricePerTon : null;
  const coverageSqFtPerTon = coveragePerTon(thicknessInches);
  const coverageSqFtPerTonne = coveragePerTonne(thicknessInches);

  return {
    areaSqFt,
    areaSqM: squareFeetToSquareMeters(areaSqFt),
    thicknessInches,
    thicknessMm: inchesToMillimeters(thicknessInches),
    cubicFeet,
    cubicYards,
    cubicMeters,
    pounds,
    tons,
    tonnes,
    coverageSqFtPerTon,
    coverageSqMPerTon: squareFeetToSquareMeters(coverageSqFtPerTon),
    coverageSqFtPerTonne,
    coverageSqMPerTonne: squareFeetToSquareMeters(coverageSqFtPerTonne),
    materialLow,
    materialHigh,
    installedLow,
    installedHigh,
    materialPerSqFtLow: areaSqFt > 0 ? materialLow / areaSqFt : 0,
    materialPerSqFtHigh: areaSqFt > 0 ? materialHigh / areaSqFt : 0,
    installedPerSqFtLow: areaSqFt > 0 ? installedLow / areaSqFt : 0,
    installedPerSqFtHigh: areaSqFt > 0 ? installedHigh / areaSqFt : 0,
    customMaterialPricePerTon,
    customMaterialPriceUnit,
    customMaterialCost,
    customMaterialPerSqFt: customMaterialCost && areaSqFt > 0 ? customMaterialCost / areaSqFt : null,
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
  const areaSqFt = resolveAreaSqFt(input);
  const asphalt = computeAsphaltEstimate(input);
  const concrete = computeConcreteEstimate(areaSqFt, input.region);
  const gravel = computeGravelEstimate(areaSqFt, input.region);

  return {
    asphalt,
    concrete,
    gravel
  };
}
