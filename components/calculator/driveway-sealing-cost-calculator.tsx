"use client";

import { useMemo, useState } from "react";

import { Calculator, Droplets, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDecimal } from "@/lib/calculator/formulas";
import { computeSealingCost } from "@/lib/calculator/specialty-formulas";

const conditionOptions = [
  { value: 1, label: "Good — cleaning only" },
  { value: 1.15, label: "Weathered — extra preparation" },
  { value: 1.35, label: "Cracked — heavier preparation" }
] as const;

function numberFromInput(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 last:border-0">
      <span className="text-sm text-zinc-300">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function DrivewaySealingCostCalculator() {
  const [lengthFt, setLengthFt] = useState(40);
  const [widthFt, setWidthFt] = useState(16);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(100);
  const [materialPrice, setMaterialPrice] = useState(28);
  const [laborRate, setLaborRate] = useState(0.22);
  const [preparationRate, setPreparationRate] = useState(0.12);
  const [crackRepairAllowance, setCrackRepairAllowance] = useState(100);
  const [conditionMultiplier, setConditionMultiplier] = useState(1.15);
  const [wastePercent, setWastePercent] = useState(10);

  const estimate = useMemo(
    () =>
      computeSealingCost({
        areaSqFt: lengthFt * widthFt,
        coats,
        coverageSqFtPerGallon: coverage,
        materialPricePerGallon: materialPrice,
        laborRatePerSqFtPerCoat: laborRate,
        preparationRatePerSqFt: preparationRate,
        crackRepairAllowance,
        conditionMultiplier,
        wastePercent
      }),
    [coats, conditionMultiplier, coverage, crackRepairAllowance, laborRate, lengthFt, materialPrice, preparationRate, wastePercent, widthFt]
  );

  return (
    <section id="calculator" className="scroll-mt-24 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <Card className="relative overflow-hidden border-zinc-200 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-5 pt-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              <Calculator className="h-3.5 w-3.5" />
              Sealing inputs
            </div>
            <p className="mt-2.5 max-w-xl text-sm leading-6 text-zinc-500">
              Estimate sealer gallons, preparation, labor, and crack-repair allowance using rates you can replace with local prices.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sealing-length">Driveway length (ft)</Label>
              <Input id="sealing-length" type="number" min={0} value={lengthFt} onChange={(event) => setLengthFt(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-width">Driveway width (ft)</Label>
              <Input id="sealing-width" type="number" min={0} value={widthFt} onChange={(event) => setWidthFt(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-condition">Surface condition</Label>
              <select id="sealing-condition" value={conditionMultiplier} onChange={(event) => setConditionMultiplier(numberFromInput(event.target.value))} className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-zinc-950">
                {conditionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-coats">Number of coats</Label>
              <select id="sealing-coats" value={coats} onChange={(event) => setCoats(numberFromInput(event.target.value))} className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-zinc-950">
                <option value={1}>1 coat</option>
                <option value={2}>2 coats</option>
                <option value={3}>3 coats</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-coverage">Product coverage (sq ft/gal/coat)</Label>
              <Input id="sealing-coverage" type="number" min={1} step={5} value={coverage} onChange={(event) => setCoverage(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-material">Sealer price ($/gal)</Label>
              <Input id="sealing-material" type="number" min={0} step={1} value={materialPrice} onChange={(event) => setMaterialPrice(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-labor">Application labor ($/sq ft/coat)</Label>
              <Input id="sealing-labor" type="number" min={0} step={0.01} value={laborRate} onChange={(event) => setLaborRate(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-prep">Cleaning and prep ($/sq ft)</Label>
              <Input id="sealing-prep" type="number" min={0} step={0.01} value={preparationRate} onChange={(event) => setPreparationRate(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-cracks">Crack repair allowance ($)</Label>
              <Input id="sealing-cracks" type="number" min={0} step={25} value={crackRepairAllowance} onChange={(event) => setCrackRepairAllowance(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sealing-waste">Material waste (%)</Label>
              <Input id="sealing-waste" type="number" min={0} max={30} step={1} value={wastePercent} onChange={(event) => setWastePercent(numberFromInput(event.target.value))} />
            </div>
          </div>

          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
            Check the product label for the real coverage rate. Surface texture, dilution rules, and coat thickness can change gallons needed.
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-zinc-950 bg-zinc-950 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Planning result</p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Driveway sealing estimate</h2>
            </div>
            <Droplets className="h-5 w-5 text-amber-300" />
          </div>

          <div aria-live="polite" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
            <p className="text-sm text-amber-100">Estimated total</p>
            <p className="mt-1 text-3xl font-semibold text-white">{formatCurrency(estimate.subtotal)}</p>
            <p className="mt-1 text-sm text-zinc-300">Planning range {formatCurrency(estimate.planningLow)}–{formatCurrency(estimate.planningHigh)}</p>
          </div>

          <div>
            <ResultRow label="Driveway area" value={`${formatDecimal(estimate.areaSqFt, 0)} sq ft`} />
            <ResultRow label="Sealer needed" value={`${formatDecimal(estimate.gallons, 1)} gal`} />
            <ResultRow label="Sealer material" value={formatCurrency(estimate.materialCost)} />
            <ResultRow label="Cleaning and prep" value={formatCurrency(estimate.preparationCost)} />
            <ResultRow label="Application labor" value={formatCurrency(estimate.laborCost)} />
            <ResultRow label="Crack repair allowance" value={formatCurrency(estimate.crackRepairCost)} />
            <ResultRow label="Average cost" value={`${formatCurrency(estimate.costPerSqFt)} / sq ft`} />
          </div>

          <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-300">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            Sealcoating protects an otherwise serviceable surface. Structural failure, potholes, or widespread movement normally need repair before sealing.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
