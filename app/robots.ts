import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";

/**
 * Robots.txt configuration
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${SITE_CONFIG.URL}/sitemap.xml`,
  };
}
