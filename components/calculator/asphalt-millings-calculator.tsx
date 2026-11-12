"use client";

import { useMemo, useState } from "react";

import { Calculator, Recycle, Scale } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDecimal } from "@/lib/calculator/formulas";
import { computeMillingsEstimate } from "@/lib/calculator/specialty-formulas";

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
  const [pricePerTon, setPricePerTon] = useState("");

  const estimate = useMemo(
    () =>
      computeMillingsEstimate({
        areaSqFt: lengthFt * widthFt,
        depthInches,
        densityLbPerCubicFt: density,
        wastePercent,
        pricePerTon: numberFromInput(pricePerTon)
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
              <Label htmlFor="millings-density">Compacted density (lb/ft³)</Label>
              <Input id="millings-density" type="number" min={1} step="any" value={density} onChange={(event) => setDensity(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-waste">Extra material allowance (%)</Label>
              <Input id="millings-waste" type="number" min={0} max={30} step={1} value={wastePercent} onChange={(event) => setWastePercent(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="millings-price">Local material price ($/ton, optional)</Label>
              <Input id="millings-price" type="number" min={0} step={1} placeholder="Enter a local price" value={pricePerTon} onChange={(event) => setPricePerTon(event.target.value)} />
            </div>
          </div>

          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
            Use a density for the compacted material, matching the finished depth above. The default is a planning assumption. <a href="https://www.fhwa.dot.gov/publications/research/infrastructure/structures/97148/rap135.cfm" className="font-medium text-amber-800 underline underline-offset-4">FHWA describes compacted RAP density in fill applications</a>; actual material and use vary. Ask your supplier for a suitable compacted density; loose stockpile density cannot be used directly with compacted volume.
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

          {lengthFt > 0 && widthFt > 0 && depthInches > 0 && density > 0 && wastePercent >= 0 && wastePercent <= 30 ? (
          <>
          <div aria-live="polite" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
            <p className="text-sm text-amber-100">Estimated order quantity</p>
            <p className="mt-1 text-3xl font-semibold text-white">{formatDecimal(estimate.tons, 1)} tons</p>
            <p className="mt-1 text-sm text-zinc-300">Includes your extra material allowance; confirm the order weight with your supplier.</p>
          </div>

          <div>
            <ResultRow label="Project area" value={`${formatDecimal(estimate.areaSqFt, 0)} sq ft`} />
            <ResultRow label="Finished compacted volume" value={`${formatDecimal(estimate.compactedCubicFeet / 27, 1)} yd³`} />
            <ResultRow label="Material weight" value={`${formatDecimal(estimate.tons, 1)} tons`} />
            <ResultRow label="Material cost" value={pricePerTon !== "" && Number(pricePerTon) > 0 ? formatCurrency(estimate.estimatedMaterialCost) : "Enter a local price"} />
            <ResultRow label="Coverage per ton" value={`${formatDecimal(estimate.coverageSqFtPerTon, 0)} sq ft`} />
          </div>

          </>
          ) : (
            <p aria-live="polite" className="rounded-lg bg-white/5 p-4 text-sm text-zinc-300">Enter positive dimensions and compacted density, and an allowance from 0 to 30%.</p>
          )}

          <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-300">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            Finished volume is not loose truck volume. Ask the supplier for delivered volume, truck capacity, minimum loads, and delivery fees. The allowance is extra material, not a loose-volume conversion; avoid adding compaction twice.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
