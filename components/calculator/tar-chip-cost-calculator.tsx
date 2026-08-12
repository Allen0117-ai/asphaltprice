"use client";

import { useMemo, useState } from "react";

import { Calculator } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function parseNonNegativeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function TarChipCostCalculator() {
  const [area, setArea] = useState("1000");
  const [quotedRate, setQuotedRate] = useState("");
  const [separatePrepCost, setSeparatePrepCost] = useState("0");

  const estimate = useMemo(() => {
    const areaSqFt = parseNonNegativeNumber(area);
    const pricePerSqFt = parseNonNegativeNumber(quotedRate);
    const prepCost = parseNonNegativeNumber(separatePrepCost);
    return {
      surfaceCost: areaSqFt * pricePerSqFt,
      totalCost: areaSqFt * pricePerSqFt + prepCost,
      ready: areaSqFt > 0 && pricePerSqFt > 0
    };
  }, [area, quotedRate, separatePrepCost]);

  return (
    <Card className="border-zinc-300 shadow-sm">
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950 text-white">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">Tar and chip quote calculator</h2>
            <p className="text-sm text-zinc-600">Use a local written rate; this tool does not invent a default price.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="tar-chip-area">Driveway area (sq ft)</Label>
            <Input
              id="tar-chip-area"
              type="number"
              min="0"
              inputMode="decimal"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tar-chip-rate">Quoted price per sq ft</Label>
            <Input
              id="tar-chip-rate"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="Enter a local quote"
              value={quotedRate}
              onChange={(event) => setQuotedRate(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tar-chip-prep">Separate prep cost</Label>
            <Input
              id="tar-chip-prep"
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              value={separatePrepCost}
              onChange={(event) => setSeparatePrepCost(event.target.value)}
            />
          </div>
        </div>

        <div className="rounded-xl bg-zinc-950 p-5 text-white" aria-live="polite">
          {estimate.ready ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Surface quote</p>
                <p className="mt-2 text-2xl font-semibold">{currencyFormatter.format(estimate.surfaceCost)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">With separate prep</p>
                <p className="mt-2 text-2xl font-semibold text-amber-300">{currencyFormatter.format(estimate.totalCost)}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-6 text-zinc-300">
              Enter the square-foot rate from a local contractor to calculate a transparent quote total.
            </p>
          )}
        </div>

        <p className="text-xs leading-5 text-zinc-500">
          Confirm whether the rate includes binder, stone, number of coats, rolling, base repair, grading, drainage,
          mobilization, tax, and cleanup.
        </p>
      </CardContent>
    </Card>
  );
}
