"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchPage = {
  href: Route;
  title: string;
  description: string;
  keywords: readonly string[];
};

type SearchResult = {
  page: SearchPage;
  index: number;
  score: number;
};

const searchPages: readonly SearchPage[] = [
  {
    href: "/" as Route,
    title: "Home",
    description: "Estimate asphalt tonnage, material cost, and installed cost.",
    keywords: ["calculator", "estimate", "coverage", "tonnage", "price"]
  },
  {
    href: "/asphalt-driveway-cost-calculator" as Route,
    title: "Asphalt driveway cost calculator",
    description: "Compare asphalt driveway pricing with tonnage and installed cost.",
    keywords: ["driveway", "calculator", "installed cost", "asphalt"]
  },
  {
    href: "/asphalt-tonnage-calculator" as Route,
    title: "Asphalt tonnage calculator",
    description: "See how many tons you need and how waste changes the order.",
    keywords: ["tons", "waste", "coverage", "material"]
  },
  {
    href: "/asphalt-vs-concrete-driveway-cost-calculator" as Route,
    title: "Asphalt vs concrete driveway cost calculator",
    description: "Compare asphalt, concrete, and gravel driveway costs.",
    keywords: ["compare", "concrete", "gravel", "driveway"]
  },
  {
    href: "/driveway-cost-calculator" as Route,
    title: "Driveway cost calculator",
    description: "Compare driveway costs for asphalt, concrete, and gravel.",
    keywords: ["driveway", "calculator", "compare", "gravel"]
  },
  {
    href: "/parking-lot-paving-cost-calculator" as Route,
    title: "Parking lot paving cost calculator",
    description: "Estimate asphalt parking lot cost with tonnage, thickness, and quote scope.",
    keywords: ["parking lot", "paving", "commercial", "asphalt"]
  },
  {
    href: "/blacktop-driveway-cost-estimator" as Route,
    title: "Blacktop driveway cost estimator",
    description: "Estimate blacktop driveway cost with area, thickness, and installed pricing.",
    keywords: ["blacktop", "driveway", "estimate", "asphalt"]
  },
  {
    href: "/tar-and-chip-driveway-cost-calculator" as Route,
    title: "Tar and chip driveway cost calculator",
    description: "Estimate tar and chip driveway cost by square footage and quote scope.",
    keywords: ["tar and chip", "chip seal", "driveway", "cost"]
  },
  {
    href: "/asphalt-cost-guide" as Route,
    title: "Asphalt cost guide",
    description: "Learn what changes an asphalt quote and the price it covers.",
    keywords: ["pricing", "guide", "quote", "cost"]
  },
  {
    href: "/asphalt-cost-per-square-foot" as Route,
    title: "Asphalt cost per square foot",
    description: "Connect square-foot paving prices with tonnage and installed quote scope.",
    keywords: ["square foot", "sq ft", "pricing", "asphalt"]
  },
  {
    href: "/hot-mix-asphalt-cost-per-ton" as Route,
    title: "Hot mix asphalt cost per ton",
    description: "Understand hot mix per-ton pricing, delivery, and installed quote differences.",
    keywords: ["hot mix", "per ton", "material", "price"]
  },
  {
    href: "/asphalt-contractor-guide" as Route,
    title: "Asphalt contractor guide",
    description: "Compare bids and spot red flags before you hire a contractor.",
    keywords: ["contractor", "bids", "red flags", "guide"]
  },
  {
    href: "/asphalt-prices-by-state" as Route,
    title: "Asphalt prices by state",
    description: "Check regional asphalt price bands and what moves them.",
    keywords: ["state", "regional", "price bands", "pricing"]
  },
  {
    href: "/how-much-asphalt-do-i-need" as Route,
    title: "How much asphalt do I need?",
    description: "Walk through area, thickness, waste, and order size.",
    keywords: ["order", "waste", "area", "thickness"]
  }
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(", ")
    )
  ).filter((element) => element.tabIndex >= 0);
}

type SiteSearchProps = {
  compact?: boolean;
};

export function SiteSearch({ compact = false }: SiteSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);

  const results = useMemo<SearchResult[]>(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return searchPages.map((page, index) => ({ page, index, score: 0 }));
    }

    return searchPages
      .map((page, index) => {
        const haystack = normalize([page.title, page.description, page.href, ...page.keywords].join(" "));

        if (!haystack.includes(normalizedQuery)) {
          return null;
        }

        const title = normalize(page.title);
        const score = title === normalizedQuery ? 0 : title.startsWith(normalizedQuery) ? 1 : 2;

        return { page, index, score };
      })
      .filter((item): item is SearchResult => item !== null)
      .sort((left, right) => left.score - right.score || left.index - right.index);
  }, [query]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      if (event.key === "Tab" && isOpenRef.current) {
        const dialog = dialogRef.current;
        if (!dialog) {
          return;
        }

        const focusableElements = getFocusableElements(dialog);
        if (!focusableElements.length) {
          event.preventDefault();
          return;
        }

        event.preventDefault();

        const activeElement = document.activeElement as HTMLElement | null;
        const currentIndex = activeElement ? focusableElements.indexOf(activeElement) : -1;
        const direction = event.shiftKey ? -1 : 1;
        const nextIndex = currentIndex === -1
          ? 0
          : (currentIndex + direction + focusableElements.length) % focusableElements.length;

        focusableElements[nextIndex]?.focus();
        return;
      }

      if (event.key === "Escape" && isOpenRef.current) {
        event.preventDefault();
        setIsOpen(false);
        setQuery("");
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
          compact ? "w-10 justify-center px-0 sm:w-auto sm:justify-start sm:px-3" : "w-full justify-start sm:w-auto"
        )}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open site search"
      >
        <Search className="h-4 w-4" />
        <span className={cn(compact && "hidden sm:inline")}>Search</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/30 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
          onClick={closeSearch}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            className="mx-auto flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="site-search-title" className="sr-only">
              Search pages
            </h2>

            <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-4">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  inputMode="search"
                  autoComplete="off"
                  spellCheck={false}
                  autoCorrect="off"
                  placeholder="Search pages"
                  aria-label="Search pages"
                  className="h-11 w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                />
              </div>

              <button
                type="button"
                onClick={closeSearch}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-3">
              <div className="grid gap-2">
                {results.length ? (
                  results.map(({ page }) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={closeSearch}
                      className="group flex items-start gap-3 rounded-lg border border-zinc-200/80 px-3 py-3 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                          <span className="min-w-0 flex-1 text-sm font-medium text-zinc-950">{page.title}</span>
                          <ArrowRight className="mt-0.5 h-4 w-4 flex-none text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-700" />
                        </div>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{page.description}</p>
                        <p className="mt-2 text-xs text-zinc-400">{page.href}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-zinc-200 px-4 py-10 text-center text-sm text-zinc-500">
                    No pages match your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
