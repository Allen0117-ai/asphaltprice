"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type FaqAccordionItem = {
  id?: string;
  question: React.ReactNode;
  answer: React.ReactNode;
};

export type FaqAccordionProps = {
  items: ReadonlyArray<FaqAccordionItem>;
  defaultOpenIndex?: number;
  className?: string;
  itemClassName?: string;
  buttonClassName?: string;
  answerClassName?: string;
};

function getInitialOpenIndex(itemsLength: number, defaultOpenIndex?: number) {
  if (typeof defaultOpenIndex !== "number") {
    return null;
  }

  if (defaultOpenIndex < 0 || defaultOpenIndex >= itemsLength) {
    return null;
  }

  return defaultOpenIndex;
}

export function FaqAccordion({
  items,
  defaultOpenIndex,
  className,
  itemClassName,
  buttonClassName,
  answerClassName
}: FaqAccordionProps) {
  const id = React.useId();
  const [openIndex, setOpenIndex] = React.useState<number | null>(() =>
    getInitialOpenIndex(items.length, defaultOpenIndex)
  );

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn("rounded-2xl border border-zinc-200 bg-white shadow-sm", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${id}-faq-trigger-${index}`;
        const panelId = `${id}-faq-panel-${index}`;

        return (
          <div
            key={item.id ?? index}
            className={cn(
              "border-b border-zinc-200 transition-colors first:rounded-t-2xl last:rounded-b-2xl last:border-b-0",
              isOpen && "bg-zinc-50/70",
              itemClassName
            )}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-5 sm:py-5",
                buttonClassName
              )}
            >
              <span className="min-w-0 flex-1 text-base font-medium leading-6 text-zinc-950">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200",
                  isOpen && "rotate-180 text-zinc-950"
                )}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn(
                "grid overflow-hidden transition-all duration-200 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={cn(
                    "px-4 pb-4 pr-10 text-sm leading-6 text-zinc-600 sm:px-5 sm:pb-5",
                    answerClassName
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
