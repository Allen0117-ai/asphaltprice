import type { Metadata } from "next";

import { editorialTeam, getContentDates } from "@/lib/content-meta";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: MetadataInput): Metadata {
  const socialImage = buildSocialImageUrl(title, path);

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage]
    }
  };
}

function buildSocialImageUrl(title: string, path: string) {
  const search = new URLSearchParams({ title, path });
  return `/og?${search.toString()}`;
}

export function webAppSchema({
  name,
  description,
  url
}: {
  name: string;
  description: string;
  url: string;
}) {
  const path = new URL(url).pathname || "/";
  const dates = getContentDates(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser with JavaScript enabled for interactive calculations.",
    isAccessibleForFree: true,
    datePublished: dates.publishedAt,
    dateModified: dates.modifiedAt,
    creator: organizationEntity(),
    provider: organizationEntity(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function webSiteSchema({
  name,
  url
}: {
  name: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url
  };
}

function organizationEntity() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.icon}`,
    email: editorialTeam.email
  };
}

export function organizationSchema({
  name,
  url,
  logo
}: {
  name: string;
  url: string;
  logo: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    email: editorialTeam.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial corrections",
      email: editorialTeam.email,
      url: `${siteConfig.url}/contact`,
      availableLanguage: "English"
    }
  };
}

type ContentSchemaInput = {
  name: string;
  description: string;
  path: string;
};

export function webPageSchema({ name, description, path }: ContentSchemaInput) {
  const dates = getContentDates(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    datePublished: dates.publishedAt,
    dateModified: dates.modifiedAt,
    author: organizationEntity(),
    reviewedBy: organizationEntity(),
    publisher: organizationEntity(),
    image: `${siteConfig.url}${buildSocialImageUrl(name, path)}`
  };
}

export function articleSchema({ name, description, path }: ContentSchemaInput) {
  const dates = getContentDates(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    description,
    url: `${siteConfig.url}${path}`,
    mainEntityOfPage: `${siteConfig.url}${path}`,
    datePublished: dates.publishedAt,
    dateModified: dates.modifiedAt,
    author: organizationEntity(),
    reviewedBy: organizationEntity(),
    publisher: organizationEntity(),
    image: `${siteConfig.url}${buildSocialImageUrl(name, path)}`
  };
}

export function aboutPageSchema({ name, description, path }: ContentSchemaInput) {
  const page = webPageSchema({ name, description, path });
  return { ...page, "@type": "AboutPage" };
}

export function contactPageSchema({ name, description, path }: ContentSchemaInput) {
  const page = webPageSchema({ name, description, path });
  return { ...page, "@type": "ContactPage" };
}

export function breadcrumbSchema(items: ReadonlyArray<{ label: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http") ? item.href : `${siteConfig.url}${item.href}`
    }))
  };
}

export function faqSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
