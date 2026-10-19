import type { MetadataRoute } from "next";
import { guides } from "@/lib/docs";
import { SITE } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/docs/",
    "/brand/",
    ...Object.keys(guides)
      .filter((s) => s !== "getting-started")
      .map((s) => `/docs/${s}/`),
  ].map((path) => ({ url: SITE + path }));
}
