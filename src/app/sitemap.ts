import type { MetadataRoute } from "next"
import { profile } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.site,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.site}/posts`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${profile.site}/now`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]
}
