import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const aiSearchCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot"
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiSearchCrawlers.map((userAgent) => ({ userAgent, allow: "/" }))
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
