import type { ReactNode } from "react";

export function DirectAnswer({ question, children }: { question: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6" aria-labelledby="direct-answer-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">Direct answer</p>
      <h2 id="direct-answer-heading" className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
        {question}
      </h2>
      <div className="mt-3 max-w-4xl text-sm leading-7 text-zinc-700">{children}</div>
    </section>
  );
}
