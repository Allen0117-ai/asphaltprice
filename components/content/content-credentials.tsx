import Link from "next/link";

import { CalendarDays, FileCheck2 } from "lucide-react";

import { editorialTeam, formatContentDate, getContentDates } from "@/lib/content-meta";

export function ContentCredentials({ path }: { path: string }) {
  const dates = getContentDates(path);

  return (
    <aside className="rounded-xl border border-zinc-200 bg-zinc-50 p-4" aria-label="Content review information">
      <div className="flex flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p>
            Written and reviewed by{" "}
            <Link href="/about" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4">
              {editorialTeam.name}
            </Link>
            . See our{" "}
            <Link href="/methodology" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4">
              data and methodology
            </Link>
            .
          </p>
        </div>
        <p className="flex shrink-0 items-center gap-2">
          <CalendarDays className="h-4 w-4 text-amber-700" />
          Last reviewed {formatContentDate(dates.modifiedAt)}
        </p>
      </div>
    </aside>
  );
}
