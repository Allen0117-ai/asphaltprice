"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type StickySectionNavSection = {
  id: string;
  label: string;
};

type StickySectionNavProps = {
  sections: StickySectionNavSection[];
  title?: string;
  className?: string;
};

function normalizeSectionId(id: string) {
  return id.trim().replace(/^#/, "");
}

export function StickySectionNav({
  sections,
  title = "On this page",
  className
}: StickySectionNavProps) {
  const sectionIds = useMemo(() => sections.map((section) => normalizeSectionId(section.id)), [sections]);
  const [activeId, setActiveId] = useState(() => normalizeSectionId(sections[0]?.id ?? ""));

  useEffect(() => {
    if (!sectionIds.length) {
      setActiveId("");
      return;
    }

    const currentHash = normalizeSectionId(window.location.hash);
    const hasMatchingHash = sectionIds.includes(currentHash);

    setActiveId(hasMatchingHash ? currentHash : sectionIds[0]);
  }, [sectionIds]);

  useEffect(() => {
    if (!sectionIds.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) {
          return;
        }

        visibleEntries.sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        const nextActiveId = normalizeSectionId(visibleEntries[0].target.id);

        setActiveId(nextActiveId);
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0.1, 0.25, 0.5]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = normalizeSectionId(window.location.hash);

      if (nextHash && sectionIds.includes(nextHash)) {
        setActiveId(nextHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sectionIds]);

  if (!sections.length) {
    return null;
  }

  return (
    <nav aria-label={title} className={cn("sticky top-16 z-20", className)}>
      <div className="rounded-xl border border-zinc-200 bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
          <span>{title}</span>
        </div>

        <div className="mt-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden">
          <ol className="flex min-w-max gap-2 md:min-w-0 md:flex-wrap">
            {sections.map((section) => {
              const id = normalizeSectionId(section.id);
              const isActive = activeId === id;

              return (
                <li key={id} className="shrink-0">
                  <a
                    href={`#${id}`}
                    onClick={() => setActiveId(id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      isActive
                        ? "border-amber-300 bg-amber-50 text-amber-950"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors",
                        isActive ? "bg-amber-500" : "bg-zinc-300"
                      )}
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
