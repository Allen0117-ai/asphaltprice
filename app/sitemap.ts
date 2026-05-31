import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const routes = [
  "/",
  "/asphalt-contractor-guide",
  "/asphalt-cost-calculator",
  "/asphalt-driveway-cost-calculator",
  "/asphalt-driveway-estimate",
  "/asphalt-tonnage-calculator",
  "/asphalt-vs-concrete-driveway-cost-calculator",
  "/driveway-cost-calculator",
  "/asphalt-paving-cost-calculator",
  "/parking-lot-paving-cost-calculator",
  "/blacktop-driveway-cost-estimator",
  "/blacktop-cost-per-ton",
  "/tar-and-chip-driveway-cost-calculator",
  "/asphalt-cost-guide",
  "/asphalt-cost-per-square-foot",
  "/hot-mix-asphalt-cost-per-ton",
  "/how-much-asphalt-do-i-need",
  "/asphalt-prices-by-state",
  "/asphalt-price-per-ton-near-me",
  "/asphalt-price-per-yard",
  "/asphalt-driveway-cost-by-state",
  "/tarmac-calculator",
  "/tarmac-driveway-cost-calculator",
  "/about",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("privacy") || route.includes("terms") ? 0.2 : 0.7
  }));
}
