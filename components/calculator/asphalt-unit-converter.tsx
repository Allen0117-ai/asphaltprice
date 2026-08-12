"use client";

import { useMemo, useState } from "react";

import { Scale } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDecimal } from "@/lib/calculator/formulas";
import { computeAsphaltConversions } from "@/lib/calculator/specialty-formulas";

function numberFromInput(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function AsphaltUnitConverter() {
  const [cubicYards, setCubicYards] = useState(1);
  const [squareYards, setSquareYards] = useState(100);
  const [depthInches, setDepthInches] = useState(2);
  const [density, setDensity] = useState(145);
  const conversion = useMemo(
    () => computeAsphaltConversions({ cubicYards, squareYards, depthInches, densityLbPerCubicFt: density }),
    [cubicYards, density, depthInches, squareYards]
  );

  return (
    <section id="weight" className="scroll-mt-24 space-y-5">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
          <Scale className="h-4 w-4" />
          Density and unit converter
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">Asphalt weight per cubic yard and square yards to tons</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Change the density if your plant or mix design provides a better value. The default 145 lb/ft³ is only a planning assumption.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <Card className="border-zinc-200">
          <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="conversion-density">Asphalt density (lb/ft³)</Label>
              <Input id="conversion-density" type="number" min={1} step={1} value={density} onChange={(event) => setDensity(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conversion-cubic-yards">Cubic yards</Label>
              <Input id="conversion-cubic-yards" type="number" min={0} step="any" value={cubicYards} onChange={(event) => setCubicYards(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conversion-square-yards">Square yards</Label>
              <Input id="conversion-square-yards" type="number" min={0} step="any" value={squareYards} onChange={(event) => setSquareYards(numberFromInput(event.target.value))} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="conversion-depth">Depth for square-yards conversion (in)</Label>
              <Input id="conversion-depth" type="number" min={0.25} step={0.25} value={depthInches} onChange={(event) => setDepthInches(numberFromInput(event.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-950 bg-zinc-950 text-white">
          <CardContent className="space-y-4 pt-6" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Conversion results</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-sm text-zinc-300">Weight per cubic yard</p>
                <p className="mt-1 text-xl font-semibold">{formatDecimal(conversion.poundsPerCubicYard, 0)} lb</p>
                <p className="mt-1 text-sm text-zinc-400">{formatDecimal(conversion.tonsPerCubicYard, 2)} tons/yd³</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-sm text-zinc-300">Cubic yards entered</p>
                <p className="mt-1 text-xl font-semibold">{formatDecimal(conversion.tonsFromCubicYards, 2)} tons</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-zinc-300">Square yards entered</p>
                <p className="mt-1 text-xl font-semibold">{formatDecimal(conversion.tonsFromSquareYards, 2)} tons</p>
                <p className="mt-1 text-sm text-zinc-400">At {formatDecimal(depthInches, 2)} in compacted depth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
