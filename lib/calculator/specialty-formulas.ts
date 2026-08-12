import { clampNumber } from "@/lib/calculator/formulas";

export type DrivewayProjectCostInput = {
  areaSqFt: number;
  depthInches: number;
  preparationRatePerSqFt: number;
  pavingRatePerSqFt: number;
  repairAreaPercent: number;
  repairRatePerSqFt: number;
  fixedCosts: number;
};

export function computeDrivewayProjectCost(input: DrivewayProjectCostInput) {
  const areaSqFt = Math.max(0, input.areaSqFt);
  const depthInches = Math.max(0, input.depthInches);
  const repairAreaPercent = clampNumber(input.repairAreaPercent, 0, 100);
  const repairAreaSqFt = areaSqFt * (repairAreaPercent / 100);
  const preparationCost = areaSqFt * Math.max(0, input.preparationRatePerSqFt);
  const repairCost = repairAreaSqFt * Math.max(0, input.repairRatePerSqFt);
  const pavingCost = areaSqFt * Math.max(0, input.pavingRatePerSqFt);
  const fixedCosts = Math.max(0, input.fixedCosts);
  const subtotal = preparationCost + repairCost + pavingCost + fixedCosts;
  const asphaltTons = areaSqFt * (depthInches / 12) * 145 * 1.07 / 2000;

  return {
    areaSqFt,
    repairAreaSqFt,
    preparationCost,
    repairCost,
    pavingCost,
    fixedCosts,
    subtotal,
    planningLow: subtotal * 0.9,
    planningHigh: subtotal * 1.15,
    costPerSqFt: areaSqFt > 0 ? subtotal / areaSqFt : 0,
    asphaltTons
  };
}

export type SealingCostInput = {
  areaSqFt: number;
  coats: number;
  coverageSqFtPerGallon: number;
  materialPricePerGallon: number;
  laborRatePerSqFtPerCoat: number;
  preparationRatePerSqFt: number;
  crackRepairAllowance: number;
  conditionMultiplier: number;
  wastePercent: number;
};

export function computeSealingCost(input: SealingCostInput) {
  const areaSqFt = Math.max(0, input.areaSqFt);
  const coats = clampNumber(Math.round(input.coats), 1, 3);
  const coverageSqFtPerGallon = Math.max(1, input.coverageSqFtPerGallon);
  const conditionMultiplier = Math.max(1, input.conditionMultiplier);
  const wasteMultiplier = 1 + clampNumber(input.wastePercent, 0, 30) / 100;
  const gallons = areaSqFt * coats / coverageSqFtPerGallon * wasteMultiplier;
  const materialCost = gallons * Math.max(0, input.materialPricePerGallon);
  const laborCost = areaSqFt * coats * Math.max(0, input.laborRatePerSqFtPerCoat) * conditionMultiplier;
  const preparationCost = areaSqFt * Math.max(0, input.preparationRatePerSqFt) * conditionMultiplier;
  const crackRepairCost = Math.max(0, input.crackRepairAllowance);
  const subtotal = materialCost + laborCost + preparationCost + crackRepairCost;

  return {
    areaSqFt,
    gallons,
    materialCost,
    laborCost,
    preparationCost,
    crackRepairCost,
    subtotal,
    planningLow: subtotal * 0.9,
    planningHigh: subtotal * 1.15,
    costPerSqFt: areaSqFt > 0 ? subtotal / areaSqFt : 0
  };
}

export type MillingsEstimateInput = {
  areaSqFt: number;
  depthInches: number;
  densityLbPerCubicFt: number;
  wastePercent: number;
  pricePerTon: number;
};

export function computeMillingsEstimate(input: MillingsEstimateInput) {
  const areaSqFt = Math.max(0, input.areaSqFt);
  const depthInches = Math.max(0, input.depthInches);
  const densityLbPerCubicFt = Math.max(1, input.densityLbPerCubicFt);
  const wasteMultiplier = 1 + clampNumber(input.wastePercent, 0, 30) / 100;
  const compactedCubicFeet = areaSqFt * (depthInches / 12);
  const orderCubicFeet = compactedCubicFeet * wasteMultiplier;
  const cubicYards = orderCubicFeet / 27;
  const tons = orderCubicFeet * densityLbPerCubicFt / 2000;
  const pricePerTon = Math.max(0, input.pricePerTon);

  return {
    areaSqFt,
    compactedCubicFeet,
    cubicYards,
    tons,
    estimatedMaterialCost: tons * pricePerTon,
    coverageSqFtPerTon: depthInches > 0 ? 2000 / densityLbPerCubicFt / (depthInches / 12) : 0
  };
}

export type AsphaltConversionInput = {
  cubicYards: number;
  squareYards: number;
  depthInches: number;
  densityLbPerCubicFt: number;
};

export function computeAsphaltConversions(input: AsphaltConversionInput) {
  const cubicYards = Math.max(0, input.cubicYards);
  const squareYards = Math.max(0, input.squareYards);
  const depthInches = Math.max(0, input.depthInches);
  const densityLbPerCubicFt = Math.max(1, input.densityLbPerCubicFt);
  const poundsPerCubicYard = densityLbPerCubicFt * 27;
  const tonsPerCubicYard = poundsPerCubicYard / 2000;
  const tonsFromCubicYards = cubicYards * tonsPerCubicYard;
  const cubicFeetFromSquareYards = squareYards * 9 * (depthInches / 12);
  const tonsFromSquareYards = cubicFeetFromSquareYards * densityLbPerCubicFt / 2000;

  return {
    poundsPerCubicYard,
    tonsPerCubicYard,
    tonsFromCubicYards,
    tonsFromSquareYards
  };
}
