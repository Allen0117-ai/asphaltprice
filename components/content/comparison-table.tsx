import * as React from "react";

import { cn } from "@/lib/utils";

export type ComparisonTableColumn = {
  key: string;
  label: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
};

export type ComparisonTableRow = {
  id?: string;
  label: React.ReactNode;
  note?: React.ReactNode;
  cells: Record<string, React.ReactNode>;
  className?: string;
};

export type ComparisonTableProps = {
  caption?: React.ReactNode;
  note?: React.ReactNode;
  rowLabel?: React.ReactNode;
  columns: readonly ComparisonTableColumn[];
  rows: readonly ComparisonTableRow[];
  className?: string;
};

function alignClass(align?: ComparisonTableColumn["align"]) {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

function renderValue(value: React.ReactNode) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-zinc-400">—</span>;
  }

  return value;
}

export function ComparisonTable({ caption, note, rowLabel = "Item", columns, rows, className }: ComparisonTableProps) {
  return (
    <figure className={cn("overflow-hidden rounded-lg border border-zinc-200 bg-white", className)}>
      {caption ? (
        <figcaption className="border-b border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm font-medium text-zinc-950 sm:px-5">
          {caption}
        </figcaption>
      ) : null}

      <div className="md:hidden">
        {rows.map((row, rowIndex) => (
          <div
            key={row.id ?? rowIndex}
            className={cn("px-4 py-4 sm:px-5", rowIndex > 0 && "border-t border-zinc-200", row.className)}
          >
            <div className="space-y-1">
              <div className="text-sm font-medium leading-6 text-zinc-950">{row.label}</div>
              {row.note ? <div className="text-xs leading-5 text-zinc-500">{row.note}</div> : null}
            </div>

            <dl className="mt-3 space-y-2">
              {columns.map((column) => (
                <div key={column.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 text-sm">
                  <dt className="min-w-0 leading-6 text-zinc-500">{column.label}</dt>
                  <dd className={cn("leading-6 text-zinc-700", alignClass(column.align), column.className)}>
                    {renderValue(row.cells[column.key])}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-zinc-50/80">
              <tr>
                <th
                  scope="col"
                  className="border-b border-zinc-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-5"
                >
                  {rowLabel}
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      "border-b border-zinc-200 px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-5",
                      alignClass(column.align),
                      column.headerClassName
                    )}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {rows.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex} className={row.className}>
                  <th scope="row" className="px-4 py-4 text-left align-top sm:px-5">
                    <div className="font-medium leading-6 text-zinc-950">{row.label}</div>
                    {row.note ? <div className="mt-1 text-xs leading-5 text-zinc-500">{row.note}</div> : null}
                  </th>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-4 align-top leading-6 text-zinc-700 sm:px-5",
                        alignClass(column.align),
                        column.className
                      )}
                    >
                      {renderValue(row.cells[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {note ? <div className="border-t border-zinc-200 px-4 py-3 text-sm leading-6 text-zinc-500 sm:px-5">{note}</div> : null}
    </figure>
  );
}
