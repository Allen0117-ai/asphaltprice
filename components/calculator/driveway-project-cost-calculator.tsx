"use client";

import { useMemo, useState } from "react";

import { Calculator, CircleDollarSign, Layers3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { computeDrivewayProjectCost } from "@/lib/calculator/specialty-formulas";
import { formatCurrency, formatDecimal } from "@/lib/calculator/formulas";

type DrivewayProjectMode = "replacement" | "resurfacing";

const modeSettings = {
  replacement: {
    title: "Driveway replacement estimate",
    intro: "Include removal, damaged-base repair, and new paving in one transparent planning total.",
    preparationLabel: "Removal and disposal ($/sq ft)",
    pavingLabel: "New asphalt paving ($/sq ft)",
    defaultDepth: 3,
    defaultPreparationRate: 1.75,
    defaultPavingRate: 5.5,
    defaultRepairPercent: 20,
    defaultRepairRate: 3
  },
  resurfacing: {
    title: "Driveway resurfacing estimate",
    intro: "Estimate preparation, localized repair, and a new asphalt overlay without pricing a full tear-out.",
    preparationLabel: "Prep or light milling ($/sq ft)",
    pavingLabel: "Overlay paving ($/sq ft)",
    defaultDepth: 1.5,
    defaultPreparationRate: 0.75,
    defaultPavingRate: 3.25,
    defaultRepairPercent: 10,
    defaultRepairRate: 2.5
  }
} as const;

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

export function DrivewayProjectCostCalculator({ mode }: { mode: DrivewayProjectMode }) {
  const settings = modeSettings[mode];
  const [lengthFt, setLengthFt] = useState(50);
  const [widthFt, setWidthFt] = useState(12);
  const [depthInches, setDepthInches] = useState<number>(settings.defaultDepth);
  const [preparationRate, setPreparationRate] = useState<number>(settings.defaultPreparationRate);
  const [pavingRate, setPavingRate] = useState<number>(settings.defaultPavingRate);
  const [repairPercent, setRepairPercent] = useState<number>(settings.defaultRepairPercent);
  const [repairRate, setRepairRate] = useState<number>(settings.defaultRepairRate);
  const [fixedCosts, setFixedCosts] = useState(0);

  const estimate = useMemo(
    () =>
      computeDrivewayProjectCost({
        areaSqFt: lengthFt * widthFt,
        depthInches,
        preparationRatePerSqFt: preparationRate,
        pavingRatePerSqFt: pavingRate,
        repairAreaPercent: repairPercent,
        repairRatePerSqFt: repairRate,
        fixedCosts
      }),
    [depthInches, fixedCosts, lengthFt, pavingRate, preparationRate, repairPercent, repairRate, widthFt]
  );

  return (
    <section id="calculator" className="scroll-mt-24 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <Card className="relative overflow-hidden border-zinc-200 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-5 pt-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              <Calculator className="h-3.5 w-3.5" />
              Project inputs
            </div>
            <p className="mt-2.5 max-w-xl text-sm leading-6 text-zinc-500">{settings.intro}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${mode}-length`}>Driveway length (ft)</Label>
              <Input id={`${mode}-length`} type="number" min={0} step="any" value={lengthFt} onChange={(event) => setLengthFt(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-width`}>Driveway width (ft)</Label>
              <Input id={`${mode}-width`} type="number" min={0} step="any" value={widthFt} onChange={(event) => setWidthFt(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-depth`}>Compacted asphalt depth (in)</Label>
              <Input id={`${mode}-depth`} type="number" min={0.5} step={0.25} value={depthInches} onChange={(event) => setDepthInches(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-preparation`}>{settings.preparationLabel}</Label>
              <Input id={`${mode}-preparation`} type="number" min={0} step={0.05} value={preparationRate} onChange={(event) => setPreparationRate(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-paving`}>{settings.pavingLabel}</Label>
              <Input id={`${mode}-paving`} type="number" min={0} step={0.05} value={pavingRate} onChange={(event) => setPavingRate(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-repair-percent`}>Area needing base or spot repair (%)</Label>
              <Input id={`${mode}-repair-percent`} type="number" min={0} max={100} step={1} value={repairPercent} onChange={(event) => setRepairPercent(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-repair-rate`}>Repair rate ($/sq ft repaired)</Label>
              <Input id={`${mode}-repair-rate`} type="number" min={0} step={0.05} value={repairRate} onChange={(event) => setRepairRate(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-fixed`}>Permits or fixed costs ($)</Label>
              <Input id={`${mode}-fixed`} type="number" min={0} step={25} value={fixedCosts} onChange={(event) => setFixedCosts(numberFromInput(event.target.value))} />
            </div>
          </div>

          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
            The prefilled rates are examples, not current local prices. Replace them with rates from written contractor quotes whenever possible.
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-zinc-950 bg-zinc-950 shadow-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Planning result</p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{settings.title}</h2>
            </div>
            <CircleDollarSign className="h-5 w-5 text-amber-300" />
          </div>

          <div aria-live="polite" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
            <p className="text-sm text-amber-100">Estimated total</p>
            <p className="mt-1 text-3xl font-semibold text-white">{formatCurrency(estimate.subtotal)}</p>
            <p className="mt-1 text-sm text-zinc-300">
              Planning range {formatCurrency(estimate.planningLow)}–{formatCurrency(estimate.planningHigh)}
            </p>
          </div>

          <div>
            <ResultRow label="Project area" value={`${formatDecimal(estimate.areaSqFt, 0)} sq ft`} />
            <ResultRow label="Preparation / removal" value={formatCurrency(estimate.preparationCost)} />
            <ResultRow label="Base or spot repair" value={formatCurrency(estimate.repairCost)} />
            <ResultRow label="Asphalt paving" value={formatCurrency(estimate.pavingCost)} />
            <ResultRow label="Estimated asphalt" value={`${formatDecimal(estimate.asphaltTons, 1)} tons`} />
            <ResultRow label="Average cost" value={`${formatCurrency(estimate.costPerSqFt)} / sq ft`} />
          </div>

          <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-300">
            <Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            A sound base is essential. If widespread movement, drainage failure, or deep settlement exists, a site inspection can change the scope substantially.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
