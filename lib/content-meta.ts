import { siteConfig } from "@/lib/site";

export const editorialTeam = {
  name: "Asphalt Calculator Editorial Team",
  url: `${siteConfig.url}/about`,
  email: "hello@asphaltprice.com"
} as const;

type ContentDates = {
  publishedAt: string;
  modifiedAt: string;
};

const firstPublishedAt = "2026-05-11";
const currentReviewDate = "2026-08-05";
const latestReviewDate = "2026-08-12";

const contentDatesByPath: Record<string, ContentDates> = {
  "/": { publishedAt: firstPublishedAt, modifiedAt: currentReviewDate },
  "/about": { publishedAt: "2026-05-15", modifiedAt: currentReviewDate },
  "/privacy": { publishedAt: firstPublishedAt, modifiedAt: currentReviewDate },
  "/terms": { publishedAt: firstPublishedAt, modifiedAt: currentReviewDate },
  "/disclaimer": { publishedAt: firstPublishedAt, modifiedAt: currentReviewDate },
  "/contact": { publishedAt: firstPublishedAt, modifiedAt: currentReviewDate },
  "/methodology": { publishedAt: currentReviewDate, modifiedAt: currentReviewDate },
  "/asphalt-cost-calculator": { publishedAt: "2026-05-31", modifiedAt: currentReviewDate },
  "/asphalt-driveway-cost-calculator": { publishedAt: firstPublishedAt, modifiedAt: latestReviewDate },
  "/asphalt-driveway-replacement-cost-calculator": { publishedAt: currentReviewDate, modifiedAt: currentReviewDate },
  "/asphalt-driveway-resurfacing-cost-calculator": { publishedAt: currentReviewDate, modifiedAt: currentReviewDate },
  "/asphalt-driveway-thickness": { publishedAt: currentReviewDate, modifiedAt: currentReviewDate },
  "/asphalt-tonnage-calculator": { publishedAt: "2026-05-12", modifiedAt: currentReviewDate },
  "/asphalt-vs-concrete-driveway-cost-calculator": { publishedAt: "2026-05-15", modifiedAt: currentReviewDate },
  "/driveway-cost-calculator": { publishedAt: "2026-05-12", modifiedAt: currentReviewDate },
  "/asphalt-road-cost-calculator": { publishedAt: latestReviewDate, modifiedAt: latestReviewDate },
  "/parking-lot-paving-cost-calculator": { publishedAt: "2026-05-22", modifiedAt: currentReviewDate },
  "/driveway-sealing-cost-calculator": { publishedAt: currentReviewDate, modifiedAt: currentReviewDate },
  "/asphalt-millings-calculator": { publishedAt: currentReviewDate, modifiedAt: currentReviewDate },
  "/asphalt-millings-vs-gravel": { publishedAt: currentReviewDate, modifiedAt: latestReviewDate },
  "/tarmac-driveway-cost-calculator": { publishedAt: "2026-05-15", modifiedAt: latestReviewDate },
  "/asphalt-paving-cost-calculator": { publishedAt: "2026-05-31", modifiedAt: latestReviewDate },
  "/blacktop-cost-per-ton": { publishedAt: "2026-05-31", modifiedAt: latestReviewDate },
  "/tarmac-calculator": { publishedAt: "2026-05-31", modifiedAt: latestReviewDate },
  "/hot-mix-asphalt-cost-per-ton": { publishedAt: "2026-05-22", modifiedAt: currentReviewDate },
  "/asphalt-price-per-yard": { publishedAt: "2026-05-15", modifiedAt: currentReviewDate },
  "/asphalt-driveway-cost-by-state": { publishedAt: "2026-05-15", modifiedAt: currentReviewDate },
  "/tar-and-chip-driveway-cost-calculator": { publishedAt: "2026-05-22", modifiedAt: currentReviewDate },
  "/asphalt-cost-guide": { publishedAt: firstPublishedAt, modifiedAt: latestReviewDate },
  "/asphalt-prices-by-state": { publishedAt: firstPublishedAt, modifiedAt: latestReviewDate },
  "/how-much-asphalt-do-i-need": { publishedAt: firstPublishedAt, modifiedAt: currentReviewDate },
  "/asphalt-contractor-guide": { publishedAt: firstPublishedAt, modifiedAt: latestReviewDate },
  "/asphalt-cost-per-square-foot": { publishedAt: "2026-05-22", modifiedAt: currentReviewDate }
};

export function getContentDates(path: string): ContentDates {
  return contentDatesByPath[path] ?? { publishedAt: firstPublishedAt, modifiedAt: "2026-07-27" };
}

export function formatContentDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export const methodologySources = [
  {
    name: "FHWA asphalt pavement density research",
    href: "https://www.fhwa.dot.gov/pavement/asphalt/pubs/hif20003.pdf"
  },
  {
    name: "U.S. Bureau of Labor Statistics Producer Price Index",
    href: "https://www.bls.gov/ppi/"
  },
  {
    name: "U.S. Energy Information Administration diesel prices",
    href: "https://www.eia.gov/petroleum/gasdiesel/"
  }
] as const;
