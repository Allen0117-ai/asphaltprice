"use client";

import { useEffect, useMemo, useState } from "react";

import { Calculator, CircleDollarSign, Copy, MapPin, Printer, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clampNumber,
  computeAsphaltEstimate,
  computeDrivewayComparison,
  formatCurrency,
  formatDecimal,
  type CalculatorInput
} from "@/lib/calculator/formulas";
import { regionOptions, regionPricing, type RegionKey } from "@/lib/calculator/regional-prices";
import { cn } from "@/lib/utils";

export type CalculatorMode = "asphalt" | "tonnage" | "comparison" | "driveway";

type AsphaltCalculatorProps = {
  mode: CalculatorMode;
  defaultValues?: Partial<CalculatorInput>;
  className?: string;
};

function rangeLabel(low: number, high: number) {
  return `${formatCurrency(low)} - ${formatCurrency(high)}`;
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
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-300">{hint}</p>
    </div>
  );
}

export function AsphaltCalculator({ mode, defaultValues, className }: AsphaltCalculatorProps) {
  const [areaSqFt, setAreaSqFt] = useState(defaultValues?.areaSqFt ?? 600);
  const [thicknessInches, setThicknessInches] = useState(defaultValues?.thicknessInches ?? 3);
  const [wastePercent, setWastePercent] = useState(defaultValues?.wastePercent ?? 7);
  const [region, setRegion] = useState<RegionKey>(defaultValues?.region ?? "national");
  const [copyLabel, setCopyLabel] = useState("Copy link");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get("area");
    const thicknessParam = params.get("thickness");
    const wasteParam = params.get("waste");
    const regionValue = params.get("region");

    const area = Number(areaParam);
    const thickness = Number(thicknessParam);
    const waste = Number(wasteParam);

    if (areaParam !== null && Number.isFinite(area) && area > 0) {
      setAreaSqFt(clampNumber(area, 50, 50000));
    }

    if (thicknessParam !== null && Number.isFinite(thickness) && thickness > 0) {
      setThicknessInches(clampNumber(thickness, 1, 12));
    }

    if (wasteParam !== null && Number.isFinite(waste) && waste >= 0) {
      setWastePercent(clampNumber(waste, 0, 25));
    }

    if (regionValue && regionOptions.some((item) => item.key === regionValue)) {
      setRegion(regionValue as RegionKey);
    }
  }, []);

  const estimate = useMemo(
    () =>
      computeAsphaltEstimate({
        areaSqFt,
        thicknessInches,
        wastePercent,
        region
      }),
    [areaSqFt, thicknessInches, wastePercent, region]
  );

  const comparison = useMemo(
    () =>
      computeDrivewayComparison({
        areaSqFt,
        thicknessInches,
        wastePercent,
        region
      }),
    [areaSqFt, thicknessInches, wastePercent, region]
  );

  const regionLabel = regionPricing[region].label;
  const regionNote = regionPricing[region].note;

  const shareCurrentEstimate = async () => {
    const params = new URLSearchParams({
      area: String(areaSqFt),
      thickness: String(thicknessInches),
      waste: String(wastePercent),
      region
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    await navigator.clipboard.writeText(url);
    setCopyLabel("Copied");
    window.setTimeout(() => setCopyLabel("Copy link"), 1400);
  };

  const printEstimate = () => {
    window.print();
  };

  return (
    <section id="calculator" className={cn("grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]", className)}>
      <Card className="border-zinc-200 shadow-soft">
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                <Calculator className="h-3.5 w-3.5" />
                Project inputs
              </div>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                Set the job size, thickness, and region. The calculator turns that into a tonnage and price range.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={shareCurrentEstimate}>
                <Copy className="h-4 w-4" />
                {copyLabel}
              </Button>
              <Button variant="outline" size="sm" onClick={printEstimate}>
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="area">Project area (sq ft)</Label>
              <Input
                id="area"
                type="number"
                min={50}
                step={10}
                value={areaSqFt}
                onChange={(event) => setAreaSqFt(clampNumber(Number(event.target.value) || 0, 50, 50000))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thickness">Thickness (inches)</Label>
              <Input
                id="thickness"
                type="number"
                min={1}
                step={0.5}
                value={thicknessInches}
                onChange={(event) => setThicknessInches(clampNumber(Number(event.target.value) || 0, 1, 12))}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="waste">Waste allowance</Label>
                <span className="text-sm font-medium text-zinc-600">{wastePercent}%</span>
              </div>
              <input
                id="waste"
                type="range"
                min={0}
                max={20}
                step={1}
                value={wastePercent}
                onChange={(event) => setWastePercent(clampNumber(Number(event.target.value) || 0, 0, 20))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-950"
              />
              <p className="text-xs text-zinc-500">A little waste is normal for cuts, waste, and site cleanup.</p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="region">Region</Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <select
                  id="region"
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

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            Formula: area × thickness × density ÷ 2000, then add waste. Density uses 145 lb/ft³ for a standard estimate.
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-950 bg-zinc-950 shadow-soft">
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Quote range</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Project estimate</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200">
              <CircleDollarSign className="h-3.5 w-3.5" />
              {regionLabel}
            </div>
          </div>

          {mode === "tonnage" && (
            <div className="grid gap-3">
              <ResultBlock
                label="Asphalt needed"
                value={`${formatDecimal(estimate.tons)} tons`}
                hint="This includes the waste allowance you selected."
              />
              <ResultBlock
                label="Coverage per ton"
                value={`${formatDecimal(estimate.coverageSqFtPerTon, 0)} sq ft`}
                hint={`At ${formatDecimal(thicknessInches, 1)} inches, one ton covers about this much.`}
              />
              <ResultBlock
                label="Waste added"
                value={`${wastePercent}%`}
                hint="The estimate adds this buffer before converting to tons."
              />
            </div>
          )}

          {mode === "asphalt" && (
            <div className="grid gap-3">
              <ResultBlock
                label="Asphalt needed"
                value={`${formatDecimal(estimate.tons)} tons`}
                hint="A quick tonnage number for quotes and ordering."
              />
              <ResultBlock
                label="Material cost"
                value={rangeLabel(estimate.materialLow, estimate.materialHigh)}
                hint={`About ${formatCurrency(estimate.materialPerSqFtLow)} - ${formatCurrency(estimate.materialPerSqFtHigh)} per sq ft.`}
              />
              <ResultBlock
                label="Installed cost"
                value={rangeLabel(estimate.installedLow, estimate.installedHigh)}
                hint={`About ${formatCurrency(estimate.installedPerSqFtLow)} - ${formatCurrency(estimate.installedPerSqFtHigh)} per sq ft.`}
              />
            </div>
          )}

          {mode === "comparison" && (
            <div className="grid gap-3">
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

          {mode === "driveway" && (
            <div className="grid gap-3">
              <ResultBlock
                label="Asphalt installed"
                value={rangeLabel(comparison.asphalt.installedLow, comparison.asphalt.installedHigh)}
                hint="Best fit for a standard driveway estimate."
              />
              <ResultBlock
                label="Concrete installed"
                value={rangeLabel(comparison.concrete.low, comparison.concrete.high)}
                hint="Good for a side-by-side cost check."
              />
              <ResultBlock
                label="Gravel installed"
                value={rangeLabel(comparison.gravel.low, comparison.gravel.high)}
                hint="A lower-cost alternative for rough planning."
              />
            </div>
          )}

          <div className="rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-300">
            <div className="flex items-center gap-2 font-medium text-white">
              <TriangleAlert className="h-4 w-4 text-amber-300" />
              Estimate only
            </div>
            <p className="mt-2">
              Final pricing depends on access, prep work, base condition, grading, haul distance, and local crew rates.
            </p>
          </div>

          <div className="text-xs leading-5 text-zinc-400">
            Area: {formatDecimal(areaSqFt, 0)} sq ft · Thickness: {formatDecimal(thicknessInches, 1)} in · Waste: {wastePercent}%
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
