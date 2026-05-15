import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const routes = [
  "/",
  "/asphalt-contractor-guide",
  "/asphalt-driveway-cost-calculator",
  "/asphalt-tonnage-calculator",
  "/asphalt-vs-concrete-driveway-cost-calculator",
  "/driveway-cost-calculator",
  "/asphalt-cost-guide",
  "/how-much-asphalt-do-i-need",
  "/asphalt-prices-by-state",
  "/asphalt-price-per-ton-near-me",
  "/asphalt-price-per-yard",
  "/asphalt-driveway-cost-by-state",
  "/tarmac-driveway-cost-calculator",
  "/about",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`
  }));
}
