"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type RangeFieldProps = {
  id: string;
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number) => void;
  renderValue?: (value: number) => React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  sliderClassName?: string;
  disabled?: boolean;
};

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function RangeField({
  id,
  label,
  value,
  min,
  max,
  step,
  onValueChange,
  renderValue,
  description,
  className,
  inputClassName,
  sliderClassName,
  disabled
}: RangeFieldProps) {
  const [draftValue, setDraftValue] = React.useState(String(value));
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;

  React.useEffect(() => {
    setDraftValue(String(value));
  }, [value]);

  const commitValue = (nextValue: number) => {
    if (!Number.isFinite(nextValue)) {
      return;
    }

    onValueChange(clampValue(nextValue, min, max));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDraftValue = event.target.value;
    setDraftValue(nextDraftValue);

    if (nextDraftValue.trim() === "") {
      return;
    }

    commitValue(Number(nextDraftValue));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label id={labelId} htmlFor={id}>
          {label}
        </Label>
        <span className="text-sm font-medium tabular-nums text-zinc-600">
          {renderValue ? renderValue(value) : value}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_7.5rem] sm:items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          onChange={(event) => commitValue(Number(event.target.value))}
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-amber-500 outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
            sliderClassName
          )}
        />
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          inputMode="decimal"
          value={draftValue}
          disabled={disabled}
          aria-describedby={descriptionId}
          onChange={handleNumberChange}
          onBlur={() => setDraftValue(String(value))}
          className={cn("w-full tabular-nums", inputClassName)}
        />
      </div>

      {description ? (
        <p id={descriptionId} className="text-xs text-zinc-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}
