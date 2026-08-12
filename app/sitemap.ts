import type { MetadataRoute } from "next";

import { getContentDates } from "@/lib/content-meta";
import { siteConfig } from "@/lib/site";

const routes = [
  "/",
  "/asphalt-contractor-guide",
  "/asphalt-cost-calculator",
  "/asphalt-driveway-cost-calculator",
  "/asphalt-driveway-replacement-cost-calculator",
  "/asphalt-driveway-resurfacing-cost-calculator",
  "/asphalt-driveway-thickness",
  "/asphalt-tonnage-calculator",
  "/asphalt-vs-concrete-driveway-cost-calculator",
  "/driveway-cost-calculator",
  "/asphalt-paving-cost-calculator",
  "/asphalt-road-cost-calculator",
  "/parking-lot-paving-cost-calculator",
  "/driveway-sealing-cost-calculator",
  "/asphalt-millings-calculator",
  "/asphalt-millings-vs-gravel",
  "/blacktop-cost-per-ton",
  "/tar-and-chip-driveway-cost-calculator",
  "/asphalt-cost-guide",
  "/asphalt-cost-per-square-foot",
  "/hot-mix-asphalt-cost-per-ton",
  "/how-much-asphalt-do-i-need",
  "/asphalt-prices-by-state",
  "/asphalt-price-per-yard",
  "/asphalt-driveway-cost-by-state",
  "/tarmac-calculator",
  "/tarmac-driveway-cost-calculator",
  "/about",
  "/methodology",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(`${getContentDates(route).modifiedAt}T00:00:00.000Z`)
  }));
}
