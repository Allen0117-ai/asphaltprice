"use client";

import { useEffect, useMemo, useState } from "react";

import { Calculator, CircleDollarSign, Copy, MapPin, Ruler, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RangeField } from "@/components/ui/range-field";
import {
  clampNumber,
  computeAsphaltEstimate,
  computeDrivewayComparison,
  feetToMeters,
  formatCurrency,
  formatDecimal,
  inchesToMillimeters,
  metersToFeet,
  squareFeetToSquareMeters,
  squareMetersToSquareFeet,
  type CalculatorInput,
  type InputMode,
  type UnitSystem
} from "@/lib/calculator/formulas";
import { regionOptions, regionPricing, type RegionKey } from "@/lib/calculator/regional-prices";
import { cn } from "@/lib/utils";

export type CalculatorMode = "asphalt" | "tonnage" | "comparison" | "driveway";

type CalculatorDefaults = Partial<CalculatorInput> & {
  inputMode?: InputMode;
};

type AsphaltCalculatorProps = {
  mode: CalculatorMode;
  defaultValues?: CalculatorDefaults;
  className?: string;
};

const modeCopy: Record<
  CalculatorMode,
  {
    intro: string;
    ctaLabel: string;
    ctaHint: string;
    ctaTitle: string;
  }
> = {
  asphalt: {
    intro: "Use area or length × width to answer how much asphalt you need and estimate material and installed cost for a basic project.",
    ctaLabel: "Copy estimate",
    ctaHint: "Paste these numbers into a message when you ask a local paving contractor for a quote.",
    ctaTitle: "Ready to ask for a quote?"
  },
  tonnage: {
    intro: "Enter the project size to see how many tons to order, with waste already built in.",
    ctaLabel: "Copy tonnage",
    ctaHint: "Copy the quantity, thickness, and waste allowance before you check prices with a supplier or contractor.",
    ctaTitle: "Need to share the numbers?"
  },
  comparison: {
    intro: "Use one project size to compare asphalt, concrete, and gravel side by side.",
    ctaLabel: "Copy comparison",
    ctaHint: "Save the comparison so each quote can be checked against the same project size.",
    ctaTitle: "Comparing options?"
  },
  driveway: {
    intro: "Size a driveway by area or length × width, then check rough material and installed cost.",
    ctaLabel: "Copy estimate",
    ctaHint: "Paste these numbers into a message when you ask a local paving contractor for a quote.",
    ctaTitle: "Ready to ask for a quote?"
  }
};

function rangeLabel(low: number, high: number) {
  return `${formatCurrency(low)} - ${formatCurrency(high)}`;
}

function resultUnitLabel(unitSystem: UnitSystem, imperialLabel: string, metricLabel: string) {
  return unitSystem === "metric" ? metricLabel : imperialLabel;
}

function ResultBlock({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3.5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">{label}</p>
      <p className="mt-1.5 text-base font-semibold text-white sm:text-lg">{value}</p>
      <p className="mt-1 text-xs leading-5 text-zinc-300 sm:text-sm sm:leading-6">{hint}</p>
    </div>
  );
}

function parsePositiveNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function dimensionValue(valueInFeet: number, unitSystem: UnitSystem, fractionDigits = 1) {
  return unitSystem === "metric" ? formatDecimal(feetToMeters(valueInFeet), fractionDigits) : formatDecimal(valueInFeet, fractionDigits);
}

function areaValue(valueInSqFt: number, unitSystem: UnitSystem, fractionDigits = 1) {
  return unitSystem === "metric" ? formatDecimal(squareFeetToSquareMeters(valueInSqFt), fractionDigits) : formatDecimal(valueInSqFt, fractionDigits);
}

function thicknessValue(valueInInches: number, unitSystem: UnitSystem, fractionDigits = 1) {
  return unitSystem === "metric" ? formatDecimal(inchesToMillimeters(valueInInches), fractionDigits) : formatDecimal(valueInInches, fractionDigits);
}

