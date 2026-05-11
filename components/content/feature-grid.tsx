import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Compass,
  FileQuestion,
  Grid2x2,
  Hammer,
  Home,
  Info,
  Layers3,
  Lightbulb,
  ListChecks,
  MapPinned,
  PackageCheck,
  Ruler,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Truck,
  Wrench
} from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureGridIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const featureGridIcons = {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Compass,
  FileQuestion,
  Grid2x2,
  Hammer,
  Home,
  Info,
  Layers3,
  Lightbulb,
  ListChecks,
  MapPinned,
  PackageCheck,
  Ruler,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Truck,
  Wrench
} as const;

export type FeatureGridIconName = keyof typeof featureGridIcons;

export type FeatureGridItem = {
  title: ReactNode;
  text: ReactNode;
  href?: Route;
  icon?: FeatureGridIcon;
  iconName?: FeatureGridIconName;
  ctaLabel?: string;
};

export type FeatureGridProps = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  items: ReadonlyArray<FeatureGridItem>;
  columns?: 2 | 3 | 4;
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
  ctaLabel?: string;
};

function resolveIcon(item: FeatureGridItem) {
  if (item.icon) {
    return item.icon;
  }

  if (item.iconName) {
    return featureGridIcons[item.iconName];
  }

  return null;
}

function getGridClasses(columns: NonNullable<FeatureGridProps["columns"]>) {
  if (columns === 2) {
    return "sm:grid-cols-2";
  }

  if (columns === 4) {
    return "sm:grid-cols-2 xl:grid-cols-4";
  }

  return "sm:grid-cols-2 lg:grid-cols-3";
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  className,
  gridClassName,
  itemClassName,
  ctaLabel = "Open"
}: FeatureGridProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {(eyebrow || title || description) && (
        <div className="max-w-3xl space-y-2">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">{eyebrow}</p>
          ) : null}
          {title ? <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">{title}</h2> : null}
          {description ? <p className="text-sm leading-7 text-zinc-600">{description}</p> : null}
        </div>
      )}

      <div className={cn("grid gap-4", getGridClasses(columns), gridClassName)}>
        {items.map((item, index) => {
          const Icon = resolveIcon(item);
          if (!item.href) {
            return (
              <Card
                key={index}
                className={cn(
                  "group flex min-h-[280px] h-full flex-col border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-50/80 sm:min-h-[300px]",
                  itemClassName
                )}
              >
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex flex-1 items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700">
                      {Icon ? <Icon className="h-4 w-4" /> : <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                    </span>

                    <div className="min-w-0 space-y-1">
                      <p className="text-base font-medium text-zinc-950">{item.title}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }

          return (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              className="block h-full rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Card
                className={cn(
                  "group flex min-h-[280px] h-full flex-col border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-50/80 sm:min-h-[300px]",
                  itemClassName
                )}
              >
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex flex-1 items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700">
                      {Icon ? <Icon className="h-4 w-4" /> : <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                    </span>

                    <div className="min-w-0 space-y-1">
                      <p className="text-base font-medium text-zinc-950">{item.title}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.text}</p>
                    </div>
                  </div>

                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-amber-700">
                    {item.ctaLabel ?? ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const BentoGrid = FeatureGrid;
