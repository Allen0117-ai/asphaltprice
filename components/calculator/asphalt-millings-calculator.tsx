"use client";

import { useMemo, useState } from "react";

import { Calculator, Recycle, Scale } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDecimal } from "@/lib/calculator/formulas";
import { computeMillingsEstimate } from "@/lib/calculator/specialty-formulas";

const densityOptions = [
  { value: 105, label: "Loose millings — 105 lb/ft³" },
  { value: 120, label: "Typical planning value — 120 lb/ft³" },
  { value: 135, label: "Well compacted — 135 lb/ft³" }
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

export function AsphaltMillingsCalculator() {
  const [lengthFt, setLengthFt] = useState(100);
  const [widthFt, setWidthFt] = useState(12);
  const [depthInches, setDepthInches] = useState(4);
  const [density, setDensity] = useState(120);
  const [wastePercent, setWastePercent] = useState(10);
  const [pricePerTon, setPricePerTon] = useState(25);

  const estimate = useMemo(
    () =>
      computeMillingsEstimate({
        areaSqFt: lengthFt * widthFt,
        depthInches,
        densityLbPerCubicFt: density,
        wastePercent,
        pricePerTon
      }),
    [density, depthInches, lengthFt, pricePerTon, wastePercent, widthFt]
  );

  return (
    <section id="calculator" className="scroll-mt-24 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <Card className="relative overflow-hidden border-zinc-200 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-5 pt-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              <Calculator className="h-3.5 w-3.5" />
              RAP quantity inputs
            </div>
            <p className="mt-2.5 max-w-xl text-sm leading-6 text-zinc-500">
              Estimate tons, cubic yards, coverage, and material cost for asphalt millings or reclaimed asphalt pavement (RAP).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="millings-length">Project length (ft)</Label>
              <Input id="millings-length" type="number" min={0} step="any" value={lengthFt} onChange={(event) => setLengthFt(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-width">Project width (ft)</Label>
              <Input id="millings-width" type="number" min={0} step="any" value={widthFt} onChange={(event) => setWidthFt(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-depth">Compacted depth (in)</Label>
              <Input id="millings-depth" type="number" min={0.5} step={0.5} value={depthInches} onChange={(event) => setDepthInches(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-density">Millings density</Label>
              <select id="millings-density" value={density} onChange={(event) => setDensity(numberFromInput(event.target.value))} className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-zinc-950">
                {densityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-waste">Compaction and waste allowance (%)</Label>
              <Input id="millings-waste" type="number" min={0} max={30} step={1} value={wastePercent} onChange={(event) => setWastePercent(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-price">Local price ($/ton)</Label>
              <Input id="millings-price" type="number" min={0} step={1} value={pricePerTon} onChange={(event) => setPricePerTon(numberFromInput(event.target.value))} />
            </div>
          </div>

          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
            Millings density changes with gradation, moisture, and compaction. Ask the supplier for a scale-ticket or bulk-density value before placing a final order.
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-zinc-950 bg-zinc-950 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Quantity result</p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Asphalt millings needed</h2>
            </div>
            <Recycle className="h-5 w-5 text-amber-300" />
          </div>

          <div aria-live="polite" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
            <p className="text-sm text-amber-100">Estimated order quantity</p>
            <p className="mt-1 text-3xl font-semibold text-white">{formatDecimal(estimate.tons, 1)} tons</p>
            <p className="mt-1 text-sm text-zinc-300">About {formatDecimal(estimate.cubicYards, 1)} cubic yards including allowance</p>
          </div>

          <div>
            <ResultRow label="Project area" value={`${formatDecimal(estimate.areaSqFt, 0)} sq ft`} />
            <ResultRow label="Order volume" value={`${formatDecimal(estimate.cubicYards, 1)} yd³`} />
            <ResultRow label="Material weight" value={`${formatDecimal(estimate.tons, 1)} tons`} />
            <ResultRow label="Material cost" value={formatCurrency(estimate.estimatedMaterialCost)} />
            <ResultRow label="Coverage per ton" value={`${formatDecimal(estimate.coverageSqFtPerTon, 0)} sq ft`} />
          </div>

          <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-300">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            Confirm delivered weight and truck capacity with the supplier. The calculator estimates material quantity; it does not design the base or guarantee surface performance.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
