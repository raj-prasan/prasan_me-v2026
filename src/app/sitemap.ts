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
  ]
}