export function AsphaltCalculator({ mode, defaultValues, className }: AsphaltCalculatorProps) {
  const pageCopy = modeCopy[mode];
  const defaultUnitSystem = defaultValues?.unitSystem ?? "imperial";
  const defaultInputMode = defaultValues?.inputMode ?? "area";

  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(defaultUnitSystem);
  const [areaSqFt, setAreaSqFt] = useState(() => {
    if (typeof defaultValues?.areaSqFt === "number" && defaultValues.areaSqFt > 0) {
      return defaultValues.areaSqFt;
    }

    if (typeof defaultValues?.areaSqM === "number" && defaultValues.areaSqM > 0) {
      return squareMetersToSquareFeet(defaultValues.areaSqM);
    }

    if (typeof defaultValues?.length === "number" && typeof defaultValues?.width === "number" && defaultValues.length > 0 && defaultValues.width > 0) {
      return defaultValues.unitSystem === "metric" ? squareMetersToSquareFeet(defaultValues.length * defaultValues.width) : defaultValues.length * defaultValues.width;
    }

    return 600;
  });
  const [lengthFt, setLengthFt] = useState(() => {
    if (typeof defaultValues?.length === "number" && defaultValues.length > 0) {
      return defaultValues.unitSystem === "metric" ? metersToFeet(defaultValues.length) : defaultValues.length;
    }

    return inputMode === "dimensions" ? Math.sqrt(areaSqFt || 600) : 0;
  });
  const [widthFt, setWidthFt] = useState(() => {
    if (typeof defaultValues?.width === "number" && defaultValues.width > 0) {
      return defaultValues.unitSystem === "metric" ? metersToFeet(defaultValues.width) : defaultValues.width;
    }

    return inputMode === "dimensions" ? Math.sqrt(areaSqFt || 600) : 0;
  });
  const [thicknessInches, setThicknessInches] = useState(() => {
    if (typeof defaultValues?.thicknessInches === "number" && defaultValues.thicknessInches > 0) {
      return defaultValues.thicknessInches;
    }

    if (typeof defaultValues?.thicknessMillimeters === "number" && defaultValues.thicknessMillimeters > 0) {
      return defaultValues.thicknessMillimeters / 25.4;
    }

    return 3;
  });
  const [wastePercent, setWastePercent] = useState(() => clampNumber(defaultValues?.wastePercent ?? 7, 0, 25));
  const [region, setRegion] = useState<RegionKey>(defaultValues?.region ?? "national");
  const [customMaterialPriceInput, setCustomMaterialPriceInput] = useState(() =>
    typeof defaultValues?.customMaterialPricePerTon === "number" && defaultValues.customMaterialPricePerTon > 0
      ? String(defaultValues.customMaterialPricePerTon)
      : ""
  );
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const [estimateCopyLabel, setEstimateCopyLabel] = useState(pageCopy.ctaLabel);
  const [resultAnnouncement, setResultAnnouncement] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get("area");
    const lengthParam = params.get("length");
    const widthParam = params.get("width");
    const thicknessParam = params.get("thickness");
    const wasteParam = params.get("waste");
    const regionValue = params.get("region");
    const inputModeValue = params.get("input");
    const unitValue = params.get("units");
    const priceValue = params.get("price");

    const nextUnitSystem: UnitSystem = unitValue === "metric" ? "metric" : unitValue === "imperial" ? "imperial" : defaultUnitSystem;
    setUnitSystem(nextUnitSystem);

    if (inputModeValue === "dimensions" || inputModeValue === "area") {
      setInputMode(inputModeValue);
    }

    const area = Number(areaParam);
    const length = Number(lengthParam);
    const width = Number(widthParam);
    const thickness = Number(thicknessParam);
    const waste = Number(wasteParam);
    const customPrice = Number(priceValue);

    if (areaParam !== null && Number.isFinite(area) && area > 0) {
      setAreaSqFt(nextUnitSystem === "metric" ? squareMetersToSquareFeet(area) : area);
    }

    if (lengthParam !== null && Number.isFinite(length) && length > 0) {
      setLengthFt(nextUnitSystem === "metric" ? metersToFeet(length) : length);
    }

    if (widthParam !== null && Number.isFinite(width) && width > 0) {
      setWidthFt(nextUnitSystem === "metric" ? metersToFeet(width) : width);
    }

    if (thicknessParam !== null && Number.isFinite(thickness) && thickness > 0) {
      setThicknessInches(nextUnitSystem === "metric" ? thickness / 25.4 : thickness);
    }

    if (wasteParam !== null && Number.isFinite(waste) && waste >= 0) {
      setWastePercent(clampNumber(waste, 0, 25));
    }

    if (regionValue && regionOptions.some((item) => item.key === regionValue)) {
      setRegion(regionValue as RegionKey);
    }

    if (priceValue !== null && Number.isFinite(customPrice) && customPrice > 0) {
      setCustomMaterialPriceInput(String(customPrice));
    }
  }, [defaultUnitSystem]);

  const projectAreaSqFt = inputMode === "dimensions" ? lengthFt * widthFt : areaSqFt;
  const customMaterialPricePerTon = parsePositiveNumber(customMaterialPriceInput);

  const estimate = useMemo(
    () =>
      computeAsphaltEstimate(
        inputMode === "dimensions"
          ? {
              length: lengthFt,
              width: widthFt,
              unitSystem: "imperial",
              thicknessInches,
              wastePercent,
              region,
              customMaterialPricePerTon
            }
          : {
              areaSqFt,
              thicknessInches,
              wastePercent,
              region,
              customMaterialPricePerTon
            }
      ),
    [areaSqFt, customMaterialPricePerTon, inputMode, lengthFt, region, thicknessInches, wastePercent, widthFt]
  );

  const comparison = useMemo(
    () =>
      computeDrivewayComparison(
        inputMode === "dimensions"
          ? {
              length: lengthFt,
              width: widthFt,
              unitSystem: "imperial",
              thicknessInches,
              wastePercent,
              region,
              customMaterialPricePerTon
            }
          : {
              areaSqFt,
              thicknessInches,
              wastePercent,
              region,
              customMaterialPricePerTon
            }
      ),
    [areaSqFt, customMaterialPricePerTon, inputMode, lengthFt, region, thicknessInches, wastePercent, widthFt]
  );

  const regionLabel = regionPricing[region].label;
  const regionNote = regionPricing[region].note;
  const displayAreaSqFt = inputMode === "dimensions" ? projectAreaSqFt : areaSqFt;
  const displayLength = lengthFt;
  const displayWidth = widthFt;
  const displayThickness = thicknessInches;
  const displayThicknessValue = unitSystem === "metric" ? inchesToMillimeters(displayThickness) : displayThickness;
  const thicknessSliderMin = unitSystem === "metric" ? 25 : 1;
  const thicknessSliderMax = unitSystem === "metric" ? 400 : 16;
  const thicknessSliderStep = unitSystem === "metric" ? 5 : 0.1;
  const wasteSliderMin = 0;
  const wasteSliderMax = 25;
  const wasteSliderStep = 1;

  const setAreaFromInput = (value: string) => {
    const nextValue = Number(value);
    if (!Number.isFinite(nextValue) || nextValue <= 0) {
      setAreaSqFt(0);
      return;
    }

    setAreaSqFt(unitSystem === "metric" ? squareMetersToSquareFeet(nextValue) : nextValue);
  };

  const setLengthFromInput = (value: string) => {
    const nextValue = Number(value);
    if (!Number.isFinite(nextValue) || nextValue <= 0) {
      setLengthFt(0);
      return;
    }

    setLengthFt(unitSystem === "metric" ? metersToFeet(nextValue) : nextValue);
  };

  const setWidthFromInput = (value: string) => {
    const nextValue = Number(value);
    if (!Number.isFinite(nextValue) || nextValue <= 0) {
      setWidthFt(0);
      return;
    }

    setWidthFt(unitSystem === "metric" ? metersToFeet(nextValue) : nextValue);
  };

  const setThicknessFromInput = (value: string) => {
    const nextValue = Number(value);
    if (!Number.isFinite(nextValue) || nextValue <= 0) {
      setThicknessInches(0);
      return;
    }

    setThicknessInches(unitSystem === "metric" ? nextValue / 25.4 : nextValue);
  };

  const setThicknessFromDisplayValue = (value: number) => {
    setThicknessInches(unitSystem === "metric" ? value / 25.4 : value);
  };

  const handleInputModeChange = (nextMode: InputMode) => {
    if (nextMode === "dimensions" && (lengthFt <= 0 || widthFt <= 0) && areaSqFt > 0) {
      const side = Math.sqrt(areaSqFt);
      setLengthFt(side);
      setWidthFt(side);
    }

    if (nextMode === "area" && areaSqFt <= 0 && lengthFt > 0 && widthFt > 0) {
      setAreaSqFt(lengthFt * widthFt);
    }

    setInputMode(nextMode);
  };

  const shareCurrentEstimate = async () => {
    const params = new URLSearchParams({
      input: inputMode,
      units: unitSystem,
      thickness: String(unitSystem === "metric" ? inchesToMillimeters(displayThickness) : displayThickness),
      waste: String(wastePercent),
      region
    });

    if (inputMode === "dimensions") {
      params.set("length", String(unitSystem === "metric" ? feetToMeters(displayLength) : displayLength));
      params.set("width", String(unitSystem === "metric" ? feetToMeters(displayWidth) : displayWidth));
    } else {
      params.set("area", String(unitSystem === "metric" ? squareFeetToSquareMeters(displayAreaSqFt) : displayAreaSqFt));
    }

    if (customMaterialPricePerTon) {
      params.set("price", String(customMaterialPricePerTon));
    }

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    await navigator.clipboard.writeText(url);
    setCopyLabel("Copied");
    window.setTimeout(() => setCopyLabel("Copy link"), 1400);
  };

  const copyEstimateSummary = async () => {
    const lines = [
      "Asphalt project estimate",
      `Region: ${regionLabel}`,
      `Area: ${areaValue(projectAreaSqFt, unitSystem, unitSystem === "metric" ? 1 : 0)} ${areaLabel}`,
      inputMode === "dimensions"
        ? `Size: ${dimensionValue(displayLength, unitSystem, 1)} x ${dimensionValue(displayWidth, unitSystem, 1)} ${lengthLabel}`
        : null,
      `Thickness: ${thicknessValue(displayThickness, unitSystem, unitSystem === "metric" ? 0 : 1)} ${thicknessLabel}`,
      `Waste allowance: ${wastePercent}%`,
      `Asphalt needed: ${formatDecimal(estimate.tons, 1)} tons / ${formatDecimal(estimate.tonnes, 1)} tonnes`,
      `Volume: ${formatDecimal(estimate.cubicYards, 1)} yd3 / ${formatDecimal(estimate.cubicMeters, 1)} m3`,
      customMaterialPricePerTon
        ? `Material estimate: ${formatCurrency(estimate.customMaterialCost ?? 0)} at ${formatCurrency(customMaterialPricePerTon)} / ton`
        : `Material cost range: ${rangeLabel(estimate.materialLow, estimate.materialHigh)}`,
      mode === "tonnage" ? null : `Installed asphalt range: ${rangeLabel(estimate.installedLow, estimate.installedHigh)}`,
      mode === "comparison" ? `Concrete installed range: ${rangeLabel(comparison.concrete.low, comparison.concrete.high)}` : null,
      mode === "comparison" ? `Gravel installed range: ${rangeLabel(comparison.gravel.low, comparison.gravel.high)}` : null,
      "Note: Planning estimate only. Final quote depends on site inspection."
    ].filter(Boolean);

    await navigator.clipboard.writeText(lines.join("\n"));
    setEstimateCopyLabel("Copied");
    window.setTimeout(() => setEstimateCopyLabel(pageCopy.ctaLabel), 1400);
  };

  const areaLabel = resultUnitLabel(unitSystem, "sq ft", "sq m");
  const lengthLabel = resultUnitLabel(unitSystem, "ft", "m");
  const thicknessLabel = resultUnitLabel(unitSystem, "in", "mm");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (mode === "tonnage") {
        setResultAnnouncement(`Results updated. Asphalt needed ${formatDecimal(estimate.tons)} tons.`);
        return;
      }

      if (mode === "asphalt") {
        setResultAnnouncement(`Results updated. Installed cost ${rangeLabel(estimate.installedLow, estimate.installedHigh)}.`);
        return;
      }

      setResultAnnouncement(`Results updated. Asphalt installed ${rangeLabel(comparison.asphalt.installedLow, comparison.asphalt.installedHigh)}.`);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [comparison.asphalt.installedHigh, comparison.asphalt.installedLow, estimate.installedHigh, estimate.installedLow, estimate.tons, mode]);

  return (
    <section id="calculator" className={cn("scroll-mt-24 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]", className)}>
      <Card className="relative overflow-hidden border-zinc-200 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-5 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                <Calculator className="h-3.5 w-3.5" />
                Project inputs
              </div>
              <p className="mt-2.5 max-w-md text-sm leading-6 text-zinc-500">
                {pageCopy.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={shareCurrentEstimate}>
                <Copy className="h-4 w-4" />
                {copyLabel}
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-700">Input mode</p>
              <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1">
                <Button
                  variant={inputMode === "area" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-md px-3 shadow-none"
                  onClick={() => handleInputModeChange("area")}
                  aria-pressed={inputMode === "area"}
                >
                  Area
                </Button>
                <Button
                  variant={inputMode === "dimensions" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-md px-3 shadow-none"
                  onClick={() => handleInputModeChange("dimensions")}
                  aria-pressed={inputMode === "dimensions"}
                >
                  <Ruler className="h-4 w-4" />
                  Length × width
                </Button>
              </div>
              <p className="text-xs text-zinc-500">
                Selected: {inputMode === "area" ? "Area" : "Length × width"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-700">Units</p>
              <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1">
                <Button
                  variant={unitSystem === "imperial" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-md px-3 shadow-none"
                  onClick={() => setUnitSystem("imperial")}
                  aria-pressed={unitSystem === "imperial"}
                >
                  Imperial
                </Button>
                <Button
                  variant={unitSystem === "metric" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-md px-3 shadow-none"
                  onClick={() => setUnitSystem("metric")}
                  aria-pressed={unitSystem === "metric"}
                >
                  Metric
                </Button>
              </div>
              <p className="text-xs text-zinc-500">Selected: {unitSystem === "imperial" ? "Imperial" : "Metric"}</p>
            </div>
          </div>

          {inputMode === "area" ? (
            <div className="space-y-2">
              <Label htmlFor="area">Project area ({areaLabel})</Label>
              <Input
                id="area"
                type="number"
                min={0}
                step="any"
                value={unitSystem === "metric" ? squareFeetToSquareMeters(displayAreaSqFt) : displayAreaSqFt}
                onChange={(event) => setAreaFromInput(event.target.value)}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="length">Length ({lengthLabel})</Label>
                <Input
                  id="length"
                  type="number"
                  min={0}
                  step="any"
                  value={unitSystem === "metric" ? feetToMeters(displayLength) : displayLength}
                  onChange={(event) => setLengthFromInput(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width ({lengthLabel})</Label>
                <Input
                  id="width"
                  type="number"
                  min={0}
                  step="any"
                  value={unitSystem === "metric" ? feetToMeters(displayWidth) : displayWidth}
                  onChange={(event) => setWidthFromInput(event.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <RangeField
              id="thickness"
              label={`Thickness (${thicknessLabel})`}
              value={displayThicknessValue}
              min={thicknessSliderMin}
              max={thicknessSliderMax}
              step={thicknessSliderStep}
              onValueChange={setThicknessFromDisplayValue}
              renderValue={(value) => `${formatDecimal(value, unitSystem === "metric" ? 0 : 1)} ${thicknessLabel}`}
            />

            <div className="space-y-2">
              <Label htmlFor="price">Custom material price per ton (optional)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={5}
                placeholder="Use region pricing if blank"
                value={customMaterialPriceInput}
                onChange={(event) => setCustomMaterialPriceInput(event.target.value)}
              />
            </div>

            <RangeField
              className="sm:col-span-2"
              id="waste"
              label="Waste allowance"
              value={wastePercent}
              min={wasteSliderMin}
              max={wasteSliderMax}
              step={wasteSliderStep}
              onValueChange={setWastePercent}
              renderValue={(value) => `${formatDecimal(value, 0)}%`}
              description="A little waste is normal for cuts, waste, and site cleanup."
            />

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="region">Region</Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <select
                  id="region"
                  autoComplete="off"
                  value={region}
                  onChange={(event) => setRegion(event.target.value as RegionKey)}
                  className="h-10 w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-950 outline-none focus:border-zinc-950"
                >
                  {regionOptions.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-zinc-500">{regionNote}</p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-6 text-zinc-600">
            Formula: area × thickness × density ÷ 2000, then add waste. The calculator converts metric input for you and uses 145 lb/ft³ for the base estimate.
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-zinc-950 bg-zinc-950 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Quote range</p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Project estimate</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200">
              <CircleDollarSign className="h-3.5 w-3.5" />
              {regionLabel}
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {resultAnnouncement}
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-zinc-300">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>Area: {areaValue(projectAreaSqFt, unitSystem, unitSystem === "metric" ? 1 : 0)} {areaLabel}</span>
              {inputMode === "dimensions" && (
                <span>
                  Size: {dimensionValue(displayLength, unitSystem, 1)} × {dimensionValue(displayWidth, unitSystem, 1)} {lengthLabel}
                </span>
              )}
              <span>Thickness: {thicknessValue(displayThickness, unitSystem, unitSystem === "metric" ? 0 : 1)} {thicknessLabel}</span>
              <span>
                Volume: {formatDecimal(estimate.cubicYards, 1)} yd³ / {formatDecimal(estimate.cubicMeters, 1)} m³
              </span>
              <span>
                Weight: {formatDecimal(estimate.tons, 1)} tons / {formatDecimal(estimate.tonnes, 1)} tonnes
              </span>
            </div>
          </div>

          {mode === "tonnage" && (
            <div className="grid gap-3 md:grid-cols-2">
              <p className="text-xs text-zinc-400 md:col-span-2">Results update automatically as you edit.</p>
              <ResultBlock
                label="Asphalt needed"
                value={`${formatDecimal(estimate.tons)} tons / ${formatDecimal(estimate.tonnes)} tonnes`}
                hint="This includes the waste allowance you selected."
              />
              <ResultBlock
                label="Volume"
                value={`${formatDecimal(estimate.cubicYards, 1)} yd³ / ${formatDecimal(estimate.cubicMeters, 1)} m³`}
                hint="Handy for checking the amount before ordering."
              />
              <ResultBlock
                label="Coverage per ton"
                value={`${formatDecimal(estimate.coverageSqFtPerTon, 0)} sq ft / ${formatDecimal(estimate.coverageSqMPerTon, 1)} sq m`}
                hint={`At ${thicknessValue(displayThickness, unitSystem, unitSystem === "metric" ? 0 : 1)} ${thicknessLabel}, one ton covers about this much.`}
              />
              <ResultBlock
                label="Waste added"
                value={`${wastePercent}%`}
                hint="The estimate adds this buffer before converting to tons."
              />
            </div>
          )}

          {mode === "asphalt" && (
            <div className="grid gap-3 md:grid-cols-2">
              <p className="text-xs text-zinc-400 md:col-span-2">Results update automatically as you edit.</p>
              <ResultBlock
                label="Asphalt needed"
                value={`${formatDecimal(estimate.tons)} tons / ${formatDecimal(estimate.tonnes)} tonnes`}
                hint="A quick quantity number for quotes and ordering."
              />
              {customMaterialPricePerTon ? (
                <ResultBlock
                  label="Custom material price"
                  value={`${formatCurrency(customMaterialPricePerTon)} / ton`}
                  hint={`Estimated material total: ${formatCurrency(estimate.customMaterialCost ?? 0)}. Regional reference: ${rangeLabel(estimate.materialLow, estimate.materialHigh)}.`}
                />
              ) : (
                <ResultBlock
                  label="Material cost"
                  value={rangeLabel(estimate.materialLow, estimate.materialHigh)}
                  hint={`About ${formatCurrency(estimate.materialPerSqFtLow)} - ${formatCurrency(estimate.materialPerSqFtHigh)} per sq ft.`}
                />
              )}
              <ResultBlock
                label="Installed cost"
                value={rangeLabel(estimate.installedLow, estimate.installedHigh)}
                hint={`About ${formatCurrency(estimate.installedPerSqFtLow)} - ${formatCurrency(estimate.installedPerSqFtHigh)} per sq ft.`}
              />
            </div>
          )}

          {(mode === "comparison" || mode === "driveway") && (
            <div className="grid gap-3 md:grid-cols-2">
              <p className="text-xs text-zinc-400 md:col-span-2">Results update automatically as you edit.</p>
              <ResultBlock
                label="Asphalt quantity"
                value={`${formatDecimal(comparison.asphalt.tons)} tons / ${formatDecimal(comparison.asphalt.tonnes)} tonnes`}
                hint={`${formatDecimal(comparison.asphalt.cubicYards, 1)} yd³ / ${formatDecimal(comparison.asphalt.cubicMeters, 1)} m³ of asphalt volume.`}
              />
              {customMaterialPricePerTon && (
                <ResultBlock
                  label="Custom material price"
                  value={`${formatCurrency(customMaterialPricePerTon)} / ton`}
                  hint={`Estimated material total: ${formatCurrency(estimate.customMaterialCost ?? 0)}.`}
                />
              )}
              <ResultBlock
                label="Asphalt installed"
                value={rangeLabel(comparison.asphalt.installedLow, comparison.asphalt.installedHigh)}
                hint="Typical driveway range in this estimate model."
              />
              <ResultBlock
                label="Concrete installed"
                value={rangeLabel(comparison.concrete.low, comparison.concrete.high)}
                hint="Concrete is usually the more expensive option here."
              />
              <ResultBlock
                label="Gravel installed"
                value={rangeLabel(comparison.gravel.low, comparison.gravel.high)}
                hint="Useful as a lower-cost comparison point."
              />
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-300">
              <div className="flex items-center gap-2 font-medium text-white">
                <TriangleAlert className="h-4 w-4 text-amber-300" />
                Estimate only
              </div>
              <p className="mt-2">
                Final pricing depends on access, prep work, base condition, grading, haul distance, and local crew rates.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">{pageCopy.ctaTitle}</p>
                <p className="text-sm leading-6 text-zinc-300">{pageCopy.ctaHint}</p>
              </div>
              <button
                type="button"
                onClick={copyEstimateSummary}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Copy className="h-4 w-4" />
                {estimateCopyLabel}
              </button>
            </div>
          </div>

          <div className="text-xs leading-5 text-zinc-400">
            Area: {areaValue(projectAreaSqFt, unitSystem, unitSystem === "metric" ? 1 : 0)} {areaLabel} · Thickness: {thicknessValue(displayThickness, unitSystem, unitSystem === "metric" ? 0 : 1)} {thicknessLabel} · Waste: {wastePercent}%
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
